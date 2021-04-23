"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNumberEncoding = void 0;
var encoding_1 = require("../../encoding");
var getNumberEncoding = function (_schema) {
    return {
        type: encoding_1.EncodingType.Number,
        encoding: 'DOUBLE__IEEE764_LE',
        options: {}
    };
};
exports.getNumberEncoding = getNumberEncoding;
