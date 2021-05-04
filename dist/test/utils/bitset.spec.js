"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var bitset_1 = require("../../lib/utils/bitset");
tap_1.default.test('should encode [ true ] as 0000 0001', function (test) {
    var buffer = Buffer.allocUnsafe(1);
    var offset = 0;
    var bits = [true];
    var bytesWritten = bitset_1.bitsetEncode(buffer, offset, bits);
    test.strictSame(buffer, Buffer.from([1]));
    test.is(bytesWritten, 1);
    test.end();
});
tap_1.default.test('should encode [ false, false, true, false, true ] as 0001 0100', function (test) {
    var buffer = Buffer.allocUnsafe(1);
    var offset = 0;
    var bits = [false, false, true, false, true];
    var bytesWritten = bitset_1.bitsetEncode(buffer, offset, bits);
    test.strictSame(buffer, Buffer.from([20]));
    test.is(bytesWritten, 1);
    test.end();
});
tap_1.default.test('should encode [ false, false, true, false, true, true, false, true, true ] as 1011 0100 0000 0001', function (test) {
    var buffer = Buffer.allocUnsafe(2);
    var offset = 0;
    var bits = [false, false, true, false, true, true, false, true, true];
    var bytesWritten = bitset_1.bitsetEncode(buffer, offset, bits);
    test.strictSame(buffer, Buffer.from([180, 1]));
    test.is(bytesWritten, 2);
    test.end();
});
tap_1.default.test('should decode 0000 0001 as [ true ]', function (test) {
    var offset = 0;
    var buffer = Buffer.from([1]);
    var bits = bitset_1.bitsetDecode(buffer, offset, 1);
    test.strictSame(bits, [true]);
    test.end();
});
tap_1.default.test('should decode 0001 0100 as [ false, false, true, false, true ]', function (test) {
    var offset = 0;
    var buffer = Buffer.from([20]);
    var bits = bitset_1.bitsetDecode(buffer, offset, 5);
    test.strictSame(bits, [false, false, true, false, true]);
    test.end();
});
