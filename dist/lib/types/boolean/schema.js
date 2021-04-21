"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBooleanEncoding = exports.EncodingBoolean = void 0;
var EncodingBoolean;
(function (EncodingBoolean) {
    EncodingBoolean["BOOLEAN_8BITS__ENUM_FIXED"] = "BOOLEAN_8BITS__ENUM_FIXED";
})(EncodingBoolean = exports.EncodingBoolean || (exports.EncodingBoolean = {}));
var getBooleanEncoding = function (_schema) {
    return EncodingBoolean.BOOLEAN_8BITS__ENUM_FIXED;
};
exports.getBooleanEncoding = getBooleanEncoding;
