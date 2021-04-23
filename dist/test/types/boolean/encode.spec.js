"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var encode_1 = require("../../../lib/types/boolean/encode");
tap_1.default.test('BOOLEAN_8BITS__ENUM_FIXED: should encode false as 0x00', function (test) {
    var buffer = Buffer.allocUnsafe(1);
    var bytesWritten = encode_1.BOOLEAN_8BITS__ENUM_FIXED(buffer, 0, false, {});
    test.strictSame(buffer, Buffer.from([0x00]));
    test.is(bytesWritten, 1);
    test.end();
});
tap_1.default.test('BOOLEAN_8BITS__ENUM_FIXED: should encode true as 0x01', function (test) {
    var buffer = Buffer.allocUnsafe(1);
    var bytesWritten = encode_1.BOOLEAN_8BITS__ENUM_FIXED(buffer, 0, true, {});
    test.strictSame(buffer, Buffer.from([0x01]));
    test.is(bytesWritten, 1);
    test.end();
});
