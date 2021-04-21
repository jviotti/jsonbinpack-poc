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
var schema_1 = require("../../../lib/types/number/schema");
var ENCODE_FUNCTIONS = __importStar(require("../../../lib/types/number/encode"));
var DECODE_FUNCTIONS = __importStar(require("../../../lib/types/number/decode"));
tap_1.default.test('the encoding enum should include all encoding functions', function (test) {
    test.strictSame(Object.values(schema_1.EncodingNumber).sort(), Object.keys(ENCODE_FUNCTIONS).sort());
    test.strictSame(Object.values(schema_1.EncodingNumber).sort(), Object.keys(DECODE_FUNCTIONS).sort());
    test.end();
});
tap_1.default.test('should encode a number simple value', function (test) {
    var schema = {
        type: 'number'
    };
    var encoding = schema_1.getNumberEncoding(schema);
    test.is(encoding, schema_1.EncodingNumber.DOUBLE__IEEE764_LE);
    test.end();
});
