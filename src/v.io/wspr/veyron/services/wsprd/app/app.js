// This file was auto-generated by the veyron vdl tool.
var vom = require('../../../../../.././vom/vom');
// TODO(bjornick): Remove unused imports.
var Types = vom.Types;
var Type = vom.Type;
var Kind = vom.Kind;
var BigInt = vom.BigInt;
var Complex = vom.Complex;
var Builtins = vom.Builtins;
var Registry = vom.Registry;




var security = require('./../../../../../core/veyron2/security/security');

module.exports = {};



// Types:
var _type1 = new Type();
var _type2 = new Type();
var _type3 = new Type();
var _typeBlessingRequest = new Type();
var _typeVeyronRPC = new Type();
_type1.kind = Kind.LIST;
_type1.name = "";
_type1.elem = Types.ANY;
_type2.kind = Kind.LIST;
_type2.name = "";
_type2.elem = new security.Caveat()._type;
_type3.kind = Kind.LIST;
_type3.name = "";
_type3.elem = Types.BYTE;
_typeBlessingRequest.kind = Kind.STRUCT;
_typeBlessingRequest.name = "v.io/wspr/veyron/services/wsprd/app.BlessingRequest";
_typeBlessingRequest.fields = [{name: "Handle", type: Types.INT32}, {name: "Caveats", type: _type2}, {name: "DurationMs", type: Types.INT32}, {name: "Extension", type: Types.STRING}];
_typeVeyronRPC.kind = Kind.STRUCT;
_typeVeyronRPC.name = "v.io/wspr/veyron/services/wsprd/app.VeyronRPC";
_typeVeyronRPC.fields = [{name: "Name", type: Types.STRING}, {name: "Method", type: Types.STRING}, {name: "InArgs", type: _type1}, {name: "NumOutArgs", type: Types.INT32}, {name: "IsStreaming", type: Types.BOOL}, {name: "Timeout", type: Types.INT64}];
module.exports.BlessingRequest = (Registry.lookupOrCreateConstructor(_typeBlessingRequest));
module.exports.VeyronRPC = (Registry.lookupOrCreateConstructor(_typeVeyronRPC));




// Consts:



// Errors:



function NotImplementedMethod(name) {
  throw new Error('Method ' + name + ' not implemented');
}


// Services:

   
 


