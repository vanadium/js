/**
 *  @fileoverview Client for the veyron service.
 *
 *  Usage:
 *  var cl = new client(proxyConnection);
 *  var service = cl.bindTo('EndpointAddress', 'ServiceName');
 *  resultPromise = service.MethodName(arg);
 */

var Promise = require('../lib/promise');
var Deferred = require('../lib/deferred');
var vLog = require('../lib/vlog');
var ErrorConversion = require('../proxy/error_conversion');
var Stream = require('../proxy/stream');
var vError = require('../lib/verror');
var MessageType = require('../proxy/message_type');
var IncomingPayloadType = require('../proxy/incoming_payload_type');
var context = require('../runtime/context');
var constants = require('./constants');
var DecodeUtil = require('../lib/decode_util');
var vom = require('vom');
var EncodeUtil = require('../lib/encode_util');

var OutstandingRPC = function(ctx, options, cb) {
  this._ctx = ctx;
  this._proxy = options.proxy;
  this._id = -1;
  this._name = options.name;
  this._methodName = options.methodName,
  this._args = options.args;
  this._numOutParams = options.numOutParams;
  this._isStreaming = options.isStreaming || false;
  this._cb = cb;
  this._def = null;
};

OutstandingRPC.prototype.start = function() {
  this._id = this._proxy.nextId();
  var def = new Deferred(this._cb);

  var streamingDeferred = null;
  if (this._isStreaming) {
    streamingDeferred = new Deferred();
    def.stream = new Stream(this._id, streamingDeferred.promise, true);
    def.promise.stream = def.stream;
  }

  var message = this.constructMessage();

  this._def = def;
  this._proxy.cancelFromContext(this._ctx, this._id);
  this._proxy.sendRequest(message, MessageType.REQUEST, this, this._id);
  if (streamingDeferred) {
    this._proxy.senderPromise.then(function(ws) {
      streamingDeferred.resolve(ws);
    }, function(err) {
      streamingDeferred.reject(err);
    });
  }

  return def.promise;
};

OutstandingRPC.prototype.handleResponse = function(type, data) {
  switch (type) {
    case IncomingPayloadType.FINAL_RESPONSE:
      this.handleCompletion(data);
      break;
    case IncomingPayloadType.STREAM_RESPONSE:
      this.handleStreamData(data);
      break;
    case IncomingPayloadType.ERROR_RESPONSE:
      this.handleError(data);
      break;
    case IncomingPayloadType.STREAM_CLOSE:
      this.handleStreamClose();
      break;
    default:
      this.handleError(
          new vError.InternalError('Recieved unknown response type from wspr'));
      break;
  }
};

OutstandingRPC.prototype.handleCompletion = function(data) {
  try {
    data = DecodeUtil.decode(data);
  } catch (e) {
    this.handleError(
      new vError.InternalError('Failed to decode result: ' + e));
      return;
  }
  if (data.length === 1) {
    data = data[0];
  }
  this._def.resolve(data);
  if (this._def.stream) {
    this._def.stream._queueRead(null);
  }
  this._proxy.dequeue(this._id);
};

OutstandingRPC.prototype.handleStreamData = function(data) {
  if (this._def.stream) {
    try {
      data = DecodeUtil.decode(data);
    } catch (e) {
      this.handleError(
        new vError.InternalError('Failed to decode result: ' + e));
        return;
    }

    this._def.stream._queueRead(data);
  } else {
    vLog.warn('Ignoring streaming message for non-streaming flow : ' +
        this._id);
  }
};

OutstandingRPC.prototype.handleStreamClose = function() {
  if (this._def.stream) {
    this._def.stream._queueRead(null);
  }
};

OutstandingRPC.prototype.handleError = function(data) {
  var err;
  if (data instanceof Error) {
    err = data;
  } else {
    err = ErrorConversion.toJSerror(data);
  }

  if (this._def.stream) {
    this._def.stream.emit('error', err);
    this._def.stream._queueRead(null);
  }
  this._def.reject(err);
  this._proxy.dequeue(this._id);
};


/**
 * Construct a message to send to the veyron native code
 * @return {string} json string to send to jspr
 */
OutstandingRPC.prototype.constructMessage = function() {
  var deadline = this._ctx.deadline();
  var timeout = constants.NO_TIMEOUT;
  if (deadline !== null) {
    timeout = deadline - Date.now();
  }

  var jsonMessage = {
    name: this._name,
    method: this._methodName,
    inArgs: this._args,
    numOutArgs: this._numOutParams || 1,
    isStreaming: this._isStreaming,
    timeout: timeout
  };
  return EncodeUtil.encode(jsonMessage);
};

