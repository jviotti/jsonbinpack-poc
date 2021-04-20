"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ARBITRARY__PREFIX_LENGTH_VARINT = exports.FLOOR__PREFIX_LENGTH_ENUM_VARINT = exports.ROOF__PREFIX_LENGTH_8BIT_FIXED = void 0;
var assert_1 = require("assert");
var decode_1 = require("../integer/decode");
var STRING_ENCODING = 'utf8';
var ROOF__PREFIX_LENGTH_8BIT_FIXED = function (buffer, offset, maximum) {
    assert_1.strict(maximum >= 0);
    assert_1.strict(maximum <= 255);
    var length = decode_1.BOUNDED_8BITS__ENUM_FIXED(buffer, offset, 0, maximum);
    return {
        value: buffer.toString(STRING_ENCODING, length.bytes, length.bytes + length.value),
        bytes: length.bytes + length.value
    };
};
exports.ROOF__PREFIX_LENGTH_8BIT_FIXED = ROOF__PREFIX_LENGTH_8BIT_FIXED;
var FLOOR__PREFIX_LENGTH_ENUM_VARINT = function (buffer, offset, minimum) {
    assert_1.strict(minimum >= 0);
    var length = decode_1.FLOOR__ENUM_VARINT(buffer, offset, minimum);
    return {
        value: buffer.toString(STRING_ENCODING, length.bytes, length.bytes + length.value),
        bytes: length.bytes + length.value
    };
};
exports.FLOOR__PREFIX_LENGTH_ENUM_VARINT = FLOOR__PREFIX_LENGTH_ENUM_VARINT;
var ARBITRARY__PREFIX_LENGTH_VARINT = function (buffer, offset) {
    return exports.FLOOR__PREFIX_LENGTH_ENUM_VARINT(buffer, offset, 0);
};
exports.ARBITRARY__PREFIX_LENGTH_VARINT = ARBITRARY__PREFIX_LENGTH_VARINT;
