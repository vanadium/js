/**
 * @fileoveriew Tests server_router.js.
 */

var test = require('prova');
var Router = require('../../src/ipc/server-router');
var Server = require('../../src/ipc/server');
var Outgoing = require('../../src/proxy/message-type').Outgoing;
var vdl = require('../../src/vdl');
var byteUtil = require('../../src/vdl/byte-util');
var vom = require('../../src/vom');
var context = require('../../src/runtime/context');

test('Server Router Signature Lookup', function(t) {
  var inputName = 'aName';
  var inputMessageId = 10;
  var inputService = {
    a: function(ctx, x, $stream, y) {
      return x + y;
    }
  };
  var expectedSignature = [{
    name: '',
    pkgPath: '',
    doc: '',
    embeds: [],
    methods: [
      {
        name: 'A',
        doc: '',
        inArgs: [
          {
            name: 'x',
            doc: '',
            type: vdl.Types.JSVALUE
          },
          {
            name: 'y',
            doc: '',
            type: vdl.Types.JSVALUE
          }
        ],
        outArgs: [
          {
            name: '',
            doc: '',
            type: vdl.Types.JSVALUE
          },
        ],
        inStream: {
          name: '',
          doc: '',
          type: vdl.Types.JSVALUE
        },
        outStream: {
          name: '',
          doc: '',
          type: vdl.Types.JSVALUE
        },
        tags: []
      }
    ]
  }];

  var responseData;
  var responseType;
  var responseMessageId;
  var mockProxy = {
    sendRequest: function(data, type, ignored, messageId) {
      responseData = data;
      responseType = type;
      responseMessageId = messageId;
    },
    addIncomingHandler: function(){},
    nextId: function() { return inputMessageId; }
  };
  var mockController = {
    serve: function(){}
  };
  var mockRuntime = {
    newContext: function() {
      return new context.Context();
    }
  };
  var router = new Router(mockProxy, 'TestAppName',
                          mockRuntime, mockController);
  var server = new Server(router);
  var options = {
    authorizer: function(){}
  };
  server.serve(inputName, inputService, options, function(){});

  var request = {
    serverID: server.id,
    suffix: inputName
  };
  router.handleLookupRequest(inputMessageId, request).then(function(result) {
    t.equals(responseType, Outgoing.LOOKUP_RESPONSE, 'response type');
    t.equals(responseMessageId, inputMessageId, 'message id');

    var data = JSON.parse(responseData);
    t.ok(data.hasOwnProperty('handle'), 'has a handle');
    t.equals(data.hasAuthorizer, true, 'has authorizer');
    var decodedSignature = vom.decode(byteUtil.hex2Bytes(data.signature));
    t.deepEquals(decodedSignature.val, expectedSignature, 'signature');

    t.end();
  });
});
