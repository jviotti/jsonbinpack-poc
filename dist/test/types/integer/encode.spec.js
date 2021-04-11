"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var encode_1 = require("../../../lib/types/integer/encode");
tap_1.default.test('BOUNDED should encode 5 (0..10)', function (test) {
    var buffer = Buffer.allocUnsafe(1);
    var offset = 0;
    encode_1.BOUNDED(buffer, offset, 5, 0, 10);
    test.strictSame(buffer, Buffer.from([5]));
    test.end();
});
tap_1.default.test('BOUNDED should encode 5 (5..10)', function (test) {
    var buffer = Buffer.allocUnsafe(1);
    var offset = 0;
    encode_1.BOUNDED(buffer, offset, 5, 5, 10);
    test.strictSame(buffer, Buffer.from([0]));
    test.end();
});
tap_1.default.test('BOUNDED should encode 5 (4..10)', function (test) {
    var buffer = Buffer.allocUnsafe(1);
    var offset = 0;
    encode_1.BOUNDED(buffer, offset, 5, 4, 10);
    test.strictSame(buffer, Buffer.from([1]));
    test.end();
});
tap_1.default.test('BOUNDED should encode 0 (0..0)', function (test) {
    var buffer = Buffer.alloc(1, 0);
    var offset = 0;
    encode_1.BOUNDED(buffer, offset, 0, 0, 0);
    test.strictSame(buffer, Buffer.from([0]));
    test.end();
});
tap_1.default.test('BOUNDED should encode 5 (5..5)', function (test) {
    var buffer = Buffer.alloc(1, 0);
    var offset = 0;
    encode_1.BOUNDED(buffer, offset, 5, 5, 5);
    test.strictSame(buffer, Buffer.from([0]));
    test.end();
});
tap_1.default.test('BOUNDED should encode -5 (-5..-5)', function (test) {
    var buffer = Buffer.alloc(1, 0);
    var offset = 0;
    encode_1.BOUNDED(buffer, offset, -5, -5, -5);
    test.strictSame(buffer, Buffer.from([0]));
    test.end();
});
tap_1.default.test('BOUNDED should encode -2 (-5..10)', function (test) {
    var buffer = Buffer.allocUnsafe(1);
    var offset = 0;
    encode_1.BOUNDED(buffer, offset, -2, -5, 10);
    test.strictSame(buffer, Buffer.from([3]));
    test.end();
});
tap_1.default.test('BOUNDED should encode -2 (-5..-1)', function (test) {
    var buffer = Buffer.allocUnsafe(1);
    var offset = 0;
    encode_1.BOUNDED(buffer, offset, -2, -5, -1);
    test.strictSame(buffer, Buffer.from([3]));
    test.end();
});
tap_1.default.test('BOUNDED should encode 5 (0..65535)', function (test) {
    var buffer = Buffer.allocUnsafe(2);
    var offset = 0;
    encode_1.BOUNDED(buffer, offset, 5, 0, 65535);
    test.strictSame(buffer, Buffer.from([5, 0x00000000]));
    test.end();
});
tap_1.default.test('BOUNDED_MULTIPLE should encode 5 (0..10) / 5', function (test) {
    var buffer = Buffer.allocUnsafe(1);
    var offset = 0;
    encode_1.BOUNDED_MULTIPLE(buffer, offset, 5, 0, 10, 5);
    test.strictSame(buffer, Buffer.from([1]));
    test.end();
});
tap_1.default.test('BOUNDED_MULTIPLE should encode 0 (0..10) / 5', function (test) {
    var buffer = Buffer.allocUnsafe(1);
    var offset = 0;
    encode_1.BOUNDED_MULTIPLE(buffer, offset, 0, 0, 10, 5);
    test.strictSame(buffer, Buffer.from([0]));
    test.end();
});
tap_1.default.test('BOUNDED_MULTIPLE should encode 10 (0..10) / 5', function (test) {
    var buffer = Buffer.allocUnsafe(1);
    var offset = 0;
    encode_1.BOUNDED_MULTIPLE(buffer, offset, 10, 0, 10, 5);
    test.strictSame(buffer, Buffer.from([2]));
    test.end();
});
tap_1.default.test('BOUNDED_MULTIPLE should encode -5 (-20..10) / 5', function (test) {
    var buffer = Buffer.allocUnsafe(1);
    var offset = 0;
    encode_1.BOUNDED_MULTIPLE(buffer, offset, -5, -20, 10, 5);
    test.strictSame(buffer, Buffer.from([3]));
    test.end();
});
tap_1.default.test('BOUNDED_MULTIPLE should encode 10 (0..10) / -5', function (test) {
    var buffer = Buffer.allocUnsafe(1);
    var offset = 0;
    encode_1.BOUNDED_MULTIPLE(buffer, offset, 10, 0, 10, -5);
    test.strictSame(buffer, Buffer.from([2]));
    test.end();
});
tap_1.default.test('ROOF should encode 10 (..10)', function (test) {
    var buffer = Buffer.allocUnsafe(4);
    var offset = 0;
    encode_1.ROOF(buffer, offset, 10, 10);
    test.strictSame(buffer, Buffer.from([
        10,
        0,
        0,
        128
    ]));
    test.end();
});
tap_1.default.test('ROOF_MULTIPLE should encode 10 (..10) / 10', function (test) {
    var buffer = Buffer.allocUnsafe(4);
    var offset = 0;
    encode_1.ROOF_MULTIPLE(buffer, offset, 10, 10, 10);
    test.strictSame(buffer, Buffer.from([
        206,
        204,
        204,
        12
    ]));
    test.end();
});
