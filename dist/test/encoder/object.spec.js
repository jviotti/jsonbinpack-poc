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
var util = __importStar(require("util"));
var mapper_1 = require("../../lib/mapper");
var any_1 = require("../../lib/mapper/any");
var encode_1 = require("../../lib/encoder/object/encode");
var decode_1 = require("../../lib/encoder/object/decode");
var string_1 = require("../../lib/mapper/string");
var integer_1 = require("../../lib/mapper/integer");
var context_1 = require("../../lib/encoder/context");
var resizable_buffer_1 = __importDefault(require("../../lib/utils/resizable-buffer"));
tap_1.default.test('ARBITRARY_TYPED_KEYS_OBJECT: scalars values', function (test) {
    var options = {
        keyEncoding: string_1.getStringEncoding({
            type: 'string'
        }),
        encoding: {
            type: mapper_1.EncodingType.Any,
            encoding: 'ANY__TYPE_PREFIX',
            options: {}
        }
    };
    fc.assert(fc.property(fc.nat(10), fc.dictionary(fc.string(), fc.oneof(fc.constant(null), fc.boolean(), fc.integer(), fc.float(), fc.double(), fc.string({ maxLength: 10 }))), function (offset, value) {
        var context = context_1.getDefaultEncodingContext();
        var buffer = new resizable_buffer_1.default(Buffer.allocUnsafe(2048));
        var bytesWritten = encode_1.ARBITRARY_TYPED_KEYS_OBJECT(buffer, offset, value, options, context);
        var result = decode_1.ARBITRARY_TYPED_KEYS_OBJECT(buffer, offset, options);
        return bytesWritten > 0 && result.bytes === bytesWritten &&
            util.isDeepStrictEqual(result.value, value);
    }), {
        verbose: false
    });
    test.end();
});
tap_1.default.test('ARBITRARY_TYPED_KEYS_OBJECT: untyped {foo:"bar",baz:1}', function (test) {
    var context = context_1.getDefaultEncodingContext();
    var buffer = new resizable_buffer_1.default(Buffer.allocUnsafe(16));
    var value = {
        foo: 'bar',
        baz: 1
    };
    var keyEncoding = string_1.getStringEncoding({
        type: 'string'
    });
    var bytesWritten = encode_1.ARBITRARY_TYPED_KEYS_OBJECT(buffer, 0, value, {
        keyEncoding: keyEncoding,
        encoding: {
            type: mapper_1.EncodingType.Any,
            encoding: 'ANY__TYPE_PREFIX',
            options: {}
        }
    }, context);
    var result = decode_1.ARBITRARY_TYPED_KEYS_OBJECT(buffer, 0, {
        keyEncoding: keyEncoding,
        encoding: {
            type: mapper_1.EncodingType.Any,
            encoding: 'ANY__TYPE_PREFIX',
            options: {}
        }
    });
    test.is(bytesWritten, result.bytes);
    test.strictSame(result.value, value);
    test.end();
});
tap_1.default.test('ARBITRARY_TYPED_KEYS_OBJECT: typed {foo:"bar",baz:1}', function (test) {
    var context = context_1.getDefaultEncodingContext();
    var buffer = new resizable_buffer_1.default(Buffer.allocUnsafe(16));
    var value = {
        foo: 'bar',
        baz: 1
    };
    var keyEncoding = string_1.getStringEncoding({
        type: 'string',
        minLength: 3
    });
    var bytesWritten = encode_1.ARBITRARY_TYPED_KEYS_OBJECT(buffer, 0, value, {
        keyEncoding: keyEncoding,
        encoding: {
            type: mapper_1.EncodingType.Any,
            encoding: 'ANY__TYPE_PREFIX',
            options: {}
        }
    }, context);
    var result = decode_1.ARBITRARY_TYPED_KEYS_OBJECT(buffer, 0, {
        keyEncoding: keyEncoding,
        encoding: {
            type: mapper_1.EncodingType.Any,
            encoding: 'ANY__TYPE_PREFIX',
            options: {}
        }
    });
    test.is(bytesWritten, result.bytes);
    test.strictSame(result.value, value);
    test.end();
});
tap_1.default.test('NON_REQUIRED_BOUNDED_TYPED_OBJECT: typed {foo:"bar",baz:1}', function (test) {
    var context = context_1.getDefaultEncodingContext();
    var buffer = new resizable_buffer_1.default(Buffer.allocUnsafe(7));
    var value = {
        foo: 'bar',
        baz: 1
    };
    var options = {
        optionalProperties: ['baz', 'bar', 'foo', 'qux'],
        propertyEncodings: {
            foo: string_1.getStringEncoding({
                type: 'string'
            }),
            baz: integer_1.getIntegerEncoding({
                type: 'integer',
                minimum: 0
            }),
            bar: any_1.getAnyEncoding({}),
            qux: any_1.getAnyEncoding({})
        }
    };
    var bytesWritten = encode_1.NON_REQUIRED_BOUNDED_TYPED_OBJECT(buffer, 0, value, options, context);
    var result = decode_1.NON_REQUIRED_BOUNDED_TYPED_OBJECT(buffer, 0, options);
    test.is(bytesWritten, result.bytes);
    test.strictSame(result.value, value);
    test.end();
});
tap_1.default.test('REQUIRED_ONLY_BOUNDED_TYPED_OBJECT: typed {foo:"bar",baz:1}', function (test) {
    var context = context_1.getDefaultEncodingContext();
    var buffer = new resizable_buffer_1.default(Buffer.allocUnsafe(5));
    var value = {
        foo: 'bar',
        baz: 1
    };
    var options = {
        requiredProperties: ['baz', 'foo'],
        propertyEncodings: {
            foo: string_1.getStringEncoding({
                type: 'string'
            }),
            baz: integer_1.getIntegerEncoding({
                type: 'integer',
                minimum: 0
            })
        }
    };
    var bytesWritten = encode_1.REQUIRED_ONLY_BOUNDED_TYPED_OBJECT(buffer, 0, value, options, context);
    var result = decode_1.REQUIRED_ONLY_BOUNDED_TYPED_OBJECT(buffer, 0, options);
    test.is(bytesWritten, result.bytes);
    test.strictSame(result.value, value);
    test.end();
});
tap_1.default.test('MIXED_BOUNDED_TYPED_OBJECT: typed {foo:"bar",baz:1} with one required', function (test) {
    var context = context_1.getDefaultEncodingContext();
    var buffer = new resizable_buffer_1.default(Buffer.allocUnsafe(7));
    var value = {
        foo: 'bar',
        baz: 1
    };
    var options = {
        requiredProperties: ['foo'],
        optionalProperties: ['baz'],
        propertyEncodings: {
            foo: string_1.getStringEncoding({
                type: 'string'
            }),
            baz: integer_1.getIntegerEncoding({
                type: 'integer',
                minimum: 0
            })
        }
    };
    var bytesWritten = encode_1.MIXED_BOUNDED_TYPED_OBJECT(buffer, 0, value, options, context);
    var result = decode_1.MIXED_BOUNDED_TYPED_OBJECT(buffer, 0, options);
    test.is(bytesWritten, result.bytes);
    test.strictSame(result.value, value);
    test.end();
});
tap_1.default.test('MIXED_BOUNDED_TYPED_OBJECT: {foo:"bar",baz:1} with one missing optional', function (test) {
    var context = context_1.getDefaultEncodingContext();
    var buffer = new resizable_buffer_1.default(Buffer.allocUnsafe(6));
    var value = {
        foo: 'bar'
    };
    var options = {
        requiredProperties: ['foo'],
        optionalProperties: ['baz'],
        propertyEncodings: {
            foo: string_1.getStringEncoding({
                type: 'string'
            }),
            baz: integer_1.getIntegerEncoding({
                type: 'integer',
                minimum: 0
            })
        }
    };
    var bytesWritten = encode_1.MIXED_BOUNDED_TYPED_OBJECT(buffer, 0, value, options, context);
    var result = decode_1.MIXED_BOUNDED_TYPED_OBJECT(buffer, 0, options);
    test.is(bytesWritten, result.bytes);
    test.strictSame(result.value, value);
    test.end();
});
tap_1.default.test('REQUIRED_UNBOUNDED_TYPED_OBJECT: semityped {foo:"bar",baz:1}', function (test) {
    var context = context_1.getDefaultEncodingContext();
    var buffer = new resizable_buffer_1.default(Buffer.allocUnsafe(11));
    var value = {
        foo: 'bar',
        baz: 1
    };
    var options = {
        requiredProperties: ['foo'],
        propertyEncodings: {
            foo: string_1.getStringEncoding({
                type: 'string'
            })
        },
        keyEncoding: string_1.getStringEncoding({
            type: 'string'
        }),
        encoding: {
            type: mapper_1.EncodingType.Any,
            encoding: 'ANY__TYPE_PREFIX',
            options: {}
        }
    };
    var bytesWritten = encode_1.REQUIRED_UNBOUNDED_TYPED_OBJECT(buffer, 0, value, options, context);
    var result = decode_1.REQUIRED_UNBOUNDED_TYPED_OBJECT(buffer, 0, options);
    test.is(bytesWritten, result.bytes);
    test.strictSame(result.value, value);
    test.end();
});
tap_1.default.test('REQUIRED_UNBOUNDED_TYPED_OBJECT: typed {foo:"bar"}', function (test) {
    var context = context_1.getDefaultEncodingContext();
    var buffer = new resizable_buffer_1.default(Buffer.allocUnsafe(5));
    var value = {
        foo: 'bar'
    };
    var options = {
        requiredProperties: ['foo'],
        propertyEncodings: {
            foo: string_1.getStringEncoding({
                type: 'string'
            })
        },
        keyEncoding: string_1.getStringEncoding({
            type: 'string'
        }),
        encoding: {
            type: mapper_1.EncodingType.Any,
            encoding: 'ANY__TYPE_PREFIX',
            options: {}
        }
    };
    var bytesWritten = encode_1.REQUIRED_UNBOUNDED_TYPED_OBJECT(buffer, 0, value, options, context);
    var result = decode_1.REQUIRED_UNBOUNDED_TYPED_OBJECT(buffer, 0, options);
    test.is(bytesWritten, result.bytes);
    test.strictSame(result.value, value);
    test.end();
});
tap_1.default.test('OPTIONAL_UNBOUNDED_TYPED_OBJECT: semityped {foo:"bar",baz:1}', function (test) {
    var context = context_1.getDefaultEncodingContext();
    var buffer = new resizable_buffer_1.default(Buffer.allocUnsafe(13));
    var value = {
        foo: 'bar',
        baz: 1
    };
    var options = {
        optionalProperties: ['foo'],
        propertyEncodings: {
            foo: string_1.getStringEncoding({
                type: 'string'
            })
        },
        keyEncoding: string_1.getStringEncoding({
            type: 'string'
        }),
        encoding: {
            type: mapper_1.EncodingType.Any,
            encoding: 'ANY__TYPE_PREFIX',
            options: {}
        }
    };
    var bytesWritten = encode_1.OPTIONAL_UNBOUNDED_TYPED_OBJECT(buffer, 0, value, options, context);
    var result = decode_1.OPTIONAL_UNBOUNDED_TYPED_OBJECT(buffer, 0, options);
    test.is(bytesWritten, result.bytes);
    test.strictSame(result.value, value);
    test.end();
});
tap_1.default.test('MIXED_UNBOUNDED_TYPED_OBJECT: mixed {foo:"bar",baz:1,qux:null}', function (test) {
    var context = context_1.getDefaultEncodingContext();
    var buffer = new resizable_buffer_1.default(Buffer.allocUnsafe(13));
    var value = {
        foo: 'bar',
        baz: 1,
        qux: null
    };
    var options = {
        requiredProperties: ['foo'],
        optionalProperties: ['baz'],
        keyEncoding: string_1.getStringEncoding({
            type: 'string'
        }),
        encoding: {
            type: mapper_1.EncodingType.Any,
            encoding: 'ANY__TYPE_PREFIX',
            options: {}
        },
        propertyEncodings: {
            foo: string_1.getStringEncoding({
                type: 'string'
            }),
            baz: integer_1.getIntegerEncoding({
                type: 'integer',
                minimum: 0
            })
        }
    };
    var bytesWritten = encode_1.MIXED_UNBOUNDED_TYPED_OBJECT(buffer, 0, value, options, context);
    var result = decode_1.MIXED_UNBOUNDED_TYPED_OBJECT(buffer, 0, options);
    test.is(bytesWritten, result.bytes);
    test.strictSame(result.value, value);
    test.end();
});
