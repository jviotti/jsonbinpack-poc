"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ARBITRARY__PREFIX_LENGTH_VARINT = exports.FLOOR__PREFIX_LENGTH_ENUM_VARINT = exports.ROOF__PREFIX_LENGTH_ENUM_VARINT = exports.ROOF__PREFIX_LENGTH_8BIT_FIXED = exports.BOUNDED__PREFIX_LENGTH_ENUM_VARINT = exports.BOUNDED__PREFIX_LENGTH_8BIT_FIXED = void 0;
var assert_1 = require("assert");
var decode_1 = require("../integer/decode");
var limits_1 = require("../../utils/limits");
var STRING_ENCODING = 'utf8';
var BOUNDED__PREFIX_LENGTH_8BIT_FIXED = function (buffer, offset, options) {
    assert_1.strict(options.minimum >= 0);
    assert_1.strict(options.maximum >= options.minimum);
    assert_1.strict(options.maximum - options.minimum <= limits_1.UINT8_MAX);
    var length = decode_1.BOUNDED_8BITS__ENUM_FIXED(buffer, offset, options);
    return {
        value: buffer.toString(STRING_ENCODING, length.bytes, length.bytes + length.value),
        bytes: length.bytes + length.value
    };
};
exports.BOUNDED__PREFIX_LENGTH_8BIT_FIXED = BOUNDED__PREFIX_LENGTH_8BIT_FIXED;
var BOUNDED__PREFIX_LENGTH_ENUM_VARINT = function (buffer, offset, options) {
    assert_1.strict(options.minimum >= 0);
    assert_1.strict(options.maximum >= options.minimum);
    var length = decode_1.BOUNDED__ENUM_VARINT(buffer, offset, options);
    return {
        value: buffer.toString(STRING_ENCODING, length.bytes, length.bytes + length.value),
        bytes: length.bytes + length.value
    };
};
exports.BOUNDED__PREFIX_LENGTH_ENUM_VARINT = BOUNDED__PREFIX_LENGTH_ENUM_VARINT;
var ROOF__PREFIX_LENGTH_8BIT_FIXED = function (buffer, offset, options) {
    assert_1.strict(options.maximum >= 0);
    assert_1.strict(options.maximum <= limits_1.UINT8_MAX);
    return exports.BOUNDED__PREFIX_LENGTH_8BIT_FIXED(buffer, offset, {
        minimum: 0,
        maximum: options.maximum
    });
};
exports.ROOF__PREFIX_LENGTH_8BIT_FIXED = ROOF__PREFIX_LENGTH_8BIT_FIXED;
var ROOF__PREFIX_LENGTH_ENUM_VARINT = function (buffer, offset, options) {
    return exports.BOUNDED__PREFIX_LENGTH_ENUM_VARINT(buffer, offset, {
        minimum: 0,
        maximum: options.maximum
    });
};
exports.ROOF__PREFIX_LENGTH_ENUM_VARINT = ROOF__PREFIX_LENGTH_ENUM_VARINT;
var FLOOR__PREFIX_LENGTH_ENUM_VARINT = function (buffer, offset, options) {
    assert_1.strict(options.minimum >= 0);
    var length = decode_1.FLOOR__ENUM_VARINT(buffer, offset, options);
    return {
        value: buffer.toString(STRING_ENCODING, offset + length.bytes, offset + length.bytes + length.value),
        bytes: length.bytes + length.value
    };
};
exports.FLOOR__PREFIX_LENGTH_ENUM_VARINT = FLOOR__PREFIX_LENGTH_ENUM_VARINT;
var ARBITRARY__PREFIX_LENGTH_VARINT = function (buffer, offset, _options) {
    return exports.FLOOR__PREFIX_LENGTH_ENUM_VARINT(buffer, offset, {
        minimum: 0
    });
};
exports.ARBITRARY__PREFIX_LENGTH_VARINT = ARBITRARY__PREFIX_LENGTH_VARINT;
