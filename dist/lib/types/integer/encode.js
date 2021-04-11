"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROOF_MULTIPLE = exports.ROOF = exports.BOUNDED_MULTIPLE = exports.BOUNDED = void 0;
var BOUNDED = function (buffer, offset, value, minimum, maximum) {
    var range = maximum - minimum;
    var bits = Math.ceil(Math.log(range + 1) / Math.log(2));
    var bytes = Math.floor((bits + 7) / 8);
    if (bytes > 0) {
        buffer.writeUIntLE(value - minimum, offset, bytes);
    }
};
exports.BOUNDED = BOUNDED;
var BOUNDED_MULTIPLE = function (buffer, offset, value, minimum, maximum, multiplier) {
    var positiveMultiplier = Math.abs(multiplier);
    exports.BOUNDED(buffer, offset, value / positiveMultiplier, Math.floor(minimum / positiveMultiplier), Math.ceil(maximum / positiveMultiplier));
};
exports.BOUNDED_MULTIPLE = BOUNDED_MULTIPLE;
var ROOF = function (buffer, offset, value, maximum) {
    var minimum = -Math.pow(2, 31);
    exports.BOUNDED(buffer, offset, value, minimum, maximum);
};
exports.ROOF = ROOF;
var ROOF_MULTIPLE = function (buffer, offset, value, maximum, multiplier) {
    var minimum = -Math.pow(2, 31);
    exports.BOUNDED_MULTIPLE(buffer, offset, value, minimum, maximum, multiplier);
};
exports.ROOF_MULTIPLE = ROOF_MULTIPLE;
