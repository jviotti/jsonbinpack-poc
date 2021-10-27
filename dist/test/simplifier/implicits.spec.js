"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var simplifier_1 = require("../../lib/simplifier");
tap_1.default.test('should convert a schema without type into a type union', function (test) {
    var schema = {
        minimum: 5
    };
    var result = {
        anyOf: [
            {
                enum: [null],
                minimum: 5
            },
            {
                enum: [false, true],
                minimum: 5
            },
            {
                type: 'object',
                minProperties: 0
            },
            {
                type: 'array',
                items: {},
                minItems: 0
            },
            {
                type: 'string',
                minLength: 0
            },
            {
                type: 'number',
                minimum: 5
            },
            {
                type: 'integer',
                multipleOf: 1,
                minimum: 5
            }
        ]
    };
    test.strictSame(simplifier_1.simplifySchema(schema), result);
    test.end();
});
