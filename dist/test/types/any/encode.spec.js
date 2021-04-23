"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var encode_1 = require("../../../lib/types/any/encode");
tap_1.default.test('ANY__TYPE_PREFIX: should encode null as 0x07', function (test) {
    var buffer = Buffer.allocUnsafe(1);
    var bytesWritten = encode_1.ANY__TYPE_PREFIX(buffer, 0, null, {});
    test.strictSame(buffer, Buffer.from([0x07]));
    test.is(bytesWritten, 1);
    test.end();
});
tap_1.default.test('ANY__TYPE_PREFIX: should encode false as 0x06', function (test) {
    var buffer = Buffer.allocUnsafe(1);
    var bytesWritten = encode_1.ANY__TYPE_PREFIX(buffer, 0, false, {});
    test.strictSame(buffer, Buffer.from([0x06]));
    test.is(bytesWritten, 1);
    test.end();
});
tap_1.default.test('ANY__TYPE_PREFIX: should encode true as 0x05', function (test) {
    var buffer = Buffer.allocUnsafe(1);
    var bytesWritten = encode_1.ANY__TYPE_PREFIX(buffer, 0, true, {});
    test.strictSame(buffer, Buffer.from([0x05]));
    test.is(bytesWritten, 1);
    test.end();
});
tap_1.default.test('ANY__TYPE_PREFIX: should encode "foo" as 0x00 0x03 + string', function (test) {
    var buffer = Buffer.allocUnsafe(5);
    var bytesWritten = encode_1.ANY__TYPE_PREFIX(buffer, 0, 'foo', {});
    test.strictSame(buffer, Buffer.from([0x00, 0x03, 0x66, 0x6f, 0x6f]));
    test.is(bytesWritten, 5);
    test.end();
});
