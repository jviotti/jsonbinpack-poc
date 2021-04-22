"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNullEncoding = exports.EncodingNull = void 0;
var EncodingNull;
(function (EncodingNull) {
    EncodingNull["NULL_8BITS__ENUM_FIXED"] = "NULL_8BITS__ENUM_FIXED";
})(EncodingNull = exports.EncodingNull || (exports.EncodingNull = {}));
var getNullEncoding = function (_schema) {
    return EncodingNull.NULL_8BITS__ENUM_FIXED;
};
exports.getNullEncoding = getNullEncoding;
