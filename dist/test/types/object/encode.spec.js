"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var encode_1 = require("../../../lib/types/object/encode");
var base_1 = require("../../../lib/types/base");
var mapper_1 = require("../../../lib/types/integer/mapper");
var mapper_2 = require("../../../lib/types/string/mapper");
tap_1.default.test('ARBITRARY_TYPED_KEYS_OBJECT: should encode untyped {foo:"bar",baz:1}', function (test) {
    var buffer = Buffer.allocUnsafe(16);
    var bytesWritten = encode_1.ARBITRARY_TYPED_KEYS_OBJECT(buffer, 0, {
        foo: 'bar',
        baz: 1
    }, {
        keyEncoding: mapper_2.getStringEncoding({
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
        keyEncoding: mapper_2.getStringEncoding({
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
tap_1.default.test('NON_REQUIRED_BOUNDED_TYPED_OBJECT: should encode typed {foo:"bar",baz:1}', function (test) {
    var buffer = Buffer.allocUnsafe(7);
    var bytesWritten = encode_1.NON_REQUIRED_BOUNDED_TYPED_OBJECT(buffer, 0, {
        foo: 'bar',
        baz: 1
    }, {
        optionalProperties: ['baz', 'bar', 'foo', 'qux'],
        encoding: {
            type: base_1.EncodingType.Any,
            encoding: 'ANY__TYPE_PREFIX',
            options: {}
        },
        propertyEncodings: {
            foo: mapper_2.getStringEncoding({
                type: 'string'
            }),
            baz: mapper_1.getIntegerEncoding({
                type: 'integer',
                minimum: 0
            })
        }
    });
    test.strictSame(buffer, Buffer.from([
        0x04,
        5,
        0x01,
        0x03, 0x62, 0x61, 0x72
    ]));
    test.is(bytesWritten, 7);
    test.end();
});
tap_1.default.test('NON_REQUIRED_BOUNDED_TYPED_OBJECT: should encode typed {}', function (test) {
    var buffer = Buffer.allocUnsafe(2);
    var bytesWritten = encode_1.NON_REQUIRED_BOUNDED_TYPED_OBJECT(buffer, 0, {}, {
        optionalProperties: ['baz', 'bar', 'foo', 'qux'],
        encoding: {
            type: base_1.EncodingType.Any,
            encoding: 'ANY__TYPE_PREFIX',
            options: {}
        },
        propertyEncodings: {
            foo: mapper_2.getStringEncoding({
                type: 'string'
            }),
            baz: mapper_1.getIntegerEncoding({
                type: 'integer',
                minimum: 0
            })
        }
    });
    test.strictSame(buffer, Buffer.from([
        0x04,
        0
    ]));
    test.is(bytesWritten, 2);
    test.end();
});
tap_1.default.test('REQUIRED_BOUNDED_TYPED_OBJECT: should encode typed {foo:"bar",baz:1}', function (test) {
    var buffer = Buffer.allocUnsafe(5);
    var bytesWritten = encode_1.REQUIRED_BOUNDED_TYPED_OBJECT(buffer, 0, {
        foo: 'bar',
        baz: 1
    }, {
        requiredProperties: ['baz', 'foo'],
        encoding: {
            type: base_1.EncodingType.Any,
            encoding: 'ANY__TYPE_PREFIX',
            options: {}
        },
        propertyEncodings: {
            foo: mapper_2.getStringEncoding({
                type: 'string'
            }),
            baz: mapper_1.getIntegerEncoding({
                type: 'integer',
                minimum: 0
            })
        }
    });
    test.strictSame(buffer, Buffer.from([
        0x01,
        0x03, 0x62, 0x61, 0x72
    ]));
    test.is(bytesWritten, 5);
    test.end();
});
