"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.canonicalizeSchema = void 0;
var lodash_1 = require("lodash");
var SCHEMA_BOOLEAN_KEYS = ['type'];
var SCHEMA_INTEGER_KEYS = ['type', 'minimum', 'maximum', 'multipleOf'];
var SCHEMA_NULL_KEYS = ['type'];
var SCHEMA_NUMBER_KEYS = ['type'];
var SCHEMA_STRING_KEYS = ['type', 'maxLength', 'minLength', 'format', 'contentEncoding', 'contentMediaType', 'contentSchema'];
var SCHEMA_ARRAY_KEYS = ['type', 'maxItems', 'minItems', 'items', 'prefixItems'];
var SCHEMA_OBJECT_KEYS = ['type', 'additionalProperties', 'required', 'propertyNames', 'properties'];
var canonicalizeSchema = function (schema) {
    if (typeof schema.allOf !== 'undefined') {
        return exports.canonicalizeSchema(Object.assign.apply(Object, __spreadArray([{}], __read(schema.allOf))));
    }
    switch (schema.type) {
        case 'boolean': return lodash_1.pick(schema, SCHEMA_BOOLEAN_KEYS);
        case 'integer': return lodash_1.pick(schema, SCHEMA_INTEGER_KEYS);
        case 'null': return lodash_1.pick(schema, SCHEMA_NULL_KEYS);
        case 'number': return lodash_1.pick(schema, SCHEMA_NUMBER_KEYS);
        case 'string': return lodash_1.pick(schema, SCHEMA_STRING_KEYS);
        case 'array': return lodash_1.pick(schema, SCHEMA_ARRAY_KEYS);
        case 'object': return lodash_1.pick(schema, SCHEMA_OBJECT_KEYS);
        default: return {};
    }
};
exports.canonicalizeSchema = canonicalizeSchema;
