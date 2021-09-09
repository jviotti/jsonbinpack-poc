"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var simplifier_1 = require("../../lib/simplifier");
tap_1.default.test('should convert exclusiveMinimum to minimum', function (test) {
    var schema = {
        exclusiveMinimum: 5
    };
    var result = {
        minimum: 6
    };
    test.strictSame(simplifier_1.simplifySchema(schema), result);
    test.end();
});
tap_1.default.test('should convert exclusiveMinimum to minimum with existing greater minimum', function (test) {
    var schema = {
        exclusiveMinimum: 5,
        minimum: 6
    };
    var result = {
        minimum: 6
    };
    test.strictSame(simplifier_1.simplifySchema(schema), result);
    test.end();
});
tap_1.default.test('should convert exclusiveMinimum to minimum with existing lower minimum', function (test) {
    var schema = {
        exclusiveMinimum: 5,
        minimum: 4
    };
    var result = {
        minimum: 6
    };
    test.strictSame(simplifier_1.simplifySchema(schema), result);
    test.end();
});
tap_1.default.test('should convert exclusiveMinimum to minimum inside prefixItems', function (test) {
    var schema = {
        prefixItems: [
            {
                exclusiveMinimum: 5
            }
        ]
    };
    var result = {
        prefixItems: [
            {
                minimum: 6
            }
        ]
    };
    test.strictSame(simplifier_1.simplifySchema(schema), result);
    test.end();
});
