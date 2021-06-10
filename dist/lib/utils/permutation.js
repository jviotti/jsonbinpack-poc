"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePermutations = void 0;
var generatePermutations = function (list, size) {
    if (size === 0) {
        return [];
    }
    if (size === 1) {
        return list.map(function (element) {
            return [element];
        });
    }
    return list.flatMap(function (element) {
        return exports.generatePermutations(list, size - 1).map(function (item) {
            return __spreadArray([element], __read(item));
        });
    });
};
exports.generatePermutations = generatePermutations;
