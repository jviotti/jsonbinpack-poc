"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var encode_1 = require("../../../lib/encoder/string/encode");
var encoder_1 = require("../../../lib/encoder");
tap_1.default.test('BOUNDED__PREFIX_LENGTH_ENUM_VARINT: should encode "foo" (2..4)', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(4));
    var bytesWritten = encode_1.BOUNDED__PREFIX_LENGTH_ENUM_VARINT(buffer, 0, 'foo', {
        minimum: 2,
        maximum: 4
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0x02, 0x66, 0x6f, 0x6f]));
    test.is(bytesWritten, 4);
    test.end();
});
tap_1.default.test('ROOF__PREFIX_LENGTH_8BIT_FIXED: should encode "foo" (..4)', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(4));
    var bytesWritten = encode_1.ROOF__PREFIX_LENGTH_8BIT_FIXED(buffer, 0, 'foo', {
        maximum: 4
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0x04, 0x66, 0x6f, 0x6f]));
    test.is(bytesWritten, 4);
    test.end();
});
tap_1.default.test('ROOF__PREFIX_LENGTH_ENUM_VARINT: should encode "foo" (..4)', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(4));
    var bytesWritten = encode_1.ROOF__PREFIX_LENGTH_ENUM_VARINT(buffer, 0, 'foo', {
        maximum: 4
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0x02, 0x66, 0x6f, 0x6f]));
    test.is(bytesWritten, 4);
    test.end();
});
tap_1.default.test('ROOF__PREFIX_LENGTH_ENUM_VARINT: should encode "fooo" (..4)', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(4));
    var bytesWritten = encode_1.ROOF__PREFIX_LENGTH_ENUM_VARINT(buffer, 0, 'fooo', {
        maximum: 4
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0x01, 0x66, 0x6f, 0x6f, 0x6f]));
    test.is(bytesWritten, 5);
    test.end();
});
tap_1.default.test('FLOOR__PREFIX_LENGTH_ENUM_VARINT: should encode "foo" (3..)', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(4));
    var bytesWritten = encode_1.FLOOR__PREFIX_LENGTH_ENUM_VARINT(buffer, 0, 'foo', {
        minimum: 3
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0x01, 0x66, 0x6f, 0x6f]));
    test.is(bytesWritten, 4);
    test.end();
});
tap_1.default.test('ARBITRARY__PREFIX_LENGTH_VARINT: should encode "foo"', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(4));
    var bytesWritten = encode_1.ARBITRARY__PREFIX_LENGTH_VARINT(buffer, 0, 'foo', {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0x04, 0x66, 0x6f, 0x6f]));
    test.is(bytesWritten, 4);
    test.end();
});
tap_1.default.test('ARBITRARY__PREFIX_LENGTH_VARINT: should encode ""', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(1));
    var bytesWritten = encode_1.ARBITRARY__PREFIX_LENGTH_VARINT(buffer, 0, '', {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0x01]));
    test.is(bytesWritten, 1);
    test.end();
});
tap_1.default.test('ARBITRARY__PREFIX_LENGTH_VARINT: should encode " "', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(2));
    var bytesWritten = encode_1.ARBITRARY__PREFIX_LENGTH_VARINT(buffer, 0, ' ', {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([0x02, 0x20]));
    test.is(bytesWritten, 2);
    test.end();
});
tap_1.default.test('BOUNDED__PREFIX_LENGTH_8BIT_FIXED: should encode a shared string', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(10));
    var options = {
        minimum: 0,
        maximum: 4
    };
    var bytesWritten1 = encode_1.BOUNDED__PREFIX_LENGTH_8BIT_FIXED(buffer, 0, 'foo', options, context);
    var bytesWritten2 = encode_1.BOUNDED__PREFIX_LENGTH_8BIT_FIXED(buffer, bytesWritten1, 'foo', options, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x04, 0x66, 0x6f, 0x6f,
        0x00,
        0x04,
        0x05
    ]));
    test.is(context.strings.get('foo'), 1);
    test.is(bytesWritten1, 4);
    test.is(bytesWritten2, 3);
    test.end();
});
tap_1.default.test('BOUNDED__PREFIX_LENGTH_ENUM_VARINT: should encode a shared string', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(10));
    var options = {
        minimum: 0,
        maximum: 4
    };
    var bytesWritten1 = encode_1.BOUNDED__PREFIX_LENGTH_ENUM_VARINT(buffer, 0, 'foo', options, context);
    var bytesWritten2 = encode_1.BOUNDED__PREFIX_LENGTH_ENUM_VARINT(buffer, bytesWritten1, 'foo', options, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x04, 0x66, 0x6f, 0x6f,
        0x00,
        0x04,
        0x05
    ]));
    test.is(context.strings.get('foo'), 1);
    test.is(bytesWritten1, 4);
    test.is(bytesWritten2, 3);
    test.end();
});
tap_1.default.test('ROOF__PREFIX_LENGTH_8BIT_FIXED: should encode a shared string', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(10));
    var options = {
        maximum: 4
    };
    var bytesWritten1 = encode_1.ROOF__PREFIX_LENGTH_8BIT_FIXED(buffer, 0, 'foo', options, context);
    var bytesWritten2 = encode_1.ROOF__PREFIX_LENGTH_8BIT_FIXED(buffer, bytesWritten1, 'foo', options, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x04, 0x66, 0x6f, 0x6f,
        0x00,
        0x04,
        0x05
    ]));
    test.is(context.strings.get('foo'), 1);
    test.is(bytesWritten1, 4);
    test.is(bytesWritten2, 3);
    test.end();
});
tap_1.default.test('ROOF__PREFIX_LENGTH_ENUM_VARINT: should encode a shared string', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(10));
    var options = {
        maximum: 4
    };
    var bytesWritten1 = encode_1.ROOF__PREFIX_LENGTH_ENUM_VARINT(buffer, 0, 'foo', options, context);
    var bytesWritten2 = encode_1.ROOF__PREFIX_LENGTH_ENUM_VARINT(buffer, bytesWritten1, 'foo', options, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x02, 0x66, 0x6f, 0x6f,
        0x00,
        0x02,
        0x05
    ]));
    test.is(context.strings.get('foo'), 1);
    test.is(bytesWritten1, 4);
    test.is(bytesWritten2, 3);
    test.end();
});
tap_1.default.test('FLOOR__PREFIX_LENGTH_ENUM_VARINT: should encode a shared string', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(10));
    var options = {
        minimum: 3
    };
    var bytesWritten1 = encode_1.FLOOR__PREFIX_LENGTH_ENUM_VARINT(buffer, 0, 'foo', options, context);
    var bytesWritten2 = encode_1.FLOOR__PREFIX_LENGTH_ENUM_VARINT(buffer, bytesWritten1, 'foo', options, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x01, 0x66, 0x6f, 0x6f,
        0x00,
        0x01,
        0x05
    ]));
    test.is(context.strings.get('foo'), 1);
    test.is(bytesWritten1, 4);
    test.is(bytesWritten2, 3);
    test.end();
});
tap_1.default.test('ARBITRARY__PREFIX_LENGTH_VARINT: should encode a shared string', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(10));
    var bytesWritten1 = encode_1.ARBITRARY__PREFIX_LENGTH_VARINT(buffer, 0, 'foo', {}, context);
    var bytesWritten2 = encode_1.ARBITRARY__PREFIX_LENGTH_VARINT(buffer, bytesWritten1, 'foo', {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x04, 0x66, 0x6f, 0x6f,
        0x00,
        0x04,
        0x05
    ]));
    test.is(context.strings.get('foo'), 1);
    test.is(bytesWritten1, 4);
    test.is(bytesWritten2, 3);
    test.end();
});
