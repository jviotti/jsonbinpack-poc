"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ARBITRARY_MULTIPLE__ZIGZAG_VARINT = exports.ARBITRARY__ZIGZAG_VARINT = void 0;
var zigzag_1 = require("../../utils/zigzag");
var varint_1 = require("../../utils/varint");
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
        value: result.value * multiplier,
        bytes: result.bytes
    };
};
exports.ARBITRARY_MULTIPLE__ZIGZAG_VARINT = ARBITRARY_MULTIPLE__ZIGZAG_VARINT;
