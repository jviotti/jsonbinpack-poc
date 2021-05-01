"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var encode_1 = require("../../../lib/types/object/encode");
var mapper_1 = require("../../../lib/types/string/mapper");
tap_1.default.test('ARBITRARY_TYPED_KEYS_OBJECT: should encode untyped {foo:"bar",baz:1}', function (test) {
    var buffer = Buffer.allocUnsafe(16);
    var bytesWritten = encode_1.ARBITRARY_TYPED_KEYS_OBJECT(buffer, 0, {
        foo: 'bar',
        baz: 1
    }, {
        keyEncoding: mapper_1.getStringEncoding({
            type: 'string'
        })
    });
    test.strictSame(buffer, Buffer.from([
        0x02,
        0x03, 0x66, 0x6f, 0x6f,
        0x00, 0x03, 0x62, 0x61, 0x72,
        0x03, 0x62, 0x61, 0x7a,
        0x09, 0x01
    ]));
    test.is(bytesWritten, 16);
    test.end();
});
tap_1.default.test('ARBITRARY_TYPED_KEYS_OBJECT: should encode typed {foo:"bar",baz:1}', function (test) {
    var buffer = Buffer.allocUnsafe(16);
    var bytesWritten = encode_1.ARBITRARY_TYPED_KEYS_OBJECT(buffer, 0, {
        foo: 'bar',
        baz: 1
    }, {
        keyEncoding: mapper_1.getStringEncoding({
            type: 'string',
            minLength: 3
        })
    });
    test.strictSame(buffer, Buffer.from([
        0x02,
        0x00, 0x66, 0x6f, 0x6f,
        0x00, 0x03, 0x62, 0x61, 0x72,
        0x00, 0x62, 0x61, 0x7a,
        0x09, 0x01
    ]));
    test.is(bytesWritten, 16);
    test.end();
});
