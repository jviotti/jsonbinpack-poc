"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ARBITRARY_MULTIPLE = exports.ARBITRARY = exports.FLOOR_MULTIPLE = exports.FLOOR = exports.ROOF_MULTIPLE = exports.ROOF = exports.BOUNDED_MULTIPLE = exports.BOUNDED = void 0;
var INTEGER_MINIMUM = -Math.pow(2, 31);
var INTEGER_MAXIMUM = Math.pow(2, 31) - 1;
var BOUNDED = function (buffer, offset, value, minimum, maximum) {
    var range = maximum - minimum;
    var bits = Math.ceil(Math.log(range + 1) / Math.log(2));
    var bytes = Math.floor((bits + 7) / 8);
    if (bytes > 0) {
        return buffer.writeUIntLE(value - minimum, offset, bytes);
    }
    return 0;
};
exports.BOUNDED = BOUNDED;
var BOUNDED_MULTIPLE = function (buffer, offset, value, minimum, maximum, multiplier) {
    var positiveMultiplier = Math.abs(multiplier);
    return exports.BOUNDED(buffer, offset, value / positiveMultiplier, Math.floor(minimum / positiveMultiplier), Math.ceil(maximum / positiveMultiplier));
};
exports.BOUNDED_MULTIPLE = BOUNDED_MULTIPLE;
var ROOF = function (buffer, offset, value, maximum) {
    return exports.BOUNDED(buffer, offset, value, INTEGER_MINIMUM, maximum);
};
exports.ROOF = ROOF;
var ROOF_MULTIPLE = function (buffer, offset, value, maximum, multiplier) {
    return exports.BOUNDED_MULTIPLE(buffer, offset, value, INTEGER_MINIMUM, maximum, multiplier);
};
exports.ROOF_MULTIPLE = ROOF_MULTIPLE;
var FLOOR = function (buffer, offset, value, minimum) {
    return exports.BOUNDED(buffer, offset, value, minimum, INTEGER_MAXIMUM);
};
exports.FLOOR = FLOOR;
var FLOOR_MULTIPLE = function (buffer, offset, value, minimum, multiplier) {
    return exports.BOUNDED_MULTIPLE(buffer, offset, value, minimum, INTEGER_MAXIMUM, multiplier);
};
exports.FLOOR_MULTIPLE = FLOOR_MULTIPLE;
var ARBITRARY = function (buffer, offset, value) {
    return exports.BOUNDED(buffer, offset, value, INTEGER_MINIMUM, INTEGER_MAXIMUM);
};
exports.ARBITRARY = ARBITRARY;
var ARBITRARY_MULTIPLE = function (buffer, offset, value, multiplier) {
    return exports.BOUNDED_MULTIPLE(buffer, offset, value, INTEGER_MINIMUM, INTEGER_MAXIMUM, multiplier);
};
exports.ARBITRARY_MULTIPLE = ARBITRARY_MULTIPLE;
