"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNullEncoding = void 0;
var base_1 = require("../types/base");
var getNullEncoding = function (_schema) {
    return {
        type: base_1.EncodingType.Null,
        encoding: 'NULL_8BITS__ENUM_FIXED',
        options: {}
    };
};
exports.getNullEncoding = getNullEncoding;
