// This file was auto-generated by the veyron vdl tool.
var vom = require('vom');
// TODO(bjornick): Remove unused imports.
var Types = vom.Types;
var Type = vom.Type;
var Kind = vom.Kind;
var Complex = vom.Complex;
var Builtins = vom.Builtins;
var Registry = vom.Registry;




var exp = require('./exp/exp');
var base = require('./../base/base');


var types = {};
var _type1 = new Type();
var _type10 = new Type();
var _type11 = new Type();
var _type2 = new Type();
var _type3 = new Type();
var _type4 = new Type();
var _type5 = new Type();
var _type6 = new Type();
var _type7 = new Type();
var _type8 = new Type();
var _type9 = new Type();
var _typeArgs = new Type();
var _typeNestedArgs = new Type();
var _typeerror = new Type();
_type1.kind = Kind.FLOAT64;
_type10.kind = Kind.INT64;
_type11.kind = Kind.UINT64;
_type2.kind = Kind.NILABLE;
_type2.elem = _typeerror;
_type3.kind = Kind.STRUCT;
_type3.fields = [{name: "ID", type: _type4}, {name: "Action", type: _type5}];
_type4.kind = Kind.STRING;
_type5.kind = Kind.UINT32;
_type6.kind = Kind.LIST;
_type6.elem = _type7;
_type7.kind = Kind.ANY;
_type8.kind = Kind.BOOL;
_type9.kind = Kind.INT32;
_typeArgs.kind = Kind.STRUCT;
_typeArgs.name = "veyron.io/veyron/veyron2/vdl/testdata/base.Args";
_typeArgs.fields = [{name: "A", type: _type9}, {name: "B", type: _type9}];
_typeNestedArgs.kind = Kind.STRUCT;
_typeNestedArgs.name = "veyron.io/veyron/veyron2/vdl/testdata/base.NestedArgs";
_typeNestedArgs.fields = [{name: "Args", type: _typeArgs}];
_typeerror.kind = Kind.STRUCT;
_typeerror.name = "error";
_typeerror.fields = [{name: "IDAction", type: _type3}, {name: "Msg", type: _type4}, {name: "ParamList", type: _type6}];
types.Args = Registry.lookupOrCreateConstructor(_typeArgs, "Args");
types.NestedArgs = Registry.lookupOrCreateConstructor(_typeNestedArgs, "NestedArgs");
types.error = Registry.lookupOrCreateConstructor(_typeerror, "error");



var consts = { 
  Yes: new (Registry.lookupOrCreateConstructor(_type8))(true),
  No: new (Registry.lookupOrCreateConstructor(_type8))(false),
  Hello: new (Registry.lookupOrCreateConstructor(_type4))("hello"),
  Int32Const: new (Registry.lookupOrCreateConstructor(_type9))(123),
  Int64Const: new (Registry.lookupOrCreateConstructor(_type10))(128),
  FloatConst: new (Registry.lookupOrCreateConstructor(_type1))(2),
  Mask: new (Registry.lookupOrCreateConstructor(_type11))(256),
};


function NotImplementedMethod(name) {
  throw new Error('Method ' + name + ' not implemented');
}


