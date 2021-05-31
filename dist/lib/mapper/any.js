"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnyEncoding = void 0;
var encoder_1 = require("../encoder");
var getAnyEncoding = function (_schema) {
    return {
        type: encoder_1.EncodingType.Any,
        encoding: 'ANY__TYPE_PREFIX',
        options: {}
    };
};
exports.getAnyEncoding = getAnyEncoding;
