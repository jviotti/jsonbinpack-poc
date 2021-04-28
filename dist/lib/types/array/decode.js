"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BOUNDED_8BITS_SEMITYPED__LENGTH_PREFIX = void 0;
var assert_1 = require("assert");
var decode_1 = require("../integer/decode");
var decode_2 = require("../any/decode");
var encoder_1 = require("../../encoder");
var limits_1 = require("../../utils/limits");
var BOUNDED_8BITS_SEMITYPED__LENGTH_PREFIX = function (buffer, offset, options) {
    assert_1.strict(options.maximum >= 0);
    assert_1.strict(options.minimum >= 0);
    assert_1.strict(options.maximum >= options.minimum);
    assert_1.strict(options.maximum - options.minimum <= limits_1.UINT8_MAX);
    var lengthResult = decode_1.BOUNDED_8BITS__ENUM_FIXED(buffer, offset, {
        minimum: options.minimum,
        maximum: options.maximum
    });
    var index = 0;
    var cursor = lengthResult.bytes;
    var result = [];
    while (index < lengthResult.value) {
        var encoding = options.prefixEncodings[index];
        var elementResult = typeof encoding === 'undefined'
            ? decode_2.ANY__TYPE_PREFIX(buffer, cursor, {})
            : encoder_1.decode(buffer, cursor, encoding);
        cursor += elementResult.bytes;
        result.push(elementResult.value);
        index += 1;
    }
    return {
        value: result,
        bytes: cursor
    };
};
exports.BOUNDED_8BITS_SEMITYPED__LENGTH_PREFIX = BOUNDED_8BITS_SEMITYPED__LENGTH_PREFIX;
