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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ARBITRARY_TYPED_KEYS_OBJECT = exports.MIXED_BOUNDED_TYPED_OBJECT = exports.NON_REQUIRED_BOUNDED_TYPED_OBJECT = exports.REQUIRED_ONLY_BOUNDED_TYPED_OBJECT = void 0;
var assert_1 = require("assert");
var encoder_1 = require("../../encoder");
var bitset_1 = require("../../utils/bitset");
var encode_1 = require("../integer/encode");
var encode_2 = require("../any/encode");
var REQUIRED_ONLY_BOUNDED_TYPED_OBJECT = function (buffer, offset, value, options) {
    var e_1, _a;
    var _b;
    assert_1.strict(options.requiredProperties.length > 0);
    assert_1.strict(Object.keys(value).length === options.requiredProperties.length);
    var cursor = offset;
    try {
        for (var _c = __values(options.requiredProperties), _d = _c.next(); !_d.done; _d = _c.next()) {
            var key = _d.value;
            var encoding = (_b = options.propertyEncodings[key]) !== null && _b !== void 0 ? _b : options.encoding;
            cursor += encoder_1.encode(buffer, cursor, encoding, value[key]);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return cursor - offset;
};
exports.REQUIRED_ONLY_BOUNDED_TYPED_OBJECT = REQUIRED_ONLY_BOUNDED_TYPED_OBJECT;
var NON_REQUIRED_BOUNDED_TYPED_OBJECT = function (buffer, offset, value, options) {
    var e_2, _a, e_3, _b;
    var _c;
    assert_1.strict(Object.keys(value).length <= options.optionalProperties.length);
    var lengthBytes = encode_1.FLOOR__ENUM_VARINT(buffer, offset, options.optionalProperties.length, {
        minimum: 0
    });
    var keys = [];
    var bitset = [];
    try {
        for (var _d = __values(options.optionalProperties), _e = _d.next(); !_e.done; _e = _d.next()) {
            var property = _e.value;
            var isPropertySet = typeof value[property] !== 'undefined';
            bitset.push(isPropertySet);
            if (isPropertySet) {
                keys.push(property);
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
        }
        finally { if (e_2) throw e_2.error; }
    }
    var bitsetBytes = bitset_1.bitsetEncode(buffer, offset + lengthBytes, bitset);
    var cursor = offset + lengthBytes + bitsetBytes;
    try {
        for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
            var key = keys_1_1.value;
            var encoding = (_c = options.propertyEncodings[key]) !== null && _c !== void 0 ? _c : options.encoding;
            var bytesWritten = encoder_1.encode(buffer, cursor, encoding, value[key]);
            cursor += bytesWritten;
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (keys_1_1 && !keys_1_1.done && (_b = keys_1.return)) _b.call(keys_1);
        }
        finally { if (e_3) throw e_3.error; }
    }
    return cursor - offset;
};
exports.NON_REQUIRED_BOUNDED_TYPED_OBJECT = NON_REQUIRED_BOUNDED_TYPED_OBJECT;
var MIXED_BOUNDED_TYPED_OBJECT = function (buffer, offset, value, options) {
    var e_4, _a, e_5, _b;
    assert_1.strict(Object.keys(value).length ===
        options.requiredProperties.length + options.optionalProperties.length);
    var requiredSubset = {};
    try {
        for (var _c = __values(options.requiredProperties), _d = _c.next(); !_d.done; _d = _c.next()) {
            var key = _d.value;
            Reflect.set(requiredSubset, key, value[key]);
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
        }
        finally { if (e_4) throw e_4.error; }
    }
    var optionalSubset = {};
    try {
        for (var _e = __values(options.optionalProperties), _f = _e.next(); !_f.done; _f = _e.next()) {
            var key = _f.value;
            Reflect.set(optionalSubset, key, value[key]);
        }
    }
    catch (e_5_1) { e_5 = { error: e_5_1 }; }
    finally {
        try {
            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
        }
        finally { if (e_5) throw e_5.error; }
    }
    var requiredBytes = exports.REQUIRED_ONLY_BOUNDED_TYPED_OBJECT(buffer, offset, requiredSubset, {
        propertyEncodings: options.propertyEncodings,
        requiredProperties: options.requiredProperties,
        encoding: options.encoding
    });
    return exports.NON_REQUIRED_BOUNDED_TYPED_OBJECT(buffer, offset + requiredBytes, optionalSubset, {
        propertyEncodings: options.propertyEncodings,
        optionalProperties: options.optionalProperties,
        encoding: options.encoding
    });
};
exports.MIXED_BOUNDED_TYPED_OBJECT = MIXED_BOUNDED_TYPED_OBJECT;
var ARBITRARY_TYPED_KEYS_OBJECT = function (buffer, offset, value, options) {
    var e_6, _a;
    var cursor = encode_1.FLOOR__ENUM_VARINT(buffer, offset, Object.keys(value).length, {
        minimum: 0
    });
    try {
        for (var _b = __values(Object.entries(value)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 2), key = _d[0], objectValue = _d[1];
            cursor += encoder_1.encode(buffer, cursor, options.keyEncoding, key);
            cursor += encode_2.ANY__TYPE_PREFIX(buffer, cursor, objectValue, {});
        }
    }
    catch (e_6_1) { e_6 = { error: e_6_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_6) throw e_6.error; }
    }
    return cursor - offset;
};
exports.ARBITRARY_TYPED_KEYS_OBJECT = ARBITRARY_TYPED_KEYS_OBJECT;
