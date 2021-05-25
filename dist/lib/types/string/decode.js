"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ARBITRARY__PREFIX_LENGTH_VARINT = exports.FLOOR__PREFIX_LENGTH_ENUM_VARINT = exports.ROOF__PREFIX_LENGTH_ENUM_VARINT = exports.ROOF__PREFIX_LENGTH_8BIT_FIXED = exports.BOUNDED__PREFIX_LENGTH_ENUM_VARINT = exports.BOUNDED__PREFIX_LENGTH_8BIT_FIXED = void 0;
var assert_1 = require("assert");
var decode_1 = require("../integer/decode");
var limits_1 = require("../../utils/limits");
var STRING_ENCODING = 'utf8';
var readSharedString = function (buffer, offset, prefix, length, delta) {
    var pointerOffset = offset + prefix.bytes + length.bytes;
    var pointer = decode_1.FLOOR__ENUM_VARINT(buffer, pointerOffset, {
        minimum: 0
    });
    var stringOffset = pointerOffset - pointer.value;
    return {
        value: buffer.toString(STRING_ENCODING, stringOffset, stringOffset + length.value + delta),
        bytes: prefix.bytes + length.bytes + pointer.bytes
    };
};
var BOUNDED__PREFIX_LENGTH_8BIT_FIXED = function (buffer, offset, options) {
    assert_1.strict(options.minimum >= 0);
    assert_1.strict(options.maximum >= options.minimum);
    assert_1.strict(options.maximum - options.minimum <= limits_1.UINT8_MAX);
    var prefix = decode_1.BOUNDED_8BITS__ENUM_FIXED(buffer, offset, {
        minimum: options.minimum,
        maximum: options.maximum + 1
    });
    if (prefix.value === 0) {
        var length_1 = decode_1.BOUNDED_8BITS__ENUM_FIXED(buffer, offset + prefix.bytes, {
            minimum: options.minimum,
            maximum: options.maximum + 1
        });
        return readSharedString(buffer, offset, prefix, length_1, -1);
    }
    return {
        value: buffer.toString(STRING_ENCODING, offset + prefix.bytes, offset + prefix.bytes + prefix.value - 1),
        bytes: prefix.bytes + prefix.value - 1
    };
};
exports.BOUNDED__PREFIX_LENGTH_8BIT_FIXED = BOUNDED__PREFIX_LENGTH_8BIT_FIXED;
var BOUNDED__PREFIX_LENGTH_ENUM_VARINT = function (buffer, offset, options) {
    assert_1.strict(options.minimum >= 0);
    assert_1.strict(options.maximum >= options.minimum);
    var prefix = decode_1.BOUNDED__ENUM_VARINT(buffer, offset, {
        minimum: options.minimum,
        maximum: options.maximum + 1
    });
    if (prefix.value === 0) {
        var length_2 = decode_1.BOUNDED__ENUM_VARINT(buffer, offset + prefix.bytes, {
            minimum: options.minimum,
            maximum: options.maximum + 1
        });
        return readSharedString(buffer, offset, prefix, length_2, -1);
    }
    return {
        value: buffer.toString(STRING_ENCODING, offset + prefix.bytes, offset + prefix.bytes + prefix.value - 1),
        bytes: prefix.bytes + prefix.value - 1
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
    assert_1.strict(options.maximum >= 0);
    var prefix = decode_1.ROOF__MIRROR_ENUM_VARINT(buffer, offset, options);
    if (prefix.value === options.maximum) {
        var length_3 = decode_1.ROOF__MIRROR_ENUM_VARINT(buffer, offset + prefix.bytes, options);
        return readSharedString(buffer, offset, prefix, length_3, 1);
    }
    return {
        value: buffer.toString(STRING_ENCODING, offset + prefix.bytes, offset + prefix.bytes + prefix.value + 1),
        bytes: prefix.bytes + prefix.value + 1
    };
};
exports.ROOF__PREFIX_LENGTH_ENUM_VARINT = ROOF__PREFIX_LENGTH_ENUM_VARINT;
var FLOOR__PREFIX_LENGTH_ENUM_VARINT = function (buffer, offset, options) {
    assert_1.strict(options.minimum >= 0);
    var prefix = decode_1.FLOOR__ENUM_VARINT(buffer, offset, options);
    if (prefix.value === 0) {
        var length_4 = decode_1.FLOOR__ENUM_VARINT(buffer, offset + prefix.bytes, options);
        return readSharedString(buffer, offset, prefix, length_4, -1);
    }
    return {
        value: buffer.toString(STRING_ENCODING, offset + prefix.bytes, offset + prefix.bytes + prefix.value - 1),
        bytes: prefix.bytes + prefix.value - 1
    };
};
exports.FLOOR__PREFIX_LENGTH_ENUM_VARINT = FLOOR__PREFIX_LENGTH_ENUM_VARINT;
var ARBITRARY__PREFIX_LENGTH_VARINT = function (buffer, offset, _options) {
    return exports.FLOOR__PREFIX_LENGTH_ENUM_VARINT(buffer, offset, {
        minimum: 0
    });
};
exports.ARBITRARY__PREFIX_LENGTH_VARINT = ARBITRARY__PREFIX_LENGTH_VARINT;
