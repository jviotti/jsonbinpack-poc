"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var jsonschema_1 = require("../lib/jsonschema");
tap_1.default.test('should compile a schema and evaluate a matching instance', function (test) {
    var validateFunction = jsonschema_1.compileSchema({
        type: 'object',
        required: ['foo'],
        additionalProperties: false,
        properties: {
            foo: {
                type: 'string'
            },
            baz: {
                type: 'object',
                required: ['qux'],
                properties: {
                    qux: {
                        type: 'array'
                    }
                }
            }
        }
    });
    var value = {
        foo: 'bar',
        baz: {
            qux: [1, 2]
        }
    };
    test.true(validateFunction(value));
    test.end();
});
tap_1.default.test('should compile a schema and evaluate a non-matching instance', function (test) {
    var validateFunction = jsonschema_1.compileSchema({
        type: 'object',
        required: ['foo'],
        additionalProperties: false,
        properties: {
            foo: {
                type: 'string'
            },
            baz: {
                type: 'object',
                required: ['qux'],
                properties: {
                    qux: {
                        type: 'array'
                    }
                }
            }
        }
    });
    var value = {
        foo: 'bar',
        baz: {
            qux: '11'
        }
    };
    test.false(validateFunction(value));
    test.end();
});
