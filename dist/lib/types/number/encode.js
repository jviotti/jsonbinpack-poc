"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DOUBLE_VARINT_TRIPLET = exports.DOUBLE__IEEE764_LE = void 0;
var assert_1 = require("assert");
var encode_1 = require("../integer/encode");
var DOUBLE__IEEE764_LE = function (buffer, offset, value, _options, _context) {
    return buffer.writeDoubleLE(value, offset) - offset;
};
exports.DOUBLE__IEEE764_LE = DOUBLE__IEEE764_LE;
var DOUBLE_VARINT_TRIPLET = function (buffer, offset, value, options, context) {
    var _a, _b;
    var fragments = value.toString().split('.');
    var integral = parseInt(fragments[0], 10);
    var decimalFragments = ((_a = fragments[1]) !== null && _a !== void 0 ? _a : '0').split('e-');
    var decimal = parseInt(decimalFragments[0], 10);
    var exponent = parseInt((_b = decimalFragments[1]) !== null && _b !== void 0 ? _b : 0, 10);
    assert_1.strict(!isNaN(integral));
    assert_1.strict(!isNaN(decimal));
    assert_1.strict(!isNaN(exponent));
    assert_1.strict(decimal >= 0);
    assert_1.strict(exponent >= 0);
    var integralBytes = encode_1.ARBITRARY__ZIGZAG_VARINT(buffer, offset, integral, options, context);
    var decimalBytes = encode_1.FLOOR__ENUM_VARINT(buffer, offset + integralBytes, decimal, {
        minimum: 0
    }, context);
    var exponentBytes = encode_1.FLOOR__ENUM_VARINT(buffer, offset + integralBytes + decimalBytes, exponent, {
        minimum: 0
    }, context);
    return integralBytes + decimalBytes + exponentBytes;
};
exports.DOUBLE_VARINT_TRIPLET = DOUBLE_VARINT_TRIPLET;
