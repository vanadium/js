// Copyright 2015 The Vanadium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var test = require('prova');

test('Test event proxy connects to extension', function(assert) {
  // Don't test this in node because there is no extension to talk to.
  if (!require('is-browser')) {
    return assert.end();
  }

  var timeout = 500;
  var ExtensionEventProxy = require('../../src/browser/event-proxy').ctor;
  var extensionEventProxy = new ExtensionEventProxy(timeout);

  var finished = false;

  extensionEventProxy.once('error', function(err) {
    if (!finished) {
      finished = true;
      assert.fail(err);
      extensionEventProxy.destroy();
      assert.end();
    }
  });

  extensionEventProxy.once('connected', function() {
    if (!finished) {
      finished = true;
      extensionEventProxy.destroy();
      assert.end();
    }
  });
});

// TODO(nlacasse): This test is potentially racey.  It's possible that the
// event proxy might connect to the extension before the 0ms timeout fires
// (although I have not seen it happen).
test('Test event proxy fires error when timeout occurs before connection.',
    function(assert) {
      // Don't test this in node because there is no extension to talk to.
      if (!require('is-browser')) {
        return assert.end();
      }

      var timeout = 0;
      var ExtensionEventProxy = require('../../src/browser/event-proxy').ctor;
      var extensionEventProxy = new ExtensionEventProxy(timeout);

      var finished = false;

      extensionEventProxy.once('error', function(err) {
        if (!finished) {
          finished = true;
          assert.ok((/timeout/i).test(err.message));
          extensionEventProxy.destroy();
          assert.end();
        }
      });

      extensionEventProxy.once('connected', function() {
        if (!finished) {
          finished = true;
          assert.fail('Expected the event proxy to timeout, but it did not.');
          extensionEventProxy.destroy();
          assert.end();
        }
      });
});

test('Test event proxy rejects unknown message types', function(assert) {
  // Don't test this in node because there is no extension to talk to.
  if (!require('is-browser')) {
    return assert.end();
  }

  var timeout = 500;
  var ExtensionEventProxy = require('../../src/browser/event-proxy').ctor;
  var extensionEventProxy = new ExtensionEventProxy(timeout);

  var finished = false;

  var bogusType = 'foobar';

  extensionEventProxy.once('connected', function() {
    extensionEventProxy.once('error', function(err) {
      if (!finished) {
        finished = true;
        assert.ok((/unknown type/i).test(err.message));
        extensionEventProxy.destroy();
        assert.end();
      }
    });

    extensionEventProxy.send(bogusType, {});
  });
});
