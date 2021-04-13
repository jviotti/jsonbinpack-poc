"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.varintEncode = void 0;
var REST = 63;
var varintEncode = function (buffer, offset, value) {
    var accumulator = value;
    var cursor = offset;
    while (accumulator > REST) {
        cursor = buffer.writeUInt8((accumulator & REST) | 128, cursor);
        accumulator >>>= 7;
    }
    cursor = buffer.writeUInt8(accumulator, cursor);
    return cursor - offset;
};
exports.varintEncode = varintEncode;
