"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNumberEncoding = void 0;
var encoder_1 = require("../encoder");
var getNumberEncoding = function (_schema) {
    return {
        type: encoder_1.EncodingType.Number,
        encoding: 'DOUBLE_VARINT_TUPLE',
        options: {}
    };
};
exports.getNumberEncoding = getNumberEncoding;
