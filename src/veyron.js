/**
 *  @fileoverview Public Veyron API.
 */

var extend = require('xtend');
var isBrowser = require('is-browser');

var Deferred = require('./lib/deferred');
var Runtime = require('./runtime/runtime');
var vlog = require('./lib/vlog');

var defaults = {
  logLevel: vlog.level,
  authenticate: false,
  authTimeout: 5000, // ms
};

/**
 * Exports
 */
module.exports = {
  errors: require('./lib/verror'),
  init: init,
  logLevels: require('./lib/vlog').levels,
  namespaceUtil: require('./namespace/util'),
  Promise: require('./lib/promise'),
  createLeafDispatcher: require('./ipc/leaf_dispatcher'),
  vom: {
    Kind: require('./vom/kind'),
    Types: require('./vom/types'),
  },
  caveats: require('./security/caveat'),
  aclAuthorizer: require('./security/acl_authorizer'),
};

/**
 * Creates a Veyron runtime.
 * @param {Object} config Configuration options
 */
function init(config, cb) {
  if (typeof config === 'function') {
    cb = config;
    config = {};
  }

  config = extend(defaults, config);

  var def = new Deferred(cb);

  var runtimeOpts = {
    wspr: config.wspr || process.env['WSPR'] || 'http://localhost:8124',
    appName: config.appName || 'webapp',
  };

  // If the user has set config.authenticate to true, get an authenticated
  // (blessed-by-identity-server) identity for the user.  This requires the
  // Veyron Chrome Extension to be installed and enabled, and WSPR to be
  // configured to talk to Veyron identity server, e.g. the one currently hosted
  // at /proxy.envyor.com:8101/identity/veyron-test/google.  The resulting
  // runtime will have runtime.identityName set to the name of the authenticated
  // identity.
  //
  // Otherwise, create a runtime with identityName 'unknown'.
  if (config.authenticate) {
    getIdentity(config.authTimeout, function(err, name) {
      if (err) {
        def.reject(err);
        return def.promise;
      }
      runtimeOpts.identityName = name;
      def.resolve(new Runtime(runtimeOpts));
    });
  } else {
    runtimeOpts.identityName = 'unknown';
    def.resolve(new Runtime(runtimeOpts));
  }

  return def.promise;
}

// getIdentity tells the Veyron Extension to start an OAuth flow, gets an access
// token for the user, and exchanges that access token for a blessed identity in
// WSPR, which is then associated with the origin of the web app.
//
// The flow starts by repeatedly sending an 'auth' message to the Veyron
// Extension content script.  It must perform this repeatedly because the first
// messages might get sent before the content script has had time to start.
//
// When the content script eventually receives the 'auth' message, it responds
// with an 'auth:received' message to let us know we can stop requesting auth.
//
// If no 'auth:received' message is received within config.authTimeout
// milliseconds, we timeout with an error.
//
// Once the extension has received the 'auth' message, it will perform the OAuth
// <-> WSPR identity flow, and respond with either an 'auth:success' message or
// an 'auth:error' message.
function getIdentity(authTimeoutMs, cb) {
  if (!isBrowser) {
    return cb(new Error('authenticate=true requires browser environment'));
  }

  var Postie = require('postie');
  var contentScript = new Postie(window);

  // Initialized below.
  var timeout, authRequestInterval;

  // Runs when the auth request succeeds.
  function handleAuthSuccess(data) {
    removeListeners();
    cb(null, data.name);
  }

  function handleAuthError(data) {
    removeListeners();
    cb(objectToError(data.error));
  }

  // Runs when the extension receives the auth request.
  function handleAuthReceived() {
    window.clearInterval(authRequestInterval);
  }

  // Runs when timeout occurs before getting 'auth:received' message.
  function handleTimeout() {
    handleAuthError(new Error(
        'Auth timeout. Please ensure that the Veyron Chrome Extension is ' +
        'installed and enabled. Download it here: ' +
        'https://github.com/veyron/veyron.js/raw/master/extension/veyron.crx'
    ));
  }

  function removeListeners() {
    window.clearInterval(authRequestInterval);
    window.clearTimeout(timeout);
    contentScript.removeListener('auth:success', handleAuthSuccess);
    contentScript.removeListener('auth:error', handleAuthError);
  }

  contentScript.on('auth:success', handleAuthSuccess);
  contentScript.on('auth:error', handleAuthError);
  contentScript.on('auth:received', handleAuthReceived);

  // Repeatedly ask the extension to auth.  The first time this runs, the
  // extension might not be running yet, so we need to ask in a setInterval.
  authRequestInterval = window.setInterval(function() {
    contentScript.post('auth');
  }, 200);

  // Timeout if we don't get an 'auth:received' message before authTimeoutMs
  // milliseconds.
  timeout = window.setTimeout(handleTimeout, authTimeoutMs);
}

// An error that gets sent via postMessage will be received as a plain Object.
// This function turns it back into an Error object.
function objectToError(obj) {
  var err = new Error(obj.message);
  err.name = obj.name;
  err.stack = obj.stack;
  return err;
}
