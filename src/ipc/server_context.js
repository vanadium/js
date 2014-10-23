/*
 * @fileoverview The server context is a subclass of context that has
 * extra information about the state of a server call.
 */

var PublicId = require('../security/public');
var context = require('../runtime/context');
var inherits = require('util').inherits;
var constants = require('./constants');

module.exports = ServerContext;

/*
 * A ServerContext is a context.Context subclass that includes additional
 * information about an ongoing server call.
 * @constructor
 * @param request An rpc request object.
 * @param proxy A proxy instance.
 */
function ServerContext(request, proxy) {
  if (!(this instanceof ServerContext)) {
    return new ServerContext();
  }

  // TODO(mattr): What to pass for runtime? Remove runtime as a param?
  this._ctx = new context.Context({});
  if (request.context.timeout !== constants.NO_TIMEOUT) {
    this._ctx = this._ctx.withTimeout(request.context.timeout);
  } else {
    this._ctx = this._ctx.withCancel();
  }
  this.suffix = request.context.suffix;
  this.name = request.context.name;
  this.remoteId = new PublicId(request.context.remoteID.names,
                               request.context.remoteID.handle,
                               request.context.remoteID.publicKey,
                               proxy);
}
inherits(ServerContext, context.Context);

ServerContext.prototype.deadline = function() {
  return this._ctx.deadline();
};
ServerContext.prototype.done = function() {
  return this._ctx.done();
};
ServerContext.prototype.waitUntilDone = function(callback) {
  return this._ctx.waitUntilDone(callback);
};
ServerContext.prototype.runtime = function() {
  return this._ctx.runtime();
};
ServerContext.prototype.value = function(key) {
  return this._ctx.value();
};
ServerContext.prototype.cancel = function() {
  return this._ctx.cancel();
};
