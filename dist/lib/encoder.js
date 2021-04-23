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
exports.encode = exports.EncodingType = void 0;
var base_1 = require("./types/base");
var base_2 = require("./types/base");
Object.defineProperty(exports, "EncodingType", { enumerable: true, get: function () { return base_2.EncodingType; } });
var BOOLEAN = __importStar(require("./types/boolean/encode"));
var INTEGER = __importStar(require("./types/integer/encode"));
var NULL = __importStar(require("./types/null/encode"));
var NUMBER = __importStar(require("./types/number/encode"));
var STRING = __importStar(require("./types/string/encode"));
var TYPE_INDEX = new Map();
TYPE_INDEX.set(base_1.EncodingType.Boolean, BOOLEAN);
TYPE_INDEX.set(base_1.EncodingType.Integer, INTEGER);
TYPE_INDEX.set(base_1.EncodingType.Null, NULL);
TYPE_INDEX.set(base_1.EncodingType.Number, NUMBER);
TYPE_INDEX.set(base_1.EncodingType.String, STRING);
var encode = function (buffer, offset, encoding, value) {
    var fns = TYPE_INDEX.get(encoding.type);
    return fns[encoding.encoding](buffer, offset, value, encoding.options);
};
exports.encode = encode;
