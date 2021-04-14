"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.varintDecode = exports.varintEncode = void 0;
var MSB = 128;
var REST = 127;
var varintEncode = function (buffer, offset, value) {
    var accumulator = value;
    var cursor = offset;
    while (accumulator > REST) {
        cursor = buffer.writeUInt8((accumulator & REST) | MSB, cursor);
        accumulator >>>= 7;
    }
    cursor = buffer.writeUInt8(accumulator, cursor);
    return cursor - offset;
};
exports.varintEncode = varintEncode;
var varintDecode = function (buffer, offset) {
    var result = 0;
    var cursor = offset;
    var count = 0;
    var next = true;
    while (next) {
        var value = buffer.readUInt8(cursor);
        next = (value & MSB) !== 0;
        result += (value & REST) << (7 * count);
        count += 1;
        cursor += 1;
    }
    return {
        value: result,
        bytes: count
    };
};
exports.varintDecode = varintDecode;
