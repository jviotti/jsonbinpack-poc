"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULES = void 0;
var assert_1 = require("assert");
exports.RULES = [
    {
        id: 'type-union-anyof',
        condition: function (schema) {
            return Array.isArray(schema.type);
        },
        transform: function (schema) {
            assert_1.strict(Array.isArray(schema.type));
            return {
                anyOf: schema.type.map(function (type) {
                    return Object.assign({}, schema, {
                        type: type
                    });
                })
            };
        }
    },
    {
        id: 'null-as-const',
        condition: function (schema) {
            return schema.type === 'null';
        },
        transform: function (_schema) {
            return {
                const: null
            };
        }
    },
    {
        id: 'const-as-enum',
        condition: function (schema) {
            return typeof schema.const !== 'undefined';
        },
        transform: function (schema) {
            assert_1.strict(typeof schema.const !== 'undefined');
            return {
                enum: [schema.const]
            };
        }
    },
    {
        id: 'exclusive-minimum-to-minimum',
        condition: function (schema) {
            return typeof schema.exclusiveMinimum !== 'undefined';
        },
        transform: function (schema) {
            var _a, _b;
            var minimum = Math.max(((_a = schema.exclusiveMinimum) !== null && _a !== void 0 ? _a : -Infinity) + 1, (_b = schema.minimum) !== null && _b !== void 0 ? _b : -Infinity);
            Reflect.deleteProperty(schema, 'exclusiveMinimum');
            return Object.assign(schema, { minimum: minimum });
        }
    },
    {
        id: 'exclusive-maximum-to-maximum',
        condition: function (schema) {
            return typeof schema.exclusiveMaximum !== 'undefined';
        },
        transform: function (schema) {
            var _a, _b;
            var maximum = Math.max(((_a = schema.exclusiveMaximum) !== null && _a !== void 0 ? _a : Infinity) - 1, (_b = schema.maximum) !== null && _b !== void 0 ? _b : Infinity);
            Reflect.deleteProperty(schema, 'exclusiveMaximum');
            return Object.assign(schema, { maximum: maximum });
        }
    }
];
