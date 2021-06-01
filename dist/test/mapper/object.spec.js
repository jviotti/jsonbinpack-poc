"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var mapper_1 = require("../../lib/mapper");
tap_1.default.test('should encode a bounded object with only required keys', function (test) {
    var schema = {
        type: 'object',
        additionalProperties: false,
        required: ['foo', 'bar']
    };
    var result = mapper_1.getEncoding(schema);
    test.strictSame(result, {
        type: 'object',
        encoding: 'REQUIRED_ONLY_BOUNDED_TYPED_OBJECT',
        options: {
            booleanRequiredProperties: [],
            propertyEncodings: {
                foo: {
                    type: 'any',
                    encoding: 'ANY__TYPE_PREFIX',
                    options: {}
                },
                bar: {
                    type: 'any',
                    encoding: 'ANY__TYPE_PREFIX',
                    options: {}
                }
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
    var result = mapper_1.getEncoding(schema);
    test.strictSame(result, {
        type: 'object',
        encoding: 'REQUIRED_ONLY_BOUNDED_TYPED_OBJECT',
        options: {
            booleanRequiredProperties: [],
            propertyEncodings: {
                foo: {
                    type: 'any',
                    encoding: 'ANY__TYPE_PREFIX',
                    options: {}
                },
                bar: {
                    type: 'any',
                    encoding: 'ANY__TYPE_PREFIX',
                    options: {}
                }
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
    var result = mapper_1.getEncoding(schema);
    test.strictSame(result, {
        type: 'object',
        encoding: 'REQUIRED_ONLY_BOUNDED_TYPED_OBJECT',
        options: {
            booleanRequiredProperties: [],
            propertyEncodings: {
                foo: {
                    type: 'string',
                    encoding: 'ROOF__PREFIX_LENGTH_8BIT_FIXED',
                    options: {
                        maximum: 5
                    }
                },
                bar: {
                    type: 'any',
                    encoding: 'ANY__TYPE_PREFIX',
                    options: {}
                }
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
    var result = mapper_1.getEncoding(schema);
    test.strictSame(result, {
        type: 'object',
        encoding: 'REQUIRED_ONLY_BOUNDED_TYPED_OBJECT',
        options: {
            booleanRequiredProperties: [],
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
    var result = mapper_1.getEncoding(schema);
    test.strictSame(result, {
        type: 'object',
        encoding: 'REQUIRED_ONLY_BOUNDED_TYPED_OBJECT',
        options: {
            booleanRequiredProperties: [],
            propertyEncodings: {},
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
    var result = mapper_1.getEncoding(schema);
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
    var result = mapper_1.getEncoding(schema);
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
    var result = mapper_1.getEncoding(schema);
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
    var result = mapper_1.getEncoding(schema);
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
                    type: 'any',
                    encoding: 'ANY__TYPE_PREFIX',
                    options: {}
                }
            },
            optionalProperties: ['foo'],
            booleanRequiredProperties: [],
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
    var result = mapper_1.getEncoding(schema);
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
            optionalProperties: ['foo'],
            booleanRequiredProperties: [],
            requiredProperties: ['bar']
        }
    });
    test.end();
});
tap_1.default.test('should encode a simple unbounded object', function (test) {
    var schema = {
        type: 'object'
    };
    var result = mapper_1.getEncoding(schema);
    test.strictSame(result, {
        type: 'object',
        encoding: 'ARBITRARY_TYPED_KEYS_OBJECT',
        options: {
            keyEncoding: {
                type: 'string',
                encoding: 'ARBITRARY__PREFIX_LENGTH_VARINT',
                options: {}
            },
            encoding: {
                type: 'any',
                encoding: 'ANY__TYPE_PREFIX',
                options: {}
            }
        }
    });
    test.end();
});
tap_1.default.test('should encode a simple unbounded object with empty required', function (test) {
    var schema = {
        type: 'object',
        required: []
    };
    var result = mapper_1.getEncoding(schema);
    test.strictSame(result, {
        type: 'object',
        encoding: 'ARBITRARY_TYPED_KEYS_OBJECT',
        options: {
            keyEncoding: {
                type: 'string',
                encoding: 'ARBITRARY__PREFIX_LENGTH_VARINT',
                options: {}
            },
            encoding: {
                type: 'any',
                encoding: 'ANY__TYPE_PREFIX',
                options: {}
            }
        }
    });
    test.end();
});
tap_1.default.test('should encode a simple unbounded object with additionalProperties: true', function (test) {
    var schema = {
        type: 'object',
        additionalProperties: true
    };
    var result = mapper_1.getEncoding(schema);
    test.strictSame(result, {
        type: 'object',
        encoding: 'ARBITRARY_TYPED_KEYS_OBJECT',
        options: {
            keyEncoding: {
                type: 'string',
                encoding: 'ARBITRARY__PREFIX_LENGTH_VARINT',
                options: {}
            },
            encoding: {
                type: 'any',
                encoding: 'ANY__TYPE_PREFIX',
                options: {}
            }
        }
    });
    test.end();
});
tap_1.default.test('should encode a simple unbounded object with additionalProperties: schema', function (test) {
    var schema = {
        type: 'object',
        additionalProperties: {
            type: 'string'
        }
    };
    var result = mapper_1.getEncoding(schema);
    test.strictSame(result, {
        type: 'object',
        encoding: 'ARBITRARY_TYPED_KEYS_OBJECT',
        options: {
            keyEncoding: {
                type: 'string',
                encoding: 'ARBITRARY__PREFIX_LENGTH_VARINT',
                options: {}
            },
            encoding: {
                type: 'string',
                encoding: 'ARBITRARY__PREFIX_LENGTH_VARINT',
                options: {}
            }
        }
    });
    test.end();
});
tap_1.default.test('should encode a simple unbounded object with propertyNames', function (test) {
    var schema = {
        type: 'object',
        propertyNames: {
            type: 'string',
            maxLength: 5
        }
    };
    var result = mapper_1.getEncoding(schema);
    test.strictSame(result, {
        type: 'object',
        encoding: 'ARBITRARY_TYPED_KEYS_OBJECT',
        options: {
            keyEncoding: {
                type: 'string',
                encoding: 'ROOF__PREFIX_LENGTH_8BIT_FIXED',
                options: {
                    maximum: 5
                }
            },
            encoding: {
                type: 'any',
                encoding: 'ANY__TYPE_PREFIX',
                options: {}
            }
        }
    });
    test.end();
});
tap_1.default.test('should encode a simple unbounded object with propertyNames and additionalProperties: true', function (test) {
    var schema = {
        type: 'object',
        additionalProperties: true,
        propertyNames: {
            type: 'string',
            maxLength: 5
        }
    };
    var result = mapper_1.getEncoding(schema);
    test.strictSame(result, {
        type: 'object',
        encoding: 'ARBITRARY_TYPED_KEYS_OBJECT',
        options: {
            keyEncoding: {
                type: 'string',
                encoding: 'ROOF__PREFIX_LENGTH_8BIT_FIXED',
                options: {
                    maximum: 5
                }
            },
            encoding: {
                type: 'any',
                encoding: 'ANY__TYPE_PREFIX',
                options: {}
            }
        }
    });
    test.end();
});
tap_1.default.test('should encode a simple unbounded object with propertyNames and additionalProperties: schema', function (test) {
    var schema = {
        type: 'object',
        additionalProperties: {
            type: 'string'
        },
        propertyNames: {
            type: 'string',
            maxLength: 5
        }
    };
    var result = mapper_1.getEncoding(schema);
    test.strictSame(result, {
        type: 'object',
        encoding: 'ARBITRARY_TYPED_KEYS_OBJECT',
        options: {
            keyEncoding: {
                type: 'string',
                encoding: 'ROOF__PREFIX_LENGTH_8BIT_FIXED',
                options: {
                    maximum: 5
                }
            },
            encoding: {
                type: 'string',
                encoding: 'ARBITRARY__PREFIX_LENGTH_VARINT',
                options: {}
            }
        }
    });
    test.end();
});
tap_1.default.test('should encode a simple unbounded object with a required property', function (test) {
    var schema = {
        type: 'object',
        required: ['foo']
    };
    var result = mapper_1.getEncoding(schema);
    test.strictSame(result, {
        type: 'object',
        encoding: 'REQUIRED_UNBOUNDED_TYPED_OBJECT',
        options: {
            requiredProperties: ['foo'],
            booleanRequiredProperties: [],
            propertyEncodings: {
                foo: {
                    type: 'any',
                    encoding: 'ANY__TYPE_PREFIX',
                    options: {}
                }
            },
            keyEncoding: {
                type: 'string',
                encoding: 'ARBITRARY__PREFIX_LENGTH_VARINT',
                options: {}
            },
            encoding: {
                type: 'any',
                encoding: 'ANY__TYPE_PREFIX',
                options: {}
            }
        }
    });
    test.end();
});
tap_1.default.test('should encode a simple unbounded object with a required typed property', function (test) {
    var schema = {
        type: 'object',
        required: ['foo'],
        properties: {
            foo: {
                type: 'string'
            }
        }
    };
    var result = mapper_1.getEncoding(schema);
    test.strictSame(result, {
        type: 'object',
        encoding: 'REQUIRED_UNBOUNDED_TYPED_OBJECT',
        options: {
            requiredProperties: ['foo'],
            booleanRequiredProperties: [],
            propertyEncodings: {
                foo: {
                    type: 'string',
                    encoding: 'ARBITRARY__PREFIX_LENGTH_VARINT',
                    options: {}
                }
            },
            keyEncoding: {
                type: 'string',
                encoding: 'ARBITRARY__PREFIX_LENGTH_VARINT',
                options: {}
            },
            encoding: {
                type: 'any',
                encoding: 'ANY__TYPE_PREFIX',
                options: {}
            }
        }
    });
    test.end();
});
tap_1.default.test('should encode a simple unbounded object with two optional properties', function (test) {
    var schema = {
        type: 'object',
        properties: {
            foo: {
                type: 'string'
            },
            bar: {
                type: 'string',
                maxLength: 5
            }
        }
    };
    var result = mapper_1.getEncoding(schema);
    test.strictSame(result, {
        type: 'object',
        encoding: 'OPTIONAL_UNBOUNDED_TYPED_OBJECT',
        options: {
            optionalProperties: ['bar', 'foo'],
            propertyEncodings: {
                foo: {
                    type: 'string',
                    encoding: 'ARBITRARY__PREFIX_LENGTH_VARINT',
                    options: {}
                },
                bar: {
                    type: 'string',
                    encoding: 'ROOF__PREFIX_LENGTH_8BIT_FIXED',
                    options: {
                        maximum: 5
                    }
                }
            },
            keyEncoding: {
                type: 'string',
                encoding: 'ARBITRARY__PREFIX_LENGTH_VARINT',
                options: {}
            },
            encoding: {
                type: 'any',
                encoding: 'ANY__TYPE_PREFIX',
                options: {}
            }
        }
    });
    test.end();
});
tap_1.default.test('should encode a complex unbounded object', function (test) {
    var schema = {
        type: 'object',
        required: ['foo', 'bar'],
        additionalProperties: {
            type: 'integer'
        },
        propertyNames: {
            type: 'string',
            minLength: 3
        },
        properties: {
            bar: {
                type: 'string',
                maxLength: 5
            },
            baz: {
                type: 'string'
            }
        }
    };
    var result = mapper_1.getEncoding(schema);
    test.strictSame(result, {
        type: 'object',
        encoding: 'MIXED_UNBOUNDED_TYPED_OBJECT',
        options: {
            optionalProperties: ['baz'],
            requiredProperties: ['bar', 'foo'],
            booleanRequiredProperties: [],
            propertyEncodings: {
                foo: {
                    type: 'integer',
                    encoding: 'ARBITRARY__ZIGZAG_VARINT',
                    options: {}
                },
                bar: {
                    type: 'string',
                    encoding: 'ROOF__PREFIX_LENGTH_8BIT_FIXED',
                    options: {
                        maximum: 5
                    }
                },
                baz: {
                    type: 'string',
                    encoding: 'ARBITRARY__PREFIX_LENGTH_VARINT',
                    options: {}
                }
            },
            keyEncoding: {
                type: 'string',
                encoding: 'FLOOR__PREFIX_LENGTH_ENUM_VARINT',
                options: {
                    minimum: 3
                }
            },
            encoding: {
                type: 'integer',
                encoding: 'ARBITRARY__ZIGZAG_VARINT',
                options: {}
            }
        }
    });
    test.end();
});
tap_1.default.test('should encode a bounded object with only boolean required keys', function (test) {
    var schema = {
        type: 'object',
        additionalProperties: false,
        required: ['foo', 'bar'],
        properties: {
            foo: {
                type: 'boolean'
            },
            bar: {
                type: 'boolean'
            }
        }
    };
    var result = mapper_1.getEncoding(schema);
    test.strictSame(result, {
        type: 'object',
        encoding: 'REQUIRED_ONLY_BOUNDED_TYPED_OBJECT',
        options: {
            booleanRequiredProperties: ['bar', 'foo'],
            propertyEncodings: {
                foo: {
                    type: 'boolean',
                    encoding: 'BOOLEAN_8BITS__ENUM_FIXED',
                    options: {}
                },
                bar: {
                    type: 'boolean',
                    encoding: 'BOOLEAN_8BITS__ENUM_FIXED',
                    options: {}
                }
            },
            requiredProperties: []
        }
    });
    test.end();
});
tap_1.default.test('should encode a bounded property with a single boolean', function (test) {
    var schema = {
        type: 'object',
        required: ['jsx'],
        additionalProperties: false,
        properties: {
            jsx: {
                type: 'boolean'
            }
        }
    };
    var result = mapper_1.getEncoding(schema);
    test.strictSame(result, {
        type: 'object',
        encoding: 'REQUIRED_ONLY_BOUNDED_TYPED_OBJECT',
        options: {
            booleanRequiredProperties: ['jsx'],
            propertyEncodings: {
                jsx: {
                    type: 'boolean',
                    encoding: 'BOOLEAN_8BITS__ENUM_FIXED',
                    options: {}
                }
            },
            requiredProperties: []
        }
    });
    test.end();
});
