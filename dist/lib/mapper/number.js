"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNumberEncoding = void 0;
var encoding_type_1 = require("./encoding-type");
var getNumberEncoding = function (_schema) {
    return {
        type: encoding_type_1.EncodingType.Number,
        encoding: 'DOUBLE_VARINT_TUPLE',
        options: {}
    };
};
exports.getNumberEncoding = getNumberEncoding;
