"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DOUBLE_VARINT_TRIPLET = exports.DOUBLE__IEEE764_LE = void 0;
var assert_1 = require("assert");
var decode_1 = require("../integer/decode");
var DOUBLE__IEEE764_LE = function (buffer, offset, _options) {
    var result = buffer.readDoubleLE(offset);
    return {
        value: result,
        bytes: 8
    };
};
exports.DOUBLE__IEEE764_LE = DOUBLE__IEEE764_LE;
var DOUBLE_VARINT_TRIPLET = function (buffer, offset, options) {
    var integral = decode_1.ARBITRARY__ZIGZAG_VARINT(buffer, offset, options);
    var decimal = decode_1.FLOOR__ENUM_VARINT(buffer, offset + integral.bytes, {
        minimum: 0
    });
    var exponent = decode_1.FLOOR__ENUM_VARINT(buffer, offset + integral.bytes + decimal.bytes, {
        minimum: 0
    });
    var result = exponent.value === 0
        ? parseFloat(integral.value + "." + decimal.value)
        : parseFloat("0." + '0'.repeat(exponent.value - 1) + integral.value + decimal.value);
    assert_1.strict(!isNaN(result));
    return {
        value: result,
        bytes: integral.bytes + decimal.bytes + exponent.bytes
    };
};
exports.DOUBLE_VARINT_TRIPLET = DOUBLE_VARINT_TRIPLET;
