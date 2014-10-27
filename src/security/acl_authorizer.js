/**
 * @fileoverview The ACL authorizer
 */

var blessingMatches = require('./blessing_matching');
var vError = require('./../lib/verror');

module.exports = authorizer;

var errACL = new vError.NoAccessError('acl authorization failed');

/**
 * An access control list.
 * @typedef ACL
 * @type {Object}
 * @property {Object} in A map of blessing patterns to a list of labels that
 * the pattern is authorized for.  An example would be:
 * {
 *   'foo/bar': [Read, Write],
 *   'foo': [Read, Write, Admin],
 * }
 * This means that any 'foo/bar' has access to the read/write acces and foo
 * has read, write, and admin access.
 * @property {Object} notIn A map of principala patterns to a list of labels
 * they are disallowed for.
 */

/**
 * The ACL authorizer.
 * @param {ACL} acl The set of acls to apply.
 * @return {Authorize} An authorizer that applies the acls.
 */
function authorizer(acl) {
  return function authorize(ctx) {
    // If the remoteId is ourselves (i.e a self rpc), then we
    // always authorize.
    if (ctx.localId && ctx.remoteId &&
        ctx.localId.publicKey === ctx.remoteId.publicKey) {
      return null;
    }
    var remoteNames = ctx.remoteId.names;
    for (var i = 0; i < remoteNames.length; i++) {
      if (matchesACL(remoteNames[i], ctx.label, acl)) {
        return null;
      }
    }
    return errACL;
  };
}

// Returns whether name passed in has permission for the passed in
// label.
function matchesACL(name, label, acl) {
  // The set of labels that are allowed for
  // the given names.
  var pattern;
  var patLabels;
  var isAllowed = false;

  // Add all the inclusive patterns.
  for (pattern in acl.in) {
    if (!acl.in.hasOwnProperty(pattern)) {
      continue;
    }
    patLabels = acl.in[pattern];
    if (blessingMatches(name, pattern)) {
      if (patLabels.indexOf(label) !== -1) {
        isAllowed = true;
        break;
      }
    }
  }

  // If the names didn't match of the in patterns, then they are
  // rejected.
  if (!isAllowed) {
    return false;
  }

  for (pattern in acl.notIn) {
    if (!acl.notIn.hasOwnProperty(pattern)) {
      continue;
    }
    if (pattern.lastIndexOf('...') === pattern.length - 4) {
      pattern = pattern.substr(0, pattern.length - 3);
    }
    patLabels = acl.notIn[pattern];
    // We flip name and pattern, because we want to match any blessing
    // that could be derived from the pattern in the map.
    if (blessingMatches(pattern, name)) {
      if (patLabels.indexOf(label) !== -1) {
        return false;
      }
    }
  }

  return true;
}