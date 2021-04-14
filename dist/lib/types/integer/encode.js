"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ARBITRARY_MULTIPLE__ZIGZAG_VARINT = exports.ARBITRARY__ZIGZAG_VARINT = exports.ROOF_MULTIPLE__MIRROR_ENUM_VARINT = exports.ROOF__MIRROR_ENUM_VARINT = exports.FLOOR__ENUM_VARINT = exports.BOUNDED__ENUM_VARINT = exports.BOUNDED_8BITS__ENUM_FIXED = void 0;
var zigzag_1 = require("../../utils/zigzag");
var varint_1 = require("../../utils/varint");
var BOUNDED_8BITS__ENUM_FIXED = function (buffer, offset, value, minimum, _maximum) {
    return buffer.writeUInt8(value - minimum, offset) - offset;
};
exports.BOUNDED_8BITS__ENUM_FIXED = BOUNDED_8BITS__ENUM_FIXED;
var BOUNDED__ENUM_VARINT = function (buffer, offset, value, minimum, _maximum) {
    return varint_1.varintEncode(buffer, offset, value - minimum);
};
exports.BOUNDED__ENUM_VARINT = BOUNDED__ENUM_VARINT;
var FLOOR__ENUM_VARINT = function (buffer, offset, value, minimum) {
    return varint_1.varintEncode(buffer, offset, value - minimum);
};
exports.FLOOR__ENUM_VARINT = FLOOR__ENUM_VARINT;
var ROOF__MIRROR_ENUM_VARINT = function (buffer, offset, value, maximum) {
    return varint_1.varintEncode(buffer, offset, (-1 * value) + maximum);
};
exports.ROOF__MIRROR_ENUM_VARINT = ROOF__MIRROR_ENUM_VARINT;
var ROOF_MULTIPLE__MIRROR_ENUM_VARINT = function (buffer, offset, value, maximum, multiplier) {
    return varint_1.varintEncode(buffer, offset, (-1 * (value / Math.abs(multiplier))) + (maximum / Math.abs(multiplier)));
};
exports.ROOF_MULTIPLE__MIRROR_ENUM_VARINT = ROOF_MULTIPLE__MIRROR_ENUM_VARINT;
var ARBITRARY__ZIGZAG_VARINT = function (buffer, offset, value) {
    return varint_1.varintEncode(buffer, offset, zigzag_1.zigzagEncode(value));
};
exports.ARBITRARY__ZIGZAG_VARINT = ARBITRARY__ZIGZAG_VARINT;
var ARBITRARY_MULTIPLE__ZIGZAG_VARINT = function (buffer, offset, value, multiplier) {
    return exports.ARBITRARY__ZIGZAG_VARINT(buffer, offset, value / Math.abs(multiplier));
};
exports.ARBITRARY_MULTIPLE__ZIGZAG_VARINT = ARBITRARY_MULTIPLE__ZIGZAG_VARINT;
