"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var number_1 = require("../../lib/mapper/number");
tap_1.default.test('should encode a number simple value', function (test) {
    var schema = {
        type: 'number'
    };
    var result = number_1.getNumberEncoding(schema);
    test.strictSame(result, {
        type: 'number',
        encoding: 'DOUBLE_VARINT_TUPLE',
        options: {}
    });
    test.end();
});