var services = {
package: 'veyron.io/veyron/veyron2/vdl/testdata/arith',
  Trigonometry: {
    Sine: {
    numInArgs: 1,
    numOutArgs: 1,
    inputStreaming: false,
    outputStreaming: false,
    tags: []
},
    Cosine: {
    numInArgs: 1,
    numOutArgs: 1,
    inputStreaming: false,
    outputStreaming: false,
    tags: []
},

},
  AdvancedMath: {
    Sine: {
    numInArgs: 1,
    numOutArgs: 1,
    inputStreaming: false,
    outputStreaming: false,
    tags: []
},
    Cosine: {
    numInArgs: 1,
    numOutArgs: 1,
    inputStreaming: false,
    outputStreaming: false,
    tags: []
},
    Exp: {
    numInArgs: 1,
    numOutArgs: 1,
    inputStreaming: false,
    outputStreaming: false,
    tags: []
},

},
  Arith: {
    Add: {
    numInArgs: 2,
    numOutArgs: 1,
    inputStreaming: false,
    outputStreaming: false,
    tags: []
},
    DivMod: {
    numInArgs: 2,
    numOutArgs: 2,
    inputStreaming: false,
    outputStreaming: false,
    tags: []
},
    Sub: {
    numInArgs: 1,
    numOutArgs: 1,
    inputStreaming: false,
    outputStreaming: false,
    tags: []
},
    Mul: {
    numInArgs: 1,
    numOutArgs: 1,
    inputStreaming: false,
    outputStreaming: false,
    tags: []
},
    GenError: {
    numInArgs: 0,
    numOutArgs: 0,
    inputStreaming: false,
    outputStreaming: false,
    tags: [new (Registry.lookupOrCreateConstructor(_type4))("foo"), new (Registry.lookupOrCreateConstructor(_type4))("barz"), new (Registry.lookupOrCreateConstructor(_type4))("hello"), new (Registry.lookupOrCreateConstructor(_type9))(129), new (Registry.lookupOrCreateConstructor(_type11))(36), ]
},
    Count: {
    numInArgs: 1,
    numOutArgs: 0,
    inputStreaming: false,
    outputStreaming: true,
    tags: []
},
    StreamingAdd: {
    numInArgs: 0,
    numOutArgs: 1,
    inputStreaming: true,
    outputStreaming: true,
    tags: []
},
    QuoteAny: {
    numInArgs: 1,
    numOutArgs: 1,
    inputStreaming: false,
    outputStreaming: false,
    tags: []
},

},
  Calculator: {
    On: {
    numInArgs: 0,
    numOutArgs: 0,
    inputStreaming: false,
    outputStreaming: false,
    tags: []
},
    Off: {
    numInArgs: 0,
    numOutArgs: 0,
    inputStreaming: false,
    outputStreaming: false,
    tags: [new (Registry.lookupOrCreateConstructor(_type4))("offtag"), ]
},
    Add: {
    numInArgs: 2,
    numOutArgs: 1,
    inputStreaming: false,
    outputStreaming: false,
    tags: []
},
    DivMod: {
    numInArgs: 2,
    numOutArgs: 2,
    inputStreaming: false,
    outputStreaming: false,
    tags: []
},
    Sub: {
    numInArgs: 1,
    numOutArgs: 1,
    inputStreaming: false,
    outputStreaming: false,
    tags: []
},
    Mul: {
    numInArgs: 1,
    numOutArgs: 1,
    inputStreaming: false,
    outputStreaming: false,
    tags: []
},
    GenError: {
    numInArgs: 0,
    numOutArgs: 0,
    inputStreaming: false,
    outputStreaming: false,
    tags: [new (Registry.lookupOrCreateConstructor(_type4))("foo"), new (Registry.lookupOrCreateConstructor(_type4))("barz"), new (Registry.lookupOrCreateConstructor(_type4))("hello"), new (Registry.lookupOrCreateConstructor(_type9))(129), new (Registry.lookupOrCreateConstructor(_type11))(36), ]
},
    Count: {
    numInArgs: 1,
    numOutArgs: 0,
    inputStreaming: false,
    outputStreaming: true,
    tags: []
},
    StreamingAdd: {
    numInArgs: 0,
    numOutArgs: 1,
    inputStreaming: true,
    outputStreaming: true,
    tags: []
},
    QuoteAny: {
    numInArgs: 1,
    numOutArgs: 1,
    inputStreaming: false,
    outputStreaming: false,
    tags: []
},
    Sine: {
    numInArgs: 1,
    numOutArgs: 1,
    inputStreaming: false,
    outputStreaming: false,
    tags: []
},
    Cosine: {
    numInArgs: 1,
    numOutArgs: 1,
    inputStreaming: false,
    outputStreaming: false,
    tags: []
},
    Exp: {
    numInArgs: 1,
    numOutArgs: 1,
    inputStreaming: false,
    outputStreaming: false,
    tags: []
},

},

};


var serviceDefs = {
  package: 'veyron.io/veyron/veyron2/vdl/testdata/arith',

  
  Trigonometry: Trigonometry,
  
  AdvancedMath: AdvancedMath,
  

  
  Arith: Arith,
  
  Calculator: Calculator,
  

};



  
    
function Trigonometry(){}
    
      
Trigonometry.prototype.Sine = NotImplementedMethod;
    
      
Trigonometry.prototype.Cosine = NotImplementedMethod;
    
    
Trigonometry.prototype.signature = function TrigonometrySignature() {
  return _TrigonometrySignature;
};
    
