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
        id: 'total-prefix-items',
        condition: function (schema) {
            return Array.isArray(schema.prefixItems) &&
                typeof schema.maxItems === 'number' &&
                'items' in schema &&
                schema.maxItems <= schema.prefixItems.length;
        },
        transform: function (schema) {
            Reflect.deleteProperty(schema, 'items');
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
    }
];
