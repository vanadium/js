/**
 * @fileoverview Tests for registry.js
 */

var test = require('prova');

var registry = require('./../../src/vdl/registry.js');
var registryMultipleRequire = require('./../../src/vdl/registry.js');
var createConstructor = require('./../../src/vdl/create-constructor.js');

var Kind = require('./../../src/vdl/kind.js');
var Type = require('./../../src/vdl/type.js');

function createNamedType(name, kind) {
  return new Type({
    name: name,
    kind: kind
  });
}

test('_addConstructor', function(t) {
  var foo = createNamedType('foo', Kind.FLOAT32);
  var boo = createNamedType('boo', Kind.BOOL);

  // Unique types do not throw.
  t.doesNotThrow(
    registry._addConstructor.bind(registry, foo, 'bar'),
    'add unique type => does not throw'
  );
  t.doesNotThrow(
    registry._addConstructor.bind(registry, boo, 'far'),
    'add unique type => does not throw'
  );

  // Duplicate types do throw.
  t.throws(
    registry._addConstructor.bind(registry, boo, 'bar'),
    'add duplicate type => throws'
  );
  t.end();
});

test('_lookupConstructor', function(t) {
  var notHere = createNamedType('noo', Kind.STRING);

  // A missing type gets null.
  t.equal(registry._lookupConstructor(notHere), null,
    'lookup unused type => null');

  // An added type gets its constructor back.
  var type = createNamedType('through', Kind.INT64);
  var constructor = 'czar';
  registry._addConstructor(type, constructor);
  t.equal(registry._lookupConstructor(type), constructor,
    'add(A, B) => lookup(A) => get B');

  // If we add another type, we get its constructor back instead.
  var type2 = createNamedType('loo', Kind.UINT32);
  var constructor2 = 'jar';
  registry._addConstructor(type2, constructor2);
  t.equal(registry._lookupConstructor(type2), constructor2,
    'add(C, D) => lookup(C) => get D');

  // The first added type still gets its constructor back too.
  t.equal(registry._lookupConstructor(type), constructor,
    'Can add and lookup multiple constructors');

  t.end();
});

test('multiple require', function(t) {
  var type = createNamedType('glue', Kind.STRUCT);
  var constructor = 'car';
  registry._addConstructor(type, constructor);
  t.equals(registryMultipleRequire._lookupConstructor(type), constructor,
    'All registry are the same singleton.');
  t.end();
});

test('lookupOrCreateConstructor', function(t) {
  var firstType = createNamedType('few', Kind.INT32);
  var Constructor = registry.lookupOrCreateConstructor(firstType);
  var SameConstructor = registry.lookupOrCreateConstructor(firstType);
  t.equals(Constructor, SameConstructor);
  t.deepEquals(new Constructor(), new (createConstructor(firstType))());

  var secondType = createNamedType('chew', Kind.STRING);
  var SecondConstructor = registry.lookupOrCreateConstructor(secondType);
  t.notEquals(Constructor, SecondConstructor);
  t.deepEquals(new SecondConstructor(), new (createConstructor(secondType))());
  t.end();
});
