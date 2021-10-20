"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULES = void 0;
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
    }
];
