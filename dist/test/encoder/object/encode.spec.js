"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var encode_1 = require("../../../lib/encoder/object/encode");
var mapper_1 = require("../../../lib/mapper");
var string_1 = require("../../../lib/mapper/string");
var encoder_1 = require("../../../lib/encoder");
tap_1.default.test('ARBITRARY_TYPED_KEYS_OBJECT: should encode untyped {foo:"bar",baz:1}', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(16));
    var bytesWritten = encode_1.ARBITRARY_TYPED_KEYS_OBJECT(buffer, 0, {
        foo: 'bar',
        baz: 1
    }, {
        keyEncoding: string_1.getStringEncoding({
            type: 'string'
        }),
        encoding: {
            type: encoder_1.EncodingType.Any,
            encoding: 'ANY__TYPE_PREFIX',
            options: {}
        }
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x02,
        0x04, 0x66, 0x6f, 0x6f,
        0x01, 0x04, 0x62, 0x61, 0x72,
        0x04, 0x62, 0x61, 0x7a,
        0x0a, 0x01
    ]));
    test.is(bytesWritten, 16);
    test.end();
});
tap_1.default.test('ARBITRARY_TYPED_KEYS_OBJECT: should encode typed {foo:"bar",baz:1}', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(16));
    var bytesWritten = encode_1.ARBITRARY_TYPED_KEYS_OBJECT(buffer, 0, {
        foo: 'bar',
        baz: 1
    }, {
        keyEncoding: string_1.getStringEncoding({
            type: 'string',
            minLength: 3
        }),
        encoding: {
            type: encoder_1.EncodingType.Any,
            encoding: 'ANY__TYPE_PREFIX',
            options: {}
        }
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x02,
        0x01, 0x66, 0x6f, 0x6f,
        0x01, 0x04, 0x62, 0x61, 0x72,
        0x01, 0x62, 0x61, 0x7a,
        0x0a, 0x01
    ]));
    test.is(bytesWritten, 16);
    test.end();
});
tap_1.default.test('NON_REQUIRED_BOUNDED_TYPED_OBJECT: should encode typed {foo:"bar",baz:1}', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(7));
    var bytesWritten = encode_1.NON_REQUIRED_BOUNDED_TYPED_OBJECT(buffer, 0, {
        foo: 'bar',
        baz: 1
    }, {
        optionalProperties: ['baz', 'bar', 'foo', 'qux'],
        propertyEncodings: {
            foo: mapper_1.getEncoding({
                type: 'string'
            }),
            baz: mapper_1.getEncoding({
                type: 'integer',
                minimum: 0
            }),
            bar: mapper_1.getEncoding({}),
            qux: mapper_1.getEncoding({})
        }
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x04,
        5,
        0x01,
        0x04, 0x62, 0x61, 0x72
    ]));
    test.is(bytesWritten, 7);
    test.end();
});
tap_1.default.test('NON_REQUIRED_BOUNDED_TYPED_OBJECT: should encode typed {}', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(2));
    var bytesWritten = encode_1.NON_REQUIRED_BOUNDED_TYPED_OBJECT(buffer, 0, {}, {
        optionalProperties: ['baz', 'bar', 'foo', 'qux'],
        propertyEncodings: {
            foo: mapper_1.getEncoding({
                type: 'string'
            }),
            baz: mapper_1.getEncoding({
                type: 'integer',
                minimum: 0
            }),
            bar: mapper_1.getEncoding({}),
            qux: mapper_1.getEncoding({})
        }
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x04,
        0
    ]));
    test.is(bytesWritten, 2);
    test.end();
});
tap_1.default.test('REQUIRED_ONLY_BOUNDED_TYPED_OBJECT: should encode typed {foo:"bar",baz:1}', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(5));
    var bytesWritten = encode_1.REQUIRED_ONLY_BOUNDED_TYPED_OBJECT(buffer, 0, {
        foo: 'bar',
        baz: 1
    }, {
        requiredProperties: ['baz', 'foo'],
        booleanRequiredProperties: [],
        propertyEncodings: {
            foo: mapper_1.getEncoding({
                type: 'string'
            }),
            baz: mapper_1.getEncoding({
                type: 'integer',
                minimum: 0
            })
        }
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x01,
        0x04, 0x62, 0x61, 0x72
    ]));
    test.is(bytesWritten, 5);
    test.end();
});
tap_1.default.test('REQUIRED_ONLY_BOUNDED_TYPED_OBJECT: should encode typed {foo:"bar",baz:1,baz:true,qux:false}', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(6));
    var bytesWritten = encode_1.REQUIRED_ONLY_BOUNDED_TYPED_OBJECT(buffer, 0, {
        foo: 'bar',
        bar: 1,
        baz: true,
        qux: false
    }, {
        requiredProperties: ['bar', 'foo'],
        booleanRequiredProperties: ['baz', 'qux'],
        propertyEncodings: {
            foo: mapper_1.getEncoding({
                type: 'string'
            }),
            bar: mapper_1.getEncoding({
                type: 'integer',
                minimum: 0
            }),
            baz: mapper_1.getEncoding({
                type: 'boolean'
            }),
            qux: mapper_1.getEncoding({
                type: 'boolean'
            })
        }
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        1,
        0x01,
        0x04, 0x62, 0x61, 0x72
    ]));
    test.is(bytesWritten, 6);
    test.end();
});
tap_1.default.test('REQUIRED_ONLY_BOUNDED_TYPED_OBJECT: should encode three boolean properties', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(1));
    var bytesWritten = encode_1.REQUIRED_ONLY_BOUNDED_TYPED_OBJECT(buffer, 0, {
        foo: true,
        bar: false,
        baz: true
    }, {
        requiredProperties: [],
        booleanRequiredProperties: ['foo', 'bar', 'baz'],
        propertyEncodings: {
            foo: mapper_1.getEncoding({
                type: 'boolean'
            }),
            bar: mapper_1.getEncoding({
                type: 'boolean'
            }),
            baz: mapper_1.getEncoding({
                type: 'boolean'
            })
        }
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([5]));
    test.is(bytesWritten, 1);
    test.end();
});
tap_1.default.test('REQUIRED_ONLY_BOUNDED_TYPED_OBJECT: should encode eight boolean properties', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(1));
    var bytesWritten = encode_1.REQUIRED_ONLY_BOUNDED_TYPED_OBJECT(buffer, 0, {
        foo: true,
        bar: false,
        baz: true,
        qux: true,
        xxx: false,
        yyy: false,
        zzz: true,
        qqq: true
    }, {
        requiredProperties: [],
        booleanRequiredProperties: ['foo', 'bar', 'baz', 'qux', 'xxx', 'yyy', 'zzz', 'qqq'],
        propertyEncodings: {
            foo: mapper_1.getEncoding({
                type: 'boolean'
            }),
            bar: mapper_1.getEncoding({
                type: 'boolean'
            }),
            baz: mapper_1.getEncoding({
                type: 'boolean'
            }),
            qux: mapper_1.getEncoding({
                type: 'boolean'
            }),
            xxx: mapper_1.getEncoding({
                type: 'boolean'
            }),
            yyy: mapper_1.getEncoding({
                type: 'boolean'
            }),
            zzz: mapper_1.getEncoding({
                type: 'boolean'
            }),
            qqq: mapper_1.getEncoding({
                type: 'boolean'
            })
        }
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([205]));
    test.is(bytesWritten, 1);
    test.end();
});
tap_1.default.test('REQUIRED_ONLY_BOUNDED_TYPED_OBJECT: should encode nine boolean properties', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(2));
    var bytesWritten = encode_1.REQUIRED_ONLY_BOUNDED_TYPED_OBJECT(buffer, 0, {
        foo: true,
        bar: false,
        baz: true,
        qux: true,
        xxx: false,
        yyy: false,
        zzz: true,
        qqq: true,
        ppp: false
    }, {
        requiredProperties: [],
        booleanRequiredProperties: ['foo', 'bar', 'baz', 'qux', 'xxx', 'yyy', 'zzz', 'qqq', 'ppp'],
        propertyEncodings: {
            foo: mapper_1.getEncoding({
                type: 'boolean'
            }),
            bar: mapper_1.getEncoding({
                type: 'boolean'
            }),
            baz: mapper_1.getEncoding({
                type: 'boolean'
            }),
            qux: mapper_1.getEncoding({
                type: 'boolean'
            }),
            xxx: mapper_1.getEncoding({
                type: 'boolean'
            }),
            yyy: mapper_1.getEncoding({
                type: 'boolean'
            }),
            zzz: mapper_1.getEncoding({
                type: 'boolean'
            }),
            qqq: mapper_1.getEncoding({
                type: 'boolean'
            }),
            ppp: mapper_1.getEncoding({
                type: 'boolean'
            })
        }
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([205, 0x00]));
    test.is(bytesWritten, 2);
    test.end();
});
tap_1.default.test('MIXED_BOUNDED_TYPED_OBJECT: should encode typed {foo:"bar",baz:1} with one required', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(7));
    var bytesWritten = encode_1.MIXED_BOUNDED_TYPED_OBJECT(buffer, 0, {
        foo: 'bar',
        baz: 1
    }, {
        requiredProperties: ['foo'],
        booleanRequiredProperties: [],
        optionalProperties: ['baz'],
        propertyEncodings: {
            foo: mapper_1.getEncoding({
                type: 'string'
            }),
            baz: mapper_1.getEncoding({
                type: 'integer',
                minimum: 0
            })
        }
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x04, 0x62, 0x61, 0x72,
        0x01, 0x01,
        0x01
    ]));
    test.is(bytesWritten, 7);
    test.end();
});
tap_1.default.test('MIXED_BOUNDED_TYPED_OBJECT: should encode typed {foo:"bar",baz:1} with one missing optional', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(6));
    var bytesWritten = encode_1.MIXED_BOUNDED_TYPED_OBJECT(buffer, 0, {
        foo: 'bar'
    }, {
        requiredProperties: ['foo'],
        booleanRequiredProperties: [],
        optionalProperties: ['baz'],
        propertyEncodings: {
            foo: mapper_1.getEncoding({
                type: 'string'
            }),
            baz: mapper_1.getEncoding({
                type: 'integer',
                minimum: 0
            })
        }
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x04, 0x62, 0x61, 0x72,
        0x01, 0x00
    ]));
    test.is(bytesWritten, 6);
    test.end();
});
tap_1.default.test('REQUIRED_UNBOUNDED_TYPED_OBJECT: should encode semityped {foo:"bar",baz:1}', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(11));
    var bytesWritten = encode_1.REQUIRED_UNBOUNDED_TYPED_OBJECT(buffer, 0, {
        foo: 'bar',
        baz: 1
    }, {
        requiredProperties: ['foo'],
        booleanRequiredProperties: [],
        propertyEncodings: {
            foo: mapper_1.getEncoding({
                type: 'string'
            })
        },
        keyEncoding: string_1.getStringEncoding({
            type: 'string'
        }),
        encoding: {
            type: encoder_1.EncodingType.Any,
            encoding: 'ANY__TYPE_PREFIX',
            options: {}
        }
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x04, 0x62, 0x61, 0x72,
        0x01,
        0x04, 0x62, 0x61, 0x7a,
        0x0a, 0x01
    ]));
    test.is(bytesWritten, 11);
    test.end();
});
tap_1.default.test('REQUIRED_UNBOUNDED_TYPED_OBJECT: should encode typed {foo:"bar"}', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(5));
    var bytesWritten = encode_1.REQUIRED_UNBOUNDED_TYPED_OBJECT(buffer, 0, {
        foo: 'bar'
    }, {
        requiredProperties: ['foo'],
        booleanRequiredProperties: [],
        propertyEncodings: {
            foo: mapper_1.getEncoding({
                type: 'string'
            })
        },
        keyEncoding: string_1.getStringEncoding({
            type: 'string'
        }),
        encoding: {
            type: encoder_1.EncodingType.Any,
            encoding: 'ANY__TYPE_PREFIX',
            options: {}
        }
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x04, 0x62, 0x61, 0x72,
        0x00
    ]));
    test.is(bytesWritten, 5);
    test.end();
});
tap_1.default.test('OPTIONAL_UNBOUNDED_TYPED_OBJECT: should encode semityped {foo:"bar",baz:1}', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(13));
    var bytesWritten = encode_1.OPTIONAL_UNBOUNDED_TYPED_OBJECT(buffer, 0, {
        foo: 'bar',
        baz: 1
    }, {
        optionalProperties: ['foo'],
        propertyEncodings: {
            foo: mapper_1.getEncoding({
                type: 'string'
            })
        },
        keyEncoding: string_1.getStringEncoding({
            type: 'string'
        }),
        encoding: {
            type: encoder_1.EncodingType.Any,
            encoding: 'ANY__TYPE_PREFIX',
            options: {}
        }
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x01, 0x01,
        0x04, 0x62, 0x61, 0x72,
        0x01,
        0x04, 0x62, 0x61, 0x7a,
        0x0a, 0x01
    ]));
    test.is(bytesWritten, 13);
    test.end();
});
tap_1.default.test('MIXED_UNBOUNDED_TYPED_OBJECT: should encode mixed {foo:"bar",baz:1,qux:null}', function (test) {
    var context = encoder_1.getDefaultEncodingContext();
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(13));
    var bytesWritten = encode_1.MIXED_UNBOUNDED_TYPED_OBJECT(buffer, 0, {
        foo: 'bar',
        baz: 1,
        qux: null
    }, {
        requiredProperties: ['foo'],
        booleanRequiredProperties: [],
        optionalProperties: ['baz'],
        keyEncoding: string_1.getStringEncoding({
            type: 'string'
        }),
        encoding: {
            type: encoder_1.EncodingType.Any,
            encoding: 'ANY__TYPE_PREFIX',
            options: {}
        },
        propertyEncodings: {
            foo: mapper_1.getEncoding({
                type: 'string'
            }),
            baz: mapper_1.getEncoding({
                type: 'integer',
                minimum: 0
            })
        }
    }, context);
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x04, 0x62, 0x61, 0x72,
        0x01, 0x01,
        0x01,
        0x01,
        0x04, 0x71, 0x75, 0x78,
        0x07
    ]));
    test.is(bytesWritten, 13);
    test.end();
});
