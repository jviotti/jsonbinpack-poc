"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var mapper_1 = require("../lib/mapper");
tap_1.default.test('should get an integer encoding', function (test) {
    var schema = {
        type: 'integer',
        minimum: 5
    };
    var encoding = mapper_1.getEncoding(schema);
    test.strictSame(encoding, {
        type: 'integer',
        encoding: 'FLOOR__ENUM_VARINT',
        options: {
            minimum: 5
        }
    });
    test.end();
});
tap_1.default.test('should get a string encoding', function (test) {
    var schema = {
        type: 'string',
        maxLength: 20
    };
    var encoding = mapper_1.getEncoding(schema);
    test.strictSame(encoding, {
        type: 'string',
        encoding: 'ROOF__PREFIX_LENGTH_8BIT_FIXED',
        options: {
            maximum: 20
        }
    });
    test.end();
});
tap_1.default.test('should get an enum encoding', function (test) {
    var schema = {
        enum: ['foo']
    };
    var encoding = mapper_1.getEncoding(schema);
    test.strictSame(encoding, {
        type: 'enum',
        encoding: 'BOUNDED_CHOICE_INDEX',
        options: {
            choices: ['foo']
        }
    });
    test.end();
});
