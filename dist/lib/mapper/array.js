"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArrayEncoding = exports.getArrayStates = void 0;
var encoder_1 = require("../encoder");
var index_1 = require("./index");
var limits_1 = require("../utils/limits");
var getArrayStates = function (schema, level) {
    var _a;
    var encoding = exports.getArrayEncoding(schema, level);
    if (encoding.encoding === 'BOUNDED_8BITS_TYPED__LENGTH_PREFIX' ||
        encoding.encoding === 'BOUNDED_TYPED__LENGTH_PREFIX' ||
        encoding.encoding === 'ROOF_8BITS_TYPED__LENGTH_PREFIX' ||
        encoding.encoding === 'ROOF_TYPED__LENGTH_PREFIX' ||
        encoding.encoding === 'BOUNDED_8BITS_SEMITYPED__LENGTH_PREFIX' ||
        encoding.encoding === 'BOUNDED_SEMITYPED__LENGTH_PREFIX' ||
        encoding.encoding === 'ROOF_8BITS_SEMITYPED__LENGTH_PREFIX' ||
        encoding.encoding === 'ROOF_SEMITYPED__LENGTH_PREFIX') {
        var index = 0;
        var result = 1;
        while (index < encoding.options.maximum) {
            var itemEncoding = (_a = encoding.options.prefixEncodings[index]) !== null && _a !== void 0 ? _a : null;
            if (itemEncoding !== null) {
                var states = index_1.getStates(itemEncoding, level + 1);
                result = result * (Array.isArray(states) ? states.length : states);
            }
            else if ('encoding' in encoding.options) {
                var states = index_1.getStates(encoding.options.encoding, level + 1);
                result = result * (Array.isArray(states) ? states.length : states);
            }
            else {
                return Infinity;
            }
            index += 1;
        }
        return result;
    }
    return Infinity;
};
exports.getArrayStates = getArrayStates;
var getArrayEncoding = function (schema, level) {
    var _a;
    var encodingSchema = schema.items;
    var prefixEncodings = ((_a = schema.prefixItems) !== null && _a !== void 0 ? _a : []).map(function (subschema) {
        return index_1.getEncoding(subschema, level + 1);
    });
    if (typeof encodingSchema === 'undefined') {
        if (typeof schema.minItems !== 'undefined' &&
            typeof schema.maxItems !== 'undefined') {
            return {
                type: encoder_1.EncodingType.Array,
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
                type: encoder_1.EncodingType.Array,
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
                type: encoder_1.EncodingType.Array,
                encoding: 'FLOOR_SEMITYPED__LENGTH_PREFIX',
                options: {
                    minimum: schema.minItems,
                    prefixEncodings: prefixEncodings
                }
            };
        }
        return {
            type: encoder_1.EncodingType.Array,
            encoding: 'UNBOUNDED_SEMITYPED__LENGTH_PREFIX',
            options: {
                prefixEncodings: prefixEncodings
            }
        };
    }
    if (typeof schema.minItems !== 'undefined' &&
        typeof schema.maxItems !== 'undefined') {
        return {
            type: encoder_1.EncodingType.Array,
            encoding: (schema.maxItems - schema.minItems <= limits_1.UINT8_MAX)
                ? 'BOUNDED_8BITS_TYPED__LENGTH_PREFIX' : 'BOUNDED_TYPED__LENGTH_PREFIX',
            options: {
                minimum: schema.minItems,
                maximum: schema.maxItems,
                encoding: index_1.getEncoding(encodingSchema, level + 1),
                prefixEncodings: prefixEncodings
            }
        };
    }
    else if (typeof schema.minItems === 'undefined' &&
        typeof schema.maxItems !== 'undefined') {
        return {
            type: encoder_1.EncodingType.Array,
            encoding: (schema.maxItems <= limits_1.UINT8_MAX)
                ? 'ROOF_8BITS_TYPED__LENGTH_PREFIX' : 'ROOF_TYPED__LENGTH_PREFIX',
            options: {
                maximum: schema.maxItems,
                encoding: index_1.getEncoding(encodingSchema, level + 1),
                prefixEncodings: prefixEncodings
            }
        };
    }
    else if (typeof schema.minItems !== 'undefined' &&
        typeof schema.maxItems === 'undefined') {
        return {
            type: encoder_1.EncodingType.Array,
            encoding: 'FLOOR_TYPED__LENGTH_PREFIX',
            options: {
                minimum: schema.minItems,
                encoding: index_1.getEncoding(encodingSchema, level + 1),
                prefixEncodings: prefixEncodings
            }
        };
    }
    return {
        type: encoder_1.EncodingType.Array,
        encoding: 'UNBOUNDED_TYPED__LENGTH_PREFIX',
        options: {
            encoding: index_1.getEncoding(encodingSchema, level + 1),
            prefixEncodings: prefixEncodings
        }
    };
};
exports.getArrayEncoding = getArrayEncoding;
