"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var encode_1 = require("../../../lib/types/integer/encode");
tap_1.default.test('BOUNDED_8BITS__ENUM_FIXED: should encode -5 (-5..-1) as 0x00', function (test) {
    var buffer = Buffer.allocUnsafe(1);
    var bytesWritten = encode_1.BOUNDED_8BITS__ENUM_FIXED(buffer, 0, -5, -5, -1);
    test.strictSame(buffer, Buffer.from([0x00]));
    test.is(bytesWritten, 1);
    test.end();
});
tap_1.default.test('BOUNDED_8BITS__ENUM_FIXED: should encode 2 (-5..5) as 0x07', function (test) {
    var buffer = Buffer.allocUnsafe(1);
    var bytesWritten = encode_1.BOUNDED_8BITS__ENUM_FIXED(buffer, 0, 2, -5, 5);
    test.strictSame(buffer, Buffer.from([0x07]));
    test.is(bytesWritten, 1);
    test.end();
});
tap_1.default.test('BOUNDED_8BITS__ENUM_FIXED: should encode 5 (2..3) as 0x03', function (test) {
    var buffer = Buffer.allocUnsafe(1);
    var bytesWritten = encode_1.BOUNDED_8BITS__ENUM_FIXED(buffer, 0, 5, 2, 3);
    test.strictSame(buffer, Buffer.from([0x03]));
    test.is(bytesWritten, 1);
    test.end();
});
tap_1.default.test('BOUNDED__ENUM_VARINT: should encode -5 (-5..-1) as 0x00', function (test) {
    var buffer = Buffer.allocUnsafe(1);
    var bytesWritten = encode_1.BOUNDED__ENUM_VARINT(buffer, 0, -5, -5, -1);
    test.strictSame(buffer, Buffer.from([0x00]));
    test.is(bytesWritten, 1);
    test.end();
});
tap_1.default.test('BOUNDED__ENUM_VARINT: should encode 2 (-5..5) as 0x07', function (test) {
    var buffer = Buffer.allocUnsafe(1);
    var bytesWritten = encode_1.BOUNDED__ENUM_VARINT(buffer, 0, 2, -5, 5);
    test.strictSame(buffer, Buffer.from([0x07]));
    test.is(bytesWritten, 1);
    test.end();
});
tap_1.default.test('BOUNDED__ENUM_VARINT: should encode 5 (2..3) as 0x03', function (test) {
    var buffer = Buffer.allocUnsafe(1);
    var bytesWritten = encode_1.BOUNDED__ENUM_VARINT(buffer, 0, 5, 2, 3);
    test.strictSame(buffer, Buffer.from([0x03]));
    test.is(bytesWritten, 1);
    test.end();
});
tap_1.default.test('FLOOR__ENUM_VARINT: should encode -3 (-10..) as 0x07', function (test) {
    var buffer = Buffer.allocUnsafe(1);
    var bytesWritten = encode_1.FLOOR__ENUM_VARINT(buffer, 0, -3, -10);
    test.strictSame(buffer, Buffer.from([0x07]));
    test.is(bytesWritten, 1);
    test.end();
});
tap_1.default.test('FLOOR__ENUM_VARINT: should encode 5 (2..) as 0x03', function (test) {
    var buffer = Buffer.allocUnsafe(1);
    var bytesWritten = encode_1.FLOOR__ENUM_VARINT(buffer, 0, 5, 2);
    test.strictSame(buffer, Buffer.from([0x03]));
    test.is(bytesWritten, 1);
    test.end();
});
tap_1.default.test('ROOF__MIRROR_ENUM_VARINT: should encode -3 (..-2) as 0x01', function (test) {
    var buffer = Buffer.allocUnsafe(1);
    var bytesWritten = encode_1.ROOF__MIRROR_ENUM_VARINT(buffer, 0, -3, -2);
    test.strictSame(buffer, Buffer.from([0x01]));
    test.is(bytesWritten, 1);
    test.end();
});
tap_1.default.test('ROOF__MIRROR_ENUM_VARINT: should encode 8 (..10) as 0x02', function (test) {
    var buffer = Buffer.allocUnsafe(1);
    var bytesWritten = encode_1.ROOF__MIRROR_ENUM_VARINT(buffer, 0, 8, 10);
    test.strictSame(buffer, Buffer.from([0x02]));
    test.is(bytesWritten, 1);
    test.end();
});
tap_1.default.test('ROOF_MULTIPLE__MIRROR_ENUM_VARINT: should encode -15 (..-5) / 5 as 0x02', function (test) {
    var buffer = Buffer.allocUnsafe(1);
    var bytesWritten = encode_1.ROOF_MULTIPLE__MIRROR_ENUM_VARINT(buffer, 0, -15, -5, 5);
    test.strictSame(buffer, Buffer.from([0x02]));
    test.is(bytesWritten, 1);
    test.end();
});
tap_1.default.test('ROOF_MULTIPLE__MIRROR_ENUM_VARINT: should encode -15 (..-5) / -5 as 0x02', function (test) {
    var buffer = Buffer.allocUnsafe(1);
    var bytesWritten = encode_1.ROOF_MULTIPLE__MIRROR_ENUM_VARINT(buffer, 0, -15, -5, -5);
    test.strictSame(buffer, Buffer.from([0x02]));
    test.is(bytesWritten, 1);
    test.end();
});
tap_1.default.test('ROOF_MULTIPLE__MIRROR_ENUM_VARINT: should encode 5 (..16) / 5 as 0x02', function (test) {
    var buffer = Buffer.allocUnsafe(1);
    var bytesWritten = encode_1.ROOF_MULTIPLE__MIRROR_ENUM_VARINT(buffer, 0, 5, 16, 5);
    test.strictSame(buffer, Buffer.from([0x02]));
    test.is(bytesWritten, 1);
    test.end();
});
tap_1.default.test('ROOF_MULTIPLE__MIRROR_ENUM_VARINT: should encode 10 (..15) / 5 as 0x01', function (test) {
    var buffer = Buffer.allocUnsafe(1);
    var bytesWritten = encode_1.ROOF_MULTIPLE__MIRROR_ENUM_VARINT(buffer, 0, 10, 15, 5);
    test.strictSame(buffer, Buffer.from([0x01]));
    test.is(bytesWritten, 1);
    test.end();
});
tap_1.default.test('ROOF_MULTIPLE__MIRROR_ENUM_VARINT: should encode 10 (..15) / -5 as 0x01', function (test) {
    var buffer = Buffer.allocUnsafe(1);
    var bytesWritten = encode_1.ROOF_MULTIPLE__MIRROR_ENUM_VARINT(buffer, 0, 10, 15, -5);
    test.strictSame(buffer, Buffer.from([0x01]));
    test.is(bytesWritten, 1);
    test.end();
});
tap_1.default.test('ARBITRARY__ZIGZAG_VARINT: should encode -25200 as 0xdf 0x89 0x03', function (test) {
    var buffer = Buffer.allocUnsafe(3);
    var bytesWritten = encode_1.ARBITRARY__ZIGZAG_VARINT(buffer, 0, -25200);
    test.strictSame(buffer, Buffer.from([0xdf, 0x89, 0x03]));
    test.is(bytesWritten, 3);
    test.end();
});
tap_1.default.test('ARBITRARY_MULTIPLE__ZIGZAG_VARINT: should encode 10 / 5  as 0x04', function (test) {
    var buffer = Buffer.allocUnsafe(1);
    var bytesWritten = encode_1.ARBITRARY_MULTIPLE__ZIGZAG_VARINT(buffer, 0, 10, 5);
    test.strictSame(buffer, Buffer.from([0x04]));
    test.is(bytesWritten, 1);
    test.end();
});
