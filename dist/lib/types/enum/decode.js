"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LARGE_BOUNDED_CHOICE_INDEX = exports.BOUNDED_CHOICE_INDEX = void 0;
var decode_1 = require("../integer/decode");
var BOUNDED_CHOICE_INDEX = function (buffer, offset, options) {
    var result = decode_1.BOUNDED_8BITS__ENUM_FIXED(buffer, offset, {
        minimum: 0,
        maximum: options.choices.length
    });
    return {
        value: options.choices[result.value],
        bytes: result.bytes
    };
};
exports.BOUNDED_CHOICE_INDEX = BOUNDED_CHOICE_INDEX;
var LARGE_BOUNDED_CHOICE_INDEX = function (buffer, offset, options) {
    var result = decode_1.BOUNDED__ENUM_VARINT(buffer, offset, {
        minimum: 0,
        maximum: options.choices.length
    });
    return {
        value: options.choices[result.value],
        bytes: result.bytes
    };
};
exports.LARGE_BOUNDED_CHOICE_INDEX = LARGE_BOUNDED_CHOICE_INDEX;
