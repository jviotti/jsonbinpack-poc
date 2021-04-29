"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var mapper_1 = require("../../../lib/types/array/mapper");
tap_1.default.test('should encode an arbitrary array', function (test) {
    var schema = {
        type: 'array'
    };
    var result = mapper_1.getArrayEncoding(schema);
    test.strictSame(result, {
        type: 'array',
        encoding: 'UNBOUNDED_SEMITYPED__LENGTH_PREFIX',
        options: {
            prefixEncodings: []
        }
    });
    test.end();
});
tap_1.default.test('should encode an arbitrary array with minItems', function (test) {
    var schema = {
        type: 'array',
        minItems: 10
    };
    var result = mapper_1.getArrayEncoding(schema);
    test.strictSame(result, {
        type: 'array',
        encoding: 'FLOOR_SEMITYPED__LENGTH_PREFIX',
        options: {
            minimum: 10,
            prefixEncodings: []
        }
    });
    test.end();
});
tap_1.default.test('should encode an arbitrary array with maxItems = 256', function (test) {
    var schema = {
        type: 'array',
        maxItems: 256
    };
    var result = mapper_1.getArrayEncoding(schema);
    test.strictSame(result, {
        type: 'array',
        encoding: 'ROOF_SEMITYPED__LENGTH_PREFIX',
        options: {
            maximum: 256,
            prefixEncodings: []
        }
    });
    test.end();
});
tap_1.default.test('should encode an arbitrary array with maxItems = 255', function (test) {
    var schema = {
        type: 'array',
        maxItems: 255
    };
    var result = mapper_1.getArrayEncoding(schema);
    test.strictSame(result, {
        type: 'array',
        encoding: 'ROOF_8BITS_SEMITYPED__LENGTH_PREFIX',
        options: {
            maximum: 255,
            prefixEncodings: []
        }
    });
    test.end();
});
tap_1.default.test('should encode an arbitrary array with maxItems < 255', function (test) {
    var schema = {
        type: 'array',
        maxItems: 10
    };
    var result = mapper_1.getArrayEncoding(schema);
    test.strictSame(result, {
        type: 'array',
        encoding: 'ROOF_8BITS_SEMITYPED__LENGTH_PREFIX',
        options: {
            maximum: 10,
            prefixEncodings: []
        }
    });
    test.end();
});
tap_1.default.test('should encode an arbitrary array with maxItems - minItems < 255', function (test) {
    var schema = {
        type: 'array',
        maxItems: 10,
        minItems: 3
    };
    var result = mapper_1.getArrayEncoding(schema);
    test.strictSame(result, {
        type: 'array',
        encoding: 'BOUNDED_8BITS_SEMITYPED__LENGTH_PREFIX',
        options: {
            minimum: 3,
            maximum: 10,
            prefixEncodings: []
        }
    });
    test.end();
});
tap_1.default.test('should encode an arbitrary array with maxItems - minItems > 255', function (test) {
    var schema = {
        type: 'array',
        maxItems: 450,
        minItems: 30
    };
    var result = mapper_1.getArrayEncoding(schema);
    test.strictSame(result, {
        type: 'array',
        encoding: 'BOUNDED_SEMITYPED__LENGTH_PREFIX',
        options: {
            minimum: 30,
            maximum: 450,
            prefixEncodings: []
        }
    });
    test.end();
});
