"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnyEncoding = void 0;
var encoding_type_1 = require("./encoding-type");
var getAnyEncoding = function (_schema) {
    return {
        type: encoding_type_1.EncodingType.Any,
        encoding: 'ANY__TYPE_PREFIX',
        options: {}
    };
};
exports.getAnyEncoding = getAnyEncoding;
