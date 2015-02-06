// This file was auto-generated by the veyron vdl tool.
var vom = require('.././../../../../../../vom/vom');






module.exports = {};



// Types:
var _type1 = new vom.Type();
var _type2 = new vom.Type();
var _type3 = new vom.Type();
var _typeConfig = new vom.Type();
var _typeGenLanguage = new vom.Type();
var _typeGoConfig = new vom.Type();
var _typeGoNativeType = new vom.Type();
var _typeJavaConfig = new vom.Type();
var _typeJavascriptConfig = new vom.Type();
_type1.kind = vom.Kind.SET;
_type1.name = "";
_type1.key = _typeGenLanguage;
_type2.kind = vom.Kind.LIST;
_type2.name = "";
_type2.elem = _typeGoNativeType;
_type3.kind = vom.Kind.LIST;
_type3.name = "";
_type3.elem = vom.Types.STRING;
_typeConfig.kind = vom.Kind.STRUCT;
_typeConfig.name = "vdltool.Config";
_typeConfig.fields = [{name: "GenLanguages", type: _type1}, {name: "Go", type: _typeGoConfig}, {name: "Java", type: _typeJavaConfig}, {name: "Javascript", type: _typeJavascriptConfig}];
_typeGenLanguage.kind = vom.Kind.ENUM;
_typeGenLanguage.name = "vdltool.GenLanguage";
_typeGenLanguage.labels = ["Go", "Java", "Javascript"];
_typeGoConfig.kind = vom.Kind.STRUCT;
_typeGoConfig.name = "vdltool.GoConfig";
_typeGoConfig.fields = [{name: "NativeTypes", type: _type2}];
_typeGoNativeType.kind = vom.Kind.STRUCT;
_typeGoNativeType.name = "vdltool.GoNativeType";
_typeGoNativeType.fields = [{name: "WireType", type: vom.Types.STRING}, {name: "NativeType", type: vom.Types.STRING}, {name: "Imports", type: _type3}];
_typeJavaConfig.kind = vom.Kind.STRUCT;
_typeJavaConfig.name = "vdltool.JavaConfig";
_typeJavaConfig.fields = [];
_typeJavascriptConfig.kind = vom.Kind.STRUCT;
_typeJavascriptConfig.name = "vdltool.JavascriptConfig";
_typeJavascriptConfig.fields = [];
module.exports.Config = (vom.Registry.lookupOrCreateConstructor(_typeConfig));
module.exports.GenLanguage = (vom.Registry.lookupOrCreateConstructor(_typeGenLanguage));
module.exports.GoConfig = (vom.Registry.lookupOrCreateConstructor(_typeGoConfig));
module.exports.GoNativeType = (vom.Registry.lookupOrCreateConstructor(_typeGoNativeType));
module.exports.JavaConfig = (vom.Registry.lookupOrCreateConstructor(_typeJavaConfig));
module.exports.JavascriptConfig = (vom.Registry.lookupOrCreateConstructor(_typeJavascriptConfig));




// Consts:



// Errors:



// Services:

   
 


