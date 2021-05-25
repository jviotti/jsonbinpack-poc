"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ANY__TYPE_PREFIX = void 0;
var limits_1 = require("../../utils/limits");
var types_1 = require("./types");
var base_1 = require("../base");
var encode_1 = require("../integer/encode");
var encode_2 = require("../string/encode");
var encode_3 = require("../number/encode");
var encode_4 = require("../object/encode");
var encode_5 = require("../array/encode");
var encodeTypeTag = function (buffer, offset, tag, context) {
    return encode_1.BOUNDED_8BITS__ENUM_FIXED(buffer, offset, tag, {
        minimum: limits_1.UINT8_MIN,
        maximum: 11
    }, context);
};
var ANY__TYPE_PREFIX = function (buffer, offset, value, _options, context) {
    if (Array.isArray(value)) {
        var tagBytes = encodeTypeTag(buffer, offset, types_1.Type.Array, context);
        var valueBytes = encode_5.UNBOUNDED_SEMITYPED__LENGTH_PREFIX(buffer, offset + tagBytes, value, {
            prefixEncodings: []
        }, context);
        return tagBytes + valueBytes;
    }
    else if (typeof value === 'object' && value !== null) {
        var tagBytes = encodeTypeTag(buffer, offset, types_1.Type.Object, context);
        var valueBytes = encode_4.ARBITRARY_TYPED_KEYS_OBJECT(buffer, offset + tagBytes, value, {
            keyEncoding: {
                type: base_1.EncodingType.String,
                encoding: 'ARBITRARY__PREFIX_LENGTH_VARINT',
                options: {}
            },
            encoding: {
                type: base_1.EncodingType.Any,
                encoding: 'ANY__TYPE_PREFIX',
                options: {}
            }
        }, context);
        return tagBytes + valueBytes;
    }
    else if (value === null) {
        return encodeTypeTag(buffer, offset, types_1.Type.Null, context);
    }
    else if (typeof value === 'boolean') {
        return encodeTypeTag(buffer, offset, value ? types_1.Type.True : types_1.Type.False, context);
    }
    else if (typeof value === 'string') {
        var tagBytes = context.strings.has(value)
            ? 0
            : encodeTypeTag(buffer, offset, types_1.Type.String, context);
        var valueBytes = encode_2.ARBITRARY__PREFIX_LENGTH_VARINT(buffer, offset + tagBytes, value, {}, context);
        return tagBytes + valueBytes;
    }
    else if (Number.isInteger(value)) {
        var isPositive = value >= 0;
        var absoluteValue = isPositive ? value : Math.abs(value) - 1;
        if (absoluteValue <= limits_1.UINT8_MAX) {
            var type_1 = isPositive
                ? types_1.Type.PositiveIntegerByte : types_1.Type.NegativeIntegerByte;
            var tagBytes_1 = encodeTypeTag(buffer, offset, type_1, context);
            var valueBytes_1 = encode_1.BOUNDED_8BITS__ENUM_FIXED(buffer, offset + tagBytes_1, absoluteValue, {
                minimum: limits_1.UINT8_MIN,
                maximum: limits_1.UINT8_MAX
            }, context);
            return tagBytes_1 + valueBytes_1;
        }
        var type = isPositive
            ? types_1.Type.PositiveInteger : types_1.Type.NegativeInteger;
        var tagBytes = encodeTypeTag(buffer, offset, type, context);
        var valueBytes = encode_1.FLOOR__ENUM_VARINT(buffer, offset + tagBytes, absoluteValue, {
            minimum: 0
        }, context);
        return tagBytes + valueBytes;
    }
    else {
        var tagBytes = encodeTypeTag(buffer, offset, types_1.Type.Number, context);
        var valueBytes = encode_3.DOUBLE__IEEE764_LE(buffer, offset + tagBytes, value, {}, context);
        return tagBytes + valueBytes;
    }
};
exports.ANY__TYPE_PREFIX = ANY__TYPE_PREFIX;
