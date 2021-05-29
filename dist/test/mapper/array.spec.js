"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var array_1 = require("../../lib/mapper/array");
tap_1.default.test('should encode an arbitrary array', function (test) {
    var schema = {
        type: 'array'
    };
    var result = array_1.getArrayEncoding(schema);
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
    var result = array_1.getArrayEncoding(schema);
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
    var result = array_1.getArrayEncoding(schema);
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
    var result = array_1.getArrayEncoding(schema);
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
    var result = array_1.getArrayEncoding(schema);
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
    var result = array_1.getArrayEncoding(schema);
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
    var result = array_1.getArrayEncoding(schema);
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
tap_1.default.test('should encode an semi-typed scalar heterogeneous array', function (test) {
    var schema = {
        type: 'array',
        prefixItems: [
            {
                type: 'integer'
            },
            {
                type: 'string',
                maxLength: 5
            }
        ]
    };
    var result = array_1.getArrayEncoding(schema);
    test.strictSame(result, {
        type: 'array',
        encoding: 'UNBOUNDED_SEMITYPED__LENGTH_PREFIX',
        options: {
            prefixEncodings: [
                {
                    type: 'integer',
                    encoding: 'ARBITRARY__ZIGZAG_VARINT',
                    options: {}
                },
                {
                    type: 'string',
                    encoding: 'ROOF__PREFIX_LENGTH_8BIT_FIXED',
                    options: {
                        maximum: 5
                    }
                }
            ]
        }
    });
    test.end();
});
tap_1.default.test('should encode an semi-typed array with minItems', function (test) {
    var schema = {
        type: 'array',
        minItems: 5,
        prefixItems: [
            {
                type: 'integer'
            },
            {
                type: 'string',
                maxLength: 5
            }
        ]
    };
    var result = array_1.getArrayEncoding(schema);
    test.strictSame(result, {
        type: 'array',
        encoding: 'FLOOR_SEMITYPED__LENGTH_PREFIX',
        options: {
            minimum: 5,
            prefixEncodings: [
                {
                    type: 'integer',
                    encoding: 'ARBITRARY__ZIGZAG_VARINT',
                    options: {}
                },
                {
                    type: 'string',
                    encoding: 'ROOF__PREFIX_LENGTH_8BIT_FIXED',
                    options: {
                        maximum: 5
                    }
                }
            ]
        }
    });
    test.end();
});
tap_1.default.test('should encode an semi + fully typed array with minItems', function (test) {
    var schema = {
        type: 'array',
        minItems: 5,
        items: {
            type: 'array'
        },
        prefixItems: [
            {
                type: 'integer'
            },
            {
                type: 'string',
                maxLength: 5
            }
        ]
    };
    var result = array_1.getArrayEncoding(schema);
    test.strictSame(result, {
        type: 'array',
        encoding: 'FLOOR_TYPED__LENGTH_PREFIX',
        options: {
            minimum: 5,
            encoding: {
                type: 'array',
                encoding: 'UNBOUNDED_SEMITYPED__LENGTH_PREFIX',
                options: {
                    prefixEncodings: []
                }
            },
            prefixEncodings: [
                {
                    type: 'integer',
                    encoding: 'ARBITRARY__ZIGZAG_VARINT',
                    options: {}
                },
                {
                    type: 'string',
                    encoding: 'ROOF__PREFIX_LENGTH_8BIT_FIXED',
                    options: {
                        maximum: 5
                    }
                }
            ]
        }
    });
    test.end();
});
