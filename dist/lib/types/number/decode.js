"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DOUBLE_VARINT_TRIPLET = exports.DOUBLE__IEEE764_LE = void 0;
var zigzag_1 = require("../../utils/zigzag");
var varint_1 = require("../../utils/varint");
var DOUBLE__IEEE764_LE = function (buffer, offset, _options) {
    var result = buffer.readDoubleLE(offset);
    return {
        value: result,
        bytes: 8
    };
};
exports.DOUBLE__IEEE764_LE = DOUBLE__IEEE764_LE;
var DOUBLE_VARINT_TRIPLET = function (buffer, offset, _options) {
    var integralResult = varint_1.varintDecode(buffer, offset);
    var pointResult = varint_1.varintDecode(buffer, offset + integralResult.bytes);
    var integralValue = zigzag_1.zigzagDecode(integralResult.value);
    var integral = integralValue.toString();
    var point = Number(zigzag_1.zigzagDecode(pointResult.value));
    var bytes = integralResult.bytes + pointResult.bytes;
    if (point === 0) {
        return {
            value: Number(integralValue),
            bytes: bytes
        };
    }
    return {
        value: parseFloat(point < 0
            ? "0." + '0'.repeat(Math.abs(point) - 1) + integral
            : integral.slice(0, point) + '.' + integral.slice(point)),
        bytes: bytes
    };
};
exports.DOUBLE_VARINT_TRIPLET = DOUBLE_VARINT_TRIPLET;
