"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULES = void 0;
exports.RULES = [
    {
        id: 'boolean-type-to-enum',
        condition: function (schema) {
            return schema.type === 'boolean';
        },
        transform: function (_schema) {
            return {
                enum: [false, true]
            };
        }
    }
];
