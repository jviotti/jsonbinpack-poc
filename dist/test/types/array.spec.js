"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var encode_1 = require("../../lib/types/array/encode");
var decode_1 = require("../../lib/types/array/decode");
tap_1.default.test('BOUNDED_8BITS_SEMITYPED__LENGTH_PREFIX: [ "foo", true, 2000 ] ([])', function (test) {
    var value = ['foo', true, 2000];
    var buffer = Buffer.allocUnsafe(10);
    var options = {
        prefixEncodings: [],
        minimum: 2,
        maximum: 3
    };
    var bytesWritten = encode_1.BOUNDED_8BITS_SEMITYPED__LENGTH_PREFIX(buffer, 0, value, options);
    var result = decode_1.BOUNDED_8BITS_SEMITYPED__LENGTH_PREFIX(buffer, 0, options);
    console.log(result);
    test.is(bytesWritten, 10);
    test.is(bytesWritten, result.bytes);
    test.strictSame(result.value, value);
    test.end();
});
