"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var encoder_1 = require("../lib/encoder");
var mapper_1 = require("../lib/mapper");
var context_1 = require("../lib/types/context");
var resizable_buffer_1 = __importDefault(require("../lib/utils/resizable-buffer"));
tap_1.default.test('should dynamically encode a boolean value', function (test) {
    var context = context_1.getDefaultEncodingContext();
    var buffer = new resizable_buffer_1.default(Buffer.allocUnsafe(1));
    var offset = 0;
    var encoding = {
        type: mapper_1.EncodingType.Boolean,
        encoding: 'BOOLEAN_8BITS__ENUM_FIXED',
        options: {}
    };
    var value = true;
    var bytesWritten = encoder_1.encode(buffer, offset, encoding, value, context);
    test.is(bytesWritten, 1);
    test.strictSame(buffer.getBuffer(), Buffer.from([0x01]));
    var result = encoder_1.decode(buffer, offset, encoding);
    test.is(result.bytes, bytesWritten);
    test.strictSame(result.value, value);
    test.end();
});
