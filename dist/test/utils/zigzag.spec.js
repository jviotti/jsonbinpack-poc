"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var zigzag_1 = require("../../lib/utils/zigzag");
var BITS = 32;
tap_1.default.test('should encode 0 as 0', function (test) {
    test.is(zigzag_1.zigzagEncode(0, BITS), 0);
    test.end();
});
tap_1.default.test('should encode -1 as 1', function (test) {
    test.is(zigzag_1.zigzagEncode(-1, BITS), 1);
    test.end();
});
tap_1.default.test('should encode 1 as 2', function (test) {
    test.is(zigzag_1.zigzagEncode(1, BITS), 2);
    test.end();
});
tap_1.default.test('should encode -2 as 3', function (test) {
    test.is(zigzag_1.zigzagEncode(-2, BITS), 3);
    test.end();
});
