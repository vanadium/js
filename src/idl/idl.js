/**
 * @fileoverview Parses the Veyron IDL
 */

'use strict';

var vError = require('../lib/verror');
var idlHelper = {};

/**
 * Returns an array of arguments, which is an object with a type and a name.
 * @param {string} args the argument string as it appears in the idl file,
 * i.e 'a, b int' or 'int, error' for return arguments.
 * @param {string} isReturnArgs if set, treats the string as the return types
 * @return {array} an array of the arguments
 */
var parseArgs = function(args, isReturnArgs) {
  args = args.trim();
  if (args === '') {
    return [];
  }
  var parts = args.split(',');
  var outputArgs = [];
  var previousType = '';
  for (var i = parts.length - 1; i >= 0; i--) {
    var value = parts[i].trim();
    if (value === '') {
      continue;
    }
    var pieces = value.split(/\s+/);
    switch (pieces.length) {
      case 1:
        if (isReturnArgs) {
          outputArgs.push( { type: pieces[0].trim() });
        } else {
          outputArgs.push( { type: previousType, name: value });
        }
        break;
      case 2:
        previousType = pieces[1].trim();
        outputArgs.push( { type: previousType, name: pieces[0].trim() });
        break;
      default:
        throw new Error('Bad argument list ' + args);
    }
  }

  return outputArgs.reverse();
};

/**
 * A representation of an function definition in the IDL.
 * @constructor
 * @param {string} method name of the method
 * @param {string} args the args string in the idl, i.e 'a int, b string'
 * @param {string} returnArgs the return arguments in the definition.
 */
var IDLFunction = function(method, args, returnArgs) {
  this.name = method;
  this.args = parseArgs(args, false);
  var cleanedReturnArgs = returnArgs.replace('(','').replace(')','');
  this.returnArgs = parseArgs(cleanedReturnArgs, true);
};

/*
 * Regexep for method.
 */
var methodRegex = new RegExp([
    '\\s*(\\w+)',           // the method name.
    '\\(([^)]*)\\)',        // the arguments.
    '[^\\S\\n;]*',          // any non-newline whitespace.
    '(stream<\\w+,\\w+>)?', // optinal stream arguments
    '[^\\S\\n;]*',          // any non-newline whitespace.
    '(\\w+|\\([^)]*\\))?',  // optional return types,
                            // both int and (int, error) forms.
    '[^\\S\\n]*',           // any non-newline whitespace.
    '({[^}]*})?',           // the optional tags.
    '[^\\S\\n]*',           // any non-newline whitespace.
    '(;|\\n)?'              // an optional final semicolon or newline.
  ].join(''), 'g');

/**
 * Parse the contents of a veyron IDL file and pulls out the services and
 * methods for each service.
 * @param {string} file the contents of the veyron IDL file
 * @return {Object} a dictionary of services to their methods, which the number
 * of arguments the method expects.
 */
idlHelper.parseIDL = function(file) {
  var strippedFile = idlHelper.stripComments(file);
  var interfaceRegex = /type\s+(\w+)\s+interface\s*{/g;

  var endOfInterfaceRegex = /\s*}/g;

  var allInterfaces = {};

  var interfaceMatch = interfaceRegex.exec(strippedFile);

  while (interfaceMatch !== null) {
    var interfaceName = interfaceMatch[1];
    var currentInterface = {};

    /*
     * We tell the endOfInterfaceRegex and methodRegex to start matching after
     * the end of the interface start.
     */
    endOfInterfaceRegex.lastIndex = interfaceRegex.lastIndex;
    methodRegex.lastIndex = interfaceRegex.lastIndex;
    var end = endOfInterfaceRegex.exec(strippedFile);
    var method = methodRegex.exec(strippedFile);

    if (end === null) {
      throw new Error('Interface ' + interfaceName + ' has no closing brace');
    }

    // 'end' could be the end of the tags section of the method, so we see if
    // the method starts first and if it does, then we ignore this end match.
    while (method !== null && method.index < end.index) {
      var name = method[1];
      name = name[0].toLowerCase() + name.slice(1);
      var params = method[2];
      var outArgs = method[4] || '';
      currentInterface[name] = new IDLFunction(name, params, outArgs);

      // We have the endOfInterfaceRegex seek past the end of the method
      // declaration.
      endOfInterfaceRegex.lastIndex = methodRegex.lastIndex;
      end = endOfInterfaceRegex.exec(strippedFile);
      method = methodRegex.exec(strippedFile);

      if (end === null) {
        throw new Error('Interface ' + interfaceName + ' has no closing brace');
      }
    }

    allInterfaces[interfaceName] = currentInterface;
    interfaceRegex.lastIndex = endOfInterfaceRegex.lastIndex;
    interfaceMatch = interfaceRegex.exec(strippedFile);
  }
  return allInterfaces;
};

/**
 * Strips out comments.
 * @param {string} file the contents to strip the comments from
 * @return {string} the files with the comments stripped out.
 */
