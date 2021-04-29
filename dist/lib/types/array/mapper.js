"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArrayEncoding = void 0;
var limits_1 = require("../../utils/limits");
var base_1 = require("../base");
var mapper_1 = require("../../mapper");
var getArrayEncoding = function (schema) {
    var _a;
    var encodingSchema = schema.items;
    var prefixEncodings = ((_a = schema.prefixItems) !== null && _a !== void 0 ? _a : []).map(function (subschema) {
        return mapper_1.getEncoding(subschema);
    });
    if (typeof encodingSchema === 'undefined') {
        if (typeof schema.minItems !== 'undefined' &&
            typeof schema.maxItems !== 'undefined') {
            return {
                type: base_1.EncodingType.Array,
                encoding: (schema.maxItems - schema.minItems <= limits_1.UINT8_MAX)
                    ? 'BOUNDED_8BITS_SEMITYPED__LENGTH_PREFIX' : 'BOUNDED_SEMITYPED__LENGTH_PREFIX',
                options: {
                    minimum: schema.minItems,
                    maximum: schema.maxItems,
                    prefixEncodings: prefixEncodings
                }
            };
        }
        else if (typeof schema.minItems === 'undefined' &&
            typeof schema.maxItems !== 'undefined') {
            return {
                type: base_1.EncodingType.Array,
                encoding: (schema.maxItems <= limits_1.UINT8_MAX)
                    ? 'ROOF_8BITS_SEMITYPED__LENGTH_PREFIX' : 'ROOF_SEMITYPED__LENGTH_PREFIX',
                options: {
                    maximum: schema.maxItems,
                    prefixEncodings: prefixEncodings
                }
            };
        }
        else if (typeof schema.minItems !== 'undefined' &&
            typeof schema.maxItems === 'undefined') {
            return {
                type: base_1.EncodingType.Array,
                encoding: 'FLOOR_SEMITYPED__LENGTH_PREFIX',
                options: {
                    minimum: schema.minItems,
                    prefixEncodings: prefixEncodings
                }
            };
        }
        else {
            return {
                type: base_1.EncodingType.Array,
                encoding: 'UNBOUNDED_SEMITYPED__LENGTH_PREFIX',
                options: {
                    prefixEncodings: prefixEncodings
                }
            };
        }
    }
    if (typeof schema.minItems !== 'undefined' &&
        typeof schema.maxItems !== 'undefined') {
        return {
            type: base_1.EncodingType.Array,
            encoding: (schema.maxItems - schema.minItems <= limits_1.UINT8_MAX)
                ? 'BOUNDED_8BITS_TYPED__LENGTH_PREFIX' : 'BOUNDED_TYPED__LENGTH_PREFIX',
            options: {
                minimum: schema.minItems,
                maximum: schema.maxItems,
                encoding: mapper_1.getEncoding(encodingSchema),
                prefixEncodings: prefixEncodings
            }
        };
    }
    else if (typeof schema.minItems === 'undefined' &&
        typeof schema.maxItems !== 'undefined') {
        return {
            type: base_1.EncodingType.Array,
            encoding: (schema.maxItems <= limits_1.UINT8_MAX)
                ? 'ROOF_8BITS_TYPED__LENGTH_PREFIX' : 'ROOF_TYPED__LENGTH_PREFIX',
            options: {
                maximum: schema.maxItems,
                encoding: mapper_1.getEncoding(encodingSchema),
                prefixEncodings: prefixEncodings
            }
        };
    }
    else if (typeof schema.minItems !== 'undefined' &&
        typeof schema.maxItems === 'undefined') {
        return {
            type: base_1.EncodingType.Array,
            encoding: 'FLOOR_TYPED__LENGTH_PREFIX',
            options: {
                minimum: schema.minItems,
                encoding: mapper_1.getEncoding(encodingSchema),
                prefixEncodings: prefixEncodings
            }
        };
    }
    else {
        return {
            type: base_1.EncodingType.Array,
            encoding: 'UNBOUNDED_TYPED__LENGTH_PREFIX',
            options: {
                encoding: mapper_1.getEncoding(encodingSchema),
                prefixEncodings: prefixEncodings
            }
        };
    }
};
exports.getArrayEncoding = getArrayEncoding;
