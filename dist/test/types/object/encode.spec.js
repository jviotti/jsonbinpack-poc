"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var encode_1 = require("../../../lib/types/object/encode");
var base_1 = require("../../../lib/types/base");
var mapper_1 = require("../../../lib/types/any/mapper");
var mapper_2 = require("../../../lib/types/integer/mapper");
var mapper_3 = require("../../../lib/types/string/mapper");
var resizable_buffer_1 = __importDefault(require("../../../lib/utils/resizable-buffer"));
tap_1.default.test('ARBITRARY_TYPED_KEYS_OBJECT: should encode untyped {foo:"bar",baz:1}', function (test) {
    var buffer = new resizable_buffer_1.default(Buffer.allocUnsafe(16));
    var bytesWritten = encode_1.ARBITRARY_TYPED_KEYS_OBJECT(buffer, 0, {
        foo: 'bar',
        baz: 1
    }, {
        keyEncoding: mapper_3.getStringEncoding({
            type: 'string'
        }),
        encoding: {
            type: base_1.EncodingType.Any,
            encoding: 'ANY__TYPE_PREFIX',
            options: {}
        }
    });
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x02,
        0x04, 0x66, 0x6f, 0x6f,
        0x00, 0x04, 0x62, 0x61, 0x72,
        0x04, 0x62, 0x61, 0x7a,
        0x09, 0x01
    ]));
    test.is(bytesWritten, 16);
    test.end();
});
tap_1.default.test('ARBITRARY_TYPED_KEYS_OBJECT: should encode typed {foo:"bar",baz:1}', function (test) {
    var buffer = new resizable_buffer_1.default(Buffer.allocUnsafe(16));
    var bytesWritten = encode_1.ARBITRARY_TYPED_KEYS_OBJECT(buffer, 0, {
        foo: 'bar',
        baz: 1
    }, {
        keyEncoding: mapper_3.getStringEncoding({
            type: 'string',
            minLength: 3
        }),
        encoding: {
            type: base_1.EncodingType.Any,
            encoding: 'ANY__TYPE_PREFIX',
            options: {}
        }
    });
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x02,
        0x01, 0x66, 0x6f, 0x6f,
        0x00, 0x04, 0x62, 0x61, 0x72,
        0x01, 0x62, 0x61, 0x7a,
        0x09, 0x01
    ]));
    test.is(bytesWritten, 16);
    test.end();
});
tap_1.default.test('NON_REQUIRED_BOUNDED_TYPED_OBJECT: should encode typed {foo:"bar",baz:1}', function (test) {
    var buffer = new resizable_buffer_1.default(Buffer.allocUnsafe(7));
    var bytesWritten = encode_1.NON_REQUIRED_BOUNDED_TYPED_OBJECT(buffer, 0, {
        foo: 'bar',
        baz: 1
    }, {
        optionalProperties: ['baz', 'bar', 'foo', 'qux'],
        propertyEncodings: {
            foo: mapper_3.getStringEncoding({
                type: 'string'
            }),
            baz: mapper_2.getIntegerEncoding({
                type: 'integer',
                minimum: 0
            }),
            bar: mapper_1.getAnyEncoding({}),
            qux: mapper_1.getAnyEncoding({})
        }
    });
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
    var buffer = new resizable_buffer_1.default(Buffer.allocUnsafe(2));
    var bytesWritten = encode_1.NON_REQUIRED_BOUNDED_TYPED_OBJECT(buffer, 0, {}, {
        optionalProperties: ['baz', 'bar', 'foo', 'qux'],
        propertyEncodings: {
            foo: mapper_3.getStringEncoding({
                type: 'string'
            }),
            baz: mapper_2.getIntegerEncoding({
                type: 'integer',
                minimum: 0
            }),
            bar: mapper_1.getAnyEncoding({}),
            qux: mapper_1.getAnyEncoding({})
        }
    });
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x04,
        0
    ]));
    test.is(bytesWritten, 2);
    test.end();
});
tap_1.default.test('REQUIRED_ONLY_BOUNDED_TYPED_OBJECT: should encode typed {foo:"bar",baz:1}', function (test) {
    var buffer = new resizable_buffer_1.default(Buffer.allocUnsafe(5));
    var bytesWritten = encode_1.REQUIRED_ONLY_BOUNDED_TYPED_OBJECT(buffer, 0, {
        foo: 'bar',
        baz: 1
    }, {
        requiredProperties: ['baz', 'foo'],
        propertyEncodings: {
            foo: mapper_3.getStringEncoding({
                type: 'string'
            }),
            baz: mapper_2.getIntegerEncoding({
                type: 'integer',
                minimum: 0
            })
        }
    });
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x01,
        0x04, 0x62, 0x61, 0x72
    ]));
    test.is(bytesWritten, 5);
    test.end();
});
tap_1.default.test('MIXED_BOUNDED_TYPED_OBJECT: should encode typed {foo:"bar",baz:1} with one required', function (test) {
    var buffer = new resizable_buffer_1.default(Buffer.allocUnsafe(7));
    var bytesWritten = encode_1.MIXED_BOUNDED_TYPED_OBJECT(buffer, 0, {
        foo: 'bar',
        baz: 1
    }, {
        requiredProperties: ['foo'],
        optionalProperties: ['baz'],
        propertyEncodings: {
            foo: mapper_3.getStringEncoding({
                type: 'string'
            }),
            baz: mapper_2.getIntegerEncoding({
                type: 'integer',
                minimum: 0
            })
        }
    });
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x04, 0x62, 0x61, 0x72,
        0x01, 0x01,
        0x01
    ]));
    test.is(bytesWritten, 7);
    test.end();
});
tap_1.default.test('MIXED_BOUNDED_TYPED_OBJECT: should encode typed {foo:"bar",baz:1} with one missing optional', function (test) {
    var buffer = new resizable_buffer_1.default(Buffer.allocUnsafe(6));
    var bytesWritten = encode_1.MIXED_BOUNDED_TYPED_OBJECT(buffer, 0, {
        foo: 'bar'
    }, {
        requiredProperties: ['foo'],
        optionalProperties: ['baz'],
        propertyEncodings: {
            foo: mapper_3.getStringEncoding({
                type: 'string'
            }),
            baz: mapper_2.getIntegerEncoding({
                type: 'integer',
                minimum: 0
            })
        }
    });
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x04, 0x62, 0x61, 0x72,
        0x01, 0x00
    ]));
    test.is(bytesWritten, 6);
    test.end();
});
tap_1.default.test('REQUIRED_UNBOUNDED_TYPED_OBJECT: should encode semityped {foo:"bar",baz:1}', function (test) {
    var buffer = new resizable_buffer_1.default(Buffer.allocUnsafe(11));
    var bytesWritten = encode_1.REQUIRED_UNBOUNDED_TYPED_OBJECT(buffer, 0, {
        foo: 'bar',
        baz: 1
    }, {
        requiredProperties: ['foo'],
        propertyEncodings: {
            foo: mapper_3.getStringEncoding({
                type: 'string'
            })
        },
        keyEncoding: mapper_3.getStringEncoding({
            type: 'string'
        }),
        encoding: {
            type: base_1.EncodingType.Any,
            encoding: 'ANY__TYPE_PREFIX',
            options: {}
        }
    });
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x04, 0x62, 0x61, 0x72,
        0x01,
        0x04, 0x62, 0x61, 0x7a,
        0x09, 0x01
    ]));
    test.is(bytesWritten, 11);
    test.end();
});
tap_1.default.test('REQUIRED_UNBOUNDED_TYPED_OBJECT: should encode typed {foo:"bar"}', function (test) {
    var buffer = new resizable_buffer_1.default(Buffer.allocUnsafe(5));
    var bytesWritten = encode_1.REQUIRED_UNBOUNDED_TYPED_OBJECT(buffer, 0, {
        foo: 'bar'
    }, {
        requiredProperties: ['foo'],
        propertyEncodings: {
            foo: mapper_3.getStringEncoding({
                type: 'string'
            })
        },
        keyEncoding: mapper_3.getStringEncoding({
            type: 'string'
        }),
        encoding: {
            type: base_1.EncodingType.Any,
            encoding: 'ANY__TYPE_PREFIX',
            options: {}
        }
    });
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x04, 0x62, 0x61, 0x72,
        0x00
    ]));
    test.is(bytesWritten, 5);
    test.end();
});
tap_1.default.test('OPTIONAL_UNBOUNDED_TYPED_OBJECT: should encode semityped {foo:"bar",baz:1}', function (test) {
    var buffer = new resizable_buffer_1.default(Buffer.allocUnsafe(13));
    var bytesWritten = encode_1.OPTIONAL_UNBOUNDED_TYPED_OBJECT(buffer, 0, {
        foo: 'bar',
        baz: 1
    }, {
        optionalProperties: ['foo'],
        propertyEncodings: {
            foo: mapper_3.getStringEncoding({
                type: 'string'
            })
        },
        keyEncoding: mapper_3.getStringEncoding({
            type: 'string'
        }),
        encoding: {
            type: base_1.EncodingType.Any,
            encoding: 'ANY__TYPE_PREFIX',
            options: {}
        }
    });
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x01, 0x01,
        0x04, 0x62, 0x61, 0x72,
        0x01,
        0x04, 0x62, 0x61, 0x7a,
        0x09, 0x01
    ]));
    test.is(bytesWritten, 13);
    test.end();
});
tap_1.default.test('MIXED_UNBOUNDED_TYPED_OBJECT: should encode mixed {foo:"bar",baz:1,qux:null}', function (test) {
    var buffer = new resizable_buffer_1.default(Buffer.allocUnsafe(13));
    var bytesWritten = encode_1.MIXED_UNBOUNDED_TYPED_OBJECT(buffer, 0, {
        foo: 'bar',
        baz: 1,
        qux: null
    }, {
        requiredProperties: ['foo'],
        optionalProperties: ['baz'],
        keyEncoding: mapper_3.getStringEncoding({
            type: 'string'
        }),
        encoding: {
            type: base_1.EncodingType.Any,
            encoding: 'ANY__TYPE_PREFIX',
            options: {}
        },
        propertyEncodings: {
            foo: mapper_3.getStringEncoding({
                type: 'string'
            }),
            baz: mapper_2.getIntegerEncoding({
                type: 'integer',
                minimum: 0
            })
        }
    });
    test.strictSame(buffer.getBuffer(), Buffer.from([
        0x04, 0x62, 0x61, 0x72,
        0x01, 0x01,
        0x01,
        0x01,
        0x04, 0x71, 0x75, 0x78,
        0x06
    ]));
    test.is(bytesWritten, 13);
    test.end();
});
