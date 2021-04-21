"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var encode_1 = require("../../../lib/types/number/encode");
tap_1.default.test('DOUBLE__IEEE764_LE: should encode 3.14 as 1f 85 eb 51 b8 1e 09 40', function (test) {
    var buffer = Buffer.allocUnsafe(8);
    var bytesWritten = encode_1.DOUBLE__IEEE764_LE(buffer, 0, 3.14);
    test.strictSame(buffer, Buffer.from([0x1f, 0x85, 0xeb, 0x51, 0xb8, 0x1e, 0x09, 0x40]));
    test.is(bytesWritten, 8);
    test.end();
});
