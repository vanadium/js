// This file was auto-generated by the veyron vdl tool.
var vom = require('../../../../../.././vom/vom');
var makeError = require('../../../../../.././errors/make-errors');
var actions = require('../../../../../.././errors/actions');






module.exports = {};



// Types:
var _type1 = new vom.Type();
var _type10 = new vom.Type();
var _type11 = new vom.Type();
var _type12 = new vom.Type();
var _type13 = new vom.Type();
var _type14 = new vom.Type();
var _type15 = new vom.Type();
var _type16 = new vom.Type();
var _type17 = new vom.Type();
var _type18 = new vom.Type();
var _type19 = new vom.Type();
var _type2 = new vom.Type();
var _type20 = new vom.Type();
var _type3 = new vom.Type();
var _type4 = new vom.Type();
var _type5 = new vom.Type();
var _type6 = new vom.Type();
var _type7 = new vom.Type();
var _type8 = new vom.Type();
var _type9 = new vom.Type();
var _typeArgs = new vom.Type();
var _typeCompComp = new vom.Type();
var _typeComposites = new vom.Type();
var _typeCompositesArray = new vom.Type();
var _typeKeyScalars = new vom.Type();
var _typeNamedArray = new vom.Type();
var _typeNamedBool = new vom.Type();
var _typeNamedByte = new vom.Type();
var _typeNamedComplex128 = new vom.Type();
var _typeNamedComplex64 = new vom.Type();
var _typeNamedEnum = new vom.Type();
var _typeNamedFloat32 = new vom.Type();
var _typeNamedFloat64 = new vom.Type();
var _typeNamedInt16 = new vom.Type();
var _typeNamedInt32 = new vom.Type();
var _typeNamedInt64 = new vom.Type();
var _typeNamedList = new vom.Type();
var _typeNamedMap = new vom.Type();
var _typeNamedSet = new vom.Type();
var _typeNamedString = new vom.Type();
var _typeNamedStruct = new vom.Type();
var _typeNamedUint16 = new vom.Type();
var _typeNamedUint32 = new vom.Type();
var _typeNamedUint64 = new vom.Type();
var _typeNamedUnion = new vom.Type();
var _typeNestedArgs = new vom.Type();
var _typeScalars = new vom.Type();
var _typeScalarsArray = new vom.Type();
var _typeerror = new vom.Type();
_type1.kind = vom.Kind.OPTIONAL;
_type1.name = "";
_type1.elem = _typeerror;
_type10.kind = vom.Kind.LIST;
_type10.name = "";
_type10.elem = _typeComposites;
_type11.kind = vom.Kind.MAP;
_type11.name = "";
_type11.elem = _typeComposites;
_type11.key = vom.Types.STRING;
_type12.kind = vom.Kind.MAP;
_type12.name = "";
_type12.elem = _type13;
_type12.key = _typeKeyScalars;
_type13.kind = vom.Kind.LIST;
_type13.name = "";
_type13.elem = _type11;
_type14.kind = vom.Kind.LIST;
_type14.name = "";
_type14.elem = vom.Types.INT32;
_type15.kind = vom.Kind.SET;
_type15.name = "";
_type15.key = vom.Types.INT32;
_type16.kind = vom.Kind.MAP;
_type16.name = "";
_type16.elem = vom.Types.STRING;
_type16.key = vom.Types.INT32;
_type17.kind = vom.Kind.LIST;
_type17.name = "";
_type17.elem = vom.Types.BYTE;
_type18.kind = vom.Kind.LIST;
_type18.name = "";
_type18.elem = vom.Types.STRING;
_type19.kind = vom.Kind.SET;
_type19.name = "";
_type19.key = vom.Types.STRING;
_type2.kind = vom.Kind.STRUCT;
_type2.name = "";
_type2.fields = [{name: "ID", type: vom.Types.STRING}, {name: "Action", type: vom.Types.UINT32}];
_type20.kind = vom.Kind.MAP;
_type20.name = "";
_type20.elem = vom.Types.INT64;
_type20.key = vom.Types.STRING;
_type3.kind = vom.Kind.LIST;
_type3.name = "";
_type3.elem = vom.Types.ANY;
_type4.kind = vom.Kind.LIST;
_type4.name = "";
_type4.elem = _typeScalars;
_type5.kind = vom.Kind.SET;
_type5.name = "";
_type5.key = _typeKeyScalars;
_type6.kind = vom.Kind.MAP;
_type6.name = "";
_type6.elem = _typeScalars;
_type6.key = vom.Types.STRING;
_type7.kind = vom.Kind.MAP;
_type7.name = "";
_type7.elem = _type8;
_type7.key = _typeKeyScalars;
_type8.kind = vom.Kind.LIST;
_type8.name = "";
_type8.elem = _type9;
_type9.kind = vom.Kind.MAP;
_type9.name = "";
_type9.elem = vom.Types.COMPLEX128;
_type9.key = vom.Types.STRING;
_typeArgs.kind = vom.Kind.STRUCT;
_typeArgs.name = "v.io/core/veyron2/vdl/testdata/base.Args";
_typeArgs.fields = [{name: "A", type: vom.Types.INT32}, {name: "B", type: vom.Types.INT32}];
_typeCompComp.kind = vom.Kind.STRUCT;
_typeCompComp.name = "v.io/core/veyron2/vdl/testdata/base.CompComp";
_typeCompComp.fields = [{name: "A0", type: _typeComposites}, {name: "A1", type: _typeCompositesArray}, {name: "A2", type: _type10}, {name: "A3", type: _type11}, {name: "A4", type: _type12}];
_typeComposites.kind = vom.Kind.STRUCT;
_typeComposites.name = "v.io/core/veyron2/vdl/testdata/base.Composites";
_typeComposites.fields = [{name: "A0", type: _typeScalars}, {name: "A1", type: _typeScalarsArray}, {name: "A2", type: _type4}, {name: "A3", type: _type5}, {name: "A4", type: _type6}, {name: "A5", type: _type7}];
_typeCompositesArray.kind = vom.Kind.ARRAY;
_typeCompositesArray.name = "v.io/core/veyron2/vdl/testdata/base.CompositesArray";
_typeCompositesArray.len = 2;
_typeCompositesArray.elem = _typeComposites;
_typeKeyScalars.kind = vom.Kind.STRUCT;
_typeKeyScalars.name = "v.io/core/veyron2/vdl/testdata/base.KeyScalars";
_typeKeyScalars.fields = [{name: "A0", type: vom.Types.BOOL}, {name: "A1", type: vom.Types.BYTE}, {name: "A2", type: vom.Types.UINT16}, {name: "A3", type: vom.Types.UINT32}, {name: "A4", type: vom.Types.UINT64}, {name: "A5", type: vom.Types.INT16}, {name: "A6", type: vom.Types.INT32}, {name: "A7", type: vom.Types.INT64}, {name: "A8", type: vom.Types.FLOAT32}, {name: "A9", type: vom.Types.FLOAT64}, {name: "A10", type: vom.Types.COMPLEX64}, {name: "A11", type: vom.Types.COMPLEX128}, {name: "A12", type: vom.Types.STRING}, {name: "B0", type: _typeNamedBool}, {name: "B1", type: _typeNamedByte}, {name: "B2", type: _typeNamedUint16}, {name: "B3", type: _typeNamedUint32}, {name: "B4", type: _typeNamedUint64}, {name: "B5", type: _typeNamedInt16}, {name: "B6", type: _typeNamedInt32}, {name: "B7", type: _typeNamedInt64}, {name: "B8", type: _typeNamedFloat32}, {name: "B9", type: _typeNamedFloat64}, {name: "B10", type: _typeNamedComplex64}, {name: "B11", type: _typeNamedComplex128}, {name: "B12", type: _typeNamedString}];
_typeNamedArray.kind = vom.Kind.ARRAY;
_typeNamedArray.name = "v.io/core/veyron2/vdl/testdata/base.NamedArray";
_typeNamedArray.len = 2;
_typeNamedArray.elem = vom.Types.BOOL;
_typeNamedBool.kind = vom.Kind.BOOL;
_typeNamedBool.name = "v.io/core/veyron2/vdl/testdata/base.NamedBool";
_typeNamedByte.kind = vom.Kind.BYTE;
_typeNamedByte.name = "v.io/core/veyron2/vdl/testdata/base.NamedByte";
_typeNamedComplex128.kind = vom.Kind.COMPLEX128;
_typeNamedComplex128.name = "v.io/core/veyron2/vdl/testdata/base.NamedComplex128";
_typeNamedComplex64.kind = vom.Kind.COMPLEX64;
_typeNamedComplex64.name = "v.io/core/veyron2/vdl/testdata/base.NamedComplex64";
_typeNamedEnum.kind = vom.Kind.ENUM;
_typeNamedEnum.name = "v.io/core/veyron2/vdl/testdata/base.NamedEnum";
_typeNamedEnum.labels = ["A", "B", "C"];
_typeNamedFloat32.kind = vom.Kind.FLOAT32;
_typeNamedFloat32.name = "v.io/core/veyron2/vdl/testdata/base.NamedFloat32";
_typeNamedFloat64.kind = vom.Kind.FLOAT64;
_typeNamedFloat64.name = "v.io/core/veyron2/vdl/testdata/base.NamedFloat64";
_typeNamedInt16.kind = vom.Kind.INT16;
_typeNamedInt16.name = "v.io/core/veyron2/vdl/testdata/base.NamedInt16";
_typeNamedInt32.kind = vom.Kind.INT32;
_typeNamedInt32.name = "v.io/core/veyron2/vdl/testdata/base.NamedInt32";
_typeNamedInt64.kind = vom.Kind.INT64;
_typeNamedInt64.name = "v.io/core/veyron2/vdl/testdata/base.NamedInt64";
_typeNamedList.kind = vom.Kind.LIST;
_typeNamedList.name = "v.io/core/veyron2/vdl/testdata/base.NamedList";
_typeNamedList.elem = vom.Types.UINT32;
_typeNamedMap.kind = vom.Kind.MAP;
_typeNamedMap.name = "v.io/core/veyron2/vdl/testdata/base.NamedMap";
_typeNamedMap.elem = vom.Types.FLOAT32;
_typeNamedMap.key = vom.Types.STRING;
_typeNamedSet.kind = vom.Kind.SET;
_typeNamedSet.name = "v.io/core/veyron2/vdl/testdata/base.NamedSet";
_typeNamedSet.key = vom.Types.STRING;
_typeNamedString.kind = vom.Kind.STRING;
_typeNamedString.name = "v.io/core/veyron2/vdl/testdata/base.NamedString";
_typeNamedStruct.kind = vom.Kind.STRUCT;
_typeNamedStruct.name = "v.io/core/veyron2/vdl/testdata/base.NamedStruct";
_typeNamedStruct.fields = [{name: "A", type: vom.Types.BOOL}, {name: "B", type: vom.Types.STRING}, {name: "C", type: vom.Types.INT32}];
_typeNamedUint16.kind = vom.Kind.UINT16;
_typeNamedUint16.name = "v.io/core/veyron2/vdl/testdata/base.NamedUint16";
_typeNamedUint32.kind = vom.Kind.UINT32;
_typeNamedUint32.name = "v.io/core/veyron2/vdl/testdata/base.NamedUint32";
_typeNamedUint64.kind = vom.Kind.UINT64;
_typeNamedUint64.name = "v.io/core/veyron2/vdl/testdata/base.NamedUint64";
_typeNamedUnion.kind = vom.Kind.UNION;
_typeNamedUnion.name = "v.io/core/veyron2/vdl/testdata/base.NamedUnion";
_typeNamedUnion.fields = [{name: "A", type: vom.Types.BOOL}, {name: "B", type: vom.Types.STRING}, {name: "C", type: vom.Types.INT32}];
_typeNestedArgs.kind = vom.Kind.STRUCT;
_typeNestedArgs.name = "v.io/core/veyron2/vdl/testdata/base.NestedArgs";
_typeNestedArgs.fields = [{name: "Args", type: _typeArgs}];
_typeScalars.kind = vom.Kind.STRUCT;
_typeScalars.name = "v.io/core/veyron2/vdl/testdata/base.Scalars";
_typeScalars.fields = [{name: "A0", type: vom.Types.BOOL}, {name: "A1", type: vom.Types.BYTE}, {name: "A2", type: vom.Types.UINT16}, {name: "A3", type: vom.Types.UINT32}, {name: "A4", type: vom.Types.UINT64}, {name: "A5", type: vom.Types.INT16}, {name: "A6", type: vom.Types.INT32}, {name: "A7", type: vom.Types.INT64}, {name: "A8", type: vom.Types.FLOAT32}, {name: "A9", type: vom.Types.FLOAT64}, {name: "A10", type: vom.Types.COMPLEX64}, {name: "A11", type: vom.Types.COMPLEX128}, {name: "A12", type: vom.Types.STRING}, {name: "A13", type: _type1}, {name: "A14", type: vom.Types.ANY}, {name: "A15", type: vom.Types.TYPEOBJECT}, {name: "B0", type: _typeNamedBool}, {name: "B1", type: _typeNamedByte}, {name: "B2", type: _typeNamedUint16}, {name: "B3", type: _typeNamedUint32}, {name: "B4", type: _typeNamedUint64}, {name: "B5", type: _typeNamedInt16}, {name: "B6", type: _typeNamedInt32}, {name: "B7", type: _typeNamedInt64}, {name: "B8", type: _typeNamedFloat32}, {name: "B9", type: _typeNamedFloat64}, {name: "B10", type: _typeNamedComplex64}, {name: "B11", type: _typeNamedComplex128}, {name: "B12", type: _typeNamedString}, {name: "B13", type: _typeNamedEnum}, {name: "B14", type: _typeNamedUnion}];
_typeScalarsArray.kind = vom.Kind.ARRAY;
_typeScalarsArray.name = "v.io/core/veyron2/vdl/testdata/base.ScalarsArray";
_typeScalarsArray.len = 2;
_typeScalarsArray.elem = _typeScalars;
_typeerror.kind = vom.Kind.STRUCT;
_typeerror.name = "error";
_typeerror.fields = [{name: "IDAction", type: _type2}, {name: "Msg", type: vom.Types.STRING}, {name: "ParamList", type: _type3}];
module.exports.Args = (vom.Registry.lookupOrCreateConstructor(_typeArgs));
module.exports.CompComp = (vom.Registry.lookupOrCreateConstructor(_typeCompComp));
module.exports.Composites = (vom.Registry.lookupOrCreateConstructor(_typeComposites));
module.exports.CompositesArray = (vom.Registry.lookupOrCreateConstructor(_typeCompositesArray));
module.exports.KeyScalars = (vom.Registry.lookupOrCreateConstructor(_typeKeyScalars));
module.exports.NamedArray = (vom.Registry.lookupOrCreateConstructor(_typeNamedArray));
module.exports.NamedBool = (vom.Registry.lookupOrCreateConstructor(_typeNamedBool));
module.exports.NamedByte = (vom.Registry.lookupOrCreateConstructor(_typeNamedByte));
module.exports.NamedComplex128 = (vom.Registry.lookupOrCreateConstructor(_typeNamedComplex128));
module.exports.NamedComplex64 = (vom.Registry.lookupOrCreateConstructor(_typeNamedComplex64));
module.exports.NamedEnum = (vom.Registry.lookupOrCreateConstructor(_typeNamedEnum));
module.exports.NamedFloat32 = (vom.Registry.lookupOrCreateConstructor(_typeNamedFloat32));
module.exports.NamedFloat64 = (vom.Registry.lookupOrCreateConstructor(_typeNamedFloat64));
module.exports.NamedInt16 = (vom.Registry.lookupOrCreateConstructor(_typeNamedInt16));
module.exports.NamedInt32 = (vom.Registry.lookupOrCreateConstructor(_typeNamedInt32));
module.exports.NamedInt64 = (vom.Registry.lookupOrCreateConstructor(_typeNamedInt64));
module.exports.NamedList = (vom.Registry.lookupOrCreateConstructor(_typeNamedList));
module.exports.NamedMap = (vom.Registry.lookupOrCreateConstructor(_typeNamedMap));
module.exports.NamedSet = (vom.Registry.lookupOrCreateConstructor(_typeNamedSet));
module.exports.NamedString = (vom.Registry.lookupOrCreateConstructor(_typeNamedString));
module.exports.NamedStruct = (vom.Registry.lookupOrCreateConstructor(_typeNamedStruct));
module.exports.NamedUint16 = (vom.Registry.lookupOrCreateConstructor(_typeNamedUint16));
module.exports.NamedUint32 = (vom.Registry.lookupOrCreateConstructor(_typeNamedUint32));
module.exports.NamedUint64 = (vom.Registry.lookupOrCreateConstructor(_typeNamedUint64));
module.exports.NamedUnion = (vom.Registry.lookupOrCreateConstructor(_typeNamedUnion));
module.exports.NestedArgs = (vom.Registry.lookupOrCreateConstructor(_typeNestedArgs));
module.exports.Scalars = (vom.Registry.lookupOrCreateConstructor(_typeScalars));
module.exports.ScalarsArray = (vom.Registry.lookupOrCreateConstructor(_typeScalarsArray));
module.exports.error = (vom.Registry.lookupOrCreateConstructor(_typeerror));




