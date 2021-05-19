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
var encode_1 = require("../../lib/types/any/encode");
var decode_1 = require("../../lib/types/any/decode");
var resizable_buffer_1 = __importDefault(require("../../lib/utils/resizable-buffer"));
tap_1.default.test('ANY__TYPE_PREFIX: should handle " "', function (test) {
    var buffer = new resizable_buffer_1.default(Buffer.allocUnsafe(2048));
    var bytesWritten = encode_1.ANY__TYPE_PREFIX(buffer, 0, ' ', {});
    test.is(bytesWritten, 3);
    var result = decode_1.ANY__TYPE_PREFIX(buffer, 0, {});
    test.is(result.bytes, 3);
    test.is(result.value, ' ');
    test.end();
});
tap_1.default.test('ANY__TYPE_PREFIX: should handle {"foo":"bar","baz":1}', function (test) {
    var buffer = new resizable_buffer_1.default(Buffer.allocUnsafe(100));
    var bytesWritten = encode_1.ANY__TYPE_PREFIX(buffer, 0, {
        foo: 'bar',
        baz: 1
    }, {});
    test.is(bytesWritten, 17);
    var result = decode_1.ANY__TYPE_PREFIX(buffer, 0, {});
    test.is(result.bytes, 17);
    test.strictSame(result.value, {
        foo: 'bar',
        baz: 1
    });
    test.end();
});
tap_1.default.test('ANY__TYPE_PREFIX: should handle [ "foo", true, 2000 ]', function (test) {
    var buffer = new resizable_buffer_1.default(Buffer.allocUnsafe(100));
    var bytesWritten = encode_1.ANY__TYPE_PREFIX(buffer, 0, [
        'foo', true, 2000
    ], {});
    test.is(bytesWritten, 11);
    var result = decode_1.ANY__TYPE_PREFIX(buffer, 0, {});
    test.is(result.bytes, 11);
    test.strictSame(result.value, ['foo', true, 2000]);
    test.end();
});
tap_1.default.test('ANY__TYPE_PREFIX: scalars', function (test) {
    fc.assert(fc.property(fc.nat(10), fc.oneof(fc.constant(null), fc.boolean(), fc.integer(), fc.float(), fc.double(), fc.string({ maxLength: 1000 })), function (offset, value) {
        var buffer = new resizable_buffer_1.default(Buffer.allocUnsafe(2048));
        var bytesWritten = encode_1.ANY__TYPE_PREFIX(buffer, offset, value, {});
        var result = decode_1.ANY__TYPE_PREFIX(buffer, offset, {});
        return bytesWritten > 0 &&
            result.bytes === bytesWritten && result.value === value;
    }), {
        verbose: false
    });
    test.end();
});
tap_1.default.test('ANY__TYPE_PREFIX: JSON', function (test) {
    fc.assert(fc.property(fc.json(), function (json) {
        var value = JSON.parse(json);
        var buffer = new resizable_buffer_1.default(Buffer.allocUnsafe(2048));
        var bytesWritten = encode_1.ANY__TYPE_PREFIX(buffer, 0, value, {});
        var result = decode_1.ANY__TYPE_PREFIX(buffer, 0, {});
        return bytesWritten > 0 && result.bytes === bytesWritten &&
            util.isDeepStrictEqual(result.value, value);
    }), {
        verbose: false
    });
    test.end();
});
tap_1.default.test('ANY__TYPE_PREFIX: JSON with small ResizableBuffer', function (test) {
    fc.assert(fc.property(fc.json(), function (json) {
        var value = JSON.parse(json);
        var buffer = new resizable_buffer_1.default(Buffer.allocUnsafe(1));
        var bytesWritten = encode_1.ANY__TYPE_PREFIX(buffer, 0, value, {});
        var result = decode_1.ANY__TYPE_PREFIX(buffer, 0, {});
        return bytesWritten > 0 && result.bytes === bytesWritten &&
            util.isDeepStrictEqual(result.value, value);
    }), {
        verbose: false
    });
    test.end();
});
tap_1.default.test('ANY__TYPE_PREFIX: JSON with 0 ResizableBuffer', function (test) {
    fc.assert(fc.property(fc.json(), function (json) {
        var value = JSON.parse(json);
        var buffer = new resizable_buffer_1.default(Buffer.allocUnsafe(0));
        var bytesWritten = encode_1.ANY__TYPE_PREFIX(buffer, 0, value, {});
        var result = decode_1.ANY__TYPE_PREFIX(buffer, 0, {});
        return bytesWritten > 0 && result.bytes === bytesWritten &&
            util.isDeepStrictEqual(result.value, value);
    }), {
        verbose: false
    });
    test.end();
});
