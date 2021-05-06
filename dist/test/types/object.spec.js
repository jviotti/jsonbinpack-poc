"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var base_1 = require("../../lib/types/base");
var encode_1 = require("../../lib/types/object/encode");
var decode_1 = require("../../lib/types/object/decode");
var mapper_1 = require("../../lib/types/string/mapper");
var mapper_2 = require("../../lib/types/integer/mapper");
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
        keyEncoding: keyEncoding,
        encoding: {
            type: base_1.EncodingType.Any,
            encoding: 'ANY__TYPE_PREFIX',
            options: {}
        }
    });
    var result = decode_1.ARBITRARY_TYPED_KEYS_OBJECT(buffer, 0, {
        keyEncoding: keyEncoding,
        encoding: {
            type: base_1.EncodingType.Any,
            encoding: 'ANY__TYPE_PREFIX',
            options: {}
        }
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
        keyEncoding: keyEncoding,
        encoding: {
            type: base_1.EncodingType.Any,
            encoding: 'ANY__TYPE_PREFIX',
            options: {}
        }
    });
    var result = decode_1.ARBITRARY_TYPED_KEYS_OBJECT(buffer, 0, {
        keyEncoding: keyEncoding,
        encoding: {
            type: base_1.EncodingType.Any,
            encoding: 'ANY__TYPE_PREFIX',
            options: {}
        }
    });
    test.is(bytesWritten, result.bytes);
    test.strictSame(result.value, value);
    test.end();
});
tap_1.default.test('NON_REQUIRED_BOUNDED_TYPED_OBJECT: typed {foo:"bar",baz:1}', function (test) {
    var buffer = Buffer.allocUnsafe(7);
    var value = {
        foo: 'bar',
        baz: 1
    };
    var options = {
        optionalProperties: ['baz', 'bar', 'foo', 'qux'],
        encoding: {
            type: base_1.EncodingType.Any,
            encoding: 'ANY__TYPE_PREFIX',
            options: {}
        },
        propertyEncodings: {
            foo: mapper_1.getStringEncoding({
                type: 'string'
            }),
            baz: mapper_2.getIntegerEncoding({
                type: 'integer',
                minimum: 0
            })
        }
    };
    var bytesWritten = encode_1.NON_REQUIRED_BOUNDED_TYPED_OBJECT(buffer, 0, value, options);
    var result = decode_1.NON_REQUIRED_BOUNDED_TYPED_OBJECT(buffer, 0, options);
    test.is(bytesWritten, result.bytes);
    test.strictSame(result.value, value);
    test.end();
});
tap_1.default.test('REQUIRED_ONLY_BOUNDED_TYPED_OBJECT: typed {foo:"bar",baz:1}', function (test) {
    var buffer = Buffer.allocUnsafe(5);
    var value = {
        foo: 'bar',
        baz: 1
    };
    var options = {
        requiredProperties: ['baz', 'foo'],
        propertyEncodings: {
            foo: mapper_1.getStringEncoding({
                type: 'string'
            }),
            baz: mapper_2.getIntegerEncoding({
                type: 'integer',
                minimum: 0
            })
        }
    };
    var bytesWritten = encode_1.REQUIRED_ONLY_BOUNDED_TYPED_OBJECT(buffer, 0, value, options);
    var result = decode_1.REQUIRED_ONLY_BOUNDED_TYPED_OBJECT(buffer, 0, options);
    test.is(bytesWritten, result.bytes);
    test.strictSame(result.value, value);
    test.end();
});
