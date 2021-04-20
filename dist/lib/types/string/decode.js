"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ARBITRARY__PREFIX_LENGTH_VARINT = void 0;
var decode_1 = require("../integer/decode");
var STRING_ENCODING = 'utf8';
var ARBITRARY__PREFIX_LENGTH_VARINT = function (buffer, offset) {
    var length = decode_1.FLOOR__ENUM_VARINT(buffer, offset, 0);
    return {
        value: buffer.toString(STRING_ENCODING, length.bytes, length.value),
        bytes: length.bytes + length.value
    };
};
exports.ARBITRARY__PREFIX_LENGTH_VARINT = ARBITRARY__PREFIX_LENGTH_VARINT;
