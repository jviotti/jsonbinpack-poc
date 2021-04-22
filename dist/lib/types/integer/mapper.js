"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIntegerEncoding = exports.IntegerEncoding = void 0;
var assert_1 = require("assert");
var limits_1 = require("../../utils/limits");
var IntegerEncoding;
(function (IntegerEncoding) {
    IntegerEncoding["BOUNDED_8BITS__ENUM_FIXED"] = "BOUNDED_8BITS__ENUM_FIXED";
    IntegerEncoding["BOUNDED_MULTIPLE_8BITS__ENUM_FIXED"] = "BOUNDED_MULTIPLE_8BITS__ENUM_FIXED";
    IntegerEncoding["BOUNDED__ENUM_VARINT"] = "BOUNDED__ENUM_VARINT";
    IntegerEncoding["BOUNDED_MULTIPLE__ENUM_VARINT"] = "BOUNDED_MULTIPLE__ENUM_VARINT";
    IntegerEncoding["FLOOR__ENUM_VARINT"] = "FLOOR__ENUM_VARINT";
    IntegerEncoding["FLOOR_MULTIPLE__ENUM_VARINT"] = "FLOOR_MULTIPLE__ENUM_VARINT";
    IntegerEncoding["ROOF__MIRROR_ENUM_VARINT"] = "ROOF__MIRROR_ENUM_VARINT";
    IntegerEncoding["ROOF_MULTIPLE__MIRROR_ENUM_VARINT"] = "ROOF_MULTIPLE__MIRROR_ENUM_VARINT";
    IntegerEncoding["ARBITRARY__ZIGZAG_VARINT"] = "ARBITRARY__ZIGZAG_VARINT";
    IntegerEncoding["ARBITRARY_MULTIPLE__ZIGZAG_VARINT"] = "ARBITRARY_MULTIPLE__ZIGZAG_VARINT";
})(IntegerEncoding = exports.IntegerEncoding || (exports.IntegerEncoding = {}));
var getIntegerEncoding = function (schema) {
    assert_1.strict(typeof schema.minimum === 'undefined' ||
        typeof schema.maximum === 'undefined' ||
        schema.maximum >= schema.minimum);
    if (typeof schema.minimum !== 'undefined' &&
        typeof schema.maximum !== 'undefined' && 'multipleOf' in schema) {
        return IntegerEncoding.BOUNDED_MULTIPLE__ENUM_VARINT;
    }
    else if (typeof schema.minimum !== 'undefined' &&
        typeof schema.maximum !== 'undefined' && !('multipleOf' in schema)) {
        if (schema.maximum - schema.minimum <= limits_1.UINT8_MAX) {
            return IntegerEncoding.BOUNDED_8BITS__ENUM_FIXED;
        }
        return IntegerEncoding.BOUNDED__ENUM_VARINT;
    }
    else if (typeof schema.minimum !== 'undefined' &&
        typeof schema.maximum === 'undefined' && 'multipleOf' in schema) {
        return IntegerEncoding.FLOOR_MULTIPLE__ENUM_VARINT;
    }
    else if (typeof schema.minimum !== 'undefined' &&
        typeof schema.maximum === 'undefined' && !('multipleOf' in schema)) {
        return IntegerEncoding.FLOOR__ENUM_VARINT;
    }
    else if (typeof schema.minimum === 'undefined' &&
        typeof schema.maximum !== 'undefined' && 'multipleOf' in schema) {
        return IntegerEncoding.ROOF_MULTIPLE__MIRROR_ENUM_VARINT;
    }
    else if (typeof schema.minimum === 'undefined' &&
        typeof schema.maximum !== 'undefined' && !('multipleOf' in schema)) {
        return IntegerEncoding.ROOF__MIRROR_ENUM_VARINT;
    }
    else if (typeof schema.minimum === 'undefined' &&
        typeof schema.maximum === 'undefined' && 'multipleOf' in schema) {
        return IntegerEncoding.ARBITRARY_MULTIPLE__ZIGZAG_VARINT;
    }
    else {
        return IntegerEncoding.ARBITRARY__ZIGZAG_VARINT;
    }
};
exports.getIntegerEncoding = getIntegerEncoding;
