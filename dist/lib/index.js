"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode = exports.encode = exports.compileEncodingSchema = void 0;
var mapper_1 = require("./mapper");
var encoder_1 = require("./encoder");
var compileEncodingSchema = function (schema) {
    return mapper_1.getEncoding(schema);
};
exports.compileEncodingSchema = compileEncodingSchema;
var encode = function (encoding, value) {
    var buffer = new encoder_1.ResizableBuffer(Buffer.allocUnsafe(0));
    var context = encoder_1.getDefaultEncodingContext();
    encoder_1.encode(buffer, 0, encoding, value, context);
    return buffer.getBuffer();
};
exports.encode = encode;
var decode = function (encoding, buffer) {
    var result = encoder_1.decode(new encoder_1.ResizableBuffer(buffer), 0, encoding);
    return result.value;
};
exports.decode = decode;
