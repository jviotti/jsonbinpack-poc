"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIntegerEncoding = void 0;
var assert_1 = require("assert");
var limits_1 = require("../../utils/limits");
var getIntegerEncoding = function (schema) {
    assert_1.strict(typeof schema.minimum === 'undefined' ||
        typeof schema.maximum === 'undefined' ||
        schema.maximum >= schema.minimum);
    if (typeof schema.minimum !== 'undefined' &&
        typeof schema.maximum !== 'undefined' && typeof schema.multipleOf !== 'undefined') {
        return {
            encoding: 'BOUNDED_MULTIPLE__ENUM_VARINT',
            options: {
                minimum: schema.minimum,
                maximum: schema.maximum,
                multiplier: schema.multipleOf
            }
        };
    }
    else if (typeof schema.minimum !== 'undefined' &&
        typeof schema.maximum !== 'undefined' && !('multipleOf' in schema)) {
        return {
            encoding: (schema.maximum - schema.minimum <= limits_1.UINT8_MAX)
                ? 'BOUNDED_8BITS__ENUM_FIXED' : 'BOUNDED__ENUM_VARINT',
            options: {
                minimum: schema.minimum,
                maximum: schema.maximum,
            }
        };
    }
    else if (typeof schema.minimum !== 'undefined' &&
        typeof schema.maximum === 'undefined' && typeof schema.multipleOf !== 'undefined') {
        return {
            encoding: 'FLOOR_MULTIPLE__ENUM_VARINT',
            options: {
                minimum: schema.minimum,
                multiplier: schema.multipleOf
            }
        };
    }
    else if (typeof schema.minimum !== 'undefined' &&
        typeof schema.maximum === 'undefined' && !('multipleOf' in schema)) {
        return {
            encoding: 'FLOOR__ENUM_VARINT',
            options: {
                minimum: schema.minimum
            }
        };
    }
    else if (typeof schema.minimum === 'undefined' &&
        typeof schema.maximum !== 'undefined' && typeof schema.multipleOf !== 'undefined') {
        return {
            encoding: 'ROOF_MULTIPLE__MIRROR_ENUM_VARINT',
            options: {
                maximum: schema.maximum,
                multiplier: schema.multipleOf
            }
        };
    }
    else if (typeof schema.minimum === 'undefined' &&
        typeof schema.maximum !== 'undefined' && !('multipleOf' in schema)) {
        return {
            encoding: 'ROOF__MIRROR_ENUM_VARINT',
            options: {
                maximum: schema.maximum
            }
        };
    }
    else if (typeof schema.minimum === 'undefined' &&
        typeof schema.maximum === 'undefined' && typeof schema.multipleOf !== 'undefined') {
        return {
            encoding: 'ARBITRARY_MULTIPLE__ZIGZAG_VARINT',
            options: {
                multiplier: schema.multipleOf
            }
        };
    }
    else {
        return {
            encoding: 'ARBITRARY__ZIGZAG_VARINT',
            options: {}
        };
    }
};
exports.getIntegerEncoding = getIntegerEncoding;
