"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBooleanEncoding = void 0;
var base_1 = require("../base");
var getBooleanEncoding = function (_schema) {
    return {
        type: base_1.EncodingType.Boolean,
        encoding: 'BOOLEAN_8BITS__ENUM_FIXED',
        options: {}
    };
};
exports.getBooleanEncoding = getBooleanEncoding;
