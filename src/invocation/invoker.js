/**
 * @fileoverview Defines an invoker to invoke service methods.
 * @private
 */

module.exports = Invoker;

var argHelper = require('../lib/arg-helper');
var createSignatures = require('../vdl/create-signatures');
var ServiceReflection = require('../lib/service-reflection');
var verror = require('../lib/verror');
var vlog = require('../lib/vlog');
var vom = require('vom');

/**
  * Create an invoker.
  * @param {Service} service Service object.
  * @constructor
  * @private
  */
function Invoker(service) {
  if (!(this instanceof Invoker)) {
    return new Invoker(service);
  }

  this._service = service;
  this._signature = createSignatures(service, service._serviceDescription);

  var methodNames = ServiceReflection.getExposedMethodNames(service);
  var invokableMethodsList = methodNames.map(function(methodName) {
    var method = service[methodName];
    var injectionPositions = argHelper.getInjectionPositions(method);
    var argOffsets = argHelper.getArgOffsets(method);
    return invokeImpl.bind(null, service, method, argOffsets,
      injectionPositions);
  });

  var upperMethodNames = methodNames.map(vom.MiscUtil.capitalize);

  this._invokableMethods = {};
  for (var i = 0; i < methodNames.length; i++) {
    this._invokableMethods[upperMethodNames[i]] = invokableMethodsList[i];
  }
}

/**
 * Invoke a method.
 * @private
 * @param {string} methodName The name of the method to invoke
 * (upper camel case).
 * @param {Object[]} args List of args coming off of the wire.
 * @param {Object.<string,Object>} potentialInjections Object containing
 * possible injection values.
 * e.g. function(x,$stream,b) => {'$stream' :1}
 * @param {Function} The callback function(err, value) to call after
 * completion.
 */
Invoker.prototype.invoke =
  function(methodName, args, potentialInjections, cb) {
  if (!(methodName in this._invokableMethods)) {
    cb(verror.NoExistError('Method ' + methodName + ' does not exist.'));
    return;
  }

  var meth = this._invokableMethods[methodName];
  return meth(args, potentialInjections, cb);
};

/**
 * Return the signature of the service.
 * @return {Object} The signature
 */
Invoker.prototype.signature = function() {
  return this._signature;
};

/**
  * Translates args to the native list-of-injections-and-non-injections style.
  * @private
  * @param {int[]} argOffsets List of original indicies of args. See
  * getArgOffsets().
  * @param {Object.<string,number>} injectionPositions Map from injection name
  * to position.
  * @param {Object[]} args List of args coming off of the wire.
  * @param {Object.<string,Object>} Object containing possible injection values.
  * @return {string[]} A list of combined injections and args off the wire.
  */
function translateToTrueCallArgs(argOffsets, injectionPositions, args,
  potentialInjections) {
    var callArgs = new Array(argOffsets.length +
      Object.keys(injectionPositions).length);
    for (var i = 0; i < args.length; i++) {
        callArgs[argOffsets[i]] = args[i];
    }
    for (var injection in injectionPositions) {
        if (injectionPositions.hasOwnProperty(injection)) {
          if (!potentialInjections.hasOwnProperty(injection)) {
            vlog.warn('Function received unknown injection ' + injection);
          }
          callArgs[injectionPositions[injection]] =
            potentialInjections[injection];
        }
    }
    return callArgs;
}

/**
 * Wrap an error so that it is always of type Error.
 * This is used in cases where values are known to be errors even if they
 * are not of error type such as if they are thrown or rejected.
 * @private
 * @param {Error} err The error or other value.
 * @return {Error} An error or type Error.
 */
function wrapError(err) {
  if (!(err instanceof Error)) {
    return new Error(err);
  }
  return err;
}

/**
  * Invoke a service method.
  * @private
  * @param {Service} service The service object to invoke a method on.
  * @param {Function} methodName The name of the method to invoke
  * (upper camel case).
  * @param {int[]} argOffsets List of original indicies of args. See
  * getArgOffsets().
  * @param {Object.<string,number>} injectionPositions Map from injection name
  * to position.
  * @param {Object[]} args List of args coming off of the wire.
  * @param {Object.<string,Object>} potentialInjections Object containing
  * possible injection values.
  * @param {Function} The callback function(err, value) to call after
  * completion.
  */
function invokeImpl(
  service, method, argOffsets, injectionPositions, // Bound by Invoker ctor.
  args, potentialInjections, cb // Passed on invocation.
  ) {
    if (args.length !== argOffsets.length) {
        cb(new verror.BadArgError('Expected ' + argOffsets + ' args, got ' +
          args));
        return;
    }

    // Inject the callback if it is requested.
    if (injectionPositions.hasOwnProperty('$cb')) {
      potentialInjections['$cb'] = cb;
    }

    var callArgs = translateToTrueCallArgs(argOffsets, injectionPositions,
      args, potentialInjections);

    var res;
    try {
      res = method.apply(service, callArgs);
    } catch(err) {
      cb(wrapError(err));
    }

    // There is no callback injection, so call the callback after the method
    // returns.
    if (!injectionPositions.hasOwnProperty('$cb')) {
      if (typeof res === 'object' && res !== null &&
        typeof res.then === 'function') {
        // If the result is "then-able" (like a promise), wait for it to
        // complete.
        var thisArg = undefined; // jshint ignore:line
        res.then(cb.bind(thisArg, null)).catch(function(err) {
          cb(wrapError(err));
        });
      } else {
        // If it is not "then-able", pass the result in directly.
        cb(undefined, res);
      }
    }
}
