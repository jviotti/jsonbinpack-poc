"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ANY__TYPE_PREFIX = void 0;
var limits_1 = require("../../utils/limits");
var base_1 = require("../base");
var decode_1 = require("../integer/decode");
var decode_2 = require("../string/decode");
var decode_3 = require("../number/decode");
var decode_4 = require("../object/decode");
var decode_5 = require("../array/decode");
var types_1 = require("./types");
var ANY__TYPE_PREFIX = function (buffer, offset, _options) {
    var tag = decode_1.BOUNDED_8BITS__ENUM_FIXED(buffer, offset, {
        minimum: limits_1.UINT8_MIN,
        maximum: 10
    });
    if (tag.value === types_1.Type.Array) {
        var result = decode_5.UNBOUNDED_SEMITYPED__LENGTH_PREFIX(buffer, offset + tag.bytes, {
            prefixEncodings: []
        });
        return {
            value: result.value,
            bytes: tag.bytes + result.bytes
        };
    }
    else if (tag.value === types_1.Type.Object) {
        var result = decode_4.ARBITRARY_TYPED_KEYS_OBJECT(buffer, offset + tag.bytes, {
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
        });
        return {
            value: result.value,
            bytes: tag.bytes + result.bytes
        };
    }
    else if (tag.value === types_1.Type.Null) {
        return {
            value: null,
            bytes: tag.bytes
        };
    }
    else if (tag.value === types_1.Type.True) {
        return {
            value: true,
            bytes: tag.bytes
        };
    }
    else if (tag.value === types_1.Type.False) {
        return {
            value: false,
            bytes: tag.bytes
        };
    }
    else if (tag.value === types_1.Type.String) {
        var result = decode_2.ARBITRARY__PREFIX_LENGTH_VARINT(buffer, offset + tag.bytes, {});
        return {
            value: result.value,
            bytes: tag.bytes + result.bytes
        };
    }
    else if (tag.value === types_1.Type.PositiveInteger) {
        var result = decode_1.FLOOR__ENUM_VARINT(buffer, offset + tag.bytes, {
            minimum: 0
        });
        return {
            value: result.value,
            bytes: tag.bytes + result.bytes
        };
    }
    else if (tag.value === types_1.Type.NegativeInteger) {
        var result = decode_1.FLOOR__ENUM_VARINT(buffer, offset + tag.bytes, {
            minimum: 0
        });
        return {
            value: (result.value + 1) * -1,
            bytes: tag.bytes + result.bytes
        };
    }
    else if (tag.value === types_1.Type.PositiveIntegerByte) {
        var result = decode_1.BOUNDED_8BITS__ENUM_FIXED(buffer, offset + tag.bytes, {
            minimum: limits_1.UINT8_MIN,
            maximum: limits_1.UINT8_MAX
        });
        return {
            value: result.value,
            bytes: tag.bytes + result.bytes
        };
    }
    else if (tag.value === types_1.Type.NegativeIntegerByte) {
        var result = decode_1.BOUNDED_8BITS__ENUM_FIXED(buffer, offset + tag.bytes, {
            minimum: limits_1.UINT8_MIN,
            maximum: limits_1.UINT8_MAX
        });
        return {
            value: (result.value + 1) * -1,
            bytes: tag.bytes + result.bytes
        };
    }
    else {
        var result = decode_3.DOUBLE__IEEE764_LE(buffer, offset + tag.bytes, {});
        return {
            value: result.value,
            bytes: tag.bytes + result.bytes
        };
    }
};
exports.ANY__TYPE_PREFIX = ANY__TYPE_PREFIX;
