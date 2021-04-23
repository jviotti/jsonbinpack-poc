"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NULL_8BITS__ENUM_FIXED = void 0;
var encode_1 = require("../integer/encode");
var NULL_8BITS__ENUM_FIXED = function (buffer, offset) {
    return encode_1.BOUNDED_8BITS__ENUM_FIXED(buffer, offset, 0, {
        minimum: 0,
        maximum: 0
    });
};
exports.NULL_8BITS__ENUM_FIXED = NULL_8BITS__ENUM_FIXED;
