"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStringEncoding = exports.EncodingString = void 0;
var limits_1 = require("../../utils/limits");
var EncodingString;
(function (EncodingString) {
    EncodingString["BOUNDED__PREFIX_LENGTH_8BIT_FIXED"] = "BOUNDED__PREFIX_LENGTH_8BIT_FIXED";
    EncodingString["BOUNDED__PREFIX_LENGTH_ENUM_VARINT"] = "BOUNDED__PREFIX_LENGTH_ENUM_VARINT";
    EncodingString["ROOF__PREFIX_LENGTH_8BIT_FIXED"] = "ROOF__PREFIX_LENGTH_8BIT_FIXED";
    EncodingString["ROOF__PREFIX_LENGTH_ENUM_VARINT"] = "ROOF__PREFIX_LENGTH_ENUM_VARINT";
    EncodingString["FLOOR__PREFIX_LENGTH_ENUM_VARINT"] = "FLOOR__PREFIX_LENGTH_ENUM_VARINT";
    EncodingString["ARBITRARY__PREFIX_LENGTH_VARINT"] = "ARBITRARY__PREFIX_LENGTH_VARINT";
})(EncodingString = exports.EncodingString || (exports.EncodingString = {}));
var getStringEncoding = function (schema) {
    if (typeof schema.minLength !== 'undefined' && typeof schema.maxLength !== 'undefined') {
        if (schema.maxLength - schema.minLength <= limits_1.UINT8_MAX) {
            return EncodingString.BOUNDED__PREFIX_LENGTH_8BIT_FIXED;
        }
        return EncodingString.BOUNDED__PREFIX_LENGTH_ENUM_VARINT;
    }
    else if (typeof schema.minLength !== 'undefined' && typeof schema.maxLength === 'undefined') {
        return EncodingString.FLOOR__PREFIX_LENGTH_ENUM_VARINT;
    }
    else if (typeof schema.minLength === 'undefined' && typeof schema.maxLength !== 'undefined') {
        if (schema.maxLength <= limits_1.UINT8_MAX) {
            return EncodingString.ROOF__PREFIX_LENGTH_8BIT_FIXED;
        }
        return EncodingString.ROOF__PREFIX_LENGTH_ENUM_VARINT;
    }
    else {
        return EncodingString.ARBITRARY__PREFIX_LENGTH_VARINT;
    }
};
exports.getStringEncoding = getStringEncoding;
