"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var mapper_1 = require("../../lib/mapper");
tap_1.default.test('should encode an enum with one value', function (test) {
    var schema = {
        enum: ['foo']
    };
    var result = mapper_1.getEncoding(schema, 0);
    test.strictSame(mapper_1.getStates(schema, 0), ['foo']);
    test.strictSame(result, {
        type: 'enum',
        encoding: 'BOUNDED_CHOICE_INDEX',
        options: {
            choices: ['foo']
        }
    });
    test.end();
});