var _TrigonometrySignature = {
  name: 'Trigonometry',
  pkgPath: 'veyron.io/veyron/veyron2/vdl/testdata/arith',
  doc: "// Trigonometry is an interface that specifies a couple trigonometric functions.",
  embeds: [],
  methods: [
    
      
    {
    name: 'Sine',
    doc: "",
    inArgs: [{
      name: 'angle',
      doc: "",
      type: _type1
    },
    ],
    outArgs: [{
      name: '',
      doc: "",
      type: _type1
    },
    {
      name: '',
      doc: "",
      type: _type2
    },
    ],
    inStreamHACK: {
      name: '',
      doc: '',
      type: Types.ANY
    },
    outStreamHACK: {
      name: '',
      doc: '',
      type: Types.ANY
    },
    hasInStreamHACK: false,
    hasOutStreamHACK: false,
    tags: []
  },
    
      
    {
    name: 'Cosine',
    doc: "",
    inArgs: [{
      name: 'angle',
      doc: "",
      type: _type1
    },
    ],
    outArgs: [{
      name: '',
      doc: "",
      type: _type1
    },
    {
      name: '',
      doc: "",
      type: _type2
    },
    ],
    inStreamHACK: {
      name: '',
      doc: '',
      type: Types.ANY
    },
    outStreamHACK: {
      name: '',
      doc: '',
      type: Types.ANY
    },
    hasInStreamHACK: false,
    hasOutStreamHACK: false,
    tags: []
  },
    
  ]
};
  
    
function AdvancedMath(){}
    
      
AdvancedMath.prototype.Sine = NotImplementedMethod;
    
      
AdvancedMath.prototype.Cosine = NotImplementedMethod;
    
      
AdvancedMath.prototype.Exp = NotImplementedMethod;
    
    
AdvancedMath.prototype.signature = function AdvancedMathSignature() {
  return _AdvancedMathSignature;
};
    
var _AdvancedMathSignature = {
  name: 'AdvancedMath',
  pkgPath: 'veyron.io/veyron/veyron2/vdl/testdata/arith',
  doc: "// AdvancedMath is an interface for more advanced math than arith.  It embeds\n// interfaces defined both in the same file and in an external package; and in\n// turn it is embedded by arith.Calculator (which is in the same package but\n// different file) to verify that embedding works in all these scenarios.",
  embeds: [{
      name: 'Trigonometry',
      pkgPath: 'veyron.io/veyron/veyron2/vdl/testdata/arith',
      doc: "// Trigonometry is an interface that specifies a couple trigonometric functions."
    },
    {
      name: 'Exp',
      pkgPath: 'veyron.io/veyron/veyron2/vdl/testdata/arith/exp',
      doc: ""
    },
    ],
  methods: [
    
      
    {
    name: 'Sine',
    doc: "",
    inArgs: [{
      name: 'angle',
      doc: "",
      type: _type1
    },
    ],
    outArgs: [{
      name: '',
      doc: "",
      type: _type1
    },
    {
      name: '',
      doc: "",
      type: _type2
    },
    ],
    inStreamHACK: {
      name: '',
      doc: '',
      type: Types.ANY
    },
    outStreamHACK: {
      name: '',
      doc: '',
      type: Types.ANY
    },
    hasInStreamHACK: false,
    hasOutStreamHACK: false,
    tags: []
  },
    
      
    {
    name: 'Cosine',
    doc: "",
    inArgs: [{
      name: 'angle',
      doc: "",
      type: _type1
    },
    ],
    outArgs: [{
      name: '',
      doc: "",
      type: _type1
    },
    {
      name: '',
      doc: "",
      type: _type2
    },
    ],
    inStreamHACK: {
      name: '',
      doc: '',
      type: Types.ANY
    },
    outStreamHACK: {
      name: '',
      doc: '',
      type: Types.ANY
    },
    hasInStreamHACK: false,
    hasOutStreamHACK: false,
    tags: []
  },
    
      
    {
    name: 'Exp',
    doc: "",
    inArgs: [{
      name: 'x',
      doc: "",
      type: _type1
    },
    ],
    outArgs: [{
      name: '',
      doc: "",
      type: _type1
    },
    {
      name: '',
      doc: "",
      type: _type2
    },
    ],
    inStreamHACK: {
      name: '',
      doc: '',
      type: Types.ANY
    },
    outStreamHACK: {
      name: '',
      doc: '',
      type: Types.ANY
    },
    hasInStreamHACK: false,
    hasOutStreamHACK: false,
    tags: []
  },
    
  ]
};
  

  
    
