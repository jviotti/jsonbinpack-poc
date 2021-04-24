"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ANY__TYPE_PREFIX = void 0;
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
        if (value >= 0) {
            if (value <= 255) {
                var tagBytes_1 = encodeTypeTag(buffer, offset, types_1.Type.PositiveIntegerByte);
                var valueBytes_1 = encode_1.BOUNDED_8BITS__ENUM_FIXED(buffer, offset + tagBytes_1, value, {
                    minimum: 0,
                    maximum: 255
                });
                return tagBytes_1 + valueBytes_1;
            }
            var tagBytes_2 = encodeTypeTag(buffer, offset, types_1.Type.PositiveInteger);
            var valueBytes_2 = encode_1.FLOOR__ENUM_VARINT(buffer, offset + tagBytes_2, value, {
                minimum: 0
            });
            return tagBytes_2 + valueBytes_2;
        }
        var absoluteValue = Math.abs(value) - 1;
        if (absoluteValue <= 255) {
            var tagBytes_3 = encodeTypeTag(buffer, offset, types_1.Type.NegativeIntegerByte);
            var valueBytes_3 = encode_1.BOUNDED_8BITS__ENUM_FIXED(buffer, offset + tagBytes_3, absoluteValue, {
                minimum: 0,
                maximum: 255
            });
            return tagBytes_3 + valueBytes_3;
        }
        var tagBytes = encodeTypeTag(buffer, offset, types_1.Type.NegativeInteger);
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
