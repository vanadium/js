// Copyright 2015 The Vanadium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

/**
 * @fileoverview Tests of generating signature with multiple descriptions
 */
var test = require('tape');
var createSignature = require('../../src/vdl/create-signature');
var vdl = require('../../src/vdl');
var stringify = require('../../src/vdl/stringify');

function TestService() {
}

TestService.prototype.noArgsFunction = function(ctx, serverCall) {};
TestService.prototype.namedFunction = NamedFunc;
function NamedFunc(context, serverCall, x, y, z ) {}
TestService.prototype.streamingFunction = function(context,
                                                   serverCall, $stream) {};

test('create signature with no description', function(t) {
  var testService = new TestService();
  var sigs = createSignature(testService);
  t.equals(sigs.length, 1);
  var expected = {
    name: '',
    pkgPath: '',
    doc: '',
    embeds: [],
    methods: [{
      doc: '',
      name: 'NamedFunction',
      inStream: null,
      outStream: null,
      inArgs: [{
        doc: '',
        name: 'x',
        type: vdl.types.JSVALUE
      }, {
        doc: '',
        name: 'y',
        type: vdl.types.JSVALUE
      }, {
        doc: '',
        name: 'z',
        type: vdl.types.JSVALUE
      }],
      outArgs: [{
        name: '',
        doc: '',
        type: vdl.types.JSVALUE
      }],
      tags: []
    }, {
      doc: '',
      name: 'NoArgsFunction',
      inStream: null,
      outStream: null,
      inArgs: [],
      outArgs: [{
        name: '',
        doc: '',
        'type': vdl.types.JSVALUE
      }],
      tags: []
    }, {
      doc: '',
      name: 'StreamingFunction',
      inArgs: [],
      outArgs: [{
        name: '',
        doc: '',
        type: vdl.types.JSVALUE
      }],
      inStream: {
        doc: '',
        name: '',
        type: vdl.types.JSVALUE
      },
      outStream: {
        doc: '',
        name: '',
        type: vdl.types.JSVALUE
      },
      tags: []
    }]
  };
  var stringifiedResult = stringify(sigs[0]);
  var stringifiedExpected = stringify(expected);
  t.equals(stringifiedResult, stringifiedExpected);
  t.end();
});

test('create signature with full description', function(t) {
  var testService = new TestService();
  var desc = {
    name: 'TestService',
    pkgPath: 'service/test',
    doc: 'TestServiceDoc',
    embeds: [],
    methods: [{
      name: 'NamedFunction',
      doc: 'NamedFunctionDoc',
      inArgs: [{
        name: 'x',
        doc: 'xDoc',
        type: vdl.types.UINT32
      }, {
        name: 'y',
        doc: 'yDoc',
        type: vdl.types.STRING
      }, {
        name: 'z',
        doc: 'zDoc',
        type: vdl.types.COMPLEX128
      }],
      outArgs: [{
        name: 'a',
        doc: 'aDoc',
        type: vdl.types.STRING
      }, {
        name: 'err',
        doc: 'errDoc',
        type: vdl.types.ERROR
      }],
      inStream: null,
      outStream: null,
      tags: []
    }, {
      name: 'NoArgsFunction',
      doc: 'NoArgsDoc',
      inArgs: [],
      outArgs: [],
      inStream: null,
      outStream: null,
      tags: []
    }, {
      name: 'StreamingFunction',
      doc: 'StreamingFunctionDoc',
      inArgs: [],
      outArgs: [{
        name: 'err',
        doc: 'errDoc',
        type: vdl.types.ERROR
      }],
      inStream: {
        doc: '',
        name: '',
        type: vdl.types.UINT32
      },
      outStream: {
        doc: '',
        name: '',
        type: vdl.types.INT32
      },
      tags: []
    }]
  };
  var sigs = createSignature(testService, desc);
  t.equals(sigs.length, 1);
  var stringifiedResult = stringify(sigs[0]);
  var stringifiedExpected = stringify(desc);
  t.equals(stringifiedResult, stringifiedExpected);
  t.end();
});

