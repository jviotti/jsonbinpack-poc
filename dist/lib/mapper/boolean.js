"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBooleanEncoding = void 0;
var encoder_1 = require("../encoder");
var getBooleanEncoding = function (_schema) {
    return {
        type: encoder_1.EncodingType.Boolean,
        encoding: 'BOOLEAN_8BITS__ENUM_FIXED',
        options: {}
    };
};
exports.getBooleanEncoding = getBooleanEncoding;
