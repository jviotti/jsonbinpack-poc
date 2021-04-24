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
var encode_1 = require("../../lib/types/any/encode");
var decode_1 = require("../../lib/types/any/decode");
tap_1.default.test('ANY__TYPE_PREFIX: scalars', function (test) {
    fc.assert(fc.property(fc.oneof(fc.constant(null), fc.boolean(), fc.integer(), fc.float(), fc.double()), function (value) {
        var buffer = Buffer.allocUnsafe(2048);
        var bytesWritten = encode_1.ANY__TYPE_PREFIX(buffer, 0, value, {});
        var result = decode_1.ANY__TYPE_PREFIX(buffer, 0, {});
        return bytesWritten > 0 && result.bytes === bytesWritten && result.value === value;
    }), {
        verbose: false
    });
    test.end();
});
