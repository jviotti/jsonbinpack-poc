"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DOUBLE_VARINT_TUPLE = exports.DOUBLE__IEEE764_LE = void 0;
var encode_1 = require("../integer/encode");
var DOUBLE__IEEE764_LE = function (buffer, offset, value, _options, _context) {
    return buffer.writeDoubleLE(value, offset) - offset;
};
exports.DOUBLE__IEEE764_LE = DOUBLE__IEEE764_LE;
var DOUBLE_VARINT_TUPLE = function (buffer, offset, value, options, context) {
    var _a;
    var fragments = value.toString().split('.');
    var integral = parseInt(fragments[0], 10);
    var decimal = parseInt((_a = fragments[1]) !== null && _a !== void 0 ? _a : 0, 10);
    var bytesWritten = encode_1.ARBITRARY__ZIGZAG_VARINT(buffer, offset, integral, options, context);
    return bytesWritten + encode_1.FLOOR__ENUM_VARINT(buffer, offset + bytesWritten, decimal, {
        minimum: 0
    }, context);
};
exports.DOUBLE_VARINT_TUPLE = DOUBLE_VARINT_TUPLE;
