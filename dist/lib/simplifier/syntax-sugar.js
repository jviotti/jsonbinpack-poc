"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULES = void 0;
exports.RULES = [
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
