"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ARBITRARY__PREFIX_LENGTH_VARINT = exports.FLOOR__PREFIX_LENGTH_ENUM_VARINT = exports.ROOF__PREFIX_LENGTH_ENUM_VARINT = exports.ROOF__PREFIX_LENGTH_8BIT_FIXED = exports.BOUNDED__PREFIX_LENGTH_ENUM_VARINT = exports.BOUNDED__PREFIX_LENGTH_8BIT_FIXED = exports.RFC3339_DATE_INTEGER_TRIPLET = void 0;
var assert_1 = require("assert");
var encode_1 = require("../integer/encode");
var limits_1 = require("../../utils/limits");
var types_1 = require("../any/types");
var STRING_ENCODING = 'utf8';
var maybeWriteSharedPrefix = function (buffer, offset, value, context) {
    return context.strings.has(value)
        ? encode_1.BOUNDED_8BITS__ENUM_FIXED(buffer, offset, types_1.Type.SharedString, {
            minimum: types_1.Type.SharedString,
            maximum: types_1.Type.SharedString
        }, context)
        : 0;
};
var writeMaybeSharedString = function (buffer, offset, value, length, context) {
    var stringOffset = context.strings.get(value);
    if (typeof stringOffset === 'undefined') {
        var bytesWritten = buffer.write(value, offset, length, STRING_ENCODING);
        context.strings.set(value, offset);
        return bytesWritten;
    }
    return encode_1.FLOOR__ENUM_VARINT(buffer, offset, offset - stringOffset, {
        minimum: 0
    }, context);
};
var RFC3339_DATE_INTEGER_TRIPLET = function (buffer, offset, value, _options, _context) {
    var e_1, _a;
    var date = [];
    try {
        for (var _b = __values(value.split('-')), _c = _b.next(); !_c.done; _c = _b.next()) {
            var fragment = _c.value;
            date.push(parseInt(fragment, 10));
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    assert_1.strict(date.length === 3);
    assert_1.strict(date[0] >= 0 && date[0] <= 9999);
    assert_1.strict(date[1] >= 1 && date[1] <= 12);
    assert_1.strict(date[2] >= 1 && date[2] <= 31);
    var monthOffset = buffer.writeUInt16LE(date[0], offset);
    var dayOffset = buffer.writeUInt8(date[1], monthOffset);
    return buffer.writeUInt8(date[2], dayOffset) - offset;
};
exports.RFC3339_DATE_INTEGER_TRIPLET = RFC3339_DATE_INTEGER_TRIPLET;
var BOUNDED__PREFIX_LENGTH_8BIT_FIXED = function (buffer, offset, value, options, context) {
    assert_1.strict(options.minimum >= limits_1.UINT8_MIN);
    assert_1.strict(options.maximum >= 0);
    assert_1.strict(options.maximum >= options.minimum);
    assert_1.strict(options.maximum - options.minimum <= limits_1.UINT8_MAX - 1);
    var length = Buffer.byteLength(value, STRING_ENCODING);
    assert_1.strict(length <= options.maximum);
    var prefixBytes = maybeWriteSharedPrefix(buffer, offset, value, context);
    var bytesWritten = encode_1.BOUNDED_8BITS__ENUM_FIXED(buffer, offset + prefixBytes, length + 1, {
        minimum: options.minimum,
        maximum: options.maximum + 1
    }, context);
    var result = writeMaybeSharedString(buffer, offset + prefixBytes + bytesWritten, value, length, context);
    return result + prefixBytes + bytesWritten;
};
exports.BOUNDED__PREFIX_LENGTH_8BIT_FIXED = BOUNDED__PREFIX_LENGTH_8BIT_FIXED;
var BOUNDED__PREFIX_LENGTH_ENUM_VARINT = function (buffer, offset, value, options, context) {
    assert_1.strict(options.minimum >= 0);
    assert_1.strict(options.minimum <= options.maximum);
    assert_1.strict(options.maximum >= 0);
    var length = Buffer.byteLength(value, STRING_ENCODING);
    assert_1.strict(length >= options.minimum);
    assert_1.strict(length <= options.maximum);
    var prefixBytes = maybeWriteSharedPrefix(buffer, offset, value, context);
    var bytesWritten = encode_1.BOUNDED__ENUM_VARINT(buffer, offset + prefixBytes, length + 1, {
        minimum: options.minimum,
        maximum: options.maximum + 1
    }, context);
    var result = writeMaybeSharedString(buffer, offset + prefixBytes + bytesWritten, value, length, context);
    return result + prefixBytes + bytesWritten;
};
exports.BOUNDED__PREFIX_LENGTH_ENUM_VARINT = BOUNDED__PREFIX_LENGTH_ENUM_VARINT;
var ROOF__PREFIX_LENGTH_8BIT_FIXED = function (buffer, offset, value, options, context) {
    assert_1.strict(options.maximum >= 0);
    assert_1.strict(options.maximum <= limits_1.UINT8_MAX - 1);
    return exports.BOUNDED__PREFIX_LENGTH_8BIT_FIXED(buffer, offset, value, {
        minimum: 0,
        maximum: options.maximum
    }, context);
};
exports.ROOF__PREFIX_LENGTH_8BIT_FIXED = ROOF__PREFIX_LENGTH_8BIT_FIXED;
var ROOF__PREFIX_LENGTH_ENUM_VARINT = function (buffer, offset, value, options, context) {
    var length = Buffer.byteLength(value, STRING_ENCODING);
    assert_1.strict(options.maximum >= 0);
    assert_1.strict(length <= options.maximum);
    var prefixBytes = maybeWriteSharedPrefix(buffer, offset, value, context);
    var bytesWritten = encode_1.ROOF__MIRROR_ENUM_VARINT(buffer, offset + prefixBytes, length - 1, options, context);
    var result = writeMaybeSharedString(buffer, offset + prefixBytes + bytesWritten, value, length, context);
    return result + prefixBytes + bytesWritten;
};
exports.ROOF__PREFIX_LENGTH_ENUM_VARINT = ROOF__PREFIX_LENGTH_ENUM_VARINT;
var FLOOR__PREFIX_LENGTH_ENUM_VARINT = function (buffer, offset, value, options, context) {
    assert_1.strict(options.minimum >= 0);
    var length = Buffer.byteLength(value, STRING_ENCODING);
    assert_1.strict(length >= options.minimum);
    var prefixBytes = maybeWriteSharedPrefix(buffer, offset, value, context);
    var bytesWritten = encode_1.FLOOR__ENUM_VARINT(buffer, offset + prefixBytes, length + 1, options, context);
    var result = writeMaybeSharedString(buffer, offset + prefixBytes + bytesWritten, value, length, context);
    return result + prefixBytes + bytesWritten;
};
exports.FLOOR__PREFIX_LENGTH_ENUM_VARINT = FLOOR__PREFIX_LENGTH_ENUM_VARINT;
var ARBITRARY__PREFIX_LENGTH_VARINT = function (buffer, offset, value, _options, context) {
    return exports.FLOOR__PREFIX_LENGTH_ENUM_VARINT(buffer, offset, value, {
        minimum: 0
    }, context);
};
exports.ARBITRARY__PREFIX_LENGTH_VARINT = ARBITRARY__PREFIX_LENGTH_VARINT;
