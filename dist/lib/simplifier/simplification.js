"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULES = void 0;
exports.RULES = [
    {
        id: 'equal-numeric-bounds-as-const',
        condition: function (schema) {
            return 'minimum' in schema && 'maximum' in schema &&
                schema.minimum === schema.maximum;
        },
        transform: function (schema) {
            var value = schema.maximum;
            Reflect.deleteProperty(schema, 'maximum');
            Reflect.deleteProperty(schema, 'minimum');
            return Object.assign(schema, {
                const: value
            });
        }
    },
    {
        id: 'empty-string',
        condition: function (schema) {
            return schema.type === 'string' && 'maxLength' in schema && schema.maxLength === 0;
        },
        transform: function (schema) {
            Reflect.deleteProperty(schema, 'maxLength');
            return Object.assign(schema, {
                const: ''
            });
        }
    }
];
