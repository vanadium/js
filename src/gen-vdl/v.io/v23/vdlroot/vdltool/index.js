

// Copyright 2015 The Vanadium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// This file was auto-generated by the vanadium vdl tool.
var vdl = require('../../../../../vdl');






module.exports = {};



// Types:
var _type1 = new vdl.Type();
var _type2 = new vdl.Type();
var _type3 = new vdl.Type();
var _type4 = new vdl.Type();
var _typeConfig = new vdl.Type();
var _typeGenLanguage = new vdl.Type();
var _typeGoConfig = new vdl.Type();
var _typeGoImport = new vdl.Type();
var _typeGoType = new vdl.Type();
var _typeJavaConfig = new vdl.Type();
var _typeJavascriptConfig = new vdl.Type();
_type1.kind = vdl.Kind.SET;
_type1.name = "";
_type1.key = _typeGenLanguage;
_type2.kind = vdl.Kind.MAP;
_type2.name = "";
_type2.elem = _typeGoType;
_type2.key = vdl.Types.STRING;
_type3.kind = vdl.Kind.LIST;
_type3.name = "";
_type3.elem = _typeGoImport;
_type4.kind = vdl.Kind.MAP;
_type4.name = "";
_type4.elem = vdl.Types.STRING;
_type4.key = vdl.Types.STRING;
_typeConfig.kind = vdl.Kind.STRUCT;
_typeConfig.name = "vdltool.Config";
_typeConfig.fields = [{name: "GenLanguages", type: _type1}, {name: "Go", type: _typeGoConfig}, {name: "Java", type: _typeJavaConfig}, {name: "Javascript", type: _typeJavascriptConfig}];
_typeGenLanguage.kind = vdl.Kind.ENUM;
_typeGenLanguage.name = "vdltool.GenLanguage";
_typeGenLanguage.labels = ["Go", "Java", "Javascript"];
_typeGoConfig.kind = vdl.Kind.STRUCT;
_typeGoConfig.name = "vdltool.GoConfig";
_typeGoConfig.fields = [{name: "WireToNativeTypes", type: _type2}];
_typeGoImport.kind = vdl.Kind.STRUCT;
_typeGoImport.name = "vdltool.GoImport";
_typeGoImport.fields = [{name: "Path", type: vdl.Types.STRING}, {name: "Name", type: vdl.Types.STRING}];
_typeGoType.kind = vdl.Kind.STRUCT;
_typeGoType.name = "vdltool.GoType";
_typeGoType.fields = [{name: "Type", type: vdl.Types.STRING}, {name: "Imports", type: _type3}];
_typeJavaConfig.kind = vdl.Kind.STRUCT;
_typeJavaConfig.name = "vdltool.JavaConfig";
_typeJavaConfig.fields = [{name: "WireToNativeTypes", type: _type4}];
_typeJavascriptConfig.kind = vdl.Kind.STRUCT;
_typeJavascriptConfig.name = "vdltool.JavascriptConfig";
_typeJavascriptConfig.fields = [];
_type1.freeze();
_type2.freeze();
_type3.freeze();
_type4.freeze();
_typeConfig.freeze();
_typeGenLanguage.freeze();
_typeGoConfig.freeze();
_typeGoImport.freeze();
_typeGoType.freeze();
_typeJavaConfig.freeze();
_typeJavascriptConfig.freeze();
module.exports.Config = (vdl.Registry.lookupOrCreateConstructor(_typeConfig));
module.exports.GenLanguage = {
  GO: canonicalize.reduce(new (vdl.Registry.lookupOrCreateConstructor(_typeGenLanguage))('Go', true), _typeGenLanguage),
  JAVA: canonicalize.reduce(new (vdl.Registry.lookupOrCreateConstructor(_typeGenLanguage))('Java', true), _typeGenLanguage),
  JAVASCRIPT: canonicalize.reduce(new (vdl.Registry.lookupOrCreateConstructor(_typeGenLanguage))('Javascript', true), _typeGenLanguage),
};
module.exports.GoConfig = (vdl.Registry.lookupOrCreateConstructor(_typeGoConfig));
module.exports.GoImport = (vdl.Registry.lookupOrCreateConstructor(_typeGoImport));
module.exports.GoType = (vdl.Registry.lookupOrCreateConstructor(_typeGoType));
module.exports.JavaConfig = (vdl.Registry.lookupOrCreateConstructor(_typeJavaConfig));
module.exports.JavascriptConfig = (vdl.Registry.lookupOrCreateConstructor(_typeJavascriptConfig));




// Consts:



// Errors:



// Services:

   
 


