// This file was auto-generated by the vanadium vdl tool.
var vdl = require('../../../../../../../../vdl');





var exp = require('./exp');
var base = require('./../base');

module.exports = {};



// Types:




// Consts:

  module.exports.Yes = new (vdl.Registry.lookupOrCreateConstructor(vdl.Types.BOOL))(true);

  module.exports.No = new (vdl.Registry.lookupOrCreateConstructor(vdl.Types.BOOL))(false);

  module.exports.Hello = new (vdl.Registry.lookupOrCreateConstructor(vdl.Types.STRING))("hello");

  module.exports.Int32Const = new (vdl.Registry.lookupOrCreateConstructor(vdl.Types.INT32))(123);

  module.exports.Int64Const = new (vdl.Registry.lookupOrCreateConstructor(vdl.Types.INT64))(new vdl.BigInt(1, new Uint8Array([0x80])));

  module.exports.FloatConst = new (vdl.Registry.lookupOrCreateConstructor(vdl.Types.FLOAT64))(2);

  module.exports.Mask = new (vdl.Registry.lookupOrCreateConstructor(vdl.Types.UINT64))(new vdl.BigInt(1, new Uint8Array([0x1, 0x0])));



// Errors:



// Services:

  
    
function Trigonometry(){}
module.exports.Trigonometry = Trigonometry

    
      
Trigonometry.prototype.sine = function(ctx, angle) {
  throw new Error('Method Sine not implemented');
};
    
      
Trigonometry.prototype.cosine = function(ctx, angle) {
  throw new Error('Method Cosine not implemented');
};
     

    
Trigonometry.prototype._serviceDescription = {
  name: 'Trigonometry',
  pkgPath: 'v.io/x/ref/lib/vdl/testdata/arith',
  doc: "// Trigonometry is an interface that specifies a couple trigonometric functions.",
  embeds: [],
  methods: [
    
      
    {
    name: 'Sine',
    doc: "",
    inArgs: [{
      name: 'angle',
      doc: "",
      type: vdl.Types.FLOAT64
    },
    ],
    outArgs: [{
      name: '',
      doc: "",
      type: vdl.Types.FLOAT64
    },
    ],
    inStream: null,
    outStream: null,
    tags: []
  },
    
      
    {
    name: 'Cosine',
    doc: "",
    inArgs: [{
      name: 'angle',
      doc: "",
      type: vdl.Types.FLOAT64
    },
    ],
    outArgs: [{
      name: '',
      doc: "",
      type: vdl.Types.FLOAT64
    },
    ],
    inStream: null,
    outStream: null,
    tags: []
  },
     
  ]
};

  
    
function AdvancedMath(){}
module.exports.AdvancedMath = AdvancedMath

    
      
AdvancedMath.prototype.sine = function(ctx, angle) {
  throw new Error('Method Sine not implemented');
};
    
      
AdvancedMath.prototype.cosine = function(ctx, angle) {
  throw new Error('Method Cosine not implemented');
};
    
      
AdvancedMath.prototype.exp = function(ctx, x) {
  throw new Error('Method Exp not implemented');
};
     

    
AdvancedMath.prototype._serviceDescription = {
  name: 'AdvancedMath',
  pkgPath: 'v.io/x/ref/lib/vdl/testdata/arith',
  doc: "// AdvancedMath is an interface for more advanced math than arith.  It embeds\n// interfaces defined both in the same file and in an external package; and in\n// turn it is embedded by arith.Calculator (which is in the same package but\n// different file) to verify that embedding works in all these scenarios.",
  embeds: [{
      name: 'Trigonometry',
      pkgPath: 'v.io/x/ref/lib/vdl/testdata/arith',
      doc: "// Trigonometry is an interface that specifies a couple trigonometric functions."
    },
    {
      name: 'Exp',
      pkgPath: 'v.io/x/ref/lib/vdl/testdata/arith/exp',
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
      type: vdl.Types.FLOAT64
    },
    ],
    outArgs: [{
      name: '',
      doc: "",
      type: vdl.Types.FLOAT64
    },
    ],
    inStream: null,
    outStream: null,
    tags: []
  },
    
      
    {
    name: 'Cosine',
    doc: "",
    inArgs: [{
      name: 'angle',
      doc: "",
      type: vdl.Types.FLOAT64
    },
    ],
    outArgs: [{
      name: '',
      doc: "",
      type: vdl.Types.FLOAT64
    },
    ],
    inStream: null,
    outStream: null,
    tags: []
  },
    
      
    {
    name: 'Exp',
    doc: "",
    inArgs: [{
      name: 'x',
      doc: "",
      type: vdl.Types.FLOAT64
    },
    ],
    outArgs: [{
      name: '',
      doc: "",
      type: vdl.Types.FLOAT64
    },
    ],
    inStream: null,
    outStream: null,
    tags: []
  },
     
  ]
};

   

  
    
