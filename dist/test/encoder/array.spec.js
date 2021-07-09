"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var encode_1 = require("../../lib/encoder/array/encode");
var decode_1 = require("../../lib/encoder/array/decode");
var encoder_1 = require("../../lib/encoder");
tap_1.default.test('BOUNDED_8BITS_SEMITYPED_LENGTH_PREFIX: [ "foo", true, 2000 ] (2..3 [])', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var value = ['foo', true, 2000];
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(10));
    var options = {
        prefixEncodings: [],
        minimum: 2,
        maximum: 3
    };
    var bytesWritten = encode_1.BOUNDED_8BITS_SEMITYPED_LENGTH_PREFIX(buffer, 0, value, options, context);
    var result = decode_1.BOUNDED_8BITS_SEMITYPED_LENGTH_PREFIX(buffer, 0, options);
    test.is(bytesWritten, 9);
    test.is(bytesWritten, result.bytes);
    test.strictSame(result.value, value);
    test.end();
});
