"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var lib_1 = require("../lib");
tap_1.default.test('should encode and decode a test object', function (test) {
    var encoding = lib_1.compileEncodingSchema({
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
    var buffer = lib_1.encode(encoding, value);
    var result = lib_1.decode(encoding, buffer);
    test.strictSame(value, result);
    test.end();
});
