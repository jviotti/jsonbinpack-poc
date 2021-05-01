"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var encode_1 = require("../../lib/types/object/encode");
var decode_1 = require("../../lib/types/object/decode");
var mapper_1 = require("../../lib/types/string/mapper");
tap_1.default.test('ARBITRARY_TYPED_KEYS_OBJECT: untyped {foo:"bar",baz:1}', function (test) {
    var buffer = Buffer.allocUnsafe(16);
    var value = {
        foo: 'bar',
        baz: 1
    };
    var keyEncoding = mapper_1.getStringEncoding({
        type: 'string'
    });
    var bytesWritten = encode_1.ARBITRARY_TYPED_KEYS_OBJECT(buffer, 0, value, {
        keyEncoding: keyEncoding
    });
    var result = decode_1.ARBITRARY_TYPED_KEYS_OBJECT(buffer, 0, {
        keyEncoding: keyEncoding
    });
    test.is(bytesWritten, result.bytes);
    test.strictSame(result.value, value);
    test.end();
});
tap_1.default.test('ARBITRARY_TYPED_KEYS_OBJECT: typed {foo:"bar",baz:1}', function (test) {
    var buffer = Buffer.allocUnsafe(16);
    var value = {
        foo: 'bar',
        baz: 1
    };
    var keyEncoding = mapper_1.getStringEncoding({
        type: 'string',
        minLength: 3
    });
    var bytesWritten = encode_1.ARBITRARY_TYPED_KEYS_OBJECT(buffer, 0, value, {
        keyEncoding: keyEncoding
    });
    var result = decode_1.ARBITRARY_TYPED_KEYS_OBJECT(buffer, 0, {
        keyEncoding: keyEncoding
    });
    test.is(bytesWritten, result.bytes);
    test.strictSame(result.value, value);
    test.end();
});
