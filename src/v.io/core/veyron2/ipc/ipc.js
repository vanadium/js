// This file was auto-generated by the veyron vdl tool.
var vom = require('../../../.././vom/vom');




var security = require('./../security/security');
var vtrace = require('./../vtrace/vtrace');

module.exports = {};



// Types:
var _type1 = new vom.Type();
var _type10 = new vom.Type();
var _type2 = new vom.Type();
var _type3 = new vom.Type();
var _type4 = new vom.Type();
var _type5 = new vom.Type();
var _type6 = new vom.Type();
var _type7 = new vom.Type();
var _type8 = new vom.Type();
var _type9 = new vom.Type();
var _typeBlessingsRequest = new vom.Type();
var _typeRequest = new vom.Type();
var _typeResponse = new vom.Type();
var _typeerror = new vom.Type();
_type1.kind = vom.Kind.LIST;
_type1.name = "";
_type1.elem = _type2;
_type10.kind = vom.Kind.LIST;
_type10.name = "";
_type10.elem = new vtrace.Annotation()._type;
_type2.kind = vom.Kind.LIST;
_type2.name = "";
_type2.elem = new security.Certificate()._type;
_type3.kind = vom.Kind.LIST;
_type3.name = "";
_type3.elem = vom.Types.BYTE;
_type4.kind = vom.Kind.LIST;
_type4.name = "";
_type4.elem = new security.Caveat()._type;
_type5.kind = vom.Kind.OPTIONAL;
_type5.name = "";
_type5.elem = new security.WireBlessings()._type;
_type6.kind = vom.Kind.LIST;
_type6.name = "";
_type6.elem = vom.Types.ANY;
_type7.kind = vom.Kind.OPTIONAL;
_type7.name = "";
_type7.elem = _typeerror;
_type8.kind = vom.Kind.STRUCT;
_type8.name = "";
_type8.fields = [{name: "ID", type: vom.Types.STRING}, {name: "Action", type: vom.Types.UINT32}];
_type9.kind = vom.Kind.LIST;
_type9.name = "";
_type9.elem = new vtrace.SpanRecord()._type;
_typeBlessingsRequest.kind = vom.Kind.STRUCT;
_typeBlessingsRequest.name = "v.io/core/veyron2/ipc.BlessingsRequest";
_typeBlessingsRequest.fields = [{name: "Key", type: vom.Types.UINT64}, {name: "Blessings", type: _type5}];
_typeRequest.kind = vom.Kind.STRUCT;
_typeRequest.name = "v.io/core/veyron2/ipc.Request";
_typeRequest.fields = [{name: "Suffix", type: vom.Types.STRING}, {name: "Method", type: vom.Types.STRING}, {name: "NumPosArgs", type: vom.Types.UINT64}, {name: "EndStreamArgs", type: vom.Types.BOOL}, {name: "Timeout", type: vom.Types.INT64}, {name: "GrantedBlessings", type: new security.WireBlessings()._type}, {name: "Blessings", type: _typeBlessingsRequest}, {name: "Discharges", type: _type6}, {name: "TraceRequest", type: new vtrace.Request()._type}];
_typeResponse.kind = vom.Kind.STRUCT;
_typeResponse.name = "v.io/core/veyron2/ipc.Response";
_typeResponse.fields = [{name: "Error", type: _type7}, {name: "EndStreamResults", type: vom.Types.BOOL}, {name: "NumPosResults", type: vom.Types.UINT64}, {name: "TraceResponse", type: new vtrace.Response()._type}, {name: "AckBlessings", type: vom.Types.BOOL}];
_typeerror.kind = vom.Kind.STRUCT;
_typeerror.name = "error";
_typeerror.fields = [{name: "IDAction", type: _type8}, {name: "Msg", type: vom.Types.STRING}, {name: "ParamList", type: _type6}];
module.exports.BlessingsRequest = (vom.Registry.lookupOrCreateConstructor(_typeBlessingsRequest));
module.exports.Request = (vom.Registry.lookupOrCreateConstructor(_typeRequest));
module.exports.Response = (vom.Registry.lookupOrCreateConstructor(_typeResponse));
module.exports.error = (vom.Registry.lookupOrCreateConstructor(_typeerror));




// Consts:

  module.exports.NoTimeout = new (vom.Registry.lookupOrCreateConstructor(vom.Types.INT64))(new vom.BigInt(1, new Uint8Array([0x7f, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff])));

  module.exports.GlobMethod = new (vom.Registry.lookupOrCreateConstructor(vom.Types.STRING))("__Glob");

  module.exports.ReservedSignature = new (vom.Registry.lookupOrCreateConstructor(vom.Types.STRING))("__Signature");

  module.exports.ReservedMethodSignature = new (vom.Registry.lookupOrCreateConstructor(vom.Types.STRING))("__MethodSignature");



// Errors:



function NotImplementedMethod(name) {
  throw new Error('Method ' + name + ' not implemented');
}


// Services:

   
 


