// Copyright 2015 The Vanadium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.


var test = require('prova');
var aclAuthorizer = require('../../src/security/access/acl-authorizer');
var Blessings = require('../../src/security/blessings');
var access = require('../../src/gen-vdl/v.io/v23/security/access');
var unwrap = require('../../src/vdl/type-util').unwrap;
var createConstructor = require('../../src/vdl/create-constructor');
var kind = require('../../src/vdl/kind');
var Context = require('../../src/context').Context;

require('es6-shim');
var rootCtx = new Context();
var allTags = [
  access.Admin, access.Debug, access.Read, access.Write, access.Resolve];
test('allow same public key access with no other acls', function(assert) {
  var call = {
    localBlessings: new Blessings(undefined, 'me', undefined),
    remoteBlessings: new Blessings(undefined, 'me', undefined)
  };

  var auth = aclAuthorizer({}, access.Tag);
  allTags.forEach(function(t) {
    call.methodTags = [t];
    assert.error(auth(rootCtx, call), 'should not error');
  });

  assert.end();
});

// Helper function to convert the thrown error into a returned error.
function tryAuthorize(ctx, call, auth) {
  try {
    auth(ctx, call);
    return null;
  } catch(e) {
    return e;
  }
}

// Test that ACL Authorizers can be created via a Map.
test('full suite of go tests - map', function(assert) {
  var acl = new Map();
  acl.set(access.Read, {
    in: ['server/alice', 'server/che/$', '...'],
    notIn: []
  });

  acl.set(access.Write, {
    in: ['server/alice', 'server/che/$', 'server/che'],
    notIn: [ 'server/che/friend' ]
  });

  acl.set(access.Admin, {
    in: ['server/alice/$'],
    notIn: []
  });

  acl.set(access.Debug, {
    in: ['server/alice/$', 'server/bob'],
    notIn: []
  });

  var auth = aclAuthorizer(acl, access.Tag);
  var expectations = {
    'alice': [access.Read],
    'bob': [access.Read],
    'che': [access.Read],
    'server/alice': [access.Read, access.Write, access.Admin, access.Debug],
    'server/bob': [access.Read, access.Debug],
    'server/alice/friend': [access.Read, access.Write],
    'server/che': [access.Read, access.Write],
    'server/che/friend': [access.Read],
    '': [access.Read],
  };

  checkExpectations(auth, expectations, assert);
  assert.end();
});

// Test that ACL Authorizers can be created via an object.
test('full suite of go tests - object', function(assert) {
  var acl = {};
  acl[unwrap(access.Read)] = {
    in: ['server/alice', 'server/che/$', '...'],
    notIn: []
  };
  acl[unwrap(access.Write)] = {
    in: ['server/alice', 'server/che/$', 'server/che'],
    notIn: [ 'server/che/friend' ]
  };
  acl[unwrap(access.Admin)] = {
    in: ['server/alice/$'],
    notIn: []
  };
  acl[unwrap(access.Debug)] = {
    in: ['server/alice/$', 'server/bob'],
    notIn: []
  };

  var auth = aclAuthorizer(acl, access.Tag);
  var expectations = {
    'alice': [access.Read],
    'bob': [access.Read],
    'che': [access.Read],
    'server/alice': [access.Read, access.Write, access.Admin, access.Debug],
    'server/bob': [access.Read, access.Debug],
    'server/alice/friend': [access.Read, access.Write],
    'server/che': [access.Read, access.Write],
    'server/che/friend': [access.Read],
    '': [access.Read],
  };

  checkExpectations(auth, expectations, assert);
  assert.end();
});

// Test that ACL Authorizers can be created via access.Permissions object.
test('full suite of go tests - Permissions', function(assert) {
  var acl = new Map();
  acl.set(access.Read, {
    in: ['server/alice', 'server/che/$', '...'],
    notIn: []
  });

  acl.set(access.Write, {
    in: ['server/alice', 'server/che/$', 'server/che'],
    notIn: [ 'server/che/friend' ]
  });

  acl.set(access.Admin, {
    in: ['server/alice/$'],
    notIn: []
  });

  acl.set(access.Debug, {
    in: ['server/alice/$', 'server/bob'],
    notIn: []
  });
  var permissions = new access.Permissions(acl);

  var auth = aclAuthorizer(permissions, access.Tag);
  var expectations = {
    'alice': [access.Read],
    'bob': [access.Read],
    'che': [access.Read],
    'server/alice': [access.Read, access.Write, access.Admin, access.Debug],
    'server/bob': [access.Read, access.Debug],
    'server/alice/friend': [access.Read, access.Write],
    'server/che': [access.Read, access.Write],
    'server/che/friend': [access.Read],
    '': [access.Read],
  };

  checkExpectations(auth, expectations, assert);
  assert.end();
});

