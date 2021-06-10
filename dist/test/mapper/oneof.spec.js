"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var mapper_1 = require("../../lib/mapper");
tap_1.default.test('should encode a oneOf schema with multiple choices', function (test) {
    var schema = {
        oneOf: [
            {
                type: 'string'
            },
            {
                type: 'integer',
                maximum: 5
            },
            {
                type: 'array',
                items: {
                    type: 'string'
                }
            }
        ]
    };
    var result = mapper_1.getEncoding(schema, 0);
    test.is(mapper_1.getStates(schema, 0), Infinity);
    test.strictSame(result, {
        type: 'oneOf',
        encoding: 'ONEOF_CHOICE_INDEX_PREFIX',
        options: {
            schemas: [
                {
                    schema: {
                        type: 'string'
                    },
                    encoding: mapper_1.getEncoding({
                        type: 'string'
                    }, 1)
                },
                {
                    schema: {
                        type: 'integer',
                        maximum: 5
                    },
                    encoding: mapper_1.getEncoding({
                        type: 'integer',
                        maximum: 5
                    }, 1)
                },
                {
                    schema: {
                        type: 'array',
                        items: {
                            type: 'string'
                        }
                    },
                    encoding: mapper_1.getEncoding({
                        type: 'array',
                        items: {
                            type: 'string'
                        }
                    }, 1)
                }
            ]
        }
    });
    test.end();
});
tap_1.default.test('should encode a oneOf schema with multiple boolean choices', function (test) {
    var schema = {
        oneOf: [
            {
                type: 'boolean'
            },
            {
                type: 'boolean'
            },
            {
                type: 'boolean'
            }
        ]
    };
    var result = mapper_1.getEncoding(schema, 0);
    test.is(mapper_1.getStates(schema, 0), 8);
    test.strictSame(result, {
        type: 'oneOf',
        encoding: 'ONEOF_CHOICE_INDEX_PREFIX',
        options: {
            schemas: [
                {
                    schema: {
                        type: 'boolean'
                    },
                    encoding: mapper_1.getEncoding({
                        type: 'boolean'
                    }, 1)
                },
                {
                    schema: {
                        type: 'boolean'
                    },
                    encoding: mapper_1.getEncoding({
                        type: 'boolean'
                    }, 1)
                },
                {
                    schema: {
                        type: 'boolean'
                    },
                    encoding: mapper_1.getEncoding({
                        type: 'boolean'
                    }, 1)
                }
            ]
        }
    });
    test.end();
});
