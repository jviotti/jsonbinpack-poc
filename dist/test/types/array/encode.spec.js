"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var encode_1 = require("../../../lib/types/array/encode");
tap_1.default.test('UNBOUNDED_UNTYPED__LENGTH_PREFIX: should encode [ "foo", true, 2000 ]', function (test) {
    var buffer = Buffer.allocUnsafe(10);
    var bytesWritten = encode_1.UNBOUNDED_UNTYPED__LENGTH_PREFIX(buffer, 0, [
        'foo', true, 2000
    ], {});
    test.strictSame(buffer, Buffer.from([
        0x03,
        0x00, 0x03, 0x66, 0x6f, 0x6f,
        0x04,
        0x07, 0xd0, 0x0f
    ]));
    test.is(bytesWritten, 10);
    test.end();
});
tap_1.default.test('BOUNDED_8BITS_UNTYPED__LENGTH_PREFIX: should encode [ "foo", true, 2000 ]', function (test) {
    var buffer = Buffer.allocUnsafe(10);
    var bytesWritten = encode_1.BOUNDED_8BITS_UNTYPED__LENGTH_PREFIX(buffer, 0, [
        'foo', true, 2000
    ], {
        minimum: 2,
        maximum: 3
    });
    test.strictSame(buffer, Buffer.from([
        0x01,
        0x00, 0x03, 0x66, 0x6f, 0x6f,
        0x04,
        0x07, 0xd0, 0x0f
    ]));
    test.is(bytesWritten, 10);
    test.end();
});
tap_1.default.test('BOUNDED_UNTYPED__LENGTH_PREFIX: should encode [ "foo", true, 2000 ]', function (test) {
    var buffer = Buffer.allocUnsafe(10);
    var bytesWritten = encode_1.BOUNDED_UNTYPED__LENGTH_PREFIX(buffer, 0, [
        'foo', true, 2000
    ], {
        minimum: 2,
        maximum: 3
    });
    test.strictSame(buffer, Buffer.from([
        0x01,
        0x00, 0x03, 0x66, 0x6f, 0x6f,
        0x04,
        0x07, 0xd0, 0x0f
    ]));
    test.is(bytesWritten, 10);
    test.end();
});
