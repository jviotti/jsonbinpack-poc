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
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode = exports.encode = exports.EncodingType = void 0;
var assert_1 = require("assert");
var base_1 = require("./types/base");
var base_2 = require("./types/base");
Object.defineProperty(exports, "EncodingType", { enumerable: true, get: function () { return base_2.EncodingType; } });
var ENCODE_BOOLEAN = __importStar(require("./types/boolean/encode"));
var ENCODE_INTEGER = __importStar(require("./types/integer/encode"));
var ENCODE_NULL = __importStar(require("./types/null/encode"));
var ENCODE_NUMBER = __importStar(require("./types/number/encode"));
var ENCODE_STRING = __importStar(require("./types/string/encode"));
var ENCODE_ANY = __importStar(require("./types/any/encode"));
var DECODE_BOOLEAN = __importStar(require("./types/boolean/decode"));
var DECODE_INTEGER = __importStar(require("./types/integer/decode"));
var DECODE_NULL = __importStar(require("./types/null/decode"));
var DECODE_NUMBER = __importStar(require("./types/number/decode"));
var DECODE_STRING = __importStar(require("./types/string/decode"));
var DECODE_ANY = __importStar(require("./types/any/decode"));
var ENCODE_TYPE_INDEX = new Map();
var DECODE_TYPE_INDEX = new Map();
ENCODE_TYPE_INDEX.set(base_1.EncodingType.Boolean, ENCODE_BOOLEAN);
ENCODE_TYPE_INDEX.set(base_1.EncodingType.Integer, ENCODE_INTEGER);
ENCODE_TYPE_INDEX.set(base_1.EncodingType.Null, ENCODE_NULL);
ENCODE_TYPE_INDEX.set(base_1.EncodingType.Number, ENCODE_NUMBER);
ENCODE_TYPE_INDEX.set(base_1.EncodingType.String, ENCODE_STRING);
ENCODE_TYPE_INDEX.set(base_1.EncodingType.Any, ENCODE_ANY);
DECODE_TYPE_INDEX.set(base_1.EncodingType.Boolean, DECODE_BOOLEAN);
DECODE_TYPE_INDEX.set(base_1.EncodingType.Integer, DECODE_INTEGER);
DECODE_TYPE_INDEX.set(base_1.EncodingType.Null, DECODE_NULL);
DECODE_TYPE_INDEX.set(base_1.EncodingType.Number, DECODE_NUMBER);
DECODE_TYPE_INDEX.set(base_1.EncodingType.String, DECODE_STRING);
DECODE_TYPE_INDEX.set(base_1.EncodingType.Any, DECODE_ANY);
var encode = function (buffer, offset, encoding, value) {
    var fns = ENCODE_TYPE_INDEX.get(encoding.type);
    assert_1.strict(typeof fns !== 'undefined');
    return fns[encoding.encoding](buffer, offset, value, encoding.options);
};
exports.encode = encode;
var decode = function (buffer, offset, encoding) {
    var fns = DECODE_TYPE_INDEX.get(encoding.type);
    assert_1.strict(typeof fns !== 'undefined');
    return fns[encoding.encoding](buffer, offset, encoding.options);
};
exports.decode = decode;