function Arith(){}
module.exports.Arith = Arith

    
      
Arith.prototype.add = function(ctx, a, b) {
  throw new Error('Method Add not implemented');
};
    
      
Arith.prototype.divMod = function(ctx, a, b) {
  throw new Error('Method DivMod not implemented');
};
    
      
Arith.prototype.sub = function(ctx, args) {
  throw new Error('Method Sub not implemented');
};
    
      
Arith.prototype.mul = function(ctx, nested) {
  throw new Error('Method Mul not implemented');
};
    
      
Arith.prototype.genError = function(ctx) {
  throw new Error('Method GenError not implemented');
};
    
      
Arith.prototype.count = function(ctx, start) {
  throw new Error('Method Count not implemented');
};
    
      
Arith.prototype.streamingAdd = function(ctx) {
  throw new Error('Method StreamingAdd not implemented');
};
    
      
Arith.prototype.quoteAny = function(ctx, a) {
  throw new Error('Method QuoteAny not implemented');
};
     

    
Arith.prototype._serviceDescription = {
  name: 'Arith',
  pkgPath: 'v.io/x/ref/lib/vdl/testdata/arith',
  doc: "// Arith is an example of an interface definition for an arithmetic service.\n// Things to note:\n//   * There must be at least 1 out-arg, and the last out-arg must be error.",
  embeds: [],
  methods: [
    
      
    {
    name: 'Add',
    doc: "// Add is a typical method with multiple input and output arguments.",
    inArgs: [{
      name: 'a',
      doc: "",
      type: vdl.Types.INT32
    },
    {
      name: 'b',
      doc: "",
      type: vdl.Types.INT32
    },
    ],
    outArgs: [{
      name: '',
      doc: "",
      type: vdl.Types.INT32
    },
    ],
    inStream: null,
    outStream: null,
    tags: []
  },
    
      
    {
    name: 'DivMod',
    doc: "// DivMod shows that runs of args with the same type can use the short form,\n// just like Go.",
    inArgs: [{
      name: 'a',
      doc: "",
      type: vdl.Types.INT32
    },
    {
      name: 'b',
      doc: "",
      type: vdl.Types.INT32
    },
    ],
    outArgs: [{
      name: 'quot',
      doc: "",
      type: vdl.Types.INT32
    },
    {
      name: 'rem',
      doc: "",
      type: vdl.Types.INT32
    },
    ],
    inStream: null,
    outStream: null,
    tags: []
  },
    
      
    {
    name: 'Sub',
    doc: "// Sub shows that you can use data types defined in other packages.",
    inArgs: [{
      name: 'args',
      doc: "",
      type: new base.Args()._type
    },
    ],
    outArgs: [{
      name: '',
      doc: "",
      type: vdl.Types.INT32
    },
    ],
    inStream: null,
    outStream: null,
    tags: []
  },
    
      
    {
    name: 'Mul',
    doc: "// Mul tries another data type defined in another package.",
    inArgs: [{
      name: 'nested',
      doc: "",
      type: new base.NestedArgs()._type
    },
    ],
    outArgs: [{
      name: '',
      doc: "",
      type: vdl.Types.INT32
    },
    ],
    inStream: null,
    outStream: null,
    tags: []
  },
    
      
    {
    name: 'GenError',
    doc: "// GenError shows that it's fine to have no in args, and no out args other\n// than \"error\".  In addition GenError shows the usage of tags.  Tags are a\n// sequence of constants.  There's no requirement on uniqueness of types or\n// values, and regular const expressions may also be used.",
    inArgs: [],
    outArgs: [],
    inStream: null,
    outStream: null,
    tags: [new (vdl.Registry.lookupOrCreateConstructor(vdl.Types.STRING))("foo"), new (vdl.Registry.lookupOrCreateConstructor(vdl.Types.STRING))("barz"), new (vdl.Registry.lookupOrCreateConstructor(vdl.Types.STRING))("hello"), new (vdl.Registry.lookupOrCreateConstructor(vdl.Types.INT32))(129), new (vdl.Registry.lookupOrCreateConstructor(vdl.Types.UINT64))(new vdl.BigInt(1, new Uint8Array([0x24]))), ]
  },
    
      
    {
    name: 'Count',
    doc: "// Count shows using only an int32 out-stream type, with no in-stream type.",
    inArgs: [{
      name: 'start',
      doc: "",
      type: vdl.Types.INT32
    },
    ],
    outArgs: [],
    inStream: null,
    outStream: {
      name: '',
      doc: '',
      type: vdl.Types.INT32
    },
    tags: []
  },
    
      
    {
    name: 'StreamingAdd',
    doc: "// StreamingAdd shows a bidirectional stream.",
    inArgs: [],
    outArgs: [{
      name: 'total',
      doc: "",
      type: vdl.Types.INT32
    },
    ],
    inStream: {
      name: '',
      doc: '',
      type: vdl.Types.INT32
    },
    outStream: {
      name: '',
      doc: '',
      type: vdl.Types.INT32
    },
    tags: []
  },
    
      
    {
    name: 'QuoteAny',
    doc: "// QuoteAny shows the any built-in type, representing a value of any type.",
    inArgs: [{
      name: 'a',
      doc: "",
      type: vdl.Types.ANY
    },
    ],
    outArgs: [{
      name: '',
      doc: "",
      type: vdl.Types.ANY
    },
    ],
    inStream: null,
    outStream: null,
    tags: []
  },
     
  ]
};

  
    
