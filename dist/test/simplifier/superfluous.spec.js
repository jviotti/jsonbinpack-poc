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
        minItems: 0
    };
    test.strictSame(simplifier_1.simplifySchema(schema), result);
    test.end();
});
