"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zigzagDecode = exports.zigzagEncode = void 0;
var zigzagEncode = function (value) {
    return value >= 0 ? value * 2 : (value * -2) - 1;
};
exports.zigzagEncode = zigzagEncode;
var zigzagDecode = function (value) {
    return value % 2 === 0 ? value / 2 : (value + 1) / -2;
};
exports.zigzagDecode = zigzagDecode;