test('create signature with one description but extra methods',
          function(t) {
  var testService = new TestService();
  var desc = {
    name: 'TestService',
    pkgPath: 'service/test',
    doc: 'TestServiceDoc',
    embeds: [],
    methods: [{
      name: 'NamedFunction',
      doc: 'NamedFunctionDoc',
      inArgs: [{
        name: 'x',
        doc: 'xDoc',
        type: vdl.types.UINT32
      }, {
        name: 'y',
        doc: 'yDoc',
        type: vdl.types.STRING
      }, {
        name: 'z',
        doc: 'zDoc',
        type: vdl.types.COMPLEX128
      }],
      outArgs: [{
        name: 'a',
        doc: 'aDoc',
        type: vdl.types.STRING
      }, {
        name: 'err',
        doc: 'errDoc',
        type: vdl.types.ERROR
      }],
      inStream: null,
      outStream: null,
      tags: []
    }, {
      name: 'StreamingFunction',
      doc: 'StreamingFunctionDoc',
      inArgs: [],
      outArgs: [],
      inStream: {
        doc: '',
        name: '',
        type: vdl.types.UINT32
      },
      outStream: {
        doc: '',
        name: '',
        type: vdl.types.INT32
      },
      tags: []
    }]
  };
  var sigs = createSignature(testService, desc);
  t.equals(sigs.length, 2);
  var stringifiedResult = stringify(sigs[0]);
  var stringifiedExpected = stringify(desc);
  t.equals(stringifiedResult, stringifiedExpected);

  var expectedExtra = {
    name: '',
    pkgPath: '',
    doc: '',
    embeds: [],
    methods: [{
      name: 'NoArgsFunction',
      doc: '',
      inArgs: [],
      outArgs: [{
        doc: '',
        name: '',
        type: vdl.types.JSVALUE
      }],
      inStream: null,
      outStream: null,
      tags: []
    }]
  };
  var stringifiedResultExtra = stringify(sigs[1]);
  var stringifiedExpectedExtra = stringify(expectedExtra);
  t.equals(stringifiedResultExtra, stringifiedExpectedExtra);

  t.end();
});

test('create signature with full description across multiple descs',
     function(t) {
  var testService = new TestService();
  var descs = [{
    name: 'TestService',
    pkgPath: 'service/test',
    doc: 'TestServiceDoc',
    embeds: [],
    methods: [{
      name: 'NoArgsFunction',
      doc: 'NoArgsDoc',
      inArgs: [],
      outArgs: [],
      inStream: null,
      outStream: null,
      tags: []
    }]
  }, {
    name: 'TestService2',
    pkgPath: 'service2/test',
    doc: 'TestService2Doc',
    embeds: [],
    methods: [{
      name: 'NamedFunction',
      doc: 'NamedFunctionDoc',
      inArgs: [{
        name: 'x',
        doc: 'xDoc',
        type: vdl.types.UINT32
      }, {
        name: 'y',
        doc: 'yDoc',
        type: vdl.types.STRING
      }, {
        name: 'z',
        doc: 'zDoc',
        type: vdl.types.COMPLEX128
      }],
      outArgs: [{
        name: 'a',
        doc: 'aDoc',
        type: vdl.types.STRING
      }],
      inStream: null,
      outStream: null,
      tags: []
    }]
  }, {
    name: 'TestService3',
    pkgPath: 'service3/test',
    doc: 'TestService3Doc',
    embeds: [],
    methods: [{
      name: 'StreamingFunction',
      doc: 'StreamingFunctionDoc',
      inArgs: [],
      outArgs: [],
      inStream: {
        doc: '',
        name: '',
        type: vdl.types.UINT32
      },
      outStream: {
        doc: '',
        name: '',
        type: vdl.types.INT32
      },
      tags: []
    }]
  }];
  var sigs = createSignature(testService, descs);
  t.equals(sigs.length, 3);
  var stringifiedResult = stringify(sigs);
  var stringifiedExpected = stringify(descs);
  t.equals(stringifiedResult, stringifiedExpected);
  t.end();
});

test('create signature with multiple descs and missing methods',
     function(t) {
  var testService = new TestService();
  var descs = [{
    name: 'TestService2',
    pkgPath: 'service2/test',
    doc: 'TestService2Doc',
    embeds: [],
    methods: [{
      name: 'NamedFunction',
      doc: 'NamedFunctionDoc',
      inArgs: [{
        name: 'x',
        doc: 'xDoc',
        type: vdl.types.UINT32
      }, {
        name: 'y',
        doc: 'yDoc',
        type: vdl.types.STRING
      }, {
        name: 'z',
        doc: 'zDoc',
        type: vdl.types.COMPLEX128
      }],
      outArgs: [{
        name: 'a',
        doc: 'aDoc',
        type: vdl.types.STRING
      }],
      inStream: null,
      outStream: null,
      tags: []
    }]
  }, {
    name: 'TestService3',
    pkgPath: 'service3/test',
    doc: 'TestService3Doc',
    embeds: [],
    methods: [{
      name: 'StreamingFunction',
      doc: 'StreamingFunctionDoc',
      inArgs: [],
      outArgs: [],
      inStream: {
        doc: '',
        name: '',
        type: vdl.types.UINT32
      },
      outStream: {
        doc: '',
        name: '',
        type: vdl.types.INT32
      },
      tags: []
    }]
  }];
  var sigs = createSignature(testService, descs);
  t.equals(sigs.length, 3);
  var expectedDescs = descs.concat([{
    name: '',
    pkgPath: '',
    doc: '',
    embeds: [],
    methods: [{
      name: 'NoArgsFunction',
      doc: '',
      inArgs: [],
      outArgs: [{
        doc: '',
        name: '',
        type: vdl.types.JSVALUE
      }],
      inStream: null,
      outStream: null,
      tags: []
    }]
  }]);
  var stringifiedResult = stringify(sigs);
  var stringifiedExpected = stringify(expectedDescs);
  t.equals(stringifiedResult, stringifiedExpected);
  t.end();
});

