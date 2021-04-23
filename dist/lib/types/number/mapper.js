"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNumberEncoding = void 0;
var base_1 = require("../base");
var getNumberEncoding = function (_schema) {
    return {
        type: base_1.EncodingType.Number,
        encoding: 'DOUBLE__IEEE764_LE',
        options: {}
    };
};
exports.getNumberEncoding = getNumberEncoding;
