"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIntegerEncoding = exports.getIntegerStates = void 0;
var assert_1 = require("assert");
var lodash_1 = require("lodash");
var encoder_1 = require("../encoder");
var limits_1 = require("../utils/limits");
var getIntegerStates = function (schema) {
    var _a;
    if (typeof schema.maximum === 'number' &&
        typeof schema.minimum === 'number') {
        var absoluteMultiplier_1 = Math.abs((_a = schema.multipleOf) !== null && _a !== void 0 ? _a : 1);
        var enumMinimum = Math.ceil(schema.minimum / absoluteMultiplier_1);
        var enumMaximum = Math.floor(schema.maximum / absoluteMultiplier_1);
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
    var _a, _b, _c, _d, _e, _f;
    assert_1.strict(typeof schema.minimum === 'undefined' ||
        typeof schema.maximum === 'undefined' ||
        schema.maximum >= schema.minimum);
    if (typeof schema.minimum !== 'undefined' && typeof schema.maximum !== 'undefined') {
        var absoluteMultiplier = Math.abs((_a = schema.multipleOf) !== null && _a !== void 0 ? _a : 1);
        var enumMinimum = Math.ceil(schema.minimum / absoluteMultiplier);
        var enumMaximum = Math.floor(schema.maximum / absoluteMultiplier);
        if (enumMaximum - enumMinimum <= limits_1.UINT8_MAX) {
            return {
                type: encoder_1.EncodingType.Integer,
                encoding: 'BOUNDED_MULTIPLE_8BITS_ENUM_FIXED',
                options: {
                    minimum: schema.minimum,
                    maximum: schema.maximum,
                    multiplier: (_b = schema.multipleOf) !== null && _b !== void 0 ? _b : 1
                }
            };
        }
        return {
            type: encoder_1.EncodingType.Integer,
            encoding: 'FLOOR_MULTIPLE_ENUM_VARINT',
            options: {
                minimum: schema.minimum,
                multiplier: (_c = schema.multipleOf) !== null && _c !== void 0 ? _c : 1
            }
        };
    }
    else if (typeof schema.minimum !== 'undefined' && typeof schema.maximum === 'undefined') {
        return {
            type: encoder_1.EncodingType.Integer,
            encoding: 'FLOOR_MULTIPLE_ENUM_VARINT',
            options: {
                minimum: schema.minimum,
                multiplier: (_d = schema.multipleOf) !== null && _d !== void 0 ? _d : 1
            }
        };
    }
    else if (typeof schema.minimum === 'undefined' && typeof schema.maximum !== 'undefined') {
        return {
            type: encoder_1.EncodingType.Integer,
            encoding: 'ROOF_MULTIPLE_MIRROR_ENUM_VARINT',
            options: {
                maximum: schema.maximum,
                multiplier: (_e = schema.multipleOf) !== null && _e !== void 0 ? _e : 1
            }
        };
    }
    return {
        type: encoder_1.EncodingType.Integer,
        encoding: 'ARBITRARY_MULTIPLE_ZIGZAG_VARINT',
        options: {
            multiplier: (_f = schema.multipleOf) !== null && _f !== void 0 ? _f : 1
        }
    };
};
exports.getIntegerEncoding = getIntegerEncoding;
