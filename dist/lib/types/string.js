"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStringByteLength = void 0;
var getStringByteLength = function (value) {
    return Buffer.byteLength(value, 'utf8');
};
exports.getStringByteLength = getStringByteLength;
