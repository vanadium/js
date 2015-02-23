// This file was auto-generated by the veyron vdl tool.
var vdl = require('../../../.././vdl');





var security = require('./../security');
var vtrace = require('./../vtrace');

module.exports = {};



// Types:
var _type1 = new vdl.Type();
var _type10 = new vdl.Type();
var _type2 = new vdl.Type();
var _type3 = new vdl.Type();
var _type4 = new vdl.Type();
var _type5 = new vdl.Type();
var _type6 = new vdl.Type();
var _type7 = new vdl.Type();
var _type8 = new vdl.Type();
var _type9 = new vdl.Type();
var _typeBlessingsRequest = new vdl.Type();
var _typeRequest = new vdl.Type();
var _typeResponse = new vdl.Type();
var _typeerror = new vdl.Type();
_type1.kind = vdl.Kind.LIST;
_type1.name = "";
_type1.elem = _type2;
_type10.kind = vdl.Kind.LIST;
_type10.name = "";
_type10.elem = new vtrace.Annotation()._type;
_type2.kind = vdl.Kind.LIST;
_type2.name = "";
_type2.elem = new security.Certificate()._type;
_type3.kind = vdl.Kind.LIST;
_type3.name = "";
_type3.elem = vdl.Types.BYTE;
_type4.kind = vdl.Kind.LIST;
_type4.name = "";
_type4.elem = new security.Caveat()._type;
_type5.kind = vdl.Kind.OPTIONAL;
_type5.name = "";
_type5.elem = new security.WireBlessings()._type;
_type6.kind = vdl.Kind.LIST;
_type6.name = "";
_type6.elem = new security.WireDischarge()._type;
_type7.kind = vdl.Kind.STRUCT;
_type7.name = "";
_type7.fields = [{name: "ID", type: vdl.Types.STRING}, {name: "Action", type: vdl.Types.UINT32}];
_type8.kind = vdl.Kind.LIST;
_type8.name = "";
_type8.elem = vdl.Types.ANY;
_type9.kind = vdl.Kind.LIST;
_type9.name = "";
_type9.elem = new vtrace.SpanRecord()._type;
_typeBlessingsRequest.kind = vdl.Kind.STRUCT;
_typeBlessingsRequest.name = "v.io/core/veyron2/ipc.BlessingsRequest";
_typeBlessingsRequest.fields = [{name: "Key", type: vdl.Types.UINT64}, {name: "Blessings", type: _type5}];
_typeRequest.kind = vdl.Kind.STRUCT;
_typeRequest.name = "v.io/core/veyron2/ipc.Request";
_typeRequest.fields = [{name: "Suffix", type: vdl.Types.STRING}, {name: "Method", type: vdl.Types.STRING}, {name: "NumPosArgs", type: vdl.Types.UINT64}, {name: "EndStreamArgs", type: vdl.Types.BOOL}, {name: "Timeout", type: vdl.Types.INT64}, {name: "GrantedBlessings", type: new security.WireBlessings()._type}, {name: "Blessings", type: _typeBlessingsRequest}, {name: "Discharges", type: _type6}, {name: "TraceRequest", type: new vtrace.Request()._type}];
_typeResponse.kind = vdl.Kind.STRUCT;
_typeResponse.name = "v.io/core/veyron2/ipc.Response";
_typeResponse.fields = [{name: "Error", type: vdl.Types.ERROR}, {name: "EndStreamResults", type: vdl.Types.BOOL}, {name: "NumPosResults", type: vdl.Types.UINT64}, {name: "TraceResponse", type: new vtrace.Response()._type}, {name: "AckBlessings", type: vdl.Types.BOOL}];
_typeerror.kind = vdl.Kind.STRUCT;
_typeerror.name = "error";
_typeerror.fields = [{name: "IDAction", type: _type7}, {name: "Msg", type: vdl.Types.STRING}, {name: "ParamList", type: _type8}];
_type1.freeze();
_type10.freeze();
_type2.freeze();
_type3.freeze();
_type4.freeze();
_type5.freeze();
_type6.freeze();
_type7.freeze();
_type8.freeze();
_type9.freeze();
_typeBlessingsRequest.freeze();
_typeRequest.freeze();
_typeResponse.freeze();
_typeerror.freeze();
module.exports.BlessingsRequest = (vdl.Registry.lookupOrCreateConstructor(_typeBlessingsRequest));
module.exports.Request = (vdl.Registry.lookupOrCreateConstructor(_typeRequest));
module.exports.Response = (vdl.Registry.lookupOrCreateConstructor(_typeResponse));
module.exports.error = (vdl.Registry.lookupOrCreateConstructor(_typeerror));




// Consts:

  module.exports.NoTimeout = new (vdl.Registry.lookupOrCreateConstructor(vdl.Types.INT64))(new vdl.BigInt(1, new Uint8Array([0x7f, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff])));

  module.exports.GlobMethod = new (vdl.Registry.lookupOrCreateConstructor(vdl.Types.STRING))("__Glob");

  module.exports.ReservedSignature = new (vdl.Registry.lookupOrCreateConstructor(vdl.Types.STRING))("__Signature");

  module.exports.ReservedMethodSignature = new (vdl.Registry.lookupOrCreateConstructor(vdl.Types.STRING))("__MethodSignature");



// Errors:



// Services:

   
 