function Arith(){}
    
      
Arith.prototype.Add = NotImplementedMethod;
    
      
Arith.prototype.DivMod = NotImplementedMethod;
    
      
Arith.prototype.Sub = NotImplementedMethod;
    
      
Arith.prototype.Mul = NotImplementedMethod;
    
      
Arith.prototype.GenError = NotImplementedMethod;
    
      
Arith.prototype.Count = NotImplementedMethod;
    
      
Arith.prototype.StreamingAdd = NotImplementedMethod;
    
      
Arith.prototype.QuoteAny = NotImplementedMethod;
    
    
Arith.prototype.signature = function ArithSignature() {
  return _ArithSignature;
};
    
var _ArithSignature = {
  name: 'Arith',
  pkgPath: 'veyron.io/veyron/veyron2/vdl/testdata/arith',
  doc: "// Arith is an example of an interface definition for an arithmetic service.\n// Things to note:\n//   * There must be at least 1 out-arg, and the last out-arg must be error.",
  embeds: [],
  methods: [
    
      
    {
    name: 'Add',
    doc: "// Add is a typical method with multiple input and output arguments.",
    inArgs: [{
      name: 'a',
      doc: "",
      type: _type9
    },
    {
      name: 'b',
      doc: "",
      type: _type9
    },
    ],
    outArgs: [{
      name: '',
      doc: "",
      type: _type9
    },
    {
      name: '',
      doc: "",
      type: _type2
    },
    ],
    inStreamHACK: {
      name: '',
      doc: '',
      type: Types.ANY
    },
    outStreamHACK: {
      name: '',
      doc: '',
      type: Types.ANY
    },
    hasInStreamHACK: false,
    hasOutStreamHACK: false,
    tags: []
  },
    
      
    {
    name: 'DivMod',
    doc: "// DivMod shows that runs of args with the same type can use the short form,\n// just like Go.",
    inArgs: [{
      name: 'a',
      doc: "",
      type: _type9
    },
    {
      name: 'b',
      doc: "",
      type: _type9
    },
    ],
    outArgs: [{
      name: 'quot',
      doc: "",
      type: _type9
    },
    {
      name: 'rem',
      doc: "",
      type: _type9
    },
    {
      name: 'err',
      doc: "",
      type: _type2
    },
    ],
    inStreamHACK: {
      name: '',
      doc: '',
      type: Types.ANY
    },
    outStreamHACK: {
      name: '',
      doc: '',
      type: Types.ANY
    },
    hasInStreamHACK: false,
    hasOutStreamHACK: false,
    tags: []
  },
    
      
    {
    name: 'Sub',
    doc: "// Sub shows that you can use data types defined in other packages.",
    inArgs: [{
      name: 'args',
      doc: "",
      type: _typeArgs
    },
    ],
    outArgs: [{
      name: '',
      doc: "",
      type: _type9
    },
    {
      name: '',
      doc: "",
      type: _type2
    },
    ],
    inStreamHACK: {
      name: '',
      doc: '',
      type: Types.ANY
    },
    outStreamHACK: {
      name: '',
      doc: '',
      type: Types.ANY
    },
    hasInStreamHACK: false,
    hasOutStreamHACK: false,
    tags: []
  },
    
      
    {
    name: 'Mul',
    doc: "// Mul tries another data type defined in another package.",
    inArgs: [{
      name: 'nested',
      doc: "",
      type: _typeNestedArgs
    },
    ],
    outArgs: [{
      name: '',
      doc: "",
      type: _type9
    },
    {
      name: '',
      doc: "",
      type: _type2
    },
    ],
    inStreamHACK: {
      name: '',
      doc: '',
      type: Types.ANY
    },
    outStreamHACK: {
      name: '',
      doc: '',
      type: Types.ANY
    },
    hasInStreamHACK: false,
    hasOutStreamHACK: false,
    tags: []
  },
    
      
    {
    name: 'GenError',
    doc: "// GenError shows that it's fine to have no in args, and no out args other\n// than \"error\".  In addition GenError shows the usage of tags.  Tags are a\n// sequence of constants.  There's no requirement on uniqueness of types or\n// values, and regular const expressions may also be used.",
    inArgs: [],
    outArgs: [{
      name: '',
      doc: "",
      type: _type2
    },
    ],
    inStreamHACK: {
      name: '',
      doc: '',
      type: Types.ANY
    },
    outStreamHACK: {
      name: '',
      doc: '',
      type: Types.ANY
    },
    hasInStreamHACK: false,
    hasOutStreamHACK: false,
    tags: [new (Registry.lookupOrCreateConstructor(_type4))("foo"), new (Registry.lookupOrCreateConstructor(_type4))("barz"), new (Registry.lookupOrCreateConstructor(_type4))("hello"), new (Registry.lookupOrCreateConstructor(_type9))(129), new (Registry.lookupOrCreateConstructor(_type11))(36), ]
  },
    
      
    {
    name: 'Count',
    doc: "// Count shows using only an int32 out-stream type, with no in-stream type.",
    inArgs: [{
      name: 'start',
      doc: "",
      type: _type9
    },
    ],
    outArgs: [{
      name: '',
      doc: "",
      type: _type2
    },
    ],
    inStreamHACK: {
      name: '',
      doc: '',
      type: Types.ANY
    },
    outStreamHACK: {
      name: '',
      doc: '',
      type: _type9
    },
    hasInStreamHACK: false,
    hasOutStreamHACK: true,
    tags: []
  },
    
      
    {
    name: 'StreamingAdd',
    doc: "// StreamingAdd shows a bidirectional stream.",
    inArgs: [],
    outArgs: [{
      name: 'total',
      doc: "",
      type: _type9
    },
    {
      name: 'err',
      doc: "",
      type: _type2
    },
    ],
    inStreamHACK: {
      name: '',
      doc: '',
      type: _type9
    },
    outStreamHACK: {
      name: '',
      doc: '',
      type: _type9
    },
    hasInStreamHACK: true,
    hasOutStreamHACK: true,
    tags: []
  },
    
      
    {
    name: 'QuoteAny',
    doc: "// QuoteAny shows the any built-in type, representing a value of any type.",
    inArgs: [{
      name: 'a',
      doc: "",
      type: _type7
    },
    ],
    outArgs: [{
      name: '',
      doc: "",
      type: _type7
    },
    {
      name: '',
      doc: "",
      type: _type2
    },
    ],
    inStreamHACK: {
      name: '',
      doc: '',
      type: Types.ANY
    },
    outStreamHACK: {
      name: '',
      doc: '',
      type: Types.ANY
    },
    hasInStreamHACK: false,
    hasOutStreamHACK: false,
    tags: []
  },
    
  ]
};
  
    
function Calculator(){}
    
      
Calculator.prototype.On = NotImplementedMethod;
    
      
Calculator.prototype.Off = NotImplementedMethod;
    
      
Calculator.prototype.Add = NotImplementedMethod;
    
      
Calculator.prototype.DivMod = NotImplementedMethod;
    
      
Calculator.prototype.Sub = NotImplementedMethod;
    
      
Calculator.prototype.Mul = NotImplementedMethod;
    
      
Calculator.prototype.GenError = NotImplementedMethod;
    
      
Calculator.prototype.Count = NotImplementedMethod;
    
      
Calculator.prototype.StreamingAdd = NotImplementedMethod;
    
      
Calculator.prototype.QuoteAny = NotImplementedMethod;
    
      
Calculator.prototype.Sine = NotImplementedMethod;
    
      
Calculator.prototype.Cosine = NotImplementedMethod;
    
      
Calculator.prototype.Exp = NotImplementedMethod;
    
    
Calculator.prototype.signature = function CalculatorSignature() {
  return _CalculatorSignature;
};
    
