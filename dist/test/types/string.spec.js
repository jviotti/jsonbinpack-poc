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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var fc = __importStar(require("fast-check"));
var encode_1 = require("../../lib/types/string/encode");
var decode_1 = require("../../lib/types/string/decode");
var limits_1 = require("../../lib/utils/limits");
var resizable_buffer_1 = __importDefault(require("../../lib/utils/resizable-buffer"));
tap_1.default.test('ARBITRARY__PREFIX_LENGTH_VARINT: should handle " "', function (test) {
    var buffer = new resizable_buffer_1.default(Buffer.allocUnsafe(2048));
    var bytesWritten = encode_1.ARBITRARY__PREFIX_LENGTH_VARINT(buffer, 0, ' ', {});
    test.is(bytesWritten, 2);
    var result = decode_1.ARBITRARY__PREFIX_LENGTH_VARINT(buffer, 0, {});
    test.is(result.bytes, 2);
    test.is(result.value, ' ');
    test.end();
});
tap_1.default.test('BOUNDED__PREFIX_LENGTH_8BIT_FIXED (ASCII)', function (test) {
    var arbitrary = fc.nat(limits_1.UINT8_MAX).chain(function (maximum) {
        return fc.tuple(fc.nat(10), fc.nat(maximum), fc.constant(maximum), fc.string({ maxLength: maximum }));
    });
    fc.assert(fc.property(arbitrary, function (_a) {
        var _b = __read(_a, 4), offset = _b[0], minimum = _b[1], maximum = _b[2], value = _b[3];
        fc.pre(Buffer.byteLength(value, 'utf8') >= minimum);
        var buffer = new resizable_buffer_1.default(Buffer.allocUnsafe(offset + limits_1.UINT8_MAX + 1));
        var bytesWritten = encode_1.BOUNDED__PREFIX_LENGTH_8BIT_FIXED(buffer, offset, value, { minimum: minimum, maximum: maximum });
        var result = decode_1.BOUNDED__PREFIX_LENGTH_8BIT_FIXED(buffer, offset, { minimum: minimum, maximum: maximum });
        return bytesWritten > 0 && result.bytes === bytesWritten && result.value === value;
    }), {
        verbose: false
    });
    test.end();
});
tap_1.default.test('BOUNDED__PREFIX_LENGTH_ENUM_VARINT (ASCII)', function (test) {
    var arbitrary = fc.nat(1000).chain(function (maximum) {
        return fc.tuple(fc.nat(10), fc.nat(maximum), fc.constant(maximum), fc.string({ maxLength: maximum }));
    });
    fc.assert(fc.property(arbitrary, function (_a) {
        var _b = __read(_a, 4), offset = _b[0], minimum = _b[1], maximum = _b[2], value = _b[3];
        fc.pre(Buffer.byteLength(value, 'utf8') >= minimum);
        var buffer = new resizable_buffer_1.default(Buffer.allocUnsafe(2048));
        var bytesWritten = encode_1.BOUNDED__PREFIX_LENGTH_ENUM_VARINT(buffer, offset, value, { minimum: minimum, maximum: maximum });
        var result = decode_1.BOUNDED__PREFIX_LENGTH_ENUM_VARINT(buffer, offset, { minimum: minimum, maximum: maximum });
        return bytesWritten > 0 && result.bytes === bytesWritten && result.value === value;
    }), {
        verbose: false
    });
    test.end();
});
tap_1.default.test('ROOF__PREFIX_LENGTH_8BIT_FIXED (ASCII)', function (test) {
    var arbitrary = fc.nat(limits_1.UINT8_MAX).chain(function (maximum) {
        return fc.tuple(fc.nat(10), fc.constant(maximum), fc.string({ maxLength: maximum }));
    });
    fc.assert(fc.property(arbitrary, function (_a) {
        var _b = __read(_a, 3), offset = _b[0], maximum = _b[1], value = _b[2];
        var buffer = new resizable_buffer_1.default(Buffer.allocUnsafe(offset + limits_1.UINT8_MAX + 1));
        var bytesWritten = encode_1.ROOF__PREFIX_LENGTH_8BIT_FIXED(buffer, offset, value, { maximum: maximum });
        var result = decode_1.ROOF__PREFIX_LENGTH_8BIT_FIXED(buffer, offset, { maximum: maximum });
        return bytesWritten > 0 && result.bytes === bytesWritten && result.value === value;
    }), {
        verbose: false
    });
    test.end();
});
tap_1.default.test('ROOF__PREFIX_LENGTH_ENUM_VARINT (ASCII)', function (test) {
    var arbitrary = fc.nat(1000).chain(function (maximum) {
        return fc.tuple(fc.nat(10), fc.constant(maximum), fc.string({ maxLength: maximum }));
    });
    fc.assert(fc.property(arbitrary, function (_a) {
        var _b = __read(_a, 3), offset = _b[0], maximum = _b[1], value = _b[2];
        var buffer = new resizable_buffer_1.default(Buffer.allocUnsafe(2048));
        var bytesWritten = encode_1.ROOF__PREFIX_LENGTH_ENUM_VARINT(buffer, offset, value, { maximum: maximum });
        var result = decode_1.ROOF__PREFIX_LENGTH_ENUM_VARINT(buffer, offset, { maximum: maximum });
        return bytesWritten > 0 && result.bytes === bytesWritten && result.value === value;
    }), {
        verbose: false
    });
    test.end();
});
tap_1.default.test('FLOOR__PREFIX_LENGTH_ENUM_VARINT (ASCII)', function (test) {
    var arbitrary = fc.nat(2000).chain(function (minimum) {
        return fc.tuple(fc.nat(10), fc.constant(minimum), fc.string({ minLength: minimum, maxLength: 2000 }));
    });
    fc.assert(fc.property(arbitrary, function (_a) {
        var _b = __read(_a, 3), offset = _b[0], minimum = _b[1], value = _b[2];
        var buffer = new resizable_buffer_1.default(Buffer.allocUnsafe(2048));
        var bytesWritten = encode_1.FLOOR__PREFIX_LENGTH_ENUM_VARINT(buffer, offset, value, { minimum: minimum });
        var result = decode_1.FLOOR__PREFIX_LENGTH_ENUM_VARINT(buffer, offset, { minimum: minimum });
        return bytesWritten > 0 && result.bytes === bytesWritten && result.value === value;
    }), {
        verbose: false
    });
    test.end();
});
tap_1.default.test('ARBITRARY__PREFIX_LENGTH_VARINT (ASCII)', function (test) {
    fc.assert(fc.property(fc.nat(10), fc.string({ maxLength: 1000 }), function (offset, value) {
        var buffer = new resizable_buffer_1.default(Buffer.allocUnsafe(2048));
        var bytesWritten = encode_1.ARBITRARY__PREFIX_LENGTH_VARINT(buffer, offset, value, {});
        var result = decode_1.ARBITRARY__PREFIX_LENGTH_VARINT(buffer, offset, {});
        return bytesWritten > 0 && result.bytes === bytesWritten && result.value === value;
    }), {
        verbose: false
    });
    test.end();
});
