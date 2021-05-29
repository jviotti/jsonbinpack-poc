"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNullEncoding = void 0;
var encoding_type_1 = require("./encoding-type");
var getNullEncoding = function (_schema) {
    return {
        type: encoding_type_1.EncodingType.Null,
        encoding: 'NULL_8BITS__ENUM_FIXED',
        options: {}
    };
};
exports.getNullEncoding = getNullEncoding;
