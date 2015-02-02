// This file was auto-generated by the veyron vdl tool.
var vom = require('../../../.././vom/vom');
// TODO(bjornick): Remove unused imports.
var Types = vom.Types;
var Type = vom.Type;
var Kind = vom.Kind;
var BigInt = vom.BigInt;
var Complex = vom.Complex;
var Builtins = vom.Builtins;
var Registry = vom.Registry;





module.exports = {};



// Types:
var _type1 = new Type();
var _typeMountFlag = new Type();
var _typeVDLMountEntry = new Type();
var _typeVDLMountedServer = new Type();
_type1.kind = Kind.LIST;
_type1.name = "";
_type1.elem = _typeVDLMountedServer;
_typeMountFlag.kind = Kind.UINT32;
_typeMountFlag.name = "v.io/core/veyron2/naming.MountFlag";
_typeVDLMountEntry.kind = Kind.STRUCT;
_typeVDLMountEntry.name = "v.io/core/veyron2/naming.VDLMountEntry";
_typeVDLMountEntry.fields = [{name: "Name", type: Types.STRING}, {name: "Servers", type: _type1}, {name: "MT", type: Types.BOOL}];
_typeVDLMountedServer.kind = Kind.STRUCT;
_typeVDLMountedServer.name = "v.io/core/veyron2/naming.VDLMountedServer";
_typeVDLMountedServer.fields = [{name: "Server", type: Types.STRING}, {name: "TTL", type: Types.UINT32}];
module.exports.MountFlag = (Registry.lookupOrCreateConstructor(_typeMountFlag));
module.exports.VDLMountEntry = (Registry.lookupOrCreateConstructor(_typeVDLMountEntry));
module.exports.VDLMountedServer = (Registry.lookupOrCreateConstructor(_typeVDLMountedServer));




// Consts:

  module.exports.Replace = new (Registry.lookupOrCreateConstructor(_typeMountFlag))(1);

  module.exports.MT = new (Registry.lookupOrCreateConstructor(_typeMountFlag))(2);



// Errors:



function NotImplementedMethod(name) {
  throw new Error('Method ' + name + ' not implemented');
}


// Services:

   
 


