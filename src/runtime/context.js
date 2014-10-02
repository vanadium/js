/**
 * @fileoverview Veyron Context
 */

var Deferred = require('../lib/deferred');
var Promise = require('../lib/promise');
var vError = require('../lib/verror');
var inherits = require('util').inherits;

module.exports = {
  Context: Context,
  ContextKey: ContextKey,
  DeadlineExceededError: DeadlineExceededError,
  CancelledError: CancelledError
};

/*
 * Creates an Error object indicating that the context was cancelled
 * due to an expired deadline.
 * @constructor
 * @param {string} message message
 */
function DeadlineExceededError() {
  if (!(this instanceof DeadlineExceededError)) {
    return new DeadlineExceededError();
  }
  vError.AbortedError.call(this, "deadline exceeded");
}
inherits(DeadlineExceededError, vError.AbortedError);

/*
 * Creates an Error object indicating that the context was manually
 * cancelled.
 * @constructor
 */
function CancelledError() {
  if (!(this instanceof CancelledError)) {
    return new CancelledError();
  }
  vError.AbortedError.call(this, "cancelled");
}
inherits(CancelledError, vError.AbortedError);

/*
 * Creates an object than can be used as a key in the value and
 * withValue methods of a context.  Modules that want to attach data
 * to the context should first construct a key, then use that key
 * whenever they want store or retrieve their data from the context.
 * @constructor
 */
function ContextKey() {
  if (!(this instanceof ContextKey)) {
    return new ContextKey();
  }
  this._key = ContextKey._nextKey;
  ContextKey._nextKey++;
}

ContextKey._nextKey = 0;

/*
 * Creates a new root context.  This should be used to generate a
 * context for a new operation which is unrealted to any ongoing
 * activity.
 * @constructor
 * @param {Runtime} runtime The runtime to attach to this context
 */
function Context(runtime) {
  if (!(this instanceof Context)) {
    return new Context(runtime);
  }

  if (runtime === null) {
    throw new vError.BadArgError(
      'Attempting to construct context with null runtime.');
  }

  this._runtime = runtime;
}

/*
 * Returns the time at which this context will be automatically
 * canceled.  If no deadline has been set, null is returned.
 * @return {Date} The Date corresponding to the deadline
 */
Context.prototype.deadline = function() {
  return null;
};


/*
 * Returns true if the context has exceeded its deadline or has
 * been cancelled.
 * @return {boolean} True if the context is done
 */
Context.prototype.done = function() {
  return false;
};

/*
 * Returns a promise that will be resolved when the context exceeds
 * its deadline or is cancelled.  Optionally you can pass a callback
 * that will be run when the promise is resolved.
 * @param {function} A callback function(error) to call upon cancellation
 */
Context.prototype.waitUntilDone = function(callback) {
  // The root context can never be cancelled, and therefore we
  // throw away the context and return a promise that will never
  // be resolved.
  return new Promise(function(){});
}

/*
 * Returns the runtime used to create this context.  This is
 * guaranteed to be non-null.
 * @return {Runtime} The runtime, guaranteed to be non-null
 */
Context.prototype.runtime = function() {
  return this._runtime;
};

/*
 * Returns the value corresponding to the given key.  The
 * value/withValue methods can be used to attach data to context that
 * will be carried across API boundaries.  You should use this only
 * for data that is relevant across multiple API boundaries and not
 * just to pass extra parameters to functions and methods.  The key
 * must be an instance of ContextKey.  This function will return null
 * if there is no value associated with the given key.
 * @param {ContextKey} A ContextKey to look up
 * @return {*} The value associated with the key, or null
 */
Context.prototype.value = function(key) {
  return null;
};

/*
 * Returns a new context derived from the current context but that
 * will return the given value when value(key) is called with the
 * given key.
 * @param {ContextKey} A key.
 * @param {*} A value to associate with the key.
 * @return {Context} A new derived context.
 */
Context.prototype.withValue = function(key, value) {
  return new ValueContext(this, key, value);
};

/*
 * Returns a new context derived from the current context but that
 * can be cancelled.  The returned context will have an additional
 * method cancel() which can be used to cancel the context.
 * @return {Context} A new derived cancellable context.
 */
Context.prototype.withCancel = function() {
  return new CancelContext(this);
};

