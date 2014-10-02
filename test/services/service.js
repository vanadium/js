var path = require('path');
var spawn = require('child_process').spawn;
var inherits = require('util').inherits;
var EE = require('events').EventEmitter;
var extend = require('xtend');
var which = require('which');
var endpointRegExp = /@.*@@\S*/;
var debug = require('debug');

var VEYRON_ROOT = process.env.VEYRON_ROOT;
var VEYRON_BINS = [
  path.join(VEYRON_ROOT, 'veyron/go/bin'),
  path.join(VEYRON_ROOT, 'roadmap/go/bin')
];
var DEFAULT_FLAGS = {
  v: 3,
  log_dir: path.resolve('tmp/log') // jshint ignore:line
};

process.env.PATH += ':' + VEYRON_BINS.join(':');

module.exports = Service;

function Service(name, env) {
  if (! (this instanceof Service)) {
    return new Service(name, env);
  }

  var service = this;

  EE.call(service);

  try {
    service.config = require('./config-' + name);
  } catch (e) {
    service.config = {};
  }

  service.name = name;
  service.arguments = flags(extend(DEFAULT_FLAGS, service.config.flags));
  service.bin = '';
  service.env = env || {};
  service.debug = debug('service:' + service.name);
}

inherits(Service, EE);

Service.prototype.spawn = function(args, options) {
  var service = this;

  args = args || service.arguments;
  options = options || { env: service.env };

  if (! VEYRON_ROOT) {
    var err = new Error('Please export $VEYRON_ROOT to proceed');
    return service.emit('error', err);
  }

  which(service.name, function(err, bin) {
    if (err) {
      return service.emit('error', notfound(service.name));
    }

    var errlog = '';

    service.bin = bin;
    service.process = spawn(bin, args, options);

    // Buffer stderr until close so that a meaningful error can be emitted
    // when a non-zero exit code is encountered.
    //
    // NOTE: All veyron bins log to stderr so this buffer will just grow
    // until that is resolved...
    if (service.process.stderr) {
      service.process.stderr.on('data', function (buffer) {
        errlog += buffer;
      });
    }

    service.process.on('close', function(code) {
      if (code === 0) {
        return;
      }

      var message = [
        'non-zero exit code: ' + code,
        'while running: ' + service.name + ' ' + args.join(' '),
        '\n',
        errlog
      ].join('\n');

      service.emit('error', new Error(message));
    });

    // mounttabled services will emit an enpoint once it comes across the
    // stderr spew.
    if (service.name === 'mounttabled') {
      service.process.stderr.on('data', function(data) {
        if (service.endpoint) {
          return;
        }

        var out = data.toString();
        var match = out.match(endpointRegExp);

        if (match) {
          service.emit('endpoint', service.endpoint = '/' + match[0]);
        }
      });
    }

    [ 'exit', 'close' ].forEach(function (name) {
        service.process.on(name, service.emit.bind(service, name));
    });

    service.emit('spawn', service.process.stdout, service.process.stderr);
  });
};

// A quick wrapper for short run execs, useful for non-deamons like the
// identity command.
Service.prototype.exec = function(command, cb) {
  var service = this;

  service
  .on('error', cb.bind(service))
  .on('spawn', cb.bind(service, null))
  .spawn(command.split(' '));
};

Service.prototype.kill = function() {
  var service = this;

  if (service.process) {
    service.process.kill.apply(service.process, arguments);
  }
};

function notfound(name) {
  var message = 'Veyron binary not found: ' + name + '\n' +
      'Please run: \n' +
      '  $VEYRON_ROOT/scripts/build/go install veyron... roadmap... \n' +
      ' path is ' + process.env.PATH;

  return new Error(message);
}

function flags(obj) {
  var args = Object.keys(obj).map(function(key){
    return ['-', key, '=', obj[key]].join('');
  });

  return args;
}