test('create signature with full description across multiple descs' +
     ' with duplicates', function(t) {
  var testService = new TestService();
  var descs = [{
    name: 'TestService',
    pkgPath: 'service/test',
    doc: 'TestServiceDoc',
    embeds: [],
    methods: [{
      name: 'NoArgsFunction',
      doc: 'NoArgsDoc',
      inArgs: [],
      outArgs: [],
      inStream: null,
      outStream: null,
      tags: []
    }]
  }, {
    name: 'TestService2',
    pkgPath: 'service2/test',
    doc: 'TestService2Doc',
    embeds: [],
    methods: [{
      name: 'NamedFunction',
      doc: 'NamedFunctionDoc',
      inArgs: [{
        name: 'x',
        doc: 'xDoc',
        type: vdl.types.UINT32
      }, {
        name: 'y',
        doc: 'yDoc',
        type: vdl.types.STRING
      }, {
        name: 'z',
        doc: 'zDoc',
        type: vdl.types.COMPLEX128
      }],
      outArgs: [{
        name: 'a',
        doc: 'aDoc',
        type: vdl.types.STRING
      }],
      inStream: null,
      outStream: null,
      tags: []
    }]
  }, {
    name: 'TestService3',
    pkgPath: 'service3/test',
    doc: 'TestService3Doc',
    embeds: [],
    methods: [{
      name: 'NamedFunction',
      doc: 'NamedFunctionDoc',
      inArgs: [{
        name: 'x',
        doc: 'xDoc',
        type: vdl.types.UINT32
      }, {
        name: 'y',
        doc: 'yDoc',
        type: vdl.types.STRING
      }, {
        name: 'z',
        doc: 'zDoc',
        type: vdl.types.COMPLEX128
      }],
      outArgs: [{
        name: 'a',
        doc: 'aDoc',
        type: vdl.types.STRING
      }],
      inStream: null,
      outStream: null,
      tags: []
    }, {
      name: 'StreamingFunction',
      doc: 'StreamingFunctionDoc',
      inArgs: [],
      outArgs: [],
      inStream: {
        doc: '',
        name: '',
        type: vdl.types.UINT32
      },
      outStream: {
        doc: '',
        name: '',
        type: vdl.types.INT32
      },
      tags: []
    }]
  }];
  var sigs = createSignature(testService, descs);
  t.equals(sigs.length, 3);
  var stringifiedResult = stringify(sigs);
  var stringifiedExpected = stringify(descs);
  t.equals(stringifiedResult, stringifiedExpected);
  t.end();
});

test('create signature with full description across multiple descs' +
     ' with incompatible methods', function(t) {
  var testService = new TestService();
  var descs = [{
    name: 'TestService',
    pkgPath: 'service/test',
    doc: 'TestServiceDoc',
    embeds: [],
    methods: [{
      name: 'NoArgsFunction',
      doc: 'NoArgsDoc',
      inArgs: [],
      outArgs: [],
    }]
  }, {
    name: 'TestService2',
    pkgPath: 'service2/test',
    doc: 'TestService2Doc',
    embeds: [],
    methods: [{
      name: 'NamedFunction',
      doc: 'NamedFunctionDoc',
      inArgs: [{
        name: 'x',
        doc: 'xDoc',
        type: vdl.types.UINT32
      }, {
        name: 'y',
        doc: 'yDoc',
        type: vdl.types.STRING
      }, {
        name: 'z',
        doc: 'zDoc',
        type: vdl.types.COMPLEX128
      }],
      outArgs: [{
        name: 'a',
        doc: 'aDoc',
        type: vdl.types.STRING
      }]
    }]
  }, {
    name: 'TestService3',
    pkgPath: 'service3/test',
    doc: 'TestService3Doc',
    embeds: [],
    methods: [{
      name: 'StreamingFunction',
      doc: 'StreamingFunctionDoc',
      inArgs: [],
      outArgs: [],
      inStream: {
        doc: '',
        name: '',
        type: vdl.types.UINT32
      },
      outStream: {
        doc: '',
        name: '',
        type: vdl.types.INT32
      }
    }, {
      name: 'NamedFunction',
      doc: 'NamedFunctionDoc',
      inArgs: [{
        name: 'x',
        doc: 'xDoc',
        type: vdl.types.UINT32
      }, {
        name: 'y',
        doc: 'yDoc',
        type: vdl.types.ANY
      }, {
        name: 'z',
        doc: 'zDoc',
        type: vdl.types.COMPLEX128
      }],
      outArgs: [{
        name: 'a',
        doc: 'aDoc',
        type: vdl.types.STRING
      }]
    }]
  }];
  t.throws(function() {
    createSignature(testService, descs);
  }, null, 'NamedFunction should not match');
  t.end();
});
