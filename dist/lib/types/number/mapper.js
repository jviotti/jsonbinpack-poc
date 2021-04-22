"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNumberEncoding = exports.NumberEncoding = void 0;
var NumberEncoding;
(function (NumberEncoding) {
    NumberEncoding["DOUBLE__IEEE764_LE"] = "DOUBLE__IEEE764_LE";
})(NumberEncoding = exports.NumberEncoding || (exports.NumberEncoding = {}));
var getNumberEncoding = function (_schema) {
    return NumberEncoding.DOUBLE__IEEE764_LE;
};
exports.getNumberEncoding = getNumberEncoding;