// Consts:

  module.exports.Cbool = new (vom.Registry.lookupOrCreateConstructor(vom.Types.BOOL))(true);

  module.exports.Cbyte = new (vom.Registry.lookupOrCreateConstructor(vom.Types.BYTE))(1);

  module.exports.Cint32 = new (vom.Registry.lookupOrCreateConstructor(vom.Types.INT32))(2);

  module.exports.Cint64 = new (vom.Registry.lookupOrCreateConstructor(vom.Types.INT64))(new vom.BigInt(1, new Uint8Array([0x3])));

  module.exports.Cuint32 = new (vom.Registry.lookupOrCreateConstructor(vom.Types.UINT32))(4);

  module.exports.Cuint64 = new (vom.Registry.lookupOrCreateConstructor(vom.Types.UINT64))(new vom.BigInt(1, new Uint8Array([0x5])));

  module.exports.Cfloat32 = new (vom.Registry.lookupOrCreateConstructor(vom.Types.FLOAT32))(6);

  module.exports.Cfloat64 = new (vom.Registry.lookupOrCreateConstructor(vom.Types.FLOAT64))(7);

  module.exports.CNamedBool = new (vom.Registry.lookupOrCreateConstructor(_typeNamedBool))(true);

  module.exports.CNamedStruct = new (vom.Registry.lookupOrCreateConstructor(_typeNamedStruct))({
  'a': true,
  'b': "test",
  'c': 0,
});

  module.exports.Ccomplex64 = new (vom.Registry.lookupOrCreateConstructor(vom.Types.COMPLEX64))(new vom.Complex(8.000000, 9.000000));

  module.exports.Ccomplex128 = new (vom.Registry.lookupOrCreateConstructor(vom.Types.COMPLEX128))(new vom.Complex(10.000000, 11.000000));

  module.exports.Cstring = new (vom.Registry.lookupOrCreateConstructor(vom.Types.STRING))("foo");

  module.exports.Cenum = new (vom.Registry.lookupOrCreateConstructor(_typeNamedEnum))('A');

  module.exports.Cunion = new (vom.Registry.lookupOrCreateConstructor(_typeNamedUnion))({ "a": true });

  module.exports.Carray = new (vom.Registry.lookupOrCreateConstructor(_typeNamedArray))([
true,
false,
]);

  module.exports.Clist = new (vom.Registry.lookupOrCreateConstructor(_type14))([
1,
2,
3,
]);

  module.exports.Cset = new (vom.Registry.lookupOrCreateConstructor(_type15))(new Set([
  1, ]));

  module.exports.Cmap = new (vom.Registry.lookupOrCreateConstructor(_type16))(new Map([
  [1, "A"]]));

  module.exports.Cargs = new (vom.Registry.lookupOrCreateConstructor(_typeArgs))({
  'a': 1,
  'b': 2,
});

  module.exports.True = new (vom.Registry.lookupOrCreateConstructor(vom.Types.BOOL))(true);

  module.exports.Foo = new (vom.Registry.lookupOrCreateConstructor(vom.Types.STRING))("foo");

  module.exports.Five = new (vom.Registry.lookupOrCreateConstructor(vom.Types.INT32))(5);

  module.exports.Six = new (vom.Registry.lookupOrCreateConstructor(vom.Types.UINT64))(new vom.BigInt(1, new Uint8Array([0x6])));

  module.exports.SixSquared = new (vom.Registry.lookupOrCreateConstructor(vom.Types.UINT64))(new vom.BigInt(1, new Uint8Array([0x24])));

  module.exports.FiveSquared = new (vom.Registry.lookupOrCreateConstructor(vom.Types.INT32))(25);

  module.exports.CTObool = vom.Types.BOOL;

  module.exports.CTOstring = vom.Types.STRING;

  module.exports.CTObytes = _type17;

  module.exports.CTObyte = vom.Types.BYTE;

  module.exports.CTOuint16 = vom.Types.UINT16;

  module.exports.CTOint16 = vom.Types.INT16;

  module.exports.CTOfloat32 = vom.Types.FLOAT32;

  module.exports.CTOcomplex64 = vom.Types.COMPLEX64;

  module.exports.CTOenum = _typeNamedEnum;

  module.exports.CTOArray = _typeNamedArray;

  module.exports.CTOList = _type18;

  module.exports.CTOSet = _type19;

  module.exports.CTOMap = _type20;

  module.exports.CTOStruct = _typeScalars;

  module.exports.CTOUnion = _typeNamedUnion;

  module.exports.CTOTypeObject = vom.Types.TYPEOBJECT;

  module.exports.CTOAny = vom.Types.ANY;



