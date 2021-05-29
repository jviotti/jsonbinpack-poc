"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnyEncoding = void 0;
var base_1 = require("../types/base");
var getAnyEncoding = function (_schema) {
    return {
        type: base_1.EncodingType.Any,
        encoding: 'ANY__TYPE_PREFIX',
        options: {}
    };
};
exports.getAnyEncoding = getAnyEncoding;
