"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var varint_1 = require("../../lib/utils/varint");
tap_1.default.test('should encode 1 as 0x01', function (test) {
    var buffer = Buffer.allocUnsafe(1);
    var offset = 0;
    var bytesWritten = varint_1.varintEncode(buffer, offset, 1);
    test.strictSame(buffer, Buffer.from([0x01]));
    test.is(bytesWritten, 1);
    test.end();
});
tap_1.default.test('should encode 300 as 0xAC 0x02', function (test) {
    var buffer = Buffer.allocUnsafe(2);
    var offset = 0;
    var bytesWritten = varint_1.varintEncode(buffer, offset, 300);
    test.strictSame(buffer, Buffer.from([0xAC, 0x02]));
    test.is(bytesWritten, 2);
    test.end();
});
