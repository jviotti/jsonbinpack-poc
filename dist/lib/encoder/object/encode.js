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
exports.MIXED_UNBOUNDED_TYPED_OBJECT = exports.OPTIONAL_UNBOUNDED_TYPED_OBJECT = exports.REQUIRED_UNBOUNDED_TYPED_OBJECT = exports.ARBITRARY_TYPED_KEYS_OBJECT = exports.MIXED_BOUNDED_TYPED_OBJECT = exports.NON_REQUIRED_BOUNDED_TYPED_OBJECT = exports.REQUIRED_ONLY_BOUNDED_TYPED_OBJECT = void 0;
var assert_1 = require("assert");
var bitset_1 = require("./bitset");
var index_1 = require("../index");
var encode_1 = require("../integer/encode");
var REQUIRED_ONLY_BOUNDED_TYPED_OBJECT = function (buffer, offset, value, options, context) {
    var e_1, _a;
    assert_1.strict(Object.keys(value).length === options.requiredProperties.length);
    var cursor = offset;
    try {
        for (var _b = __values(options.requiredProperties), _c = _b.next(); !_c.done; _c = _b.next()) {
            var key = _c.value;
            var encoding = options.propertyEncodings[key];
            assert_1.strict(typeof encoding !== 'undefined');
            cursor += index_1.encode(buffer, cursor, encoding, value[key], context);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return cursor - offset;
};
exports.REQUIRED_ONLY_BOUNDED_TYPED_OBJECT = REQUIRED_ONLY_BOUNDED_TYPED_OBJECT;
var NON_REQUIRED_BOUNDED_TYPED_OBJECT = function (buffer, offset, value, options, context) {
    var e_2, _a, e_3, _b;
    assert_1.strict(Object.keys(value).length <= options.optionalProperties.length);
    var lengthBytes = encode_1.FLOOR__ENUM_VARINT(buffer, offset, options.optionalProperties.length, {
        minimum: 0
    }, context);
    var keys = [];
    var bitset = [];
    try {
        for (var _c = __values(options.optionalProperties), _d = _c.next(); !_d.done; _d = _c.next()) {
            var property = _d.value;
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
            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
        }
        finally { if (e_2) throw e_2.error; }
    }
    var bitsetBytes = bitset_1.bitsetEncode(buffer, offset + lengthBytes, bitset);
    var cursor = offset + lengthBytes + bitsetBytes;
    try {
        for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
            var key = keys_1_1.value;
            var encoding = options.propertyEncodings[key];
            assert_1.strict(typeof encoding !== 'undefined');
            var bytesWritten = index_1.encode(buffer, cursor, encoding, value[key], context);
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
var MIXED_BOUNDED_TYPED_OBJECT = function (buffer, offset, value, options, context) {
    var e_4, _a, e_5, _b;
    assert_1.strict(Object.keys(value).length <=
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
        requiredProperties: options.requiredProperties
    }, context);
    return requiredBytes + exports.NON_REQUIRED_BOUNDED_TYPED_OBJECT(buffer, offset + requiredBytes, optionalSubset, {
        propertyEncodings: options.propertyEncodings,
        optionalProperties: options.optionalProperties
    }, context);
};
exports.MIXED_BOUNDED_TYPED_OBJECT = MIXED_BOUNDED_TYPED_OBJECT;
var ARBITRARY_TYPED_KEYS_OBJECT = function (buffer, offset, value, options, context) {
    var e_6, _a;
    var cursor = offset + encode_1.FLOOR__ENUM_VARINT(buffer, offset, Object.keys(value).length, {
        minimum: 0
    }, context);
    try {
        for (var _b = __values(Object.entries(value)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 2), key = _d[0], objectValue = _d[1];
            cursor += index_1.encode(buffer, cursor, options.keyEncoding, key, context);
            cursor += index_1.encode(buffer, cursor, options.encoding, objectValue, context);
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
var REQUIRED_UNBOUNDED_TYPED_OBJECT = function (buffer, offset, value, options, context) {
    var e_7, _a;
    assert_1.strict(options.requiredProperties.length > 0);
    var required = new Set(options.requiredProperties);
    var requiredSubset = {};
    var rest = {};
    try {
        for (var _b = __values(Object.keys(value)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var key = _c.value;
            Reflect.set(required.has(key) ? requiredSubset : rest, key, value[key]);
        }
    }
    catch (e_7_1) { e_7 = { error: e_7_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_7) throw e_7.error; }
    }
    var requiredBytes = exports.REQUIRED_ONLY_BOUNDED_TYPED_OBJECT(buffer, offset, requiredSubset, {
        propertyEncodings: options.propertyEncodings,
        requiredProperties: options.requiredProperties
    }, context);
    return requiredBytes + exports.ARBITRARY_TYPED_KEYS_OBJECT(buffer, offset + requiredBytes, rest, {
        keyEncoding: options.keyEncoding,
        encoding: options.encoding
    }, context);
};
exports.REQUIRED_UNBOUNDED_TYPED_OBJECT = REQUIRED_UNBOUNDED_TYPED_OBJECT;
var OPTIONAL_UNBOUNDED_TYPED_OBJECT = function (buffer, offset, value, options, context) {
    var e_8, _a;
    assert_1.strict(Object.keys(options.propertyEncodings).length === options.optionalProperties.length);
    var optional = new Set(options.optionalProperties);
    var optionalSubset = {};
    var rest = {};
    try {
        for (var _b = __values(Object.keys(value)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var key = _c.value;
            Reflect.set(optional.has(key) ? optionalSubset : rest, key, value[key]);
        }
    }
    catch (e_8_1) { e_8 = { error: e_8_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_8) throw e_8.error; }
    }
    var optionalBytes = exports.NON_REQUIRED_BOUNDED_TYPED_OBJECT(buffer, offset, optionalSubset, {
        propertyEncodings: options.propertyEncodings,
        optionalProperties: options.optionalProperties
    }, context);
    return optionalBytes + exports.ARBITRARY_TYPED_KEYS_OBJECT(buffer, offset + optionalBytes, rest, {
        keyEncoding: options.keyEncoding,
        encoding: options.encoding
    }, context);
};
exports.OPTIONAL_UNBOUNDED_TYPED_OBJECT = OPTIONAL_UNBOUNDED_TYPED_OBJECT;
var MIXED_UNBOUNDED_TYPED_OBJECT = function (buffer, offset, value, options, context) {
    var e_9, _a;
    var required = new Set(options.requiredProperties);
    var optional = new Set(options.optionalProperties);
    var requiredSubset = {};
    var optionalSubset = {};
    var rest = {};
    try {
        for (var _b = __values(Object.keys(value)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var key = _c.value;
            if (required.has(key)) {
                Reflect.set(requiredSubset, key, value[key]);
            }
            else if (optional.has(key)) {
                Reflect.set(optionalSubset, key, value[key]);
            }
            else {
                Reflect.set(rest, key, value[key]);
            }
        }
    }
    catch (e_9_1) { e_9 = { error: e_9_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_9) throw e_9.error; }
    }
    var requiredBytes = exports.REQUIRED_ONLY_BOUNDED_TYPED_OBJECT(buffer, offset, requiredSubset, {
        propertyEncodings: options.propertyEncodings,
        requiredProperties: options.requiredProperties
    }, context);
    var optionalBytes = exports.NON_REQUIRED_BOUNDED_TYPED_OBJECT(buffer, offset + requiredBytes, optionalSubset, {
        propertyEncodings: options.propertyEncodings,
        optionalProperties: options.optionalProperties
    }, context);
    return requiredBytes + optionalBytes + exports.ARBITRARY_TYPED_KEYS_OBJECT(buffer, offset + requiredBytes + optionalBytes, rest, {
        keyEncoding: options.keyEncoding,
        encoding: options.encoding
    }, context);
};
exports.MIXED_UNBOUNDED_TYPED_OBJECT = MIXED_UNBOUNDED_TYPED_OBJECT;
