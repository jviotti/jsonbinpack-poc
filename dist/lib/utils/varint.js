"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.varintDecode = exports.varintEncode = void 0;
var MOST_SIGNIFICANT_BIT = 128;
var LEAST_SIGNIFICANT_BITS = 127;
var varintEncode = function (buffer, offset, value) {
    var accumulator = value;
    var cursor = offset;
    while (accumulator > LEAST_SIGNIFICANT_BITS) {
        cursor = buffer.writeUInt8((accumulator & LEAST_SIGNIFICANT_BITS) | MOST_SIGNIFICANT_BIT, cursor);
        accumulator >>>= 7;
    }
    cursor = buffer.writeUInt8(accumulator, cursor);
    return cursor - offset;
};
exports.varintEncode = varintEncode;
var varintDecode = function (buffer, offset) {
    var result = 0;
    var cursor = offset;
    while (true) {
        var value = buffer.readUInt8(cursor);
        result += ((value & LEAST_SIGNIFICANT_BITS) << (7 * (cursor - offset))) >>> 0;
        cursor += 1;
        if ((value & MOST_SIGNIFICANT_BIT) === 0) {
            break;
        }
    }
    return {
        value: result,
        bytes: cursor - offset
    };
};
exports.varintDecode = varintDecode;
