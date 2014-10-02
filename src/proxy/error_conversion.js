/**
 * @fileoverview conversion between JavaScript and veyron2/verror Error object
 */

var vError = require('./../lib/verror');

module.exports = {
  toStandardErrorStruct: toStandardErrorStruct,
  toJSerror: toJSerror
};

/*
 * Implements the same structure as Standard struct in veyron2/verror
 * @private
 * @param {string} Id id of the error, which in JavaScript, corresponds to the
 * name property of an Error object.
 */
var _standard = function(id, message) {
  this.iD = id;
  this.msg = message;
};

/*
 * Converts from a JavaScript error object to verror standard struct which
 * wspr expects as error format.
 * @private
 * @param {Error} err JavaScript error object
 * @return {_standard} verror standard struct
 */
function toStandardErrorStruct(err) {
  var errId = ''; // empty ID indicate an unknown error
  var errMessage = '';
  if (err instanceof Error) {
    errMessage = err.message;
    if (err.name !== 'Error') { // default name is considered unknown
      errId = err.name;
    }
  } else if (err !== undefined && err !== null) {
    errMessage = err + '';
  }

  return new _standard(errId, errMessage);
}

var errIdConstrMap = {};
errIdConstrMap[vError.Ids.Aborted] = vError.AbortedError;
errIdConstrMap[vError.Ids.BadArg] = vError.BadArgError;
errIdConstrMap[vError.Ids.BadProtocol] = vError.BadProtocolError;
errIdConstrMap[vError.Ids.Exists] = vError.ExistsError;
errIdConstrMap[vError.Ids.Internal] = vError.InternalError;
errIdConstrMap[vError.Ids.NoAccess] = vError.NoAccessError;
errIdConstrMap[vError.Ids.NoExist] = vError.NoExistError;
errIdConstrMap[vError.Ids.NoExistOrNoAccess] = vError.NoExistOrNoAccessError;

/*
 * Converts from a verror standard struct which comes from wspr to JavaScript
 * Error object ensuring message and name are set properly
 * @private
 * @param {_standard} verr verror standard struct
 * @return {Error} JavaScript error object
 */
function toJSerror(verr) {
  var err;

  var ErrIdConstr = errIdConstrMap[verr.iD];
  if(ErrIdConstr) {
    err = new ErrIdConstr(verr.msg);
  } else {
    err = new vError.VeyronError(verr.msg, verr.iD);
  }

  return err;
}
