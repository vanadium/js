// This file was auto-generated by the vanadium vdl tool.
var vdl = require('../../../../../../../.././vdl');






module.exports = {};



// Types:




// Consts:



// Errors:



// Services:

  
    
function Exp(){}
module.exports.Exp = Exp

    
      
Exp.prototype.exp = function(ctx, x) {
  throw new Error('Method Exp not implemented');
};
     

    
Exp.prototype._serviceDescription = {
  name: 'Exp',
  pkgPath: 'v.io/x/ref/lib/vdl/testdata/arith/exp',
  doc: "",
  embeds: [],
  methods: [
    
      
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

   
 

