"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var types_1 = require("../../../lib/encoder/any/types");
tap_1.default.test('Type.Object should match 0000 0010', function (test) {
    test.true(types_1.isType(types_1.Type.Object, 2));
    test.end();
});
tap_1.default.test('Type.Object should match 1100 0010', function (test) {
    test.true(types_1.isType(types_1.Type.Object, 194));
    test.end();
});
tap_1.default.test('Type.Object should match 1101 0010', function (test) {
    test.true(types_1.isType(types_1.Type.Object, 210));
    test.end();
});
tap_1.default.test('Type.Object should match 1111 0010', function (test) {
    test.true(types_1.isType(types_1.Type.Object, 242));
    test.end();
});
tap_1.default.test('Type.Object should not match 1111 010', function (test) {
    test.false(types_1.isType(types_1.Type.Object, 250));
    test.end();
});
tap_1.default.test('getTypeTag() Object + 00000', function (test) {
    test.true(types_1.isType(types_1.Type.Object, types_1.getTypeTag(types_1.Type.Object, 0)));
    test.end();
});
tap_1.default.test('getTypeTag() Object + 00001', function (test) {
    test.true(types_1.isType(types_1.Type.Object, types_1.getTypeTag(types_1.Type.Object, 1)));
    test.end();
});
tap_1.default.test('getTypeTag() Object + 01111', function (test) {
    test.true(types_1.isType(types_1.Type.Object, types_1.getTypeTag(types_1.Type.Object, 15)));
    test.end();
});
