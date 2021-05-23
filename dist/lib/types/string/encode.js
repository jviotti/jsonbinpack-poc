"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ARBITRARY__PREFIX_LENGTH_VARINT = exports.FLOOR__PREFIX_LENGTH_ENUM_VARINT = exports.ROOF__PREFIX_LENGTH_ENUM_VARINT = exports.ROOF__PREFIX_LENGTH_8BIT_FIXED = exports.BOUNDED__PREFIX_LENGTH_ENUM_VARINT = exports.BOUNDED__PREFIX_LENGTH_8BIT_FIXED = void 0;
var assert_1 = require("assert");
var encode_1 = require("../integer/encode");
var limits_1 = require("../../utils/limits");
var STRING_ENCODING = 'utf8';
var BOUNDED__PREFIX_LENGTH_8BIT_FIXED = function (buffer, offset, value, options) {
    assert_1.strict(options.minimum >= limits_1.UINT8_MIN);
    assert_1.strict(options.maximum >= 0);
    assert_1.strict(options.maximum >= options.minimum);
    assert_1.strict(options.maximum - options.minimum <= limits_1.UINT8_MAX - 1);
    var length = Buffer.byteLength(value, STRING_ENCODING);
    assert_1.strict(length <= options.maximum);
    var bytesWritten = encode_1.BOUNDED_8BITS__ENUM_FIXED(buffer, offset, length + 1, {
        minimum: options.minimum,
        maximum: options.maximum + 1
    });
    return buffer.write(value, offset + bytesWritten, length, STRING_ENCODING) + bytesWritten;
};
exports.BOUNDED__PREFIX_LENGTH_8BIT_FIXED = BOUNDED__PREFIX_LENGTH_8BIT_FIXED;
var BOUNDED__PREFIX_LENGTH_ENUM_VARINT = function (buffer, offset, value, options) {
    assert_1.strict(options.minimum >= 0);
    assert_1.strict(options.minimum <= options.maximum);
    assert_1.strict(options.maximum >= 0);
    var length = Buffer.byteLength(value, STRING_ENCODING);
    assert_1.strict(length >= options.minimum);
    assert_1.strict(length <= options.maximum);
    var bytesWritten = encode_1.BOUNDED__ENUM_VARINT(buffer, offset, length + 1, {
        minimum: options.minimum,
        maximum: options.maximum + 1
    });
    return buffer.write(value, offset + bytesWritten, length, STRING_ENCODING) + bytesWritten;
};
exports.BOUNDED__PREFIX_LENGTH_ENUM_VARINT = BOUNDED__PREFIX_LENGTH_ENUM_VARINT;
var ROOF__PREFIX_LENGTH_8BIT_FIXED = function (buffer, offset, value, options) {
    assert_1.strict(options.maximum >= 0);
    assert_1.strict(options.maximum <= limits_1.UINT8_MAX - 1);
    return exports.BOUNDED__PREFIX_LENGTH_8BIT_FIXED(buffer, offset, value, {
        minimum: 0,
        maximum: options.maximum
    });
};
exports.ROOF__PREFIX_LENGTH_8BIT_FIXED = ROOF__PREFIX_LENGTH_8BIT_FIXED;
var ROOF__PREFIX_LENGTH_ENUM_VARINT = function (buffer, offset, value, options) {
    var length = Buffer.byteLength(value, STRING_ENCODING);
    assert_1.strict(options.maximum >= 0);
    assert_1.strict(length <= options.maximum);
    var bytesWritten = encode_1.ROOF__MIRROR_ENUM_VARINT(buffer, offset, length - 1, options);
    return buffer.write(value, offset + bytesWritten, length, STRING_ENCODING) + bytesWritten;
};
exports.ROOF__PREFIX_LENGTH_ENUM_VARINT = ROOF__PREFIX_LENGTH_ENUM_VARINT;
var FLOOR__PREFIX_LENGTH_ENUM_VARINT = function (buffer, offset, value, options) {
    assert_1.strict(options.minimum >= 0);
    var length = Buffer.byteLength(value, STRING_ENCODING);
    assert_1.strict(length >= options.minimum);
    var bytesWritten = encode_1.FLOOR__ENUM_VARINT(buffer, offset, length + 1, options);
    return buffer.write(value, offset + bytesWritten, length, STRING_ENCODING) + bytesWritten;
};
exports.FLOOR__PREFIX_LENGTH_ENUM_VARINT = FLOOR__PREFIX_LENGTH_ENUM_VARINT;
var ARBITRARY__PREFIX_LENGTH_VARINT = function (buffer, offset, value, _options) {
    return exports.FLOOR__PREFIX_LENGTH_ENUM_VARINT(buffer, offset, value, {
        minimum: 0
    });
};
exports.ARBITRARY__PREFIX_LENGTH_VARINT = ARBITRARY__PREFIX_LENGTH_VARINT;
