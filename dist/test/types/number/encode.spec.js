"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var encode_1 = require("../../../lib/types/number/encode");
var context_1 = require("../../../lib/context");
var resizable_buffer_1 = __importDefault(require("../../../lib/utils/resizable-buffer"));
tap_1.default.test('DOUBLE__IEEE764_LE: should encode 3.14 as 1f 85 eb 51 b8 1e 09 40', function (test) {
    var context = context_1.getDefaultEncodingContext();
    var buffer = new resizable_buffer_1.default(Buffer.allocUnsafe(8));
    var bytesWritten = encode_1.DOUBLE__IEEE764_LE(buffer, 0, 3.14, {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0x1f, 0x85, 0xeb, 0x51, 0xb8, 0x1e, 0x09, 0x40]));
    test.is(bytesWritten, 8);
    test.end();
});
tap_1.default.test('DOUBLE_VARINT_TUPLE: should encode a positive real number', function (test) {
    var context = context_1.getDefaultEncodingContext();
    var buffer = new resizable_buffer_1.default(Buffer.allocUnsafe(2));
    var bytesWritten = encode_1.DOUBLE_VARINT_TUPLE(buffer, 0, 3.14, {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0x06, 0x0e]));
    console.log(buffer.getBuffer());
    test.is(bytesWritten, 2);
    test.end();
});
tap_1.default.test('DOUBLE_VARINT_TUPLE: should encode a positive integer', function (test) {
    var context = context_1.getDefaultEncodingContext();
    var buffer = new resizable_buffer_1.default(Buffer.allocUnsafe(2));
    var bytesWritten = encode_1.DOUBLE_VARINT_TUPLE(buffer, 0, 5, {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0x0a, 0x00]));
    console.log(buffer.getBuffer());
    test.is(bytesWritten, 2);
    test.end();
});
tap_1.default.test('DOUBLE_VARINT_TUPLE: should encode a negative real number', function (test) {
    var context = context_1.getDefaultEncodingContext();
    var buffer = new resizable_buffer_1.default(Buffer.allocUnsafe(2));
    var bytesWritten = encode_1.DOUBLE_VARINT_TUPLE(buffer, 0, -3.14, {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0x05, 0x0e]));
    console.log(buffer.getBuffer());
    test.is(bytesWritten, 2);
    test.end();
});
tap_1.default.test('DOUBLE_VARINT_TUPLE: should encode a negative integer', function (test) {
    var context = context_1.getDefaultEncodingContext();
    var buffer = new resizable_buffer_1.default(Buffer.allocUnsafe(2));
    var bytesWritten = encode_1.DOUBLE_VARINT_TUPLE(buffer, 0, -5, {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0x09, 0x00]));
    console.log(buffer.getBuffer());
    test.is(bytesWritten, 2);
    test.end();
});
tap_1.default.test('DOUBLE_VARINT_TUPLE: should encode zero', function (test) {
    var context = context_1.getDefaultEncodingContext();
    var buffer = new resizable_buffer_1.default(Buffer.allocUnsafe(2));
    var bytesWritten = encode_1.DOUBLE_VARINT_TUPLE(buffer, 0, 0, {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0x00, 0x00]));
    console.log(buffer.getBuffer());
    test.is(bytesWritten, 2);
    test.end();
});
