"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULES = void 0;
var assert_1 = require("assert");
exports.RULES = [
    {
        id: 'content-schema-without-content-media-type',
        condition: function (schema) {
            return 'contentSchema' in schema && !('contentMediaType' in schema);
        },
        transform: function (schema) {
            Reflect.deleteProperty(schema, 'contentSchema');
            return schema;
        }
    },
    {
        id: 'max-min-contains-without-contains',
        condition: function (schema) {
            return !('contains' in schema) &&
                ('minContains' in schema || 'maxContains' in schema);
        },
        transform: function (schema) {
            Reflect.deleteProperty(schema, 'minContains');
            Reflect.deleteProperty(schema, 'maxContains');
            return schema;
        }
    },
    {
        id: 'unsatisfiable-max-contains',
        condition: function (schema) {
            return typeof schema.maxContains === 'number' &&
                typeof schema.maxItems === 'number' &&
                schema.maxContains >= schema.maxItems;
        },
        transform: function (schema) {
            Reflect.deleteProperty(schema, 'maxContains');
            return schema;
        }
    },
    {
        id: 'implied-array-uniqueness',
        condition: function (schema) {
            var hasUniqueItems = typeof schema.uniqueItems === 'boolean' && schema.uniqueItems;
            return hasUniqueItems && ((typeof schema.maxItems === 'number' && schema.maxItems <= 1) ||
                (Array.isArray(schema.const) && schema.const.length <= 1) ||
                (Array.isArray(schema.enum) && schema.enum.length === 1 &&
                    Array.isArray(schema.enum[0]) && schema.enum[0].length <= 1));
        },
        transform: function (schema) {
            Reflect.deleteProperty(schema, 'uniqueItems');
            return schema;
        }
    },
    {
        id: 'min-properties-tautology',
        condition: function (schema) {
            return typeof schema.minProperties === 'number' &&
                Array.isArray(schema.required) &&
                schema.required.length > schema.minProperties;
        },
        transform: function (schema) {
            assert_1.strict(Array.isArray(schema.required));
            return Object.assign(schema, {
                minProperties: schema.required.length
            });
        }
    },
    {
        id: 'if-without-then-and-else',
        condition: function (schema) {
            return 'if' in schema && !('then' in schema) && !('else' in schema);
        },
        transform: function (schema) {
            Reflect.deleteProperty(schema, 'if');
            return schema;
        }
    },
    {
        id: 'then-else-without-if',
        condition: function (schema) {
            return !('if' in schema) && ('then' in schema || 'else' in schema);
        },
        transform: function (schema) {
            Reflect.deleteProperty(schema, 'then');
            Reflect.deleteProperty(schema, 'else');
            return schema;
        }
    },
    {
        id: 'empty-required',
        condition: function (schema) {
            return Array.isArray(schema.required) && schema.required.length === 0;
        },
        transform: function (schema) {
            Reflect.deleteProperty(schema, 'required');
            return schema;
        }
    },
    {
        id: 'empty-properties',
        condition: function (schema) {
            return typeof schema.properties === 'object' &&
                !Array.isArray(schema.properties) &&
                schema.properties !== null &&
                Object.keys(schema.properties).length === 0;
        },
        transform: function (schema) {
            Reflect.deleteProperty(schema, 'properties');
            return schema;
        }
    },
    {
        id: 'empty-pattern-properties',
        condition: function (schema) {
            return typeof schema.patternProperties === 'object' &&
                !Array.isArray(schema.patternProperties) &&
                schema.patternProperties !== null &&
                Object.keys(schema.patternProperties).length === 0;
        },
        transform: function (schema) {
            Reflect.deleteProperty(schema, 'patternProperties');
            return schema;
        }
    }
];
