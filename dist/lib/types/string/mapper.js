"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStringEncoding = void 0;
var assert_1 = require("assert");
var base_1 = require("../base");
var limits_1 = require("../../utils/limits");
var getStringEncoding = function (schema) {
    assert_1.strict(typeof schema.minLength === 'undefined' || schema.minLength >= 0);
    assert_1.strict(typeof schema.maxLength === 'undefined' || schema.maxLength >= 0);
    assert_1.strict(typeof schema.minLength === 'undefined' ||
        typeof schema.maxLength === 'undefined' ||
        schema.maxLength >= schema.minLength);
    if (typeof schema.minLength !== 'undefined' && typeof schema.maxLength !== 'undefined') {
        return {
            type: base_1.EncodingType.String,
            encoding: (schema.maxLength - schema.minLength <= limits_1.UINT8_MAX - 1)
                ? 'BOUNDED__PREFIX_LENGTH_8BIT_FIXED' : 'BOUNDED__PREFIX_LENGTH_ENUM_VARINT',
            options: {
                minimum: schema.minLength,
                maximum: schema.maxLength
            }
        };
    }
    else if (typeof schema.minLength !== 'undefined' && typeof schema.maxLength === 'undefined') {
        return {
            type: base_1.EncodingType.String,
            encoding: 'FLOOR__PREFIX_LENGTH_ENUM_VARINT',
            options: {
                minimum: schema.minLength
            }
        };
    }
    else if (typeof schema.minLength === 'undefined' && typeof schema.maxLength !== 'undefined') {
        return {
            type: base_1.EncodingType.String,
            encoding: schema.maxLength <= limits_1.UINT8_MAX - 1
                ? 'ROOF__PREFIX_LENGTH_8BIT_FIXED' : 'ROOF__PREFIX_LENGTH_ENUM_VARINT',
            options: {
                maximum: schema.maxLength
            }
        };
    }
    else {
        return {
            type: base_1.EncodingType.String,
            encoding: 'ARBITRARY__PREFIX_LENGTH_VARINT',
            options: {}
        };
    }
};
exports.getStringEncoding = getStringEncoding;
