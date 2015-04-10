// Copyright 2015 The Vanadium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var test = require('prova');
var service = require('./get-service');
var vtrace = require('../../src/vtrace');
var serve = require('./serve');
var leafDispatcher = require('../../src/rpc/leaf-dispatcher');

function findSpan(name, trace) {
  for (var i = 0; i < trace.spans.length; i++) {
    var span = trace.spans[i];
    if (span.name === name) {
      return span;
    }
  }
  return null;
}

test('Test receiving traces with a JavaScript client', function(assert) {
  service('test_service/cache', function(err, ctx, cache, end, runtime) {
    vtrace.forceCollect(ctx);
    if (err) {
      end(assert, err);
    }
    cache.set(ctx, 'key', 'val').then(function() {
      var span = vtrace.getSpan(ctx);
      var record = vtrace.getStore(ctx).traceRecord(span.trace);
      // We expect to see spans at least from:
      // The js client.
      assert.ok(findSpan('<jsclient>"test_service/cache".set', record));
      // The wspr proxy.
      assert.ok(findSpan('<wspr>"test_service/cache".Set', record));
      // The go server.
      assert.ok(findSpan('"cache".Set', record));
      end(assert);
    });
  });
});

test('Test using collectRegexp', function(assert) {
  service('test_service/cache', function(err, ctx, cache, end, runtime) {
    if (err) {
      end(assert, err);
    }
    var store = vtrace.getStore(ctx);
    store.setCollectRegexp('\.get$');

    var t1 = ctx;
    var t2 = vtrace.withNewTrace(ctx);

    cache.set(t1, 'key', 'val').then(function() {
      return cache.get(t2, 'key');
    }).then(function() {
      var records = store.traceRecords();
      assert.equals(records.length, 1);
      assert.ok(findSpan('"cache".Get', records[0]));
      end(assert);
    });
  });
});

var SpanService = {
  makeSpan: function(context) {
    context = vtrace.withNewSpan(context, 'in makeSpan');
    vtrace.getSpan(context).finish();
  }
};

test('Test receiving traces from a javascript server', function(assert) {
  serve('testing/span', leafDispatcher(SpanService), function(err, res) {
    assert.error(err);
    var serverCtx = res.runtime.getContext();

    var clientCtx = vtrace.withNewStore(serverCtx);
    var trace = vtrace.getSpan(clientCtx).trace;
    vtrace.forceCollect(clientCtx);
    res.service.makeSpan(clientCtx).then(function() {
      var record = vtrace.getStore(clientCtx).traceRecord(trace);
      // We expect to see spans at least from:
      // The js client.
      assert.ok(findSpan('<jsclient>"testing/span".makeSpan', record));
      // The wspr proxy.
      assert.ok(findSpan('<wspr>"testing/span".MakeSpan', record));
      // The js server.
      assert.ok(findSpan('<jsserver>"".makeSpan', record));
      // A custom span.
      assert.ok(findSpan('in makeSpan', record));
      res.end(assert);
    }).catch(function(err) {
      assert.error(err);
      res.end(assert);
    });
  });
});
