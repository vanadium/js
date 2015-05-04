// Copyright 2015 The Vanadium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

/**
 * @fileoverview Represents a read stream of VOM messages backed by a byte
 * array.
 * @private
 */

module.exports = ByteStreamMessageReader;

var RawVomReader = require('./raw-vom-reader.js');
var TypeUtil = require('../vdl/type-util.js');

/**
 * Create a VOM message reader backed by a byte stream.
 * @param {Uint8Array} bytes The initial byte stream.
 * @constructor
 * @memberof module:vanadium.vom
 */
function ByteStreamMessageReader(bytes) {
  this.rawReader = new RawVomReader(bytes);
  var header = this.rawReader._readRawBytes(1);
  if (header[0] !== 0x80) {
    throw new Error('Improperly formatted bytes. Must start with 0x80');
  }
}

/**
 * Get the the type of the next value message.
 * @private
 * @param {TypeDecoder} typeDecoder The current type decoder.
 * @return {Type} The type of the next message or null if the stream has ended.
 */
ByteStreamMessageReader.prototype.nextMessageType = function(typeDecoder) {
  while (true) {
    var typeId;
    try {
      typeId = this.rawReader.readInt();
    } catch (error) {
      // Hopefully EOF.
      // TODO(bprosnitz) Make this a more accurate check.
      return null;
    }
    if (typeId < 0) {
      // Type message.
      var len = this.rawReader.readUint();
      var body = this.rawReader._readRawBytes(len);
      typeDecoder.defineType(-typeId, body);
    } else {
      // Value message.
      var type = typeDecoder.lookupType(typeId);
      if (TypeUtil.shouldSendLength(type)) {
        // length
        this.rawReader.readUint();
      }
      return type;
    }
  }
};

ByteStreamMessageReader.prototype.clear = function() {
  this.rawReader = null;
};

ByteStreamMessageReader.prototype.addBytes = function(bytes) {
  // TODO(bjornick): Implement a real stream reader.
  if (this.rawReader && this.rawReader.hasData()) {
    throw new Error('Can\'t addBytes if all the previous bytes ' +
                    'haven\'t been read');
  }
  this.rawReader = new RawVomReader(bytes);
};