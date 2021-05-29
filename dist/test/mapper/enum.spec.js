"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var enum_1 = require("../../lib/mapper/enum");
tap_1.default.test('should encode an enum with one value', function (test) {
    var schema = {
        enum: ['foo']
    };
    var result = enum_1.getEnumEncoding(schema);
    test.strictSame(result, {
        type: 'enum',
        encoding: 'BOUNDED_CHOICE_INDEX',
        options: {
            choices: ['foo']
        }
    });
    test.end();
});
