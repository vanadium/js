// This file was auto-generated by the vanadium vdl tool.
var vdl = require('../../../../../../vdl');
var makeError = require('../../../../../../errors/make-errors');
var actions = require('../../../../../../errors/actions');
var canonicalize = require('../../../../../../vdl/canonicalize');





var security = require('./../../../security');

module.exports = {};



// Types:
var _type1 = new vdl.Type();
var _type2 = new vdl.Type();
var _type3 = new vdl.Type();
var _type4 = new vdl.Type();
var _type5 = new vdl.Type();
var _typeACL = new vdl.Type();
var _typeTag = new vdl.Type();
var _typeTaggedACLMap = new vdl.Type();
var _typeerror = new vdl.Type();
_type1.kind = vdl.Kind.LIST;
_type1.name = "";
_type1.elem = new security.BlessingPattern()._type;
_type2.kind = vdl.Kind.LIST;
_type2.name = "";
_type2.elem = vdl.Types.STRING;
_type3.kind = vdl.Kind.LIST;
_type3.name = "";
_type3.elem = new security.RejectedBlessing()._type;
_type4.kind = vdl.Kind.ENUM;
_type4.name = "";
_type4.labels = ["NoRetry", "RetryConnection", "RetryRefetch", "RetryBackoff"];
_type5.kind = vdl.Kind.LIST;
_type5.name = "";
_type5.elem = vdl.Types.ANY;
_typeACL.kind = vdl.Kind.STRUCT;
_typeACL.name = "v.io/v23/services/security/access.ACL";
_typeACL.fields = [{name: "In", type: _type1}, {name: "NotIn", type: _type2}];
_typeTag.kind = vdl.Kind.STRING;
_typeTag.name = "v.io/v23/services/security/access.Tag";
_typeTaggedACLMap.kind = vdl.Kind.MAP;
_typeTaggedACLMap.name = "v.io/v23/services/security/access.TaggedACLMap";
_typeTaggedACLMap.elem = _typeACL;
_typeTaggedACLMap.key = vdl.Types.STRING;
_typeerror.kind = vdl.Kind.STRUCT;
_typeerror.name = "error";
_typeerror.fields = [{name: "Id", type: vdl.Types.STRING}, {name: "RetryCode", type: _type4}, {name: "Msg", type: vdl.Types.STRING}, {name: "ParamList", type: _type5}];
_type1.freeze();
_type2.freeze();
_type3.freeze();
_type4.freeze();
_type5.freeze();
_typeACL.freeze();
_typeTag.freeze();
_typeTaggedACLMap.freeze();
_typeerror.freeze();
module.exports.ACL = (vdl.Registry.lookupOrCreateConstructor(_typeACL));
module.exports.Tag = (vdl.Registry.lookupOrCreateConstructor(_typeTag));
module.exports.TaggedACLMap = (vdl.Registry.lookupOrCreateConstructor(_typeTaggedACLMap));
module.exports.error = (vdl.Registry.lookupOrCreateConstructor(_typeerror));




// Consts:

  module.exports.Admin = canonicalize.reduce(new (vdl.Registry.lookupOrCreateConstructor(_typeTag))("Admin", true), _typeTag);

  module.exports.Debug = canonicalize.reduce(new (vdl.Registry.lookupOrCreateConstructor(_typeTag))("Debug", true), _typeTag);

  module.exports.Read = canonicalize.reduce(new (vdl.Registry.lookupOrCreateConstructor(_typeTag))("Read", true), _typeTag);

  module.exports.Write = canonicalize.reduce(new (vdl.Registry.lookupOrCreateConstructor(_typeTag))("Write", true), _typeTag);

  module.exports.Resolve = canonicalize.reduce(new (vdl.Registry.lookupOrCreateConstructor(_typeTag))("Resolve", true), _typeTag);



// Errors:

module.exports.TooBigError = makeError('v.io/v23/services/security/access.TooBig', actions.NO_RETRY, {
  'en': '{1:}{2:} ACL is too big',
}, [
]);


module.exports.ACLMatchError = makeError('v.io/v23/services/security/access.ACLMatch', actions.NO_RETRY, {
  'en': '{1:}{2:} none of the valid blessings ({3}) are allowed by the ACL (rejected blessings: {4})',
}, [
  _type2,
  _type3,
]);




// Services:

   
 


