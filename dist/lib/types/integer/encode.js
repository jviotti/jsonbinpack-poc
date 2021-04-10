"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BOUNDED = void 0;
var BOUNDED = function (value, minimum, maximum) {
    var range = maximum - minimum;
    var bits = Math.ceil(Math.log(range + 1) / Math.log(2));
    var bytes = Math.floor((bits + 7) / 8);
    var buffer = Buffer.allocUnsafe(bytes);
    buffer.writeUIntLE(value - minimum, 0, bytes);
    return buffer;
};
exports.BOUNDED = BOUNDED;
