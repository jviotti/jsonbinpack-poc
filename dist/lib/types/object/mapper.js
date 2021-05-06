"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getObjectEncoding = void 0;
var mapper_1 = require("../string/mapper");
var mapper_2 = require("../../mapper");
var base_1 = require("../base");
var parseAdditionalProperties = function (value) {
    if (typeof value === 'boolean' && !value) {
        return null;
    }
    var schema = (typeof value === 'undefined' || (typeof value === 'boolean' && value))
        ? {} : value;
    return mapper_2.getEncoding(schema);
};
var getObjectEncoding = function (schema) {
    var _a, _b, _c;
    var additionalProperties = parseAdditionalProperties(schema.additionalProperties);
    var requiredProperties = ((_a = schema.required) !== null && _a !== void 0 ? _a : []).sort(function (left, right) {
        return left.localeCompare(right);
    });
    var properties = (_b = schema.properties) !== null && _b !== void 0 ? _b : {};
    var optionalProperties = Object.keys(properties)
        .filter(function (key) {
        return requiredProperties.indexOf(key) === -1;
    }).sort(function (left, right) {
        return left.localeCompare(right);
    });
    var propertyEncodings = Object.keys(properties)
        .reduce(function (accumulator, key) {
        accumulator[key] = mapper_2.getEncoding(properties[key]);
        return accumulator;
    }, {});
    var keyEncoding = mapper_1.getStringEncoding((_c = schema.propertyNames) !== null && _c !== void 0 ? _c : {
        type: 'string'
    });
    if (additionalProperties === null) {
        if (optionalProperties.length === 0) {
            return {
                type: base_1.EncodingType.Object,
                encoding: 'REQUIRED_ONLY_BOUNDED_TYPED_OBJECT',
                options: {
                    propertyEncodings: propertyEncodings,
                    encoding: mapper_2.getEncoding({}),
                    requiredProperties: requiredProperties
                }
            };
        }
        else if (requiredProperties.length === 0) {
            return {
                type: base_1.EncodingType.Object,
                encoding: 'NON_REQUIRED_BOUNDED_TYPED_OBJECT',
                options: {
                    propertyEncodings: propertyEncodings,
                    encoding: mapper_2.getEncoding({}),
                    optionalProperties: optionalProperties
                }
            };
        }
    }
    return {
        type: base_1.EncodingType.Object,
        encoding: 'ARBITRARY_TYPED_KEYS_OBJECT',
        options: {
            encoding: mapper_2.getEncoding({}),
            keyEncoding: keyEncoding
        }
    };
};
exports.getObjectEncoding = getObjectEncoding;
