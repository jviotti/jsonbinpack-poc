"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var encode_1 = require("../../../lib/types/null/encode");
var resizable_buffer_1 = __importDefault(require("../../../lib/utils/resizable-buffer"));
var context_1 = require("../../../lib/context");
tap_1.default.test('NULL_8BITS__ENUM_FIXED: should encode null as 0x00', function (test) {
    var context = context_1.getDefaultEncodingContext();
    var buffer = new resizable_buffer_1.default(Buffer.allocUnsafe(0));
    var bytesWritten = encode_1.NULL_8BITS__ENUM_FIXED(buffer, 0, null, {}, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([]));
    test.is(bytesWritten, 0);
    test.end();
});
