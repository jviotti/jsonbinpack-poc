"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DOUBLE_VARINT_TUPLE = exports.DOUBLE__IEEE764_LE = void 0;
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
var DOUBLE_VARINT_TUPLE = function (buffer, offset, _options) {
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
    else if (point < 0) {
        var zeroes = "0." + '0'.repeat(Math.abs(point) - 1);
        return {
            value: parseFloat(integralValue < 0
                ? "-" + zeroes + integral.slice(1)
                : "" + zeroes + integral),
            bytes: bytes
        };
    }
    return {
        value: parseFloat(integral.slice(0, point) + '.' + integral.slice(point)),
        bytes: bytes
    };
};
exports.DOUBLE_VARINT_TUPLE = DOUBLE_VARINT_TUPLE;