function checkExpectations(auth, expectations, assert) {
  for (var name in expectations) {
    if (!expectations.hasOwnProperty(name)) {
      continue;
    }
    var call = {
      localBlessings: {
        publicKey: 'me',
      },
      remoteBlessings: {
        publicKey: 'otherkey',
      },
      remoteBlessingStrings: [name],
    };
    var exp = expectations[name];

    for (var j = 0; j < allTags.length; j++) {
      var tag = allTags[j];
      var shouldErr = exp.indexOf(tag) === -1;
      call.methodTags = [tag];
      var err = tryAuthorize(rootCtx, call, auth);
      if (shouldErr) {
        assert.ok(err !== null, 'name: ' + name + ', tag: ' + tag);
        assert.ok(err instanceof access.NoPermissionsError);
      } else {
        assert.equal(err, null, 'name ' + name + ', tag:' + tag);
      }
    }
  }
}

test('tags of different types', function(assert) {
  var MyTag = createConstructor({
    kind: kind.STRING,
    name: 'MyTag'
  });
  var myAdmin = new MyTag('Admin');
  var call = {
    localBlessings: new Blessings(undefined, 'me', undefined),
    remoteBlessings: new Blessings(undefined, 'otherKey', undefined),
    remoteBlessingStrings: ['server/alice', 'server/bob/friend'],
  };

  var acl = new Map();
  acl.set('Admin', {
    in: ['server/alice'],
    notIn: []
  });
  var tagAuthorizer = aclAuthorizer(acl, access.Tag);
  call.methodTags = [myAdmin, access.Resolve];
  var err = tryAuthorize(rootCtx, call, tagAuthorizer);

  assert.ok(err !== null);
  assert.ok(err instanceof access.NoPermissionsError);

  var myTagAuthorizer = aclAuthorizer(acl, MyTag);
  assert.error(myTagAuthorizer(rootCtx, call), 'should not error');
  assert.end();
});

test('no tags of a type - error', function(assert) {
  var MyTag = createConstructor({
    kind: kind.STRING,
    name: 'MyTag'
  });
  var myAdmin = new MyTag('Admin');
  var call = {
    localBlessings: new Blessings(undefined, 'me', undefined),
    remoteBlessings: new Blessings(undefined, 'otherKey', undefined),
    remoteBlessingStrings: ['server/alice', 'server/bob/friend'],
  };

  var acl = new Map();
  acl.set('Admin', {
    in: ['server/alice'],
    notIn: []
  });
  var tagAuthorizer = aclAuthorizer(acl, access.Tag);
  call.methodTags = [myAdmin];
  var err = tryAuthorize(rootCtx, call, tagAuthorizer);

  assert.ok(err !== null);
  assert.equal(err.id, 'v.io/v23/security/access.errNoMethodTags');
  assert.end();
});

test('multiple tags of a type - error', function(assert) {
  var call = {
    localBlessings: new Blessings(undefined, 'me', undefined),
    remoteBlessings: new Blessings(undefined, 'otherKey', undefined),
    remoteBlessingStrings: ['server/alice', 'server/bob/friend'],
  };

  var acl = new Map();
  acl.set('Admin', {
    in: ['server/alice'],
    notIn: []
  });
  var tagAuthorizer = aclAuthorizer(acl, access.Tag);
  call.methodTags = [access.Resolve, access.Debug];
  var err = tryAuthorize(rootCtx, call, tagAuthorizer);

  assert.ok(err !== null);
  assert.equal(err.id, 'v.io/v23/security/access.errMultipleMethodTags');
  assert.end();
});

test('bad acl maps - throws', function(assert) {
  assert.throws(function() {
    aclAuthorizer(null, access.Tag);
  }, 'cannot construct aclAuthorizer with null acl map');
  assert.throws(function() {
    aclAuthorizer([access.Read, access.Write], access.Tag);
  }, 'cannot construct aclAuthorizer with an array acl map');
  assert.throws(function() {
    aclAuthorizer(new Map([
      [1, {
        in: ['server/alice']
      }],
    ]), access.Tag);
  }, 'cannot construct aclAuthorizer with non-string tag acl map');

  assert.end();
});
