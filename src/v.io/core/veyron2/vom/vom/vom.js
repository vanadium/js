// This file was auto-generated by the veyron vdl tool.
var vom = require('../../../../.././vom/vom');
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
var _typedataRep = new Type();
_typedataRep.kind = Kind.ENUM;
_typedataRep.name = "v.io/core/veyron2/vom/vom.dataRep";
_typedataRep.labels = ["Hex", "Binary"];
module.exports.dataRep = (Registry.lookupOrCreateConstructor(_typedataRep));




// Consts:



// Errors:



function NotImplementedMethod(name) {
  throw new Error('Method ' + name + ' not implemented');
}


// Services:

   
 