// Errors:

module.exports.ErrNoParams1 = makeError('v.io/core/veyron2/vdl/testdata/base.ErrNoParams1', actions.NO_RETRY, {
  'en': '{1:}{2:} en msg',
}, [
]);


module.exports.ErrNoParams2 = makeError('v.io/core/veyron2/vdl/testdata/base.ErrNoParams2', actions.RETRY_REFETCH, {
  'en': '{1:}{2:} en msg',
  'fr': '{1:}{2:} fr msg',
}, [
]);


module.exports.ErrWithParams1 = makeError('v.io/core/veyron2/vdl/testdata/base.ErrWithParams1', actions.NO_RETRY, {
  'en': '{1:}{2:} en x={3} y={4}',
}, [
  vom.Types.STRING,
  vom.Types.INT32,
]);


module.exports.ErrWithParams2 = makeError('v.io/core/veyron2/vdl/testdata/base.ErrWithParams2', actions.RETRY_REFETCH, {
  'en': '{1:}{2:} en x={3} y={4}',
  'fr': '{1:}{2:} fr y={4} x={3}',
}, [
  vom.Types.STRING,
  vom.Types.INT32,
]);




// Services:

  
    
function ServiceA(){}
module.exports.ServiceA = ServiceA

    
      
ServiceA.prototype.MethodA1 = function(ctx) {
  throw new Error('Method MethodA1 not implemented');
};
    
      
ServiceA.prototype.MethodA2 = function(ctx, a, b) {
  throw new Error('Method MethodA2 not implemented');
};
    
      
ServiceA.prototype.MethodA3 = function(ctx, a) {
  throw new Error('Method MethodA3 not implemented');
};
    
      
ServiceA.prototype.MethodA4 = function(ctx, a) {
  throw new Error('Method MethodA4 not implemented');
};
     

    
ServiceA.prototype._serviceDescription = {
  name: 'ServiceA',
  pkgPath: 'v.io/core/veyron2/vdl/testdata/base',
  doc: "",
  embeds: [],
  methods: [
    
      
    {
    name: 'MethodA1',
    doc: "",
    inArgs: [],
    outArgs: [],
    inStream: null,
    outStream: null,
    tags: []
  },
    
      
    {
    name: 'MethodA2',
    doc: "",
    inArgs: [{
      name: 'a',
      doc: "",
      type: vom.Types.INT32
    },
    {
      name: 'b',
      doc: "",
      type: vom.Types.STRING
    },
    ],
    outArgs: [{
      name: 's',
      doc: "",
      type: vom.Types.STRING
    },
    ],
    inStream: null,
    outStream: null,
    tags: []
  },
    
      
    {
    name: 'MethodA3',
    doc: "",
    inArgs: [{
      name: 'a',
      doc: "",
      type: vom.Types.INT32
    },
    ],
    outArgs: [{
      name: 's',
      doc: "",
      type: vom.Types.STRING
    },
    ],
    inStream: null,
    outStream: {
      name: '',
      doc: '',
      type: _typeScalars
    },
    tags: [new (vom.Registry.lookupOrCreateConstructor(vom.Types.STRING))("tag"), new (vom.Registry.lookupOrCreateConstructor(vom.Types.UINT64))(new vom.BigInt(1, new Uint8Array([0x6]))), ]
  },
    
      
    {
    name: 'MethodA4',
    doc: "",
    inArgs: [{
      name: 'a',
      doc: "",
      type: vom.Types.INT32
    },
    ],
    outArgs: [],
    inStream: {
      name: '',
      doc: '',
      type: vom.Types.INT32
    },
    outStream: {
      name: '',
      doc: '',
      type: vom.Types.STRING
    },
    tags: []
  },
     
  ]
};

  
    
