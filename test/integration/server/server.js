/**
 * @fileoverview Integration tests for publish, register, stop
 *
 * Grunt's subtask_setupIntegrationTestEnvironment should spawn these servers
 * before running the tests. See Gruntfile's test target for details.
 *
 * Runs in both browser and NodeJS.
 *
 * Only the public "veyron" module is available for integration tests.
 * All globals (veyron, expect, testconfig) are injected by test runners.
 */
describe('Server', function(done) {

  var veyronConfig = {
    'proxy': testconfig['WSPR_SERVER_URL'],
    'identityServer': testconfig['IDENTITY_SERVER_URL'],
    'logLevel': testconfig['LOG_LEVEL']
  };

  var veyron = new Veyron(veyronConfig);

  var greeter = {
    sayHi: function() {
      console.log('Hello');
    }
  };

  var repeater = {
    say: function(t) {
      console.log(t);
    }
  };

  it('Should get an endpoint after publish', function() {
    var server = veyron.newServer();

    var endpoint = server.register('Hi', greeter).then(function() {
      return server.publish('tv');
    });

    return expect(endpoint).to.eventually.have.string('@1@tcp@127.0.0.1');
  });

  it('Should get an endpoint after publish with callback', function(done) {
    var server = veyron.newServer();

    server.register('Hi', greeter, function registerDone(e) {
      if (e) {
        done(e);
      } else {
        server.publish('tv', function publishDone(e, endpoint) {
          expect(endpoint).to.have.string('@1@tcp@127.0.0.1');
          done();
        });
      }
    });
  });

  it('Should be able to register multiple services', function() {
    var server = veyron.newServer();

    var endpoint = server.register('Hi', greeter).then(function() {
      return server.register('Echo', repeater);
    }).then(function() {
      return server.publish('tv');
    });

    return expect(endpoint).to.eventually.have.string('@1@tcp@127.0.0.1');
  });

  it('Should be able to publish without registering anything', function() {
    var server = veyron.newServer();

    var endpoint = server.publish('my/name/space');

    return expect(endpoint).to.eventually.have.string('@1@tcp@127.0.0.1');
  });

  it('Should get an error registering the same name twice', function() {
    var server = veyron.newServer();

    var endpoint = server.register('Hi', greeter).then(function() {
      return server.register('Hi', repeater);
    });

    return expect(endpoint).to.eventually.be.rejected;
  });

  it('Should succeed publishing the same name twice', function() {
    var server = veyron.newServer();

    var endpoint = server.publish('tv').then(function() {
      return server.publish('tv');
    });

    return expect(endpoint).to.eventually.have.string('@1@tcp@127.0.0.1');
  });

  //TODO(aghassemi) tests and implementation for:
  // Publishing multiple times under different names
  // Registering after publishing

});
