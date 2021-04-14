"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var encode_1 = require("../../../lib/types/integer/encode");
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
