"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBooleanEncoding = void 0;
var encoding_1 = require("../../encoding");
var getBooleanEncoding = function (_schema) {
    return {
        type: encoding_1.EncodingType.Boolean,
        encoding: 'BOOLEAN_8BITS__ENUM_FIXED',
        options: {}
    };
};
exports.getBooleanEncoding = getBooleanEncoding;
