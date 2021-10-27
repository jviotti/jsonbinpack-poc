"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var simplifier_1 = require("../../lib/simplifier");
tap_1.default.test('should remove contentSchema if no contentMediaType', function (test) {
    var schema = {
        type: 'string',
        contentSchema: {
            type: 'integer'
        }
    };
    var result = {
        type: 'string',
        minLength: 0
    };
    test.strictSame(simplifier_1.simplifySchema(schema), result);
    test.end();
});
tap_1.default.test('should remove minContains if no contains', function (test) {
    var schema = {
        type: 'array',
        minContains: 4
    };
    var result = {
        type: 'array',
        items: {},
        minItems: 0
    };
    test.strictSame(simplifier_1.simplifySchema(schema), result);
    test.end();
});
tap_1.default.test('should remove maxContains if no contains', function (test) {
    var schema = {
        type: 'array',
        maxContains: 4
    };
    var result = {
        type: 'array',
        items: {},
        minItems: 0
    };
    test.strictSame(simplifier_1.simplifySchema(schema), result);
    test.end();
});
tap_1.default.test('an empty array is unique by definition', function (test) {
    var schema = {
        type: 'array',
        uniqueItems: true,
        maxItems: 0
    };
    var result = {
        type: 'array',
        items: {},
        minItems: 0,
        enum: [[]]
    };
    test.strictSame(simplifier_1.simplifySchema(schema), result);
    test.end();
});
tap_1.default.test('a array with one element is unique by definition', function (test) {
    var schema = {
        type: 'array',
        uniqueItems: true,
        maxItems: 1
    };
    var result = {
        type: 'array',
        items: {},
        minItems: 0,
        maxItems: 1
    };
    test.strictSame(simplifier_1.simplifySchema(schema), result);
    test.end();
});
tap_1.default.test('should remove if when the then and else keywords are missing', function (test) {
    var schema = {
        type: 'number',
        if: {
            type: 'integer'
        }
    };
    var result = {
        type: 'number'
    };
    test.strictSame(simplifier_1.simplifySchema(schema), result);
    test.end();
});
tap_1.default.test('should remove then and else when no if', function (test) {
    var schema = {
        type: 'number',
        then: {
            type: 'integer'
        },
        else: {
            type: 'array'
        }
    };
    var result = {
        type: 'number'
    };
    test.strictSame(simplifier_1.simplifySchema(schema), result);
    test.end();
});
tap_1.default.test('should remove an empty required', function (test) {
    var schema = {
        type: 'object',
        required: []
    };
    var result = {
        type: 'object',
        minProperties: 0
    };
    test.strictSame(simplifier_1.simplifySchema(schema), result);
    test.end();
});
tap_1.default.test('should remove an empty properties', function (test) {
    var schema = {
        type: 'object',
        properties: {}
    };
    var result = {
        type: 'object',
        minProperties: 0
    };
    test.strictSame(simplifier_1.simplifySchema(schema), result);
    test.end();
});
tap_1.default.test('should remove an empty patternProperties', function (test) {
    var schema = {
        type: 'object',
        patternProperties: {}
    };
    var result = {
        type: 'object',
        minProperties: 0
    };
    test.strictSame(simplifier_1.simplifySchema(schema), result);
    test.end();
});