function ServiceB(){}
module.exports.ServiceB = ServiceB

    
      
ServiceB.prototype.MethodB1 = function(ctx, a, b) {
  throw new Error('Method MethodB1 not implemented');
};
    
      
ServiceB.prototype.MethodA1 = function(ctx) {
  throw new Error('Method MethodA1 not implemented');
};
    
      
ServiceB.prototype.MethodA2 = function(ctx, a, b) {
  throw new Error('Method MethodA2 not implemented');
};
    
      
ServiceB.prototype.MethodA3 = function(ctx, a) {
  throw new Error('Method MethodA3 not implemented');
};
    
      
ServiceB.prototype.MethodA4 = function(ctx, a) {
  throw new Error('Method MethodA4 not implemented');
};
     

    
ServiceB.prototype._serviceDescription = {
  name: 'ServiceB',
  pkgPath: 'v.io/core/veyron2/vdl/testdata/base',
  doc: "",
  embeds: [{
      name: 'ServiceA',
      pkgPath: 'v.io/core/veyron2/vdl/testdata/base',
      doc: ""
    },
    ],
  methods: [
    
      
    {
    name: 'MethodB1',
    doc: "",
    inArgs: [{
      name: 'a',
      doc: "",
      type: _typeScalars
    },
    {
      name: 'b',
      doc: "",
      type: _typeComposites
    },
    ],
    outArgs: [{
      name: 'c',
      doc: "",
      type: _typeCompComp
    },
    ],
    inStream: null,
    outStream: null,
    tags: []
  },
    
      
    {
    name: 'MethodA1',
    doc: "",
    inArgs: [],
    outArgs: [],
    inStream: null,
    outStream: null,
    tags: []
  },
    
      
    {
    name: 'MethodA2',
    doc: "",
    inArgs: [{
      name: 'a',
      doc: "",
      type: vom.Types.INT32
    },
    {
      name: 'b',
      doc: "",
      type: vom.Types.STRING
    },
    ],
    outArgs: [{
      name: 's',
      doc: "",
      type: vom.Types.STRING
    },
    ],
    inStream: null,
    outStream: null,
    tags: []
  },
    
      
    {
    name: 'MethodA3',
    doc: "",
    inArgs: [{
      name: 'a',
      doc: "",
      type: vom.Types.INT32
    },
    ],
    outArgs: [{
      name: 's',
      doc: "",
      type: vom.Types.STRING
    },
    ],
    inStream: null,
    outStream: {
      name: '',
      doc: '',
      type: _typeScalars
    },
    tags: [new (vom.Registry.lookupOrCreateConstructor(vom.Types.STRING))("tag"), new (vom.Registry.lookupOrCreateConstructor(vom.Types.UINT64))(new vom.BigInt(1, new Uint8Array([0x6]))), ]
  },
    
      
    {
    name: 'MethodA4',
    doc: "",
    inArgs: [{
      name: 'a',
      doc: "",
      type: vom.Types.INT32
    },
    ],
    outArgs: [],
    inStream: {
      name: '',
      doc: '',
      type: vom.Types.INT32
    },
    outStream: {
      name: '',
      doc: '',
      type: vom.Types.STRING
    },
    tags: []
  },
     
  ]
};

   
 


