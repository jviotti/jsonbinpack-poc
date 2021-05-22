"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var encode_1 = require("../../lib/types/null/encode");
var decode_1 = require("../../lib/types/null/decode");
var resizable_buffer_1 = __importDefault(require("../../lib/utils/resizable-buffer"));
tap_1.default.test('NULL_8BITS__ENUM_FIXED', function (test) {
    var buffer = new resizable_buffer_1.default(Buffer.allocUnsafe(1));
    var bytesWritten = encode_1.NULL_8BITS__ENUM_FIXED(buffer, 0, {});
    var result = decode_1.NULL_8BITS__ENUM_FIXED(buffer, 0, {});
    test.is(bytesWritten, 0);
    test.is(bytesWritten, result.bytes);
    test.is(result.value, null);
    test.end();
});
tap_1.default.test('NULL_8BITS__ENUM_FIXED with offset > 0', function (test) {
    var buffer = new resizable_buffer_1.default(Buffer.allocUnsafe(6));
    var bytesWritten = encode_1.NULL_8BITS__ENUM_FIXED(buffer, 5, {});
    var result = decode_1.NULL_8BITS__ENUM_FIXED(buffer, 5, {});
    test.is(bytesWritten, 0);
    test.is(bytesWritten, result.bytes);
    test.is(result.value, null);
    test.end();
});
