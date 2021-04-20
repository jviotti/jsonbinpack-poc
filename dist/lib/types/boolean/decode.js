"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NULL_8BITS__ENUM_FIXED = exports.BOOLEAN_8BITS__ENUM_FIXED = void 0;
var assert_1 = require("assert");
var decode_1 = require("../integer/decode");
var BOOLEAN_8BITS__ENUM_FIXED = function (buffer, offset) {
    var result = decode_1.BOUNDED_8BITS__ENUM_FIXED(buffer, offset, 0, 1);
    assert_1.strict(result.value >= 0);
    assert_1.strict(result.value <= 1);
    return {
        value: Boolean(result.value),
        bytes: result.bytes
    };
};
exports.BOOLEAN_8BITS__ENUM_FIXED = BOOLEAN_8BITS__ENUM_FIXED;
var NULL_8BITS__ENUM_FIXED = function (buffer, offset) {
    var result = decode_1.BOUNDED_8BITS__ENUM_FIXED(buffer, offset, 0, 0);
    assert_1.strict(result.value === 0);
    return {
        value: null,
        bytes: result.bytes
    };
};
exports.NULL_8BITS__ENUM_FIXED = NULL_8BITS__ENUM_FIXED;
