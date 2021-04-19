"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var integer_1 = require("../../lib/schemas/integer");
tap_1.default.test('should encode an arbitrary integer', function (test) {
    var schema = {
        type: 'integer'
    };
    var encoding = integer_1.getIntegerEncoding(schema);
    test.is(encoding, integer_1.EncodingInteger.ARBITRARY__ZIGZAG_VARINT);
    test.end();
});
tap_1.default.test('should encode an arbitrary integer with multipleOf', function (test) {
    var schema = {
        type: 'integer',
        multipleOf: 5
    };
    var encoding = integer_1.getIntegerEncoding(schema);
    test.is(encoding, integer_1.EncodingInteger.ARBITRARY_MULTIPLE__ZIGZAG_VARINT);
    test.end();
});
tap_1.default.test('should encode an integer with minimum', function (test) {
    var schema = {
        type: 'integer',
        minimum: 0
    };
    var encoding = integer_1.getIntegerEncoding(schema);
    test.is(encoding, integer_1.EncodingInteger.FLOOR__ENUM_VARINT);
    test.end();
});
tap_1.default.test('should encode an integer with minimum and multipleOf', function (test) {
    var schema = {
        type: 'integer',
        minimum: 0,
        multipleOf: 5
    };
    var encoding = integer_1.getIntegerEncoding(schema);
    test.is(encoding, integer_1.EncodingInteger.FLOOR_MULTIPLE__ENUM_VARINT);
    test.end();
});
tap_1.default.test('should encode an integer with maximum', function (test) {
    var schema = {
        type: 'integer',
        maximum: 100
    };
    var encoding = integer_1.getIntegerEncoding(schema);
    test.is(encoding, integer_1.EncodingInteger.ROOF__MIRROR_ENUM_VARINT);
    test.end();
});
tap_1.default.test('should encode an integer with maximum and multipleOf', function (test) {
    var schema = {
        type: 'integer',
        maximum: 100,
        multipleOf: 5
    };
    var encoding = integer_1.getIntegerEncoding(schema);
    test.is(encoding, integer_1.EncodingInteger.ROOF_MULTIPLE__MIRROR_ENUM_VARINT);
    test.end();
});
tap_1.default.test('should encode an 8-bit integer with minimum and maximum', function (test) {
    var schema = {
        type: 'integer',
        minimum: -100,
        maximum: 100
    };
    var encoding = integer_1.getIntegerEncoding(schema);
    test.is(encoding, integer_1.EncodingInteger.BOUNDED_8BITS__ENUM_FIXED);
    test.end();
});
tap_1.default.test('should encode an >8-bit integer with minimum and maximum', function (test) {
    var schema = {
        type: 'integer',
        minimum: -100,
        maximum: 100000
    };
    var encoding = integer_1.getIntegerEncoding(schema);
    test.is(encoding, integer_1.EncodingInteger.BOUNDED__ENUM_VARINT);
    test.end();
});
