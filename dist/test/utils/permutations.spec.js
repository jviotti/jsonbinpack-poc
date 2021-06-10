"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var permutation_1 = require("../../lib/utils/permutation");
tap_1.default.test('should generate the 0-permutations of [ null ]', function (test) {
    var result = permutation_1.generatePermutations([null], 0);
    test.strictSame(result, []);
    test.end();
});
tap_1.default.test('should generate the 1-permutations of [ null ]', function (test) {
    var result = permutation_1.generatePermutations([null], 1);
    test.strictSame(result, [
        [null]
    ]);
    test.end();
});
tap_1.default.test('should generate the 1-permutations of [ false, true ]', function (test) {
    var result = permutation_1.generatePermutations([false, true], 1);
    test.strictSame(result, [
        [false],
        [true]
    ]);
    test.end();
});
tap_1.default.test('should generate the 2-permutations of [ false, true ]', function (test) {
    var result = permutation_1.generatePermutations([false, true], 2);
    test.strictSame(result, [
        [false, false],
        [false, true],
        [true, false],
        [true, true]
    ]);
    test.end();
});
tap_1.default.test('should generate the 3-permutations of [ false, true ]', function (test) {
    var result = permutation_1.generatePermutations([false, true], 3);
    test.strictSame(result, [
        [false, false, false],
        [false, false, true],
        [false, true, false],
        [false, true, true],
        [true, false, false],
        [true, false, true],
        [true, true, false],
        [true, true, true]
    ]);
    test.end();
});
