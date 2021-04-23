"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var mapper_1 = require("../../../lib/types/string/mapper");
tap_1.default.test('should encode a simple string', function (test) {
    var schema = {
        type: 'string'
    };
    var result = mapper_1.getStringEncoding(schema);
    test.strictSame(result, {
        encoding: 'ARBITRARY__PREFIX_LENGTH_VARINT',
        options: {}
    });
    test.end();
});
tap_1.default.test('should encode a string with minLength', function (test) {
    var schema = {
        type: 'string',
        minLength: 5
    };
    var result = mapper_1.getStringEncoding(schema);
    test.strictSame(result, {
        encoding: 'FLOOR__PREFIX_LENGTH_ENUM_VARINT',
        options: {
            minimum: 5
        }
    });
    test.end();
});
tap_1.default.test('should encode a string with maxLength >= 255', function (test) {
    var schema = {
        type: 'string',
        maxLength: 256
    };
    var result = mapper_1.getStringEncoding(schema);
    test.strictSame(result, {
        encoding: 'ROOF__PREFIX_LENGTH_ENUM_VARINT',
        options: {
            maximum: 256
        }
    });
    test.end();
});
tap_1.default.test('should encode a string with maxLength < 255', function (test) {
    var schema = {
        type: 'string',
        maxLength: 254
    };
    var result = mapper_1.getStringEncoding(schema);
    test.strictSame(result, {
        encoding: 'ROOF__PREFIX_LENGTH_8BIT_FIXED',
        options: {
            maximum: 254
        }
    });
    test.end();
});
tap_1.default.test('should encode a string with maxLength = 255', function (test) {
    var schema = {
        type: 'string',
        maxLength: 255
    };
    var result = mapper_1.getStringEncoding(schema);
    test.strictSame(result, {
        encoding: 'ROOF__PREFIX_LENGTH_8BIT_FIXED',
        options: {
            maximum: 255
        }
    });
    test.end();
});
tap_1.default.test('should encode a string with minLength and maxLength < 255', function (test) {
    var schema = {
        type: 'string',
        minLength: 100,
        maxLength: 300
    };
    var result = mapper_1.getStringEncoding(schema);
    test.strictSame(result, {
        encoding: 'BOUNDED__PREFIX_LENGTH_8BIT_FIXED',
        options: {
            minimum: 100,
            maximum: 300
        }
    });
    test.end();
});
tap_1.default.test('should encode a string with minLength and maxLength > 255', function (test) {
    var schema = {
        type: 'string',
        minLength: 100,
        maxLength: 600
    };
    var result = mapper_1.getStringEncoding(schema);
    test.strictSame(result, {
        encoding: 'BOUNDED__PREFIX_LENGTH_ENUM_VARINT',
        options: {
            minimum: 100,
            maximum: 600
        }
    });
    test.end();
});
