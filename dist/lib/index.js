"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode = exports.encode = exports.compileEncodingSchema = void 0;
var mapper_1 = require("./mapper");
var types_1 = require("./types");
var resizable_buffer_1 = __importDefault(require("./utils/resizable-buffer"));
var compileEncodingSchema = function (schema) {
    return mapper_1.getEncoding(schema);
};
exports.compileEncodingSchema = compileEncodingSchema;
var encode = function (encoding, value) {
    var buffer = new resizable_buffer_1.default(Buffer.allocUnsafe(0));
    var context = types_1.getDefaultEncodingContext();
    types_1.encode(buffer, 0, encoding, value, context);
    return buffer.getBuffer();
};
exports.encode = encode;
var decode = function (encoding, buffer) {
    var result = types_1.decode(new resizable_buffer_1.default(buffer), 0, encoding);
    return result.value;
};
exports.decode = decode;
