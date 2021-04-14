"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ARBITRARY_MULTIPLE__ZIGZAG_VARINT = exports.ARBITRARY__ZIGZAG_VARINT = exports.FLOOR_POSITIVE__ENUM_VARINT = void 0;
var zigzag_1 = require("../../utils/zigzag");
var varint_1 = require("../../utils/varint");
var FLOOR_POSITIVE__ENUM_VARINT = function (buffer, offset, value, minimum) {
    return varint_1.varintEncode(buffer, offset, value - minimum);
};
exports.FLOOR_POSITIVE__ENUM_VARINT = FLOOR_POSITIVE__ENUM_VARINT;
var ARBITRARY__ZIGZAG_VARINT = function (buffer, offset, value) {
    return varint_1.varintEncode(buffer, offset, zigzag_1.zigzagEncode(value));
};
exports.ARBITRARY__ZIGZAG_VARINT = ARBITRARY__ZIGZAG_VARINT;
var ARBITRARY_MULTIPLE__ZIGZAG_VARINT = function (buffer, offset, value, multiplier) {
    return exports.ARBITRARY__ZIGZAG_VARINT(buffer, offset, value / Math.abs(multiplier));
};
exports.ARBITRARY_MULTIPLE__ZIGZAG_VARINT = ARBITRARY_MULTIPLE__ZIGZAG_VARINT;
