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
exports.UNBOUNDED_UNTYPED__LENGTH_PREFIX = void 0;
var encode_1 = require("../integer/encode");
var encode_2 = require("../any/encode");
var UNBOUNDED_UNTYPED__LENGTH_PREFIX = function (buffer, offset, value, _options) {
    var e_1, _a;
    var length = value.length;
    var lengthBytes = encode_1.FLOOR__ENUM_VARINT(buffer, offset, length, {
        minimum: 0
    });
    var bytesWritten = lengthBytes;
    try {
        for (var value_1 = __values(value), value_1_1 = value_1.next(); !value_1_1.done; value_1_1 = value_1.next()) {
            var element = value_1_1.value;
            var elementBytes = encode_2.ANY__TYPE_PREFIX(buffer, offset + bytesWritten, element, {});
            bytesWritten += elementBytes;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (value_1_1 && !value_1_1.done && (_a = value_1.return)) _a.call(value_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return bytesWritten;
};
exports.UNBOUNDED_UNTYPED__LENGTH_PREFIX = UNBOUNDED_UNTYPED__LENGTH_PREFIX;
