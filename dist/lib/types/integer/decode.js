"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ARBITRARY_MULTIPLE__ZIGZAG_VARINT = exports.ARBITRARY__ZIGZAG_VARINT = exports.ROOF_MULTIPLE__MIRROR_ENUM_VARINT = exports.ROOF__MIRROR_ENUM_VARINT = exports.FLOOR_MULTIPLE__ENUM_VARINT = exports.FLOOR__ENUM_VARINT = exports.BOUNDED_MULTIPLE__ENUM_VARINT = exports.BOUNDED__ENUM_VARINT = exports.BOUNDED_MULTIPLE_8BITS__ENUM_FIXED = exports.BOUNDED_8BITS__ENUM_FIXED = void 0;
var assert_1 = require("assert");
var zigzag_1 = require("../../utils/zigzag");
var varint_1 = require("../../utils/varint");
var BOUNDED_8BITS__ENUM_FIXED = function (buffer, offset, minimum, maximum) {
    assert_1.strict(maximum >= minimum);
    assert_1.strict(maximum - minimum <= 255);
    return {
        value: buffer.readUInt8(offset) + minimum,
        bytes: 1
    };
};
exports.BOUNDED_8BITS__ENUM_FIXED = BOUNDED_8BITS__ENUM_FIXED;
var BOUNDED_MULTIPLE_8BITS__ENUM_FIXED = function (buffer, offset, minimum, maximum, multiplier) {
    assert_1.strict(maximum >= minimum);
    assert_1.strict(multiplier >= minimum);
    assert_1.strict(multiplier <= maximum);
    var absoluteMultiplier = Math.abs(multiplier);
    var closestMinimumMultiple = Math.ceil(minimum / absoluteMultiplier) * absoluteMultiplier;
    return {
        value: (buffer.readUInt8(offset) * absoluteMultiplier) + closestMinimumMultiple,
        bytes: 1
    };
};
exports.BOUNDED_MULTIPLE_8BITS__ENUM_FIXED = BOUNDED_MULTIPLE_8BITS__ENUM_FIXED;
var BOUNDED__ENUM_VARINT = function (buffer, offset, minimum, maximum) {
    assert_1.strict(maximum >= minimum);
    var result = varint_1.varintDecode(buffer, offset);
    return {
        value: result.value + minimum,
        bytes: result.bytes
    };
};
exports.BOUNDED__ENUM_VARINT = BOUNDED__ENUM_VARINT;
var BOUNDED_MULTIPLE__ENUM_VARINT = function (buffer, offset, minimum, maximum, multiplier) {
    assert_1.strict(maximum >= minimum);
    assert_1.strict(multiplier >= minimum);
    assert_1.strict(multiplier <= maximum);
    var absoluteMultiplier = Math.abs(multiplier);
    var closestMinimumMultiple = Math.ceil(minimum / absoluteMultiplier) * absoluteMultiplier;
    var result = varint_1.varintDecode(buffer, offset);
    return {
        value: (result.value * absoluteMultiplier) + closestMinimumMultiple,
        bytes: result.bytes
    };
};
exports.BOUNDED_MULTIPLE__ENUM_VARINT = BOUNDED_MULTIPLE__ENUM_VARINT;
var FLOOR__ENUM_VARINT = function (buffer, offset, minimum) {
    var result = varint_1.varintDecode(buffer, offset);
    return {
        value: result.value + minimum,
        bytes: result.bytes
    };
};
exports.FLOOR__ENUM_VARINT = FLOOR__ENUM_VARINT;
var FLOOR_MULTIPLE__ENUM_VARINT = function (buffer, offset, minimum, multiplier) {
    assert_1.strict(multiplier >= minimum);
    var absoluteMultiplier = Math.abs(multiplier);
    var closestMinimumMultiple = Math.ceil(minimum / absoluteMultiplier) * absoluteMultiplier;
    var result = varint_1.varintDecode(buffer, offset);
    return {
        value: (result.value * absoluteMultiplier) + closestMinimumMultiple,
        bytes: result.bytes
    };
};
exports.FLOOR_MULTIPLE__ENUM_VARINT = FLOOR_MULTIPLE__ENUM_VARINT;
var ROOF__MIRROR_ENUM_VARINT = function (buffer, offset, maximum) {
    var result = varint_1.varintDecode(buffer, offset);
    return {
        value: -1 * (result.value - maximum),
        bytes: result.bytes
    };
};
exports.ROOF__MIRROR_ENUM_VARINT = ROOF__MIRROR_ENUM_VARINT;
var ROOF_MULTIPLE__MIRROR_ENUM_VARINT = function (buffer, offset, maximum, multiplier) {
    assert_1.strict(maximum >= multiplier);
    var absoluteMultiplier = Math.abs(multiplier);
    var closestMaximumMultiple = Math.ceil(maximum / -absoluteMultiplier) * -absoluteMultiplier;
    var result = varint_1.varintDecode(buffer, offset);
    return {
        value: -1 * ((result.value * absoluteMultiplier) - closestMaximumMultiple),
        bytes: result.bytes
    };
};
exports.ROOF_MULTIPLE__MIRROR_ENUM_VARINT = ROOF_MULTIPLE__MIRROR_ENUM_VARINT;
var ARBITRARY__ZIGZAG_VARINT = function (buffer, offset) {
    var result = varint_1.varintDecode(buffer, offset);
    return {
        value: zigzag_1.zigzagDecode(result.value),
        bytes: result.bytes
    };
};
exports.ARBITRARY__ZIGZAG_VARINT = ARBITRARY__ZIGZAG_VARINT;
var ARBITRARY_MULTIPLE__ZIGZAG_VARINT = function (buffer, offset, multiplier) {
    var result = exports.ARBITRARY__ZIGZAG_VARINT(buffer, offset);
    return {
        value: result.value * Math.abs(multiplier),
        bytes: result.bytes
    };
};
exports.ARBITRARY_MULTIPLE__ZIGZAG_VARINT = ARBITRARY_MULTIPLE__ZIGZAG_VARINT;
