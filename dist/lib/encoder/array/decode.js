"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FLOOR_TYPED_LENGTH_PREFIX = exports.ROOF_8BITS_TYPED_LENGTH_PREFIX = exports.ROOF_TYPED_LENGTH_PREFIX = exports.BOUNDED_8BITS_TYPED_LENGTH_PREFIX = exports.BOUNDED_TYPED_LENGTH_PREFIX = exports.ROOF_8BITS_SEMITYPED_LENGTH_PREFIX = exports.ROOF_SEMITYPED_LENGTH_PREFIX = exports.FLOOR_SEMITYPED_LENGTH_PREFIX = exports.FLOOR_SEMITYPED_NO_LENGTH_PREFIX = exports.BOUNDED_SEMITYPED_LENGTH_PREFIX = exports.BOUNDED_8BITS_SEMITYPED_LENGTH_PREFIX = void 0;
var assert_1 = require("assert");
var decode_1 = require("../integer/decode");
var decode_2 = require("../any/decode");
var index_1 = require("../index");
var limits_1 = require("../../utils/limits");
var decodeArray = function (buffer, offset, bytesWritten, length, prefixEncodings, defaultEncoding) {
    var _a;
    var index = 0;
    var cursor = offset + bytesWritten;
    var result = [];
    while (index < length) {
        var encoding = (_a = prefixEncodings[index]) !== null && _a !== void 0 ? _a : defaultEncoding;
        var elementResult = typeof encoding === 'undefined'
            ? decode_2.ANY_TYPE_PREFIX(buffer, cursor, {})
            : index_1.decode(buffer, cursor, encoding);
        cursor += elementResult.bytes;
        result.push(elementResult.value);
        index += 1;
    }
    return {
        value: result,
        bytes: cursor - (offset + bytesWritten) + bytesWritten
    };
};
var BOUNDED_8BITS_SEMITYPED_LENGTH_PREFIX = function (buffer, offset, options) {
    assert_1.strict(options.maximum >= 0);
    assert_1.strict(options.minimum >= 0);
    assert_1.strict(options.maximum >= options.minimum);
    assert_1.strict(options.maximum - options.minimum <= limits_1.UINT8_MAX);
    var lengthResult = options.maximum === options.minimum
        ? {
            bytes: 0,
            value: options.maximum
        }
        : decode_1.BOUNDED_8BITS_ENUM_FIXED(buffer, offset, {
            minimum: options.minimum,
            maximum: options.maximum
        });
    return decodeArray(buffer, offset, lengthResult.bytes, lengthResult.value, options.prefixEncodings);
};
exports.BOUNDED_8BITS_SEMITYPED_LENGTH_PREFIX = BOUNDED_8BITS_SEMITYPED_LENGTH_PREFIX;
var BOUNDED_SEMITYPED_LENGTH_PREFIX = function (buffer, offset, options) {
    assert_1.strict(options.maximum >= 0);
    assert_1.strict(options.minimum >= 0);
    assert_1.strict(options.maximum >= options.minimum);
    var lengthResult = options.maximum === options.minimum
        ? {
            bytes: 0,
            value: options.maximum
        }
        : decode_1.FLOOR_ENUM_VARINT(buffer, offset, {
            minimum: options.minimum
        });
    return decodeArray(buffer, offset, lengthResult.bytes, lengthResult.value, options.prefixEncodings);
};
exports.BOUNDED_SEMITYPED_LENGTH_PREFIX = BOUNDED_SEMITYPED_LENGTH_PREFIX;
var FLOOR_SEMITYPED_NO_LENGTH_PREFIX = function (buffer, offset, options) {
    assert_1.strict(options.minimum >= 0);
    assert_1.strict(options.size >= 0);
    return decodeArray(buffer, offset, 0, options.size, options.prefixEncodings);
};
exports.FLOOR_SEMITYPED_NO_LENGTH_PREFIX = FLOOR_SEMITYPED_NO_LENGTH_PREFIX;
var FLOOR_SEMITYPED_LENGTH_PREFIX = function (buffer, offset, options) {
    assert_1.strict(options.minimum >= 0);
    var lengthResult = decode_1.FLOOR_ENUM_VARINT(buffer, offset, {
        minimum: options.minimum
    });
    return decodeArray(buffer, offset, lengthResult.bytes, lengthResult.value, options.prefixEncodings);
};
exports.FLOOR_SEMITYPED_LENGTH_PREFIX = FLOOR_SEMITYPED_LENGTH_PREFIX;
var ROOF_SEMITYPED_LENGTH_PREFIX = function (buffer, offset, options) {
    assert_1.strict(options.maximum >= 0);
    var lengthResult = decode_1.ROOF_MIRROR_ENUM_VARINT(buffer, offset, {
        maximum: options.maximum
    });
    return decodeArray(buffer, offset, lengthResult.bytes, lengthResult.value, options.prefixEncodings);
};
exports.ROOF_SEMITYPED_LENGTH_PREFIX = ROOF_SEMITYPED_LENGTH_PREFIX;
var ROOF_8BITS_SEMITYPED_LENGTH_PREFIX = function (buffer, offset, options) {
    assert_1.strict(options.maximum >= 0);
    assert_1.strict(options.maximum <= limits_1.UINT8_MAX);
    return exports.BOUNDED_8BITS_SEMITYPED_LENGTH_PREFIX(buffer, offset, {
        minimum: 0,
        maximum: options.maximum,
        prefixEncodings: options.prefixEncodings
    });
};
exports.ROOF_8BITS_SEMITYPED_LENGTH_PREFIX = ROOF_8BITS_SEMITYPED_LENGTH_PREFIX;
var BOUNDED_TYPED_LENGTH_PREFIX = function (buffer, offset, options) {
    assert_1.strict(options.maximum >= 0);
    assert_1.strict(options.minimum >= 0);
    assert_1.strict(options.maximum >= options.minimum);
    var lengthResult = options.maximum === options.minimum
        ? {
            bytes: 0,
            value: options.maximum
        }
        : decode_1.FLOOR_ENUM_VARINT(buffer, offset, {
            minimum: options.minimum
        });
    return decodeArray(buffer, offset, lengthResult.bytes, lengthResult.value, options.prefixEncodings, options.encoding);
};
exports.BOUNDED_TYPED_LENGTH_PREFIX = BOUNDED_TYPED_LENGTH_PREFIX;
var BOUNDED_8BITS_TYPED_LENGTH_PREFIX = function (buffer, offset, options) {
    assert_1.strict(options.maximum >= 0);
    assert_1.strict(options.minimum >= 0);
    assert_1.strict(options.maximum >= options.minimum);
    assert_1.strict(options.maximum - options.minimum <= limits_1.UINT8_MAX);
    var lengthResult = options.maximum === options.minimum
        ? {
            bytes: 0,
            value: options.maximum
        }
        : decode_1.BOUNDED_8BITS_ENUM_FIXED(buffer, offset, {
            minimum: options.minimum,
            maximum: options.maximum
        });
    return decodeArray(buffer, offset, lengthResult.bytes, lengthResult.value, options.prefixEncodings, options.encoding);
};
exports.BOUNDED_8BITS_TYPED_LENGTH_PREFIX = BOUNDED_8BITS_TYPED_LENGTH_PREFIX;
var ROOF_TYPED_LENGTH_PREFIX = function (buffer, offset, options) {
    assert_1.strict(options.maximum >= 0);
    var lengthResult = decode_1.ROOF_MIRROR_ENUM_VARINT(buffer, offset, {
        maximum: options.maximum
    });
    return decodeArray(buffer, offset, lengthResult.bytes, lengthResult.value, options.prefixEncodings, options.encoding);
};
exports.ROOF_TYPED_LENGTH_PREFIX = ROOF_TYPED_LENGTH_PREFIX;
var ROOF_8BITS_TYPED_LENGTH_PREFIX = function (buffer, offset, options) {
    assert_1.strict(options.maximum >= 0);
    assert_1.strict(options.maximum <= limits_1.UINT8_MAX);
    return exports.BOUNDED_8BITS_TYPED_LENGTH_PREFIX(buffer, offset, {
        minimum: 0,
        maximum: options.maximum,
        prefixEncodings: options.prefixEncodings,
        encoding: options.encoding
    });
};
exports.ROOF_8BITS_TYPED_LENGTH_PREFIX = ROOF_8BITS_TYPED_LENGTH_PREFIX;
var FLOOR_TYPED_LENGTH_PREFIX = function (buffer, offset, options) {
    assert_1.strict(options.minimum >= 0);
    var lengthResult = decode_1.FLOOR_ENUM_VARINT(buffer, offset, {
        minimum: options.minimum
    });
    return decodeArray(buffer, offset, lengthResult.bytes, lengthResult.value, options.prefixEncodings, options.encoding);
};
exports.FLOOR_TYPED_LENGTH_PREFIX = FLOOR_TYPED_LENGTH_PREFIX;
