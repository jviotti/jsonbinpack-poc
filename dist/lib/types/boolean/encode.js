"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NULL_8BITS__ENUM_FIXED = exports.BOOLEAN_8BITS__ENUM_FIXED = void 0;
var encode_1 = require("../integer/encode");
var BOOLEAN_8BITS__ENUM_FIXED = function (buffer, offset, value) {
    var integer = value ? 1 : 0;
    return encode_1.BOUNDED_8BITS__ENUM_FIXED(buffer, offset, integer, 0, 1);
};
exports.BOOLEAN_8BITS__ENUM_FIXED = BOOLEAN_8BITS__ENUM_FIXED;
var NULL_8BITS__ENUM_FIXED = function (buffer, offset) {
    return encode_1.BOUNDED_8BITS__ENUM_FIXED(buffer, offset, 0, 0, 0);
};
exports.NULL_8BITS__ENUM_FIXED = NULL_8BITS__ENUM_FIXED;