idlHelper.stripComments = function(file) {
  var strippedFile = '';
  var commentRegex = /\/\/.*\n|\/\*(([^*]*(\*[^\/])?)*)\*\//g;


  var match = commentRegex.exec(file);
  var pos = 0;
  while (match !== null) {
    strippedFile += file.substring(pos, match.index);
    if (match[1] === undefined || match[1].indexOf('\n') !== -1) {
      strippedFile += '\n';
    } else {
      strippedFile += ' ';
    }
    pos = match.index + match[0].length;
    match = commentRegex.exec(file);
  }

  strippedFile += file.substr(pos);
  return strippedFile;
};

/**
 * Generates an IDL wire description for a given service by iterating over the
 * methods in the service object.
 * Method names beginning with '_' are considered private and skipped.
 * Arg names beginning with '$' are not part of the idl and are filled in by
 * the veyron libraries (e.g. $context).
 * @param {object} service a description of the service. This is a map from
 * method name to method description.
 * @return {object} a representation of the idl. This must match the format of
 * JSONServiceSignature in Veyron's go code.
 */
idlHelper.generateIdlWireDescription = function(service) {
  var idlWire = {};
  var metadata = service.metadata;
  for (var methodName in metadata) {
    if (metadata.hasOwnProperty(methodName)) {
      var methodMetadata = metadata[methodName];

      var params = methodMetadata.params;
      var inArgs = [];
      for (var i = 0; i < params.length; i++) {
        var param = params[i];
        if (param[0] !== '$') {
          inArgs.push(param);
        }
      }

      idlWire[methodName] = {
        'InArgs' : inArgs,
        'NumOutArgs': methodMetadata.numReturnArgs + 1,
        'IsStreaming': methodMetadata.injections['$stream'] !== undefined
      };
    }
  }

  return idlWire;
};

/**
 * Returns an array of parameter names for a function.
 * from go/fypon (stack overflow) and based on angularjs's implementation
 * @param {function} func the function object
 * @return {string[]} list of the parameters
 */
var getParamNames = function(func) {
  // represent the function as a string and strip comments
  var fnStr = func.toString().replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg, '');
  // get the arguments from the string
  var result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).
      match(/([^\s,]+)/g);
  if (result === null) {
    result = [];
  }
  return result;
};

/**
 * Wraps a Service with annotations for each exported function.
 * @constructor
 * @param {object} service the service that is being exported.
 * @param {object} extraMetadata if provided, adds extra metadata for
 * the functions exported (such as number of return values).
 */
idlHelper.ServiceWrapper = function(service, extraMetadata) {
  this.object = service;
  this.metadata = {};
  extraMetadata = extraMetadata || {};

  for (var methodName in service) {
    if (service.hasOwnProperty(methodName) &&
        methodName.length > 0 && methodName[0] !== '_') {
      if (methodName[0] >= 'A' && methodName[0] <= 'Z') {
        var camelCaseName = methodName.charAt(0).toLowerCase() +
          methodName.slice(1);
        throw new Error('Method names must be camel case. Perhaps rename \'' +
          methodName + '\' to \'' + camelCaseName + '\'');
      }
      var method = service[methodName];
      if (typeof method === 'function') {
        var params = getParamNames(method);
        var injections = {};
        for (var i = 0; i < params.length; i++) {
          var name = params[i];
          if (name[0] === '$') {
            injections[name] = i;
          }
        }
        var metadata = {
          params: params,
          injections: injections,
          numReturnArgs: 1
        };

        // We only want to copy over the accepted metadata options.
        if (extraMetadata[methodName]) {
          var extra = extraMetadata[methodName];
          if (extra.numReturnArgs !== undefined) {
            metadata.numReturnArgs = extra.numReturnArgs;
          } else if (extra.returnArgs !== undefined) {
            metadata.numReturnArgs = extra.returnArgs.length - 1;
          }
        }

        this.metadata[methodName] = metadata;
      }
    }
  }
};

idlHelper.ServiceWrapper.prototype.validate = function(definition) {
  for (var name in definition) {
    if (definition.hasOwnProperty(name)) {
      var metadata = this.metadata[name];
      if (!metadata) {
        return new vError.BadArgError('Missing method: ' + name);
      }
      var expected = definition[name];
      var inputArgs = metadata.params.length -
          Object.keys(metadata.injections).length;
      if (inputArgs !== expected.args.length) {
        return new vError.BadArgError('Wrong number of input args for ' +
            name + ', got: ' + inputArgs + ', expected: ' +
            expected.args.length);
      }

      // TODO(bjornick): Verify streaming args.
      if (metadata.numReturnArgs !== expected.returnArgs.length - 1) {
        return new vError.BadArgError('Wrong number of output args for ' +
            name + ', got: ' + metadata.numReturnArgs + ', expected ' +
            expected.returnArgs.length - 1);
      }
    }
  }

  for (name in this.metadata) {
    if (this.metadata.hasOwnProperty(name) &&
        !definition.hasOwnProperty(name)) {
      return new vError.BadArgError('Unexpected method ' + name +
          ' implemented.');
    }
  }
  return null;
};

/**
 * Export the module
 */
module.exports = idlHelper;
