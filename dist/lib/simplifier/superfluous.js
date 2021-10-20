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
    }
];
