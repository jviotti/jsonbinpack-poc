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
tap_1.default.test('should encode 50399 as 0xDF 0x89 0x03', function (test) {
    var buffer = Buffer.allocUnsafe(3);
    var offset = 0;
    var bytesWritten = varint_1.varintEncode(buffer, offset, 50399);
    test.strictSame(buffer, Buffer.from([0xDF, 0x89, 0x03]));
    test.is(bytesWritten, 3);
    test.end();
});
tap_1.default.test('should decode 0xAC 0x02 as 300', function (test) {
    var buffer = Buffer.from([0xAC, 0x02]);
    var offset = 0;
    var result = varint_1.varintDecode(buffer, offset);
    test.is(result.value, 300);
    test.is(result.bytes, 2);
    test.end();
});
tap_1.default.test('should encode and decode 4294967294', function (test) {
    var buffer = Buffer.allocUnsafe(5);
    var offset = 0;
    var bytesWritten = varint_1.varintEncode(buffer, offset, 4294967294);
    test.is(bytesWritten, 5);
    var result = varint_1.varintDecode(buffer, offset);
    test.is(result.bytes, 5);
    test.is(result.value, 4294967294);
    test.end();
});
tap_1.default.test('should decode a varint encoded unsigned integer', function (test) {
    fc.assert(fc.property(fc.integer({
        min: 0
    }), function (value) {
        var buffer = Buffer.allocUnsafe(10);
        var offset = 0;
        var bytesWritten = varint_1.varintEncode(buffer, offset, value);
        var result = varint_1.varintDecode(buffer, offset);
        return bytesWritten > 0 &&
            result.bytes === bytesWritten && result.value === value;
    }), {
        verbose: false
    });
    test.end();
});
