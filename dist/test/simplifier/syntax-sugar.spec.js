"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var simplifier_1 = require("../../lib/simplifier");
tap_1.default.test('should convert a type union to an anyOf', function (test) {
    var schema = {
        type: ['string', 'integer'],
        minimum: 5,
        maxLength: 1
    };
    var result = {
        anyOf: [
            {
                type: 'string',
                minimum: 5,
                maxLength: 1
            },
            {
                type: 'integer',
                minimum: 5,
                multipleOf: 1,
                maxLength: 1
            }
        ]
    };
    test.strictSame(simplifier_1.simplifySchema(schema), result);
    test.end();
});
tap_1.default.test('should convert exclusiveMinimum to minimum', function (test) {
    var schema = {
        type: 'integer',
        exclusiveMinimum: 5
    };
    var result = {
        type: 'integer',
        multipleOf: 1,
        minimum: 6
    };
    test.strictSame(simplifier_1.simplifySchema(schema), result);
    test.end();
});
tap_1.default.test('should convert exclusiveMinimum to minimum with existing greater minimum', function (test) {
    var schema = {
        type: 'integer',
        exclusiveMinimum: 5,
        minimum: 6
    };
    var result = {
        type: 'integer',
        multipleOf: 1,
        minimum: 6
    };
    test.strictSame(simplifier_1.simplifySchema(schema), result);
    test.end();
});
tap_1.default.test('should convert exclusiveMinimum to minimum with existing lower minimum', function (test) {
    var schema = {
        type: 'integer',
        exclusiveMinimum: 5,
        minimum: 4
    };
    var result = {
        type: 'integer',
        multipleOf: 1,
        minimum: 6
    };
    test.strictSame(simplifier_1.simplifySchema(schema), result);
    test.end();
});
tap_1.default.test('should convert exclusiveMinimum to minimum inside prefixItems', function (test) {
    var schema = {
        type: 'array',
        prefixItems: [
            {
                type: 'integer',
                exclusiveMinimum: 5
            }
        ]
    };
    var result = {
        type: 'array',
        prefixItems: [
            {
                type: 'integer',
                multipleOf: 1,
                minimum: 6
            }
        ]
    };
    test.strictSame(simplifier_1.simplifySchema(schema), result);
    test.end();
});