function Calculator(){}
module.exports.Calculator = Calculator

    
      
Calculator.prototype.on = function(ctx) {
  throw new Error('Method On not implemented');
};
    
      
Calculator.prototype.off = function(ctx) {
  throw new Error('Method Off not implemented');
};
    
      
Calculator.prototype.add = function(ctx, a, b) {
  throw new Error('Method Add not implemented');
};
    
      
Calculator.prototype.divMod = function(ctx, a, b) {
  throw new Error('Method DivMod not implemented');
};
    
      
Calculator.prototype.sub = function(ctx, args) {
  throw new Error('Method Sub not implemented');
};
    
      
Calculator.prototype.mul = function(ctx, nested) {
  throw new Error('Method Mul not implemented');
};
    
      
Calculator.prototype.genError = function(ctx) {
  throw new Error('Method GenError not implemented');
};
    
      
Calculator.prototype.count = function(ctx, start) {
  throw new Error('Method Count not implemented');
};
    
      
Calculator.prototype.streamingAdd = function(ctx) {
  throw new Error('Method StreamingAdd not implemented');
};
    
      
Calculator.prototype.quoteAny = function(ctx, a) {
  throw new Error('Method QuoteAny not implemented');
};
    
      
Calculator.prototype.sine = function(ctx, angle) {
  throw new Error('Method Sine not implemented');
};
    
      
Calculator.prototype.cosine = function(ctx, angle) {
  throw new Error('Method Cosine not implemented');
};
    
      
Calculator.prototype.exp = function(ctx, x) {
  throw new Error('Method Exp not implemented');
};
     

    
Calculator.prototype._serviceDescription = {
  name: 'Calculator',
  pkgPath: 'v.io/x/ref/lib/vdl/testdata/arith',
  doc: "",
  embeds: [{
      name: 'Arith',
      pkgPath: 'v.io/x/ref/lib/vdl/testdata/arith',
      doc: "// Arith is an example of an interface definition for an arithmetic service.\n// Things to note:\n//   * There must be at least 1 out-arg, and the last out-arg must be error."
    },
    {
      name: 'AdvancedMath',
      pkgPath: 'v.io/x/ref/lib/vdl/testdata/arith',
      doc: "// AdvancedMath is an interface for more advanced math than arith.  It embeds\n// interfaces defined both in the same file and in an external package; and in\n// turn it is embedded by arith.Calculator (which is in the same package but\n// different file) to verify that embedding works in all these scenarios."
    },
    ],
  methods: [
    
      
    {
    name: 'On',
    doc: "",
    inArgs: [],
    outArgs: [],
    inStream: null,
    outStream: null,
    tags: []
  },
    
      
    {
    name: 'Off',
    doc: "",
    inArgs: [],
    outArgs: [],
    inStream: null,
    outStream: null,
    tags: [new (vdl.Registry.lookupOrCreateConstructor(vdl.Types.STRING))("offtag"), ]
  },
    
      
    {
    name: 'Add',
    doc: "// Add is a typical method with multiple input and output arguments.",
    inArgs: [{
      name: 'a',
      doc: "",
      type: vdl.Types.INT32
    },
    {
      name: 'b',
      doc: "",
      type: vdl.Types.INT32
    },
    ],
    outArgs: [{
      name: '',
      doc: "",
      type: vdl.Types.INT32
    },
    ],
    inStream: null,
    outStream: null,
    tags: []
  },
    
      
    {
    name: 'DivMod',
    doc: "// DivMod shows that runs of args with the same type can use the short form,\n// just like Go.",
    inArgs: [{
      name: 'a',
      doc: "",
      type: vdl.Types.INT32
    },
    {
      name: 'b',
      doc: "",
      type: vdl.Types.INT32
    },
    ],
    outArgs: [{
      name: 'quot',
      doc: "",
      type: vdl.Types.INT32
    },
    {
      name: 'rem',
      doc: "",
      type: vdl.Types.INT32
    },
    ],
    inStream: null,
    outStream: null,
    tags: []
  },
    
      
    {
    name: 'Sub',
    doc: "// Sub shows that you can use data types defined in other packages.",
    inArgs: [{
      name: 'args',
      doc: "",
      type: new base.Args()._type
    },
    ],
    outArgs: [{
      name: '',
      doc: "",
      type: vdl.Types.INT32
    },
    ],
    inStream: null,
    outStream: null,
    tags: []
  },
    
      
    {
    name: 'Mul',
    doc: "// Mul tries another data type defined in another package.",
    inArgs: [{
      name: 'nested',
      doc: "",
      type: new base.NestedArgs()._type
    },
    ],
    outArgs: [{
      name: '',
      doc: "",
      type: vdl.Types.INT32
    },
    ],
    inStream: null,
    outStream: null,
    tags: []
  },
    
      
    {
    name: 'GenError',
    doc: "// GenError shows that it's fine to have no in args, and no out args other\n// than \"error\".  In addition GenError shows the usage of tags.  Tags are a\n// sequence of constants.  There's no requirement on uniqueness of types or\n// values, and regular const expressions may also be used.",
    inArgs: [],
    outArgs: [],
    inStream: null,
    outStream: null,
    tags: [new (vdl.Registry.lookupOrCreateConstructor(vdl.Types.STRING))("foo"), new (vdl.Registry.lookupOrCreateConstructor(vdl.Types.STRING))("barz"), new (vdl.Registry.lookupOrCreateConstructor(vdl.Types.STRING))("hello"), new (vdl.Registry.lookupOrCreateConstructor(vdl.Types.INT32))(129), new (vdl.Registry.lookupOrCreateConstructor(vdl.Types.UINT64))(new vdl.BigInt(1, new Uint8Array([0x24]))), ]
  },
    
      
    {
    name: 'Count',
    doc: "// Count shows using only an int32 out-stream type, with no in-stream type.",
    inArgs: [{
      name: 'start',
      doc: "",
      type: vdl.Types.INT32
    },
    ],
    outArgs: [],
    inStream: null,
    outStream: {
      name: '',
      doc: '',
      type: vdl.Types.INT32
    },
    tags: []
  },
    
      
    {
    name: 'StreamingAdd',
    doc: "// StreamingAdd shows a bidirectional stream.",
    inArgs: [],
    outArgs: [{
      name: 'total',
      doc: "",
      type: vdl.Types.INT32
    },
    ],
    inStream: {
      name: '',
      doc: '',
      type: vdl.Types.INT32
    },
    outStream: {
      name: '',
      doc: '',
      type: vdl.Types.INT32
    },
    tags: []
  },
    
      
    {
    name: 'QuoteAny',
    doc: "// QuoteAny shows the any built-in type, representing a value of any type.",
    inArgs: [{
      name: 'a',
      doc: "",
      type: vdl.Types.ANY
    },
    ],
    outArgs: [{
      name: '',
      doc: "",
      type: vdl.Types.ANY
    },
    ],
    inStream: null,
    outStream: null,
    tags: []
  },
    
      
    {
    name: 'Sine',
    doc: "",
    inArgs: [{
      name: 'angle',
      doc: "",
      type: vdl.Types.FLOAT64
    },
    ],
    outArgs: [{
      name: '',
      doc: "",
      type: vdl.Types.FLOAT64
    },
    ],
    inStream: null,
    outStream: null,
    tags: []
  },
    
      
    {
    name: 'Cosine',
    doc: "",
    inArgs: [{
      name: 'angle',
      doc: "",
      type: vdl.Types.FLOAT64
    },
    ],
    outArgs: [{
      name: '',
      doc: "",
      type: vdl.Types.FLOAT64
    },
    ],
    inStream: null,
    outStream: null,
    tags: []
  },
    
      
    {
    name: 'Exp',
    doc: "",
    inArgs: [{
      name: 'x',
      doc: "",
      type: vdl.Types.FLOAT64
    },
    ],
    outArgs: [{
      name: '',
      doc: "",
      type: vdl.Types.FLOAT64
    },
    ],
    inStream: null,
    outStream: null,
    tags: []
  },
     
  ]
};

   
 


