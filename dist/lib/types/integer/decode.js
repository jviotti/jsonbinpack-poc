"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ARBITRARY_MULTIPLE__ZIGZAG_VARINT = exports.ARBITRARY__ZIGZAG_VARINT = exports.FLOOR__ENUM_VARINT = void 0;
var zigzag_1 = require("../../utils/zigzag");
var varint_1 = require("../../utils/varint");
var FLOOR__ENUM_VARINT = function (buffer, offset, minimum) {
    var result = varint_1.varintDecode(buffer, offset);
    return {
        value: result.value + minimum,
        bytes: result.bytes
    };
};
exports.FLOOR__ENUM_VARINT = FLOOR__ENUM_VARINT;
var ARBITRARY__ZIGZAG_VARINT = function (buffer, offset) {
    var result = varint_1.varintDecode(buffer, offset);
    return {
        value: zigzag_1.zigzagDecode(result.value),
        bytes: result.bytes
    };
};
exports.ARBITRARY__ZIGZAG_VARINT = ARBITRARY__ZIGZAG_VARINT;
var ARBITRARY_MULTIPLE__ZIGZAG_VARINT = function (buffer, offset, multiplier) {
    var result = exports.ARBITRARY__ZIGZAG_VARINT(buffer, offset);
    return {
        value: result.value * Math.abs(multiplier),
        bytes: result.bytes
    };
};
exports.ARBITRARY_MULTIPLE__ZIGZAG_VARINT = ARBITRARY_MULTIPLE__ZIGZAG_VARINT;
