"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIntegerEncoding = exports.getIntegerStates = void 0;
var assert_1 = require("assert");
var lodash_1 = require("lodash");
var encoder_1 = require("../encoder");
var limits_1 = require("../utils/limits");
var getIntegerStates = function (schema, level) {
    var encoding = exports.getIntegerEncoding(schema, level);
    if (encoding.encoding === 'BOUNDED__ENUM_VARINT' ||
        encoding.encoding === 'BOUNDED_8BITS__ENUM_FIXED') {
        if (encoding.options.maximum - encoding.options.minimum > limits_1.UINT8_MAX) {
            return encoding.options.maximum - encoding.options.minimum + 1;
        }
        return lodash_1.range(encoding.options.minimum, encoding.options.maximum + 1);
    }
    else if (encoding.encoding === 'BOUNDED_MULTIPLE__ENUM_VARINT' ||
        encoding.encoding === 'BOUNDED_MULTIPLE_8BITS__ENUM_FIXED') {
        var absoluteMultiplier_1 = Math.abs(encoding.options.multiplier);
        var closestMinimumMultiple = Math.ceil(encoding.options.minimum / absoluteMultiplier_1) * absoluteMultiplier_1;
        var closestMaximumMultiple = Math.ceil(encoding.options.maximum / -absoluteMultiplier_1) * -absoluteMultiplier_1;
        var enumMinimum = closestMinimumMultiple / absoluteMultiplier_1;
        var enumMaximum = closestMaximumMultiple / absoluteMultiplier_1;
        if (enumMaximum - enumMinimum > limits_1.UINT8_MAX) {
            return enumMaximum - enumMinimum + 1;
        }
        return lodash_1.range(enumMinimum, enumMaximum + 1).map(function (value) {
            return value * absoluteMultiplier_1;
        });
    }
    return Infinity;
};
exports.getIntegerStates = getIntegerStates;
var getIntegerEncoding = function (schema, _level) {
    assert_1.strict(typeof schema.minimum === 'undefined' ||
        typeof schema.maximum === 'undefined' ||
        schema.maximum >= schema.minimum);
    if (typeof schema.minimum !== 'undefined' &&
        typeof schema.maximum !== 'undefined' && typeof schema.multipleOf !== 'undefined') {
        var absoluteMultiplier = Math.abs(schema.multipleOf);
        var closestMinimumMultiple = Math.ceil(schema.minimum / absoluteMultiplier) * absoluteMultiplier;
        var closestMaximumMultiple = Math.ceil(schema.maximum / -absoluteMultiplier) * -absoluteMultiplier;
        var enumMinimum = closestMinimumMultiple / absoluteMultiplier;
        var enumMaximum = closestMaximumMultiple / absoluteMultiplier;
        return {
            type: encoder_1.EncodingType.Integer,
            encoding: enumMaximum - enumMinimum <= limits_1.UINT8_MAX
                ? 'BOUNDED_MULTIPLE_8BITS__ENUM_FIXED'
                : 'BOUNDED_MULTIPLE__ENUM_VARINT',
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
            type: encoder_1.EncodingType.Integer,
            encoding: (schema.maximum - schema.minimum <= limits_1.UINT8_MAX)
                ? 'BOUNDED_8BITS__ENUM_FIXED' : 'BOUNDED__ENUM_VARINT',
            options: {
                minimum: schema.minimum,
                maximum: schema.maximum
            }
        };
    }
    else if (typeof schema.minimum !== 'undefined' &&
        typeof schema.maximum === 'undefined' && typeof schema.multipleOf !== 'undefined') {
        return {
            type: encoder_1.EncodingType.Integer,
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
            type: encoder_1.EncodingType.Integer,
            encoding: 'FLOOR__ENUM_VARINT',
            options: {
                minimum: schema.minimum
            }
        };
    }
    else if (typeof schema.minimum === 'undefined' &&
        typeof schema.maximum !== 'undefined' && typeof schema.multipleOf !== 'undefined') {
        return {
            type: encoder_1.EncodingType.Integer,
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
            type: encoder_1.EncodingType.Integer,
            encoding: 'ROOF__MIRROR_ENUM_VARINT',
            options: {
                maximum: schema.maximum
            }
        };
    }
    else if (typeof schema.minimum === 'undefined' &&
        typeof schema.maximum === 'undefined' && typeof schema.multipleOf !== 'undefined') {
        return {
            type: encoder_1.EncodingType.Integer,
            encoding: 'ARBITRARY_MULTIPLE__ZIGZAG_VARINT',
            options: {
                multiplier: schema.multipleOf
            }
        };
    }
    return {
        type: encoder_1.EncodingType.Integer,
        encoding: 'ARBITRARY__ZIGZAG_VARINT',
        options: {}
    };
};
exports.getIntegerEncoding = getIntegerEncoding;
