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
var encode_1 = require("../../lib/types/integer/encode");
var decode_1 = require("../../lib/types/integer/decode");
var UINT8_MAX = Math.pow(2, 8) - 1;
tap_1.default.test('BOUNDED_8BITS__ENUM_FIXED', function (test) {
    var arbitrary = fc.integer().chain(function (minimum) {
        return fc.tuple(fc.constant(minimum), fc.integer(minimum, minimum + UINT8_MAX), fc.integer(minimum, minimum + UINT8_MAX));
    });
    fc.assert(fc.property(arbitrary, function (_a) {
        var _b = __read(_a, 3), minimum = _b[0], maximum = _b[1], value = _b[2];
        fc.pre(value <= maximum);
        var buffer = Buffer.allocUnsafe(1);
        var bytesWritten = encode_1.BOUNDED_8BITS__ENUM_FIXED(buffer, 0, value, minimum, maximum);
        var result = decode_1.BOUNDED_8BITS__ENUM_FIXED(buffer, 0, minimum, maximum);
        return bytesWritten === 1 && result.bytes === bytesWritten && result.value === value;
    }), {
        verbose: false
    });
    test.end();
});
tap_1.default.test('BOUNDED__ENUM_VARINT', function (test) {
    fc.assert(fc.property(fc.integer(), fc.integer(), fc.integer(), function (value, minimum, maximum) {
        fc.pre(value >= minimum && value <= maximum);
        var buffer = Buffer.allocUnsafe(8);
        var bytesWritten = encode_1.BOUNDED__ENUM_VARINT(buffer, 0, value, minimum, maximum);
        var result = decode_1.BOUNDED__ENUM_VARINT(buffer, 0, minimum, maximum);
        return bytesWritten > 0 && result.bytes === bytesWritten && result.value === value;
    }), {
        verbose: false
    });
    test.end();
});
tap_1.default.test('FLOOR__ENUM_VARINT', function (test) {
    fc.assert(fc.property(fc.integer(), fc.integer(), function (value, minimum) {
        fc.pre(value >= minimum);
        var buffer = Buffer.allocUnsafe(8);
        var bytesWritten = encode_1.FLOOR__ENUM_VARINT(buffer, 0, value, minimum);
        var result = decode_1.FLOOR__ENUM_VARINT(buffer, 0, minimum);
        return bytesWritten > 0 && result.bytes === bytesWritten && result.value === value;
    }), {
        verbose: false
    });
    test.end();
});
tap_1.default.test('FLOOR_MULTIPLE__ENUM_VARINT', function (test) {
    var arbitrary = fc.integer().chain(function (minimum) {
        return fc.tuple(fc.constant(minimum), fc.integer({ min: minimum }), fc.integer({ min: minimum }));
    });
    fc.assert(fc.property(arbitrary, function (_a) {
        var _b = __read(_a, 3), minimum = _b[0], value = _b[1], multiplier = _b[2];
        fc.pre(value % multiplier === 0);
        var buffer = Buffer.allocUnsafe(8);
        var bytesWritten = encode_1.FLOOR_MULTIPLE__ENUM_VARINT(buffer, 0, value, minimum, multiplier);
        var result = decode_1.FLOOR_MULTIPLE__ENUM_VARINT(buffer, 0, minimum, multiplier);
        return bytesWritten > 0 && result.bytes === bytesWritten && result.value === value;
    }), {
        verbose: false
    });
    test.end();
});
tap_1.default.test('ROOF__MIRROR_ENUM_VARINT', function (test) {
    fc.assert(fc.property(fc.integer(), fc.integer(), function (value, maximum) {
        fc.pre(value <= maximum);
        var buffer = Buffer.allocUnsafe(8);
        var bytesWritten = encode_1.ROOF__MIRROR_ENUM_VARINT(buffer, 0, value, maximum);
        var result = decode_1.ROOF__MIRROR_ENUM_VARINT(buffer, 0, maximum);
        return bytesWritten > 0 && result.bytes === bytesWritten && result.value === value;
    }), {
        verbose: false
    });
    test.end();
});
tap_1.default.test('ROOF_MULTIPLE__MIRROR_ENUM_VARINT', function (test) {
    var arbitrary = fc.integer().chain(function (maximum) {
        return fc.tuple(fc.constant(maximum), fc.integer({ max: maximum }), fc.integer({ max: maximum }));
    });
    fc.assert(fc.property(arbitrary, function (_a) {
        var _b = __read(_a, 3), maximum = _b[0], value = _b[1], multiplier = _b[2];
        fc.pre(value % multiplier === 0);
        var buffer = Buffer.allocUnsafe(8);
        var bytesWritten = encode_1.ROOF_MULTIPLE__MIRROR_ENUM_VARINT(buffer, 0, value, maximum, multiplier);
        var result = decode_1.ROOF_MULTIPLE__MIRROR_ENUM_VARINT(buffer, 0, maximum, multiplier);
        return bytesWritten > 0 && result.bytes === bytesWritten && result.value === value;
    }), {
        verbose: false
    });
    test.end();
});
tap_1.default.test('ARBITRARY__ZIGZAG_VARINT', function (test) {
    fc.assert(fc.property(fc.integer(), function (value) {
        var buffer = Buffer.allocUnsafe(8);
        var bytesWritten = encode_1.ARBITRARY__ZIGZAG_VARINT(buffer, 0, value);
        var result = decode_1.ARBITRARY__ZIGZAG_VARINT(buffer, 0);
        return bytesWritten > 0 && result.bytes === bytesWritten && result.value === value;
    }), {
        verbose: false
    });
    test.end();
});
tap_1.default.test('ARBITRARY_MULTIPLE__ZIGZAG_VARINT', function (test) {
    fc.assert(fc.property(fc.integer(), fc.integer(), function (value, multiplier) {
        fc.pre(value % multiplier === 0);
        var buffer = Buffer.allocUnsafe(8);
        var bytesWritten = encode_1.ARBITRARY_MULTIPLE__ZIGZAG_VARINT(buffer, 0, value, multiplier);
        var result = decode_1.ARBITRARY_MULTIPLE__ZIGZAG_VARINT(buffer, 0, multiplier);
        return bytesWritten > 0 && result.bytes === bytesWritten && result.value === value;
    }), {
        verbose: false
    });
    test.end();
});
