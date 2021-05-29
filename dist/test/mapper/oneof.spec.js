"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var oneof_1 = require("../../lib/mapper/oneof");
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
    var result = oneof_1.getOneOfEncoding(schema);
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
                    })
                },
                {
                    schema: {
                        type: 'integer',
                        maximum: 5
                    },
                    encoding: mapper_1.getEncoding({
                        type: 'integer',
                        maximum: 5
                    })
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
                    })
                }
            ]
        }
    });
    test.end();
});
