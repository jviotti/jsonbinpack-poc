"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ARBITRARY_MULTIPLE__ZIGZAG_VARINT = exports.ARBITRARY__ZIGZAG_VARINT = exports.ROOF_MULTIPLE__MIRROR_ENUM_VARINT = exports.ROOF__MIRROR_ENUM_VARINT = exports.FLOOR__ENUM_VARINT = exports.BOUNDED__ENUM_VARINT = exports.BOUNDED_8BITS__ENUM_FIXED = void 0;
var assert_1 = require("assert");
var zigzag_1 = require("../../utils/zigzag");
var varint_1 = require("../../utils/varint");
var BOUNDED_8BITS__ENUM_FIXED = function (buffer, offset, value, minimum, maximum) {
    assert_1.strict(maximum - minimum <= 255);
    assert_1.strict(maximum >= minimum);
    return buffer.writeUInt8(value - minimum, offset) - offset;
};
exports.BOUNDED_8BITS__ENUM_FIXED = BOUNDED_8BITS__ENUM_FIXED;
var BOUNDED__ENUM_VARINT = function (buffer, offset, value, minimum, maximum) {
    assert_1.strict(maximum >= minimum);
    return varint_1.varintEncode(buffer, offset, value - minimum);
};
exports.BOUNDED__ENUM_VARINT = BOUNDED__ENUM_VARINT;
var FLOOR__ENUM_VARINT = function (buffer, offset, value, minimum) {
    assert_1.strict(value >= minimum);
    return varint_1.varintEncode(buffer, offset, value - minimum);
};
exports.FLOOR__ENUM_VARINT = FLOOR__ENUM_VARINT;
var ROOF__MIRROR_ENUM_VARINT = function (buffer, offset, value, maximum) {
    assert_1.strict(value <= maximum);
    return varint_1.varintEncode(buffer, offset, (-1 * value) + maximum);
};
exports.ROOF__MIRROR_ENUM_VARINT = ROOF__MIRROR_ENUM_VARINT;
var ROOF_MULTIPLE__MIRROR_ENUM_VARINT = function (buffer, offset, value, maximum, multiplier) {
    assert_1.strict(value <= maximum);
    assert_1.strict(value % multiplier === 0);
    var absoluteMultiplier = Math.abs(multiplier);
    var closestMaximumMultiple = Math.ceil(maximum / -absoluteMultiplier) * -absoluteMultiplier;
    return exports.ROOF__MIRROR_ENUM_VARINT(buffer, offset, value / absoluteMultiplier, closestMaximumMultiple / absoluteMultiplier);
};
exports.ROOF_MULTIPLE__MIRROR_ENUM_VARINT = ROOF_MULTIPLE__MIRROR_ENUM_VARINT;
var ARBITRARY__ZIGZAG_VARINT = function (buffer, offset, value) {
    return varint_1.varintEncode(buffer, offset, zigzag_1.zigzagEncode(value));
};
exports.ARBITRARY__ZIGZAG_VARINT = ARBITRARY__ZIGZAG_VARINT;
var ARBITRARY_MULTIPLE__ZIGZAG_VARINT = function (buffer, offset, value, multiplier) {
    assert_1.strict(value % multiplier === 0);
    return exports.ARBITRARY__ZIGZAG_VARINT(buffer, offset, value / Math.abs(multiplier));
};
exports.ARBITRARY_MULTIPLE__ZIGZAG_VARINT = ARBITRARY_MULTIPLE__ZIGZAG_VARINT;
