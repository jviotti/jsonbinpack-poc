"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var mapper_1 = require("../../../lib/types/object/mapper");
tap_1.default.test('should encode a bounded object with only required keys', function (test) {
    var schema = {
        type: 'object',
        additionalProperties: false,
        required: ['foo', 'bar']
    };
    var result = mapper_1.getObjectEncoding(schema);
    test.strictSame(result, {
        type: 'object',
        encoding: 'REQUIRED_ONLY_BOUNDED_TYPED_OBJECT',
        options: {
            propertyEncodings: {},
            encoding: {
                type: 'any',
                encoding: 'ANY__TYPE_PREFIX',
                options: {}
            },
            requiredProperties: ['bar', 'foo']
        }
    });
    test.end();
});
tap_1.default.test('should encode a bounded object with required keys and empty properties', function (test) {
    var schema = {
        type: 'object',
        additionalProperties: false,
        properties: {},
        required: ['foo', 'bar']
    };
    var result = mapper_1.getObjectEncoding(schema);
    test.strictSame(result, {
        type: 'object',
        encoding: 'REQUIRED_ONLY_BOUNDED_TYPED_OBJECT',
        options: {
            propertyEncodings: {},
            encoding: {
                type: 'any',
                encoding: 'ANY__TYPE_PREFIX',
                options: {}
            },
            requiredProperties: ['bar', 'foo']
        }
    });
    test.end();
});
tap_1.default.test('should encode a bounded object with partially defined required keys', function (test) {
    var schema = {
        type: 'object',
        additionalProperties: false,
        required: ['foo', 'bar'],
        properties: {
            foo: {
                type: 'string',
                maxLength: 5
            }
        }
    };
    var result = mapper_1.getObjectEncoding(schema);
    test.strictSame(result, {
        type: 'object',
        encoding: 'REQUIRED_ONLY_BOUNDED_TYPED_OBJECT',
        options: {
            propertyEncodings: {
                foo: {
                    type: 'string',
                    encoding: 'ROOF__PREFIX_LENGTH_8BIT_FIXED',
                    options: {
                        maximum: 5
                    }
                }
            },
            encoding: {
                type: 'any',
                encoding: 'ANY__TYPE_PREFIX',
                options: {}
            },
            requiredProperties: ['bar', 'foo']
        }
    });
    test.end();
});
tap_1.default.test('should encode a bounded object with fully defined required keys', function (test) {
    var schema = {
        type: 'object',
        additionalProperties: false,
        required: ['foo', 'bar'],
        properties: {
            bar: {
                type: 'string'
            },
            foo: {
                type: 'string',
                maxLength: 5
            }
        }
    };
    var result = mapper_1.getObjectEncoding(schema);
    test.strictSame(result, {
        type: 'object',
        encoding: 'REQUIRED_ONLY_BOUNDED_TYPED_OBJECT',
        options: {
            propertyEncodings: {
                foo: {
                    type: 'string',
                    encoding: 'ROOF__PREFIX_LENGTH_8BIT_FIXED',
                    options: {
                        maximum: 5
                    }
                },
                bar: {
                    type: 'string',
                    encoding: 'ARBITRARY__PREFIX_LENGTH_VARINT',
                    options: {}
                }
            },
            encoding: {
                type: 'any',
                encoding: 'ANY__TYPE_PREFIX',
                options: {}
            },
            requiredProperties: ['bar', 'foo']
        }
    });
    test.end();
});
tap_1.default.test('should encode a bounded object with no required nor optionals', function (test) {
    var schema = {
        type: 'object',
        additionalProperties: false
    };
    var result = mapper_1.getObjectEncoding(schema);
    test.strictSame(result, {
        type: 'object',
        encoding: 'REQUIRED_ONLY_BOUNDED_TYPED_OBJECT',
        options: {
            propertyEncodings: {},
            encoding: {
                type: 'any',
                encoding: 'ANY__TYPE_PREFIX',
                options: {}
            },
            requiredProperties: []
        }
    });
    test.end();
});
tap_1.default.test('should encode a bounded object with optional properties', function (test) {
    var schema = {
        type: 'object',
        additionalProperties: false,
        properties: {
            foo: {
                type: 'string',
                maxLength: 5
            }
        }
    };
    var result = mapper_1.getObjectEncoding(schema);
    test.strictSame(result, {
        type: 'object',
        encoding: 'NON_REQUIRED_BOUNDED_TYPED_OBJECT',
        options: {
            propertyEncodings: {
                foo: {
                    type: 'string',
                    encoding: 'ROOF__PREFIX_LENGTH_8BIT_FIXED',
                    options: {
                        maximum: 5
                    }
                }
            },
            encoding: {
                type: 'any',
                encoding: 'ANY__TYPE_PREFIX',
                options: {}
            },
            optionalProperties: ['foo']
        }
    });
    test.end();
});
tap_1.default.test('should encode a bounded object with more than one optional keys', function (test) {
    var schema = {
        type: 'object',
        additionalProperties: false,
        properties: {
            bar: {
                type: 'string'
            },
            foo: {
                type: 'string',
                maxLength: 5
            }
        }
    };
    var result = mapper_1.getObjectEncoding(schema);
    test.strictSame(result, {
        type: 'object',
        encoding: 'NON_REQUIRED_BOUNDED_TYPED_OBJECT',
        options: {
            propertyEncodings: {
                foo: {
                    type: 'string',
                    encoding: 'ROOF__PREFIX_LENGTH_8BIT_FIXED',
                    options: {
                        maximum: 5
                    }
                },
                bar: {
                    type: 'string',
                    encoding: 'ARBITRARY__PREFIX_LENGTH_VARINT',
                    options: {}
                }
            },
            encoding: {
                type: 'any',
                encoding: 'ANY__TYPE_PREFIX',
                options: {}
            },
            optionalProperties: ['bar', 'foo']
        }
    });
    test.end();
});
tap_1.default.test('should encode a bounded object with more than one optional keys and empty required', function (test) {
    var schema = {
        type: 'object',
        additionalProperties: false,
        required: [],
        properties: {
            bar: {
                type: 'string'
            },
            foo: {
                type: 'string',
                maxLength: 5
            }
        }
    };
    var result = mapper_1.getObjectEncoding(schema);
    test.strictSame(result, {
        type: 'object',
        encoding: 'NON_REQUIRED_BOUNDED_TYPED_OBJECT',
        options: {
            propertyEncodings: {
                foo: {
                    type: 'string',
                    encoding: 'ROOF__PREFIX_LENGTH_8BIT_FIXED',
                    options: {
                        maximum: 5
                    }
                },
                bar: {
                    type: 'string',
                    encoding: 'ARBITRARY__PREFIX_LENGTH_VARINT',
                    options: {}
                }
            },
            encoding: {
                type: 'any',
                encoding: 'ANY__TYPE_PREFIX',
                options: {}
            },
            optionalProperties: ['bar', 'foo']
        }
    });
    test.end();
});
tap_1.default.test('should encode a bounded object with an optional and a required property', function (test) {
    var schema = {
        type: 'object',
        additionalProperties: false,
        required: ['bar'],
        properties: {
            foo: {
                type: 'string',
                maxLength: 5
            }
        }
    };
    var result = mapper_1.getObjectEncoding(schema);
    test.strictSame(result, {
        type: 'object',
        encoding: 'MIXED_BOUNDED_TYPED_OBJECT',
        options: {
            propertyEncodings: {
                foo: {
                    type: 'string',
                    encoding: 'ROOF__PREFIX_LENGTH_8BIT_FIXED',
                    options: {
                        maximum: 5
                    }
                }
            },
            encoding: {
                type: 'any',
                encoding: 'ANY__TYPE_PREFIX',
                options: {}
            },
            optionalProperties: ['foo'],
            requiredProperties: ['bar']
        }
    });
    test.end();
});
tap_1.default.test('should encode a bounded object with an optional and a typed required property', function (test) {
    var schema = {
        type: 'object',
        additionalProperties: false,
        required: ['bar'],
        properties: {
            bar: {
                type: 'string'
            },
            foo: {
                type: 'string',
                maxLength: 5
            }
        }
    };
    var result = mapper_1.getObjectEncoding(schema);
    test.strictSame(result, {
        type: 'object',
        encoding: 'MIXED_BOUNDED_TYPED_OBJECT',
        options: {
            propertyEncodings: {
                foo: {
                    type: 'string',
                    encoding: 'ROOF__PREFIX_LENGTH_8BIT_FIXED',
                    options: {
                        maximum: 5
                    }
                },
                bar: {
                    type: 'string',
                    encoding: 'ARBITRARY__PREFIX_LENGTH_VARINT',
                    options: {}
                }
            },
            encoding: {
                type: 'any',
                encoding: 'ANY__TYPE_PREFIX',
                options: {}
            },
            optionalProperties: ['foo'],
            requiredProperties: ['bar']
        }
    });
    test.end();
});
