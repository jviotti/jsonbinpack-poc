"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBooleanEncoding = void 0;
var encoding_type_1 = require("./encoding-type");
var getBooleanEncoding = function (_schema) {
    return {
        type: encoding_type_1.EncodingType.Boolean,
        encoding: 'BOOLEAN_8BITS__ENUM_FIXED',
        options: {}
    };
};
exports.getBooleanEncoding = getBooleanEncoding;
