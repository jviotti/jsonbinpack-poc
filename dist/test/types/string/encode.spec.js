"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var encode_1 = require("../../../lib/types/string/encode");
tap_1.default.test('ROOF__PREFIX_LENGTH_8BIT_FIXED: should encode "foo" (..4)', function (test) {
    var buffer = Buffer.allocUnsafe(4);
    var bytesWritten = encode_1.ROOF__PREFIX_LENGTH_8BIT_FIXED(buffer, 0, 'foo', 4);
    test.strictSame(buffer, Buffer.from([0x03, 0x66, 0x6f, 0x6f]));
    test.is(bytesWritten, 4);
    test.end();
});
tap_1.default.test('ROOF__PREFIX_LENGTH_ENUM_VARINT: should encode "foo" (..4)', function (test) {
    var buffer = Buffer.allocUnsafe(4);
    var bytesWritten = encode_1.ROOF__PREFIX_LENGTH_ENUM_VARINT(buffer, 0, 'foo', 4);
    test.strictSame(buffer, Buffer.from([0x03, 0x66, 0x6f, 0x6f]));
    test.is(bytesWritten, 4);
    test.end();
});
tap_1.default.test('FLOOR__PREFIX_LENGTH_ENUM_VARINT: should encode "foo" (3..)', function (test) {
    var buffer = Buffer.allocUnsafe(4);
    var bytesWritten = encode_1.FLOOR__PREFIX_LENGTH_ENUM_VARINT(buffer, 0, 'foo', 3);
    test.strictSame(buffer, Buffer.from([0x00, 0x66, 0x6f, 0x6f]));
    test.is(bytesWritten, 4);
    test.end();
});
tap_1.default.test('ARBITRARY__PREFIX_LENGTH_VARINT: should encode "foo"', function (test) {
    var buffer = Buffer.allocUnsafe(4);
    var bytesWritten = encode_1.ARBITRARY__PREFIX_LENGTH_VARINT(buffer, 0, 'foo');
    test.strictSame(buffer, Buffer.from([0x03, 0x66, 0x6f, 0x6f]));
    test.is(bytesWritten, 4);
    test.end();
});
tap_1.default.test('ARBITRARY__PREFIX_LENGTH_VARINT: should encode ""', function (test) {
    var buffer = Buffer.allocUnsafe(1);
    var bytesWritten = encode_1.ARBITRARY__PREFIX_LENGTH_VARINT(buffer, 0, '');
    test.strictSame(buffer, Buffer.from([0x00]));
    test.is(bytesWritten, 1);
    test.end();
});
tap_1.default.test('ARBITRARY__PREFIX_LENGTH_VARINT: should encode " "', function (test) {
    var buffer = Buffer.allocUnsafe(2);
    var bytesWritten = encode_1.ARBITRARY__PREFIX_LENGTH_VARINT(buffer, 0, ' ');
    test.strictSame(buffer, Buffer.from([0x01, 0x20]));
    test.is(bytesWritten, 2);
    test.end();
});
