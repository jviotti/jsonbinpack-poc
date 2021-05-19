"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var fc = __importStar(require("fast-check"));
var util = __importStar(require("util"));
var bitset_1 = require("../../lib/utils/bitset");
var resizable_buffer_1 = __importDefault(require("../../lib/utils/resizable-buffer"));
tap_1.default.test('should encode [ true ] as 0000 0001', function (test) {
    var buffer = new resizable_buffer_1.default(Buffer.allocUnsafe(1));
    var offset = 0;
    var bits = [true];
    var bytesWritten = bitset_1.bitsetEncode(buffer, offset, bits);
    test.strictSame(buffer.getBuffer(), Buffer.from([1]));
    test.is(bytesWritten, 1);
    test.end();
});
tap_1.default.test('should encode [ false, false, true, false, true ] as 0001 0100', function (test) {
    var buffer = new resizable_buffer_1.default(Buffer.allocUnsafe(1));
    var offset = 0;
    var bits = [false, false, true, false, true];
    var bytesWritten = bitset_1.bitsetEncode(buffer, offset, bits);
    test.strictSame(buffer.getBuffer(), Buffer.from([20]));
    test.is(bytesWritten, 1);
    test.end();
});
tap_1.default.test('should encode [ false, false, true, false, true, true, false, true, true ] as 1011 0100 0000 0001', function (test) {
    var buffer = new resizable_buffer_1.default(Buffer.allocUnsafe(2));
    var offset = 0;
    var bits = [false, false, true, false, true, true, false, true, true];
    var bytesWritten = bitset_1.bitsetEncode(buffer, offset, bits);
    test.strictSame(buffer.getBuffer(), Buffer.from([180, 1]));
    test.is(bytesWritten, 2);
    test.end();
});
tap_1.default.test('should decode 0000 0001 as [ true ]', function (test) {
    var offset = 0;
    var buffer = new resizable_buffer_1.default(Buffer.from([1]));
    var result = bitset_1.bitsetDecode(buffer, offset, 1);
    test.strictSame(result.value, [true]);
    test.is(result.bytes, 1);
    test.end();
});
tap_1.default.test('should decode 0001 0100 as [ false, false, true, false, true ]', function (test) {
    var offset = 0;
    var buffer = new resizable_buffer_1.default(Buffer.from([20]));
    var result = bitset_1.bitsetDecode(buffer, offset, 5);
    test.strictSame(result.value, [false, false, true, false, true]);
    test.is(result.bytes, 1);
    test.end();
});
tap_1.default.test('should encode/decode random arrays of booleans', function (test) {
    fc.assert(fc.property(fc.array(fc.boolean()), function (value) {
        var buffer = new resizable_buffer_1.default(Buffer.allocUnsafe(value.length));
        var offset = 0;
        var bytesWritten = bitset_1.bitsetEncode(buffer, offset, value);
        var result = bitset_1.bitsetDecode(buffer, offset, value.length);
        return bytesWritten * 8 >= value.length && bytesWritten === result.bytes &&
            util.isDeepStrictEqual(result.value, value);
    }), {
        verbose: false
    });
    test.end();
});
