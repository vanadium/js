// Copyright 2015 The Vanadium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

/**
 * @fileoverview Registry for caveats. Provides a mapping between caveat
 * UUIDs and validations methods.
 * @private
 */

var vdl = require('../vdl');
var vom = require('../vom');
var byteUtil = require('../vdl/byte-util');
var standardCaveats = require('./standard-caveat-validators');
var vdlSecurity = require('../gen-vdl/v.io/v23/security');
var unwrapArg = require('../lib/unwrap-arg');
var InspectableFunction = require('../lib/inspectable-function');
var asyncCall = require('../lib/async-call');

module.exports = CaveatValidatorRegistry;

/**
 * CaveatValidatorRegistry is a registry for caveats.
 * It enables registration of caveat validation functions and provides
 * provides functionality to perform validation given UUIDs. This constructor
 * should not be invoked directly, but rather the
 * [singleton]{@link Runtime.caveatRegistry} on {@link Runtime} should be used.
 * @constructor
 */
function CaveatValidatorRegistry() {
  this.validators = new Map();

  standardCaveats.registerDefaultCaveats(this);
}

/**
 * _makeKey generates a key for the given Uint8Array.
 * This is needed because ES6 map does === comparison and equivalent arrays
 * can be different under ===.
 * @private
 */
CaveatValidatorRegistry.prototype._makeKey = function(bytes) {
  return byteUtil.bytes2Hex(bytes);
};

/**
 * @callback CaveatValidationFunction
 * A function to validate caveats on {@link Blessings}
 * @param {module:vanadium.context.Context} ctx The context of the call.
 * @memberof module:vanadium.security
 * @param {*} param Validation-function specific parameter.
 * @throws Error Upon failure to validate, does not throw if successful.
 */

/**
 * Register a caveat validation function
 * @param {module:vanadium.security.CaveatDescriptor} cavDesc The caveat
 * description.
 * See security/types.vdl
 * @param {CaveatValidationFunction} validateFn The validation function.
 * e.g. function validateCaveatA(param) { ...
 */
CaveatValidatorRegistry.prototype.register = function(cavDesc, validateFn) {
  this.validators.set(
    this._makeKey(cavDesc.id),
    new CaveatValidator(cavDesc, validateFn)
  );
};

/**
 * Perform validation on a caveat.
 * @param {module:vanadium.context.Context} ctx The context.
 * @param {module:vanadium.security.SecurityCall} secCall The security call.
 * @param {*} caveat The caveat to validate.
 * @param {Function} [cb] Callback after validation is complete.
 * See security/types.vdl
 * @throws Error Upon failure to validate, does not throw if successful.
 * @private
 */
CaveatValidatorRegistry.prototype.validate =
  function(ctx, caveat, cb) {
  var validator = this.validators.get(this._makeKey(caveat.id));
  if (validator === undefined) {
    return cb(new vdlSecurity.CaveatNotRegisteredError(ctx,
      'Unknown caveat id: ' + this._makeKey(caveat.id)));
  }
  return validator.validate(ctx, vom.decode(caveat.paramVom), cb);
};

/**
 * CaveatValidator is a helper object representating a specific caveat
 * description and function pair.
 * @private
 */
function CaveatValidator(cavDesc, validateFn) {
  this.cavDesc = cavDesc;
  this.validateFn = validateFn;
}

/**
 * @private
 */
CaveatValidator.prototype.validate = function(ctx, paramForValidator, cb) {
  var paramType = this.cavDesc.paramType;
  var canonParam = vdl.Canonicalize.reduce(paramForValidator, paramType);
  var unwrappedParam = unwrapArg(canonParam, paramType);

  var inspectableFn = new InspectableFunction(this.validateFn);
  asyncCall(ctx, null, inspectableFn, 0, [ctx, unwrappedParam], cb);
};
