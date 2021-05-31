"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNullEncoding = void 0;
var encoder_1 = require("../encoder");
var getNullEncoding = function (_schema) {
    return {
        type: encoder_1.EncodingType.Null,
        encoding: 'NULL_8BITS__ENUM_FIXED',
        options: {}
    };
};
exports.getNullEncoding = getNullEncoding;
