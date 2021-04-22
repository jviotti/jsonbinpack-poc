"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIntegerEncoding = exports.EncodingInteger = void 0;
var assert_1 = require("assert");
var limits_1 = require("../../utils/limits");
var EncodingInteger;
(function (EncodingInteger) {
    EncodingInteger["BOUNDED_8BITS__ENUM_FIXED"] = "BOUNDED_8BITS__ENUM_FIXED";
    EncodingInteger["BOUNDED_MULTIPLE_8BITS__ENUM_FIXED"] = "BOUNDED_MULTIPLE_8BITS__ENUM_FIXED";
    EncodingInteger["BOUNDED__ENUM_VARINT"] = "BOUNDED__ENUM_VARINT";
    EncodingInteger["BOUNDED_MULTIPLE__ENUM_VARINT"] = "BOUNDED_MULTIPLE__ENUM_VARINT";
    EncodingInteger["FLOOR__ENUM_VARINT"] = "FLOOR__ENUM_VARINT";
    EncodingInteger["FLOOR_MULTIPLE__ENUM_VARINT"] = "FLOOR_MULTIPLE__ENUM_VARINT";
    EncodingInteger["ROOF__MIRROR_ENUM_VARINT"] = "ROOF__MIRROR_ENUM_VARINT";
    EncodingInteger["ROOF_MULTIPLE__MIRROR_ENUM_VARINT"] = "ROOF_MULTIPLE__MIRROR_ENUM_VARINT";
    EncodingInteger["ARBITRARY__ZIGZAG_VARINT"] = "ARBITRARY__ZIGZAG_VARINT";
    EncodingInteger["ARBITRARY_MULTIPLE__ZIGZAG_VARINT"] = "ARBITRARY_MULTIPLE__ZIGZAG_VARINT";
})(EncodingInteger = exports.EncodingInteger || (exports.EncodingInteger = {}));
var getIntegerEncoding = function (schema) {
    assert_1.strict(typeof schema.minimum === 'undefined' ||
        typeof schema.maximum === 'undefined' ||
        schema.maximum >= schema.minimum);
    if (typeof schema.minimum !== 'undefined' &&
        typeof schema.maximum !== 'undefined' && 'multipleOf' in schema) {
        return EncodingInteger.BOUNDED_MULTIPLE__ENUM_VARINT;
    }
    else if (typeof schema.minimum !== 'undefined' &&
        typeof schema.maximum !== 'undefined' && !('multipleOf' in schema)) {
        if (schema.maximum - schema.minimum <= limits_1.UINT8_MAX) {
            return EncodingInteger.BOUNDED_8BITS__ENUM_FIXED;
        }
        return EncodingInteger.BOUNDED__ENUM_VARINT;
    }
    else if (typeof schema.minimum !== 'undefined' &&
        typeof schema.maximum === 'undefined' && 'multipleOf' in schema) {
        return EncodingInteger.FLOOR_MULTIPLE__ENUM_VARINT;
    }
    else if (typeof schema.minimum !== 'undefined' &&
        typeof schema.maximum === 'undefined' && !('multipleOf' in schema)) {
        return EncodingInteger.FLOOR__ENUM_VARINT;
    }
    else if (typeof schema.minimum === 'undefined' &&
        typeof schema.maximum !== 'undefined' && 'multipleOf' in schema) {
        return EncodingInteger.ROOF_MULTIPLE__MIRROR_ENUM_VARINT;
    }
    else if (typeof schema.minimum === 'undefined' &&
        typeof schema.maximum !== 'undefined' && !('multipleOf' in schema)) {
        return EncodingInteger.ROOF__MIRROR_ENUM_VARINT;
    }
    else if (typeof schema.minimum === 'undefined' &&
        typeof schema.maximum === 'undefined' && 'multipleOf' in schema) {
        return EncodingInteger.ARBITRARY_MULTIPLE__ZIGZAG_VARINT;
    }
    else {
        return EncodingInteger.ARBITRARY__ZIGZAG_VARINT;
    }
};
exports.getIntegerEncoding = getIntegerEncoding;
