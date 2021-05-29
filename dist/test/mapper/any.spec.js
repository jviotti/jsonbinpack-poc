"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var any_1 = require("../../lib/mapper/any");
tap_1.default.test('should encode an any value', function (test) {
    var schema = {};
    var result = any_1.getAnyEncoding(schema);
    test.strictSame(result, {
        type: 'any',
        encoding: 'ANY__TYPE_PREFIX',
        options: {}
    });
    test.end();
});
