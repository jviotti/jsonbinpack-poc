"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var mapper_1 = require("../../../lib/types/number/mapper");
tap_1.default.test('should encode a number simple value', function (test) {
    var schema = {
        type: 'number'
    };
    var result = mapper_1.getNumberEncoding(schema);
    test.strictSame(result, {
        type: 'number',
        encoding: 'DOUBLE__IEEE764_LE',
        options: {}
    });
    test.end();
});
