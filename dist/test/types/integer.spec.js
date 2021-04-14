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
var encode_1 = require("../../lib/types/integer/encode");
var decode_1 = require("../../lib/types/integer/decode");
tap_1.default.test('FLOOR__ENUM_VARINT', function (test) {
    fc.assert(fc.property(fc.integer({
        min: 0
    }), fc.integer({
        min: 0
    }), function (value, minimum) {
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
tap_1.default.test('ROOF_NEGATIVE__INVERSE_ENUM_VARINT', function (test) {
    fc.assert(fc.property(fc.integer({
        max: 0
    }), fc.integer({
        max: 0
    }), function (value, maximum) {
        fc.pre(value <= maximum);
        var buffer = Buffer.allocUnsafe(8);
        var bytesWritten = encode_1.ROOF_NEGATIVE__INVERSE_ENUM_VARINT(buffer, 0, value, maximum);
        var result = decode_1.ROOF_NEGATIVE__INVERSE_ENUM_VARINT(buffer, 0, maximum);
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
