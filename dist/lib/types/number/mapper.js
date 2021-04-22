"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNumberEncoding = exports.EncodingNumber = void 0;
var EncodingNumber;
(function (EncodingNumber) {
    EncodingNumber["DOUBLE__IEEE764_LE"] = "DOUBLE__IEEE764_LE";
})(EncodingNumber = exports.EncodingNumber || (exports.EncodingNumber = {}));
var getNumberEncoding = function (_schema) {
    return EncodingNumber.DOUBLE__IEEE764_LE;
};
exports.getNumberEncoding = getNumberEncoding;
