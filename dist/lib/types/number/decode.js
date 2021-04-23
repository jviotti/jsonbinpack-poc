"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DOUBLE__IEEE764_LE = void 0;
var DOUBLE__IEEE764_LE = function (buffer, offset, _options) {
    var result = buffer.readDoubleLE(offset);
    return {
        value: result,
        bytes: 8
    };
};
exports.DOUBLE__IEEE764_LE = DOUBLE__IEEE764_LE;
