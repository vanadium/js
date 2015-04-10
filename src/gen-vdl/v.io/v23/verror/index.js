// Copyright 2015 The Vanadium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// This file was auto-generated by the vanadium vdl tool.
var vdl = require('../../../../vdl');
var makeError = require('../../../../errors/make-errors');
var actions = require('../../../../errors/actions');






module.exports = {};



// Types:




// Consts:



// Errors:

module.exports.UnknownError = makeError('v.io/v23/verror.Unknown', actions.NO_RETRY, {
  'en': '{1:}{2:} Error{:_}',
}, [
]);


module.exports.InternalError = makeError('v.io/v23/verror.Internal', actions.NO_RETRY, {
  'en': '{1:}{2:} Internal error{:_}',
}, [
]);


module.exports.NotImplementedError = makeError('v.io/v23/verror.NotImplemented', actions.NO_RETRY, {
  'en': '{1:}{2:} Not implemented{:_}',
}, [
]);


module.exports.EndOfFileError = makeError('v.io/v23/verror.EndOfFile', actions.NO_RETRY, {
  'en': '{1:}{2:} End of file{:_}',
}, [
]);


module.exports.BadArgError = makeError('v.io/v23/verror.BadArg', actions.NO_RETRY, {
  'en': '{1:}{2:} Bad argument{:_}',
}, [
]);


module.exports.BadStateError = makeError('v.io/v23/verror.BadState', actions.NO_RETRY, {
  'en': '{1:}{2:} Invalid state{:_}',
}, [
]);


module.exports.BadVersionError = makeError('v.io/v23/verror.BadVersion', actions.NO_RETRY, {
  'en': '{1:}{2:} Version is out of date',
}, [
]);


module.exports.ExistError = makeError('v.io/v23/verror.Exist', actions.NO_RETRY, {
  'en': '{1:}{2:} Already exists{:_}',
}, [
]);


module.exports.NoExistError = makeError('v.io/v23/verror.NoExist', actions.NO_RETRY, {
  'en': '{1:}{2:} Does not exist{:_}',
}, [
]);


module.exports.NoExistOrNoAccessError = makeError('v.io/v23/verror.NoExistOrNoAccess', actions.NO_RETRY, {
  'en': '{1:}{2:} Does not exist or access denied{:_}',
}, [
]);


module.exports.NoServersError = makeError('v.io/v23/verror.NoServers', actions.RETRY_REFETCH, {
  'en': '{1:}{2:} No usable servers found{:_}',
}, [
]);


module.exports.NoAccessError = makeError('v.io/v23/verror.NoAccess', actions.RETRY_REFETCH, {
  'en': '{1:}{2:} Access denied{:_}',
}, [
]);


module.exports.NotTrustedError = makeError('v.io/v23/verror.NotTrusted', actions.RETRY_REFETCH, {
  'en': '{1:}{2:} Client does not trust server{:_}',
}, [
]);


module.exports.NoServersAndAuthError = makeError('v.io/v23/verror.NoServersAndAuth', actions.RETRY_REFETCH, {
  'en': '{1:}{2:} Has no usable servers and is either not trusted or access was denied{:_}',
}, [
]);


module.exports.AbortedError = makeError('v.io/v23/verror.Aborted', actions.NO_RETRY, {
  'en': '{1:}{2:} Aborted{:_}',
}, [
]);


module.exports.BadProtocolError = makeError('v.io/v23/verror.BadProtocol', actions.NO_RETRY, {
  'en': '{1:}{2:} Bad protocol or type{:_}',
}, [
]);


module.exports.CanceledError = makeError('v.io/v23/verror.Canceled', actions.NO_RETRY, {
  'en': '{1:}{2:} Canceled{:_}',
}, [
]);


module.exports.TimeoutError = makeError('v.io/v23/verror.Timeout', actions.NO_RETRY, {
  'en': '{1:}{2:} Timeout{:_}',
}, [
]);




// Services:

   
 


