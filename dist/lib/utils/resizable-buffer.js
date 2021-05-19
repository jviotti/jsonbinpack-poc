"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResizableBuffer = (function () {
    function ResizableBuffer(buffer) {
        this.buffer = buffer;
    }
    ResizableBuffer.prototype.writeUInt8 = function (value, offset) {
        return this.buffer.writeUInt8(value, offset);
    };
    ResizableBuffer.prototype.readUInt8 = function (offset) {
        return this.buffer.readUInt8(offset);
    };
    ResizableBuffer.prototype.writeUIntLE = function (value, offset, byteLength) {
        return this.buffer.writeUIntLE(value, offset, byteLength);
    };
    ResizableBuffer.prototype.readUIntLE = function (offset, byteLength) {
        return this.buffer.readUIntLE(offset, byteLength);
    };
    ResizableBuffer.prototype.write = function (value, offset, length, encoding) {
        return this.buffer.write(value, offset, length, encoding);
    };
    ResizableBuffer.prototype.toString = function (encoding, start, end) {
        return this.buffer.toString(encoding, start, end);
    };
    ResizableBuffer.prototype.writeDoubleLE = function (value, offset) {
        return this.buffer.writeDoubleLE(value, offset);
    };
    ResizableBuffer.prototype.readDoubleLE = function (offset) {
        return this.buffer.readDoubleLE(offset);
    };
    ResizableBuffer.prototype.getBuffer = function () {
        return this.buffer;
    };
    return ResizableBuffer;
}());
exports.default = ResizableBuffer;
