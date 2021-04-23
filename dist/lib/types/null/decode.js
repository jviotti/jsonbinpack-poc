"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NULL_8BITS__ENUM_FIXED = void 0;
var assert_1 = require("assert");
var decode_1 = require("../integer/decode");
var NULL_8BITS__ENUM_FIXED = function (buffer, offset) {
    var result = decode_1.BOUNDED_8BITS__ENUM_FIXED(buffer, offset, {
        minimum: 0,
        maximum: 0
    });
    assert_1.strict(result.value === 0);
    return {
        value: null,
        bytes: result.bytes
    };
};
exports.NULL_8BITS__ENUM_FIXED = NULL_8BITS__ENUM_FIXED;
