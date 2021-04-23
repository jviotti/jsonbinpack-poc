"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNullEncoding = void 0;
var encoding_1 = require("../../encoding");
var getNullEncoding = function (_schema) {
    return {
        type: encoding_1.EncodingType.Null,
        encoding: 'NULL_8BITS__ENUM_FIXED',
        options: {}
    };
};
exports.getNullEncoding = getNullEncoding;
