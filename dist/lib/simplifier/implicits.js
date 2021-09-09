"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULES = void 0;
exports.RULES = [
    {
        id: 'implicit-unit-multiple-of',
        condition: function (schema) {
            return Array.isArray(schema.type)
                ? (typeof schema.multipleOf === 'undefined' && schema.type.includes('integer'))
                : (typeof schema.multipleOf === 'undefined' && schema.type === 'integer');
        },
        transform: function (schema) {
            return Object.assign(schema, { multipleOf: 1 });
        }
    }
];
