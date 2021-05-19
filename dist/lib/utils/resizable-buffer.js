"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResizableBuffer = (function () {
    function ResizableBuffer(buffer) {
        this.buffer = buffer;
        this.written = 0;
    }
    ResizableBuffer.prototype.grow = function (bytes) {
        if (this.written + bytes > this.buffer.length) {
            this.buffer = Buffer.concat([
                this.buffer,
                Buffer.allocUnsafe((this.buffer.length * 2) + bytes)
            ]);
        }
    };
    ResizableBuffer.prototype.getBuffer = function () {
        return this.buffer.slice(0, this.written);
    };
    ResizableBuffer.prototype.writeUInt8 = function (value, offset) {
        this.grow(1);
        var cursor = this.buffer.writeUInt8(value, offset);
        this.written = Math.max(this.written, cursor);
        return cursor;
    };
    ResizableBuffer.prototype.writeUIntLE = function (value, offset, byteLength) {
        this.grow(byteLength);
        var cursor = this.buffer.writeUIntLE(value, offset, byteLength);
        this.written = Math.max(this.written, cursor);
        return cursor;
    };
    ResizableBuffer.prototype.write = function (value, offset, length, encoding) {
        this.grow(length);
        var bytesWritten = this.buffer.write(value, offset, length, encoding);
        this.written = Math.max(this.written, offset + bytesWritten);
        return bytesWritten;
    };
    ResizableBuffer.prototype.writeDoubleLE = function (value, offset) {
        this.grow(8);
        var cursor = this.buffer.writeDoubleLE(value, offset);
        this.written = Math.max(this.written, cursor);
        return cursor;
    };
    ResizableBuffer.prototype.readUInt8 = function (offset) {
        return this.buffer.readUInt8(offset);
    };
    ResizableBuffer.prototype.readUIntLE = function (offset, byteLength) {
        return this.buffer.readUIntLE(offset, byteLength);
    };
    ResizableBuffer.prototype.toString = function (encoding, start, end) {
        return this.buffer.toString(encoding, start, end);
    };
    ResizableBuffer.prototype.readDoubleLE = function (offset) {
        return this.buffer.readDoubleLE(offset);
    };
    return ResizableBuffer;
}());
exports.default = ResizableBuffer;