var _CalculatorSignature = {
  name: 'Calculator',
  pkgPath: 'veyron.io/veyron/veyron2/vdl/testdata/arith',
  doc: "",
  embeds: [{
      name: 'Arith',
      pkgPath: 'veyron.io/veyron/veyron2/vdl/testdata/arith',
      doc: "// Arith is an example of an interface definition for an arithmetic service.\n// Things to note:\n//   * There must be at least 1 out-arg, and the last out-arg must be error."
    },
    {
      name: 'AdvancedMath',
      pkgPath: 'veyron.io/veyron/veyron2/vdl/testdata/arith',
      doc: "// AdvancedMath is an interface for more advanced math than arith.  It embeds\n// interfaces defined both in the same file and in an external package; and in\n// turn it is embedded by arith.Calculator (which is in the same package but\n// different file) to verify that embedding works in all these scenarios."
    },
    ],
  methods: [
    
      
    {
    name: 'On',
    doc: "",
    inArgs: [],
    outArgs: [{
      name: '',
      doc: "",
      type: _type2
    },
    ],
    inStreamHACK: {
      name: '',
      doc: '',
      type: Types.ANY
    },
    outStreamHACK: {
      name: '',
      doc: '',
      type: Types.ANY
    },
    hasInStreamHACK: false,
    hasOutStreamHACK: false,
    tags: []
  },
    
      
    {
    name: 'Off',
    doc: "",
    inArgs: [],
    outArgs: [{
      name: '',
      doc: "",
      type: _type2
    },
    ],
    inStreamHACK: {
      name: '',
      doc: '',
      type: Types.ANY
    },
    outStreamHACK: {
      name: '',
      doc: '',
      type: Types.ANY
    },
    hasInStreamHACK: false,
    hasOutStreamHACK: false,
    tags: [new (Registry.lookupOrCreateConstructor(_type4))("offtag"), ]
  },
    
      
    {
    name: 'Add',
    doc: "// Add is a typical method with multiple input and output arguments.",
    inArgs: [{
      name: 'a',
      doc: "",
      type: _type9
    },
    {
      name: 'b',
      doc: "",
      type: _type9
    },
    ],
    outArgs: [{
      name: '',
      doc: "",
      type: _type9
    },
    {
      name: '',
      doc: "",
      type: _type2
    },
    ],
    inStreamHACK: {
      name: '',
      doc: '',
      type: Types.ANY
    },
    outStreamHACK: {
      name: '',
      doc: '',
      type: Types.ANY
    },
    hasInStreamHACK: false,
    hasOutStreamHACK: false,
    tags: []
  },
    
      
    {
    name: 'DivMod',
    doc: "// DivMod shows that runs of args with the same type can use the short form,\n// just like Go.",
    inArgs: [{
      name: 'a',
      doc: "",
      type: _type9
    },
    {
      name: 'b',
      doc: "",
      type: _type9
    },
    ],
    outArgs: [{
      name: 'quot',
      doc: "",
      type: _type9
    },
    {
      name: 'rem',
      doc: "",
      type: _type9
    },
    {
      name: 'err',
      doc: "",
      type: _type2
    },
    ],
    inStreamHACK: {
      name: '',
      doc: '',
      type: Types.ANY
    },
    outStreamHACK: {
      name: '',
      doc: '',
      type: Types.ANY
    },
    hasInStreamHACK: false,
    hasOutStreamHACK: false,
    tags: []
  },
    
      
    {
    name: 'Sub',
    doc: "// Sub shows that you can use data types defined in other packages.",
    inArgs: [{
      name: 'args',
      doc: "",
      type: _typeArgs
    },
    ],
    outArgs: [{
      name: '',
      doc: "",
      type: _type9
    },
    {
      name: '',
      doc: "",
      type: _type2
    },
    ],
    inStreamHACK: {
      name: '',
      doc: '',
      type: Types.ANY
    },
    outStreamHACK: {
      name: '',
      doc: '',
      type: Types.ANY
    },
    hasInStreamHACK: false,
    hasOutStreamHACK: false,
    tags: []
  },
    
      
    {
    name: 'Mul',
    doc: "// Mul tries another data type defined in another package.",
    inArgs: [{
      name: 'nested',
      doc: "",
      type: _typeNestedArgs
    },
    ],
    outArgs: [{
      name: '',
      doc: "",
      type: _type9
    },
    {
      name: '',
      doc: "",
      type: _type2
    },
    ],
    inStreamHACK: {
      name: '',
      doc: '',
      type: Types.ANY
    },
    outStreamHACK: {
      name: '',
      doc: '',
      type: Types.ANY
    },
    hasInStreamHACK: false,
    hasOutStreamHACK: false,
    tags: []
  },
    
      
    {
    name: 'GenError',
    doc: "// GenError shows that it's fine to have no in args, and no out args other\n// than \"error\".  In addition GenError shows the usage of tags.  Tags are a\n// sequence of constants.  There's no requirement on uniqueness of types or\n// values, and regular const expressions may also be used.",
    inArgs: [],
    outArgs: [{
      name: '',
      doc: "",
      type: _type2
    },
    ],
    inStreamHACK: {
      name: '',
      doc: '',
      type: Types.ANY
    },
    outStreamHACK: {
      name: '',
      doc: '',
      type: Types.ANY
    },
    hasInStreamHACK: false,
    hasOutStreamHACK: false,
    tags: [new (Registry.lookupOrCreateConstructor(_type4))("foo"), new (Registry.lookupOrCreateConstructor(_type4))("barz"), new (Registry.lookupOrCreateConstructor(_type4))("hello"), new (Registry.lookupOrCreateConstructor(_type9))(129), new (Registry.lookupOrCreateConstructor(_type11))(36), ]
  },
    
      
    {
    name: 'Count',
    doc: "// Count shows using only an int32 out-stream type, with no in-stream type.",
    inArgs: [{
      name: 'start',
      doc: "",
      type: _type9
    },
    ],
    outArgs: [{
      name: '',
      doc: "",
      type: _type2
    },
    ],
    inStreamHACK: {
      name: '',
      doc: '',
      type: Types.ANY
    },
    outStreamHACK: {
      name: '',
      doc: '',
      type: _type9
    },
    hasInStreamHACK: false,
    hasOutStreamHACK: true,
    tags: []
  },
    
      
    {
    name: 'StreamingAdd',
    doc: "// StreamingAdd shows a bidirectional stream.",
    inArgs: [],
    outArgs: [{
      name: 'total',
      doc: "",
      type: _type9
    },
    {
      name: 'err',
      doc: "",
      type: _type2
    },
    ],
    inStreamHACK: {
      name: '',
      doc: '',
      type: _type9
    },
    outStreamHACK: {
      name: '',
      doc: '',
      type: _type9
    },
    hasInStreamHACK: true,
    hasOutStreamHACK: true,
    tags: []
  },
    
      
    {
    name: 'QuoteAny',
    doc: "// QuoteAny shows the any built-in type, representing a value of any type.",
    inArgs: [{
      name: 'a',
      doc: "",
      type: _type7
    },
    ],
    outArgs: [{
      name: '',
      doc: "",
      type: _type7
    },
    {
      name: '',
      doc: "",
      type: _type2
    },
    ],
    inStreamHACK: {
      name: '',
      doc: '',
      type: Types.ANY
    },
    outStreamHACK: {
      name: '',
      doc: '',
      type: Types.ANY
    },
    hasInStreamHACK: false,
    hasOutStreamHACK: false,
    tags: []
  },
    
      
    {
    name: 'Sine',
    doc: "",
    inArgs: [{
      name: 'angle',
      doc: "",
      type: _type1
    },
    ],
    outArgs: [{
      name: '',
      doc: "",
      type: _type1
    },
    {
      name: '',
      doc: "",
      type: _type2
    },
    ],
    inStreamHACK: {
      name: '',
      doc: '',
      type: Types.ANY
    },
    outStreamHACK: {
      name: '',
      doc: '',
      type: Types.ANY
    },
    hasInStreamHACK: false,
    hasOutStreamHACK: false,
    tags: []
  },
    
      
    {
    name: 'Cosine',
    doc: "",
    inArgs: [{
      name: 'angle',
      doc: "",
      type: _type1
    },
    ],
    outArgs: [{
      name: '',
      doc: "",
      type: _type1
    },
    {
      name: '',
      doc: "",
      type: _type2
    },
    ],
    inStreamHACK: {
      name: '',
      doc: '',
      type: Types.ANY
    },
    outStreamHACK: {
      name: '',
      doc: '',
      type: Types.ANY
    },
    hasInStreamHACK: false,
    hasOutStreamHACK: false,
    tags: []
  },
    
      
    {
    name: 'Exp',
    doc: "",
    inArgs: [{
      name: 'x',
      doc: "",
      type: _type1
    },
    ],
    outArgs: [{
      name: '',
      doc: "",
      type: _type1
    },
    {
      name: '',
      doc: "",
      type: _type2
    },
    ],
    inStreamHACK: {
      name: '',
      doc: '',
      type: Types.ANY
    },
    outStreamHACK: {
      name: '',
      doc: '',
      type: Types.ANY
    },
    hasInStreamHACK: false,
    hasOutStreamHACK: false,
    tags: []
  },
    
  ]
};
  


module.exports = {
  types: types,
  serviceDefs: serviceDefs,
  services: services,
  consts: consts,
};
