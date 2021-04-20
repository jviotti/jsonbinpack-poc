"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ARBITRARY__PREFIX_LENGTH_VARINT = void 0;
var encode_1 = require("../integer/encode");
var STRING_ENCODING = 'utf8';
var ARBITRARY__PREFIX_LENGTH_VARINT = function (buffer, offset, value) {
    var length = Buffer.byteLength(value, STRING_ENCODING);
    var bytesWritten = encode_1.FLOOR__ENUM_VARINT(buffer, offset, length, 0);
    return buffer.write(value, offset + bytesWritten, length, STRING_ENCODING) + bytesWritten;
};
exports.ARBITRARY__PREFIX_LENGTH_VARINT = ARBITRARY__PREFIX_LENGTH_VARINT;