/*
 * Returns a new context derived from the current context but that
 * will be automatically cancelled after a given deadline.  The
 * returned context will have an additional method cancel() which can
 * be used to cancel the context early.
 * @param {Date} A date object which specifies the deadline.
 * @return {Context} A new derived cancellable context.
 */
Context.prototype.withDeadline = function(deadline) {
  return new DeadlineContext(this, deadline);
};

/*
 * Returns a new context derived from the current context but that
 * will be automatically cancelled after a given timeout.  The
 * returned context will have an additional method cancel() which can
 * be used to cancel the context early.
 * @param {Number} A timeout in milliseconds.
 * @return {Context} A new derived cancellable context.
 */
Context.prototype.withTimeout = function(timeout) {
  return new DeadlineContext(this, Date.now() + timeout);
};


// ChildContext is a the base class for other context specializations.
// It defers all its calls to its parent.
function ChildContext(parent) {
  this._parent = parent;
  // I explicitly don't call Context here because I don't
  // want to set _runtime on every instance.
}
inherits(ChildContext, Context);

ChildContext.prototype.deadline = function() {
  return this._parent.deadline();
};
ChildContext.prototype.done = function() {
  return this._parent.done();
};
ChildContext.prototype.waitUntilDone = function(callback) {
  return this._parent.waitUntilDone(callback);
}
ChildContext.prototype.runtime = function() {
  return this._parent.runtime();
};
ChildContext.prototype.value = function(key) {
  return this._parent.value();
};

// ValueContext is a context that associates a single key with a
// single value.
function ValueContext(parent, key, value) {
  if (!(key instanceof ContextKey)) {
    throw new vError.BadArgError(
      'Attempting to set a value on a context, ' +
      'but the key is not of type ContextKey.');
  }

  this._key = key;
  this._value = value;
  ChildContext.call(this, parent);
}
inherits(ValueContext, ChildContext);

ValueContext.prototype.value = function(key) {
  if (!(key instanceof ContextKey)) {
    throw new vError.BadArgError(
      'Attempting to look up a value on a context, ' +
      'but the key is not of type ContextKey.');
  }
  if (key._key === this._key._key) {
    return this._value;
  }
  return this._parent.value(key);
};

// cancellableAncestor walks up the tree of parent contexts to find
// the nearest ancestor that is cancellable.
function cancellableAncestor(parent) {
  for (; parent instanceof ChildContext; parent = parent._parent) {
    if (parent instanceof CancelContext) {
      return parent;
    }
  }
  // If we've reached the root, there is no cancellable ancestor.
  return null;
}

// A CancelContext is a context which can be cancelled.
function CancelContext(parent) {
  this._id = CancelContext._nextID;
  CancelContext._nextID++;

  this._done = false;
  this._deferred = new Deferred();
  this._children = {};

  // We need to arrange to be cancelled when our parent is.
  var ca = cancellableAncestor(parent);
  if (ca) {
    ca._children[this._id] = this;
  }

  ChildContext.call(this, parent);
}
inherits(CancelContext, ChildContext);

CancelContext._nextID = 0;

CancelContext.prototype.done = function() {
  return this._done;
};

CancelContext.prototype._cancel = function(error) {
  this._done = true;
  this._deferred.reject(error);
  for (var id in this._children) {
    this._children[id]._cancel(error);
  }
  this._children = {};
};

CancelContext.prototype.cancel = function() {
  var ca = cancellableAncestor(this._parent);
  if (ca) {
    delete ca._children[this._id];
  }
  this._cancel(new CancelledError());
};

CancelContext.prototype.waitUntilDone = function(callback) {
  this._deferred.addCallback(callback);
  return this._deferred.promise;
};

// A DeadlineContext cancels itself when its deadline is met.
function DeadlineContext(parent, deadline) {
  this._deadline = deadline;
  this._timerID = setTimeout(this.cancel.bind(this), deadline - Date.now());

  CancelContext.call(this, parent);
}
inherits(DeadlineContext, CancelContext);

DeadlineContext.prototype.deadline = function() {
  return this._deadline;
};

DeadlineContext.prototype._cancel = function(error) {
  clearTimeout(this._timerID);
  CancelContext.prototype._cancel.call(this, error);
};

DeadlineContext.prototype.cancel = function() {
  this._cancel(new DeadlineExceededError());
};