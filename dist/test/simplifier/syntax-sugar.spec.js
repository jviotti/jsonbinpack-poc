"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var simplifier_1 = require("../../lib/simplifier");
tap_1.default.test('should convert a boolean schema to an enum', function (test) {
    var schema = {
        type: 'boolean'
    };
    var result = {
        enum: [false, true]
    };
    test.strictSame(simplifier_1.simplifySchema(schema), result);
    test.end();
});
tap_1.default.test('should convert a boolean schema inside prefixItems to an enum', function (test) {
    var schema = {
        prefixItems: [
            {
                type: 'boolean'
            }
        ]
    };
    var result = {
        prefixItems: [
            {
                enum: [false, true]
            }
        ]
    };
    test.strictSame(simplifier_1.simplifySchema(schema), result);
    test.end();
});
tap_1.default.test('should convert a boolean schema inside items to an enum', function (test) {
    var schema = {
        items: {
            type: 'boolean'
        }
    };
    var result = {
        items: {
            enum: [false, true]
        }
    };
    test.strictSame(simplifier_1.simplifySchema(schema), result);
    test.end();
});
tap_1.default.test('should convert a boolean schema inside patternProperties to an enum', function (test) {
    var schema = {
        patternProperties: {
            '^foo$': {
                type: 'boolean'
            }
        }
    };
    var result = {
        patternProperties: {
            '^foo$': {
                enum: [false, true]
            }
        }
    };
    test.strictSame(simplifier_1.simplifySchema(schema), result);
    test.end();
});
