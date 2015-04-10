// Copyright 2015 The Vanadium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var test = require('prova');
var vanadium = require('../../');
var config = require('./default-config');
var caveats = require('../../src/security/caveats');
var leafDispatcher = require('../../src/rpc/leaf-dispatcher');
var serve = require('./serve');
var Blessings = require('../../src/security/blessings');
var SharedContextKeys = require('../../src/runtime/shared-context-keys');

test('Test bless self without Caveat', function(t) {
  var rt;
  vanadium.init(config, function(err, runtime) {
    if (err) {
      t.end(err);
    }

    rt = runtime;

    runtime.principal.blessSelf(runtime.getContext(), 'ext')
    .then(function(blessings) {
      t.ok(blessings instanceof Blessings, 'Got blessings');
      rt.close(t.end);
    }).catch(function(err) {
      t.error(err);
      rt.close(t.end);
    });
  });
});

test('Test bless self with Caveat', function(t) {
  var rt;
  vanadium.init(config, function(err, runtime) {
    if (err) {
      t.end(err);
    }

    rt = runtime;

    runtime.principal.blessSelf(runtime.getContext(), 'ext',
      caveats.createExpiryCaveat(new Date()),
      function(err, blessings) {
      t.error(err);
      t.ok(blessings instanceof Blessings, 'Got blessings');
      rt.close(t.end);
    });
  });
});

test('Test bless without Caveat from server', function(t) {
  var service = {
    method: function(ctx, cb) {
      var rt = ctx._ctx.value(SharedContextKeys.RUNTIME);
      var remoteKey = ctx.remoteBlessings.publicKey;
      rt.principal.bless(ctx, remoteKey, ctx.localBlessings,
       'ext', function(err) {
         t.ok(err, 'Expected at least one caveat must be specfied error');
         cb();
       });
    }
  };

  serve('testing/blessnocav', leafDispatcher(service),
    function(err, res) {
      if (err) {
        res.end(t, err);
        return;
      }

      res.service.method(res.runtime.getContext(), function(err) {
        t.error(err);
        res.end(t);
      });
  });
});

test('Test bless with Caveat from server', function(t) {
  var service = {
    method: function(ctx, cb) {
      var rt = ctx._ctx.value(SharedContextKeys.RUNTIME);
      var remoteKey = ctx.remoteBlessings.publicKey;
      rt.principal.bless(ctx, remoteKey, ctx.localBlessings,
       'ext', caveats.createExpiryCaveat(new Date(Date.now() - 1000)),
       caveats.createConstCaveat(true), function(err, blessing) {
         t.notOk(err, 'No error expected during bless');
         t.ok(blessing instanceof Blessings, 'Got blessing');
         cb();
       });
    }
  };

  serve('testing/blessnocav', leafDispatcher(service),
    function(err, res) {
      if (err) {
        res.end(t, err);
        return;
      }

      res.service.method(res.runtime.getContext(), function(err) {
        t.error(err);
        res.end(t);
      });
  });
});

test('Test put to blessing store', function(t) {
  vanadium.init(config, function(err, runtime) {
    if (err) {
      t.end(err);
    }

    runtime.principal.blessSelf(runtime.getContext(), 'ext')
    .then(function(blessings) {
      t.ok(blessings instanceof Blessings, 'Got blessings');
      t.ok(blessings._id > 0, 'Should get non-zero blessings');

      runtime.principal.putToBlessingStore(runtime.getContext(),
        blessings, 'fake/remote/pattern').then(function(oldBlessing) {
          t.equal(oldBlessing, null,
            'Should get null (no previous handle) for pattern not in store');
          return runtime.principal.putToBlessingStore(runtime.getContext(),
            blessings, 'fake/remote/pattern');
        }).then(function(firstBlessing) {
          t.equal(firstBlessing._id, blessings._id,
            'Should get handle of first blessing back');
          runtime.close(t.end);
        }).catch(function(err) {
          t.notOk(err, 'Shouldn\'t get error putting to blessing store');
          runtime.close(t.end);
        });
    }).catch(function(err) {
      t.error(err);
      runtime.close(t.end);
    });
  });
});
