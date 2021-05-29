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
exports.decode = exports.encode = void 0;
var assert_1 = require("assert");
var mapper_1 = require("./mapper");
var ENCODE_BOOLEAN = __importStar(require("./types/boolean/encode"));
var ENCODE_INTEGER = __importStar(require("./types/integer/encode"));
var ENCODE_NULL = __importStar(require("./types/null/encode"));
var ENCODE_NUMBER = __importStar(require("./types/number/encode"));
var ENCODE_STRING = __importStar(require("./types/string/encode"));
var ENCODE_ANY = __importStar(require("./types/any/encode"));
var ENCODE_ARRAY = __importStar(require("./types/array/encode"));
var ENCODE_OBJECT = __importStar(require("./types/object/encode"));
var ENCODE_ENUM = __importStar(require("./types/enum/encode"));
var ENCODE_ONEOF = __importStar(require("./types/oneof/encode"));
var DECODE_BOOLEAN = __importStar(require("./types/boolean/decode"));
var DECODE_INTEGER = __importStar(require("./types/integer/decode"));
var DECODE_NULL = __importStar(require("./types/null/decode"));
var DECODE_NUMBER = __importStar(require("./types/number/decode"));
var DECODE_STRING = __importStar(require("./types/string/decode"));
var DECODE_ANY = __importStar(require("./types/any/decode"));
var DECODE_ARRAY = __importStar(require("./types/array/decode"));
var DECODE_OBJECT = __importStar(require("./types/object/decode"));
var DECODE_ENUM = __importStar(require("./types/enum/decode"));
var DECODE_ONEOF = __importStar(require("./types/oneof/decode"));
var ENCODE_TYPE_INDEX = new Map();
var DECODE_TYPE_INDEX = new Map();
ENCODE_TYPE_INDEX.set(mapper_1.EncodingType.Boolean, ENCODE_BOOLEAN);
ENCODE_TYPE_INDEX.set(mapper_1.EncodingType.Integer, ENCODE_INTEGER);
ENCODE_TYPE_INDEX.set(mapper_1.EncodingType.Null, ENCODE_NULL);
ENCODE_TYPE_INDEX.set(mapper_1.EncodingType.Number, ENCODE_NUMBER);
ENCODE_TYPE_INDEX.set(mapper_1.EncodingType.String, ENCODE_STRING);
ENCODE_TYPE_INDEX.set(mapper_1.EncodingType.Any, ENCODE_ANY);
ENCODE_TYPE_INDEX.set(mapper_1.EncodingType.Array, ENCODE_ARRAY);
ENCODE_TYPE_INDEX.set(mapper_1.EncodingType.Object, ENCODE_OBJECT);
ENCODE_TYPE_INDEX.set(mapper_1.EncodingType.Enum, ENCODE_ENUM);
ENCODE_TYPE_INDEX.set(mapper_1.EncodingType.OneOf, ENCODE_ONEOF);
DECODE_TYPE_INDEX.set(mapper_1.EncodingType.Boolean, DECODE_BOOLEAN);
DECODE_TYPE_INDEX.set(mapper_1.EncodingType.Integer, DECODE_INTEGER);
DECODE_TYPE_INDEX.set(mapper_1.EncodingType.Null, DECODE_NULL);
DECODE_TYPE_INDEX.set(mapper_1.EncodingType.Number, DECODE_NUMBER);
DECODE_TYPE_INDEX.set(mapper_1.EncodingType.String, DECODE_STRING);
DECODE_TYPE_INDEX.set(mapper_1.EncodingType.Any, DECODE_ANY);
DECODE_TYPE_INDEX.set(mapper_1.EncodingType.Array, DECODE_ARRAY);
DECODE_TYPE_INDEX.set(mapper_1.EncodingType.Object, DECODE_OBJECT);
DECODE_TYPE_INDEX.set(mapper_1.EncodingType.Enum, DECODE_ENUM);
DECODE_TYPE_INDEX.set(mapper_1.EncodingType.OneOf, DECODE_ONEOF);
var encode = function (buffer, offset, encoding, value, context) {
    var fns = ENCODE_TYPE_INDEX.get(encoding.type);
    assert_1.strict(typeof fns !== 'undefined');
    return fns[encoding.encoding](buffer, offset, value, encoding.options, context);
};
exports.encode = encode;
var decode = function (buffer, offset, encoding) {
    var fns = DECODE_TYPE_INDEX.get(encoding.type);
    assert_1.strict(typeof fns !== 'undefined');
    return fns[encoding.encoding](buffer, offset, encoding.options);
};
exports.decode = decode;