/**
 * Client for the veyron service.
 * @constructor
 * @param {Object} proxyConnection Veyron proxy client
 */
function Client(proxyConnection) {
  if (!(this instanceof Client)) {
    return new Client(proxyConnection);
  }

  this._proxyConnection = proxyConnection;
}

/**
 * Performs client side binding of a remote service to a native javascript
 * stub object.
 * @param {Context} A context.
 * @param {string} name the veyron name of the service to bind to.
 * @param {object} optServiceSignature if set, javascript signature of methods
 * available in the remote service.
 * @param {function} [cb] if given, this function will be called on
 * completion of the bind.  The first argument will be an error if there is
 * one, and the second argument is an object with methods that perform rpcs to
 * service
 * methods.
 * @return {Promise} An object with methods that perform rpcs to service methods
 */
Client.prototype.bindTo = function(ctx, name, optServiceSignature, cb) {
  var self = this;

  var args = context.optionalContext(arguments);
  ctx = args[0], name = args[1], optServiceSignature = args[2], cb = args[3];

  if (typeof optServiceSignature === 'function') {
    cb = optServiceSignature;
    optServiceSignature = undefined;
  }

  var def = new Deferred(cb);
  var serviceSignaturePromise;

  if (optServiceSignature !== undefined) {
    serviceSignaturePromise = Promise.resolve(optServiceSignature);
  } else {
    vLog.debug('Requesting service signature for:', name);
    var proxy = self._proxyConnection;
    serviceSignaturePromise = proxy.getServiceSignature(ctx, name);
  }

  var promise = def.promise;

  serviceSignaturePromise.then(function(serviceSignature) {
    vLog.debug('Received signature for:', name, serviceSignature);
    var boundObject = {};

    var bindMethod = function(methodSig) {
      boundObject[vom.MiscUtil.uncapitalize(methodSig.name)] =
        function(ctx /*, __other_args__*/) {
        var callback;
        var exclusiveLastIndex = arguments.length;
        // The + below is for the bound methodSig arg.
        var expectedLength = methodSig.inArgs.length + 1;
        if (typeof arguments[arguments.length - 1] === 'function') {
          // Callback.
          expectedLength++;
          exclusiveLastIndex--;
          callback = arguments[arguments.length - 1];
        }
        if (arguments.length !== expectedLength) {
          // TODO(bprosnitz) In the callback case, should we pass the error
          // to the callback?
          var expectedArgs = methodSig.inArgs.map(function(arg) {
            return arg.name;
          });
          throw new Error('Client RPC call  ' + methodSig.name +'(' +
            Array.prototype.slice.call(arguments, 1) + ') had an incorrect ' +
            'number of arguments. Expected format: ' + methodSig.name +
            '(context,' + expectedArgs + ')');
        }

	  var args = Array.prototype.slice.call(arguments, 1, exclusiveLastIndex);

        // TODO(jasoncampbell): This should probably be a more meaningful
        // error with its own constructor so that it can be checked in a
        // programatic way:
        //
        //     service
        //     .foo('bar')
        //     .catch(ArgumentsArityError, function(err) {
        //       console.error('invalid number of arguments')
        //     })
        //

        var isStreaming = (typeof methodSig.inStream === 'object'  &&
          methodSig.inStream !== null) ||
          (typeof methodSig.outStream === 'object' &&
          methodSig.outStream !== null);

        var rpc = new OutstandingRPC(ctx, {
           proxy: self._proxyConnection,
           name: name,
           methodName: methodSig.name,
           args: args,
           numOutParams: methodSig.outArgs.length,
           isStreaming: isStreaming
        }, callback);

        return rpc.start();
      };
    };

    serviceSignature.forEach(function(sig) {
      sig.methods.forEach(function(meth) {
        bindMethod(meth);
      });
    });

    boundObject['_signature'] = function(cb) {
      if (cb) {
        cb(undefined, serviceSignature);
      }
      return Promise.resolve(serviceSignature);
    };

    def.resolve(boundObject);
  }).catch (function(err) {
    if (cb) {
      cb(err);
    } else {
      def.reject(err);
    }
  });

  return promise;
};

/**
 * Export the module
 */
module.exports = Client;
