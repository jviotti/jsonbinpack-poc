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
exports.ARBITRARY_TYPED_KEYS_OBJECT = void 0;
var encoder_1 = require("../../encoder");
var encode_1 = require("../integer/encode");
var encode_2 = require("../any/encode");
var ARBITRARY_TYPED_KEYS_OBJECT = function (buffer, offset, value, options) {
    var e_1, _a;
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
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return cursor;
};
exports.ARBITRARY_TYPED_KEYS_OBJECT = ARBITRARY_TYPED_KEYS_OBJECT;
