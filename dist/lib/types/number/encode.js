"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DOUBLE__IEEE764_LE = void 0;
var DOUBLE__IEEE764_LE = function (buffer, offset, value) {
    return buffer.writeDoubleLE(value, offset) - offset;
};
exports.DOUBLE__IEEE764_LE = DOUBLE__IEEE764_LE;
