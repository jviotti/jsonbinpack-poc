"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode = exports.encode = exports.compileEncodingSchema = void 0;
var encoder_1 = require("./encoder");
var mapper_1 = require("./mapper");
var resizable_buffer_1 = __importDefault(require("./utils/resizable-buffer"));
var compileEncodingSchema = function (schema) {
    return mapper_1.getEncoding(schema);
};
exports.compileEncodingSchema = compileEncodingSchema;
var encode = function (encoding, value) {
    var buffer = new resizable_buffer_1.default(Buffer.allocUnsafe(0));
    encoder_1.encode(buffer, 0, encoding, value);
    return buffer.getBuffer();
};
exports.encode = encode;
var decode = function (encoding, buffer) {
    var result = encoder_1.decode(new resizable_buffer_1.default(buffer), 0, encoding);
    return result.value;
};
exports.decode = decode;
