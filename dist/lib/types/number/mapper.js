"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNumberEncoding = void 0;
var getNumberEncoding = function (_schema) {
    return {
        type: 'number',
        encoding: 'DOUBLE__IEEE764_LE',
        options: {}
    };
};
exports.getNumberEncoding = getNumberEncoding;
