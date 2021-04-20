"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ARBITRARY__PREFIX_LENGTH_VARINT = exports.FLOOR__PREFIX_LENGTH_ENUM_VARINT = exports.ROOF__PREFIX_LENGTH_ENUM_VARINT = exports.ROOF__PREFIX_LENGTH_8BIT_FIXED = void 0;
var assert_1 = require("assert");
var encode_1 = require("../integer/encode");
var STRING_ENCODING = 'utf8';
var ROOF__PREFIX_LENGTH_8BIT_FIXED = function (buffer, offset, value, maximum) {
    assert_1.strict(maximum >= 0);
    assert_1.strict(maximum <= 255);
    var length = Buffer.byteLength(value, STRING_ENCODING);
    var bytesWritten = encode_1.BOUNDED_8BITS__ENUM_FIXED(buffer, offset, length, 0, maximum);
    return buffer.write(value, offset + bytesWritten, length, STRING_ENCODING) + bytesWritten;
};
exports.ROOF__PREFIX_LENGTH_8BIT_FIXED = ROOF__PREFIX_LENGTH_8BIT_FIXED;
var ROOF__PREFIX_LENGTH_ENUM_VARINT = function (buffer, offset, value, maximum) {
    assert_1.strict(maximum >= 0);
    var length = Buffer.byteLength(value, STRING_ENCODING);
    var bytesWritten = encode_1.BOUNDED__ENUM_VARINT(buffer, offset, length, 0, maximum);
    return buffer.write(value, offset + bytesWritten, length, STRING_ENCODING) + bytesWritten;
};
exports.ROOF__PREFIX_LENGTH_ENUM_VARINT = ROOF__PREFIX_LENGTH_ENUM_VARINT;
var FLOOR__PREFIX_LENGTH_ENUM_VARINT = function (buffer, offset, value, minimum) {
    assert_1.strict(minimum >= 0);
    var length = Buffer.byteLength(value, STRING_ENCODING);
    assert_1.strict(length >= minimum);
    var bytesWritten = encode_1.FLOOR__ENUM_VARINT(buffer, offset, length, minimum);
    return buffer.write(value, offset + bytesWritten, length, STRING_ENCODING) + bytesWritten;
};
exports.FLOOR__PREFIX_LENGTH_ENUM_VARINT = FLOOR__PREFIX_LENGTH_ENUM_VARINT;
var ARBITRARY__PREFIX_LENGTH_VARINT = function (buffer, offset, value) {
    return exports.FLOOR__PREFIX_LENGTH_ENUM_VARINT(buffer, offset, value, 0);
};
exports.ARBITRARY__PREFIX_LENGTH_VARINT = ARBITRARY__PREFIX_LENGTH_VARINT;
