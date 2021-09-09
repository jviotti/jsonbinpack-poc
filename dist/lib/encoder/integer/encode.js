"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ARBITRARY_MULTIPLE_ZIGZAG_VARINT = exports.ROOF_MULTIPLE_MIRROR_ENUM_VARINT = exports.FLOOR_MULTIPLE_ENUM_VARINT = exports.BOUNDED_MULTIPLE_8BITS_ENUM_FIXED = void 0;
var assert_1 = require("assert");
var limits_1 = require("../../utils/limits");
var zigzag_1 = require("./zigzag");
var varint_1 = require("./varint");
var BOUNDED_MULTIPLE_8BITS_ENUM_FIXED = function (buffer, offset, value, options, _context) {
    assert_1.strict(options.maximum >= options.minimum);
    assert_1.strict(value >= options.minimum);
    assert_1.strict(value <= options.maximum);
    assert_1.strict(value % options.multiplier === 0);
    var absoluteMultiplier = Math.abs(options.multiplier);
    var enumMinimum = Math.ceil(options.minimum / absoluteMultiplier);
    var enumMaximum = Math.floor(options.maximum / absoluteMultiplier);
    assert_1.strict(enumMaximum - enumMinimum <= limits_1.UINT8_MAX);
    return buffer.writeUInt8((value / absoluteMultiplier) - enumMinimum, offset) - offset;
};
exports.BOUNDED_MULTIPLE_8BITS_ENUM_FIXED = BOUNDED_MULTIPLE_8BITS_ENUM_FIXED;
var FLOOR_MULTIPLE_ENUM_VARINT = function (buffer, offset, value, options, _context) {
    assert_1.strict(value >= options.minimum);
    assert_1.strict(value % options.multiplier === 0);
    var absoluteMultiplier = Math.abs(options.multiplier);
    return varint_1.varintEncode(buffer, offset, BigInt((value / absoluteMultiplier) - Math.ceil(options.minimum / absoluteMultiplier)));
};
exports.FLOOR_MULTIPLE_ENUM_VARINT = FLOOR_MULTIPLE_ENUM_VARINT;
var ROOF_MULTIPLE_MIRROR_ENUM_VARINT = function (buffer, offset, value, options, _context) {
    assert_1.strict(value <= options.maximum);
    assert_1.strict(value % options.multiplier === 0);
    var absoluteMultiplier = Math.abs(options.multiplier);
    return varint_1.varintEncode(buffer, offset, BigInt(Math.floor(options.maximum / absoluteMultiplier) - (value / absoluteMultiplier)));
};
exports.ROOF_MULTIPLE_MIRROR_ENUM_VARINT = ROOF_MULTIPLE_MIRROR_ENUM_VARINT;
var ARBITRARY_MULTIPLE_ZIGZAG_VARINT = function (buffer, offset, value, options, _context) {
    assert_1.strict(value % options.multiplier === 0);
    return varint_1.varintEncode(buffer, offset, zigzag_1.zigzagEncode(BigInt(value / Math.abs(options.multiplier))));
};
exports.ARBITRARY_MULTIPLE_ZIGZAG_VARINT = ARBITRARY_MULTIPLE_ZIGZAG_VARINT;
