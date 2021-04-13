"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zigzagDecode = exports.zigzagEncode = void 0;
var zigzagEncode = function (value, bits) {
    return (value << 1) ^ (value >> (bits - 1));
};
exports.zigzagEncode = zigzagEncode;
var zigzagDecode = function (value) {
    return (value >> 1) ^ (-(value & 1));
};
exports.zigzagDecode = zigzagDecode;
