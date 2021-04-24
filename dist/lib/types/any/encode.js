"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ANY__TYPE_PREFIX = void 0;
var limits_1 = require("../../utils/limits");
var types_1 = require("./types");
var encode_1 = require("../integer/encode");
var encode_2 = require("../string/encode");
var encode_3 = require("../number/encode");
var encodeTypeTag = function (buffer, offset, tag) {
    return encode_1.BOUNDED_8BITS__ENUM_FIXED(buffer, offset, tag, {
        minimum: 0,
        maximum: 10
    });
};
var ANY__TYPE_PREFIX = function (buffer, offset, value, _options) {
    if (Array.isArray(value)) {
        throw new Error('TODO: Unimplemented');
    }
    else if (typeof value === 'object' && value !== null) {
        throw new Error('TODO: Unimplemented');
    }
    if (value === null) {
        return encodeTypeTag(buffer, offset, types_1.Type.Null);
    }
    else if (typeof value === 'boolean') {
        return encodeTypeTag(buffer, offset, value ? types_1.Type.True : types_1.Type.False);
    }
    else if (typeof value === 'string') {
        var tagBytes = encodeTypeTag(buffer, offset, types_1.Type.String);
        var valueBytes = encode_2.ARBITRARY__PREFIX_LENGTH_VARINT(buffer, offset + tagBytes, value, {});
        return tagBytes + valueBytes;
    }
    else if (Number.isInteger(value)) {
        var isPositive = value >= 0;
        var absoluteValue = isPositive ? value : Math.abs(value) - 1;
        if (absoluteValue <= limits_1.UINT8_MAX) {
            var type_1 = isPositive
                ? types_1.Type.PositiveIntegerByte : types_1.Type.NegativeIntegerByte;
            var tagBytes_1 = encodeTypeTag(buffer, offset, type_1);
            var valueBytes_1 = encode_1.BOUNDED_8BITS__ENUM_FIXED(buffer, offset + tagBytes_1, absoluteValue, {
                minimum: limits_1.UINT8_MIN,
                maximum: limits_1.UINT8_MAX
            });
            return tagBytes_1 + valueBytes_1;
        }
        var type = isPositive
            ? types_1.Type.PositiveInteger : types_1.Type.NegativeInteger;
        var tagBytes = encodeTypeTag(buffer, offset, type);
        var valueBytes = encode_1.FLOOR__ENUM_VARINT(buffer, offset + tagBytes, absoluteValue, {
            minimum: 0
        });
        return tagBytes + valueBytes;
    }
    else {
        var tagBytes = encodeTypeTag(buffer, offset, types_1.Type.Number);
        var valueBytes = encode_3.DOUBLE__IEEE764_LE(buffer, offset + tagBytes, value, {});
        return tagBytes + valueBytes;
    }
};
exports.ANY__TYPE_PREFIX = ANY__TYPE_PREFIX;
