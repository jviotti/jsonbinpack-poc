"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULES = void 0;
var lodash_1 = require("lodash");
var KEYWORDS_CORE = ['$id', '$vocabulary', '$schema', '$comment', '$defs',
    '$ref', '$dynamicRef', '$anchor', '$dynamicAnchor'];
var KEYWORDS_APPLICATOR = ['prefixItems', 'items', 'contains', 'additionalProperties',
    'properties', 'patternProperties', 'dependentSchemas', 'propertyNames',
    'allOf', 'anyOf', 'oneOf', 'not', 'if', 'then', 'else'];
var KEYWORDS_FORMAT_ASSERTION = ['format'];
var KEYWORDS_FORMAT_ANNOTATION = ['format'];
var KEYWORDS_CONTENT = ['contentEncoding', 'contentMediaType', 'contentSchema'];
var KEYWORDS_META_DATA = ['title', 'description', 'deprecated',
    'readOnly', 'writeOnly', 'default', 'examples'];
var ANY_KEYWORDS = KEYWORDS_CORE.concat(KEYWORDS_META_DATA).concat([
    'allOf', 'anyOf', 'oneOf', 'not', 'if', 'then', 'else'
]).concat(['type', 'const', 'enum']);
var NUMERIC_KEYWORDS = ANY_KEYWORDS.concat([
    'minimum', 'exclusiveMinimum', 'maximum', 'exclusiveMaximum', 'multipleOf'
]);
var STRING_KEYWORDS = ANY_KEYWORDS
    .concat(KEYWORDS_CONTENT)
    .concat(KEYWORDS_FORMAT_ASSERTION)
    .concat(KEYWORDS_FORMAT_ANNOTATION)
    .concat(['minLength', 'maxLength', 'pattern']);
var OBJECT_KEYWORDS = ANY_KEYWORDS
    .concat(lodash_1.difference(KEYWORDS_APPLICATOR, ['prefixItems', 'items', 'contains']))
    .concat(['unevaluatedProperties'])
    .concat(['minProperties', 'maxProperties', 'dependentRequired', 'required']);
var ARRAY_KEYWORDS = ANY_KEYWORDS
    .concat(['prefixItems', 'items', 'contains'])
    .concat(['unevaluatedItems'])
    .concat(['minContains', 'maxContains', 'pattern', 'minItems', 'maxItems', 'uniqueItems']);
exports.RULES = [
    {
        id: 'pick-numeric-keywords',
        condition: function (schema) {
            return (schema.type === 'integer' || schema.type === 'number') &&
                lodash_1.difference(Object.keys(schema), NUMERIC_KEYWORDS).length > 0;
        },
        transform: function (schema) {
            return lodash_1.reduce(schema, function (accumulator, value, key) {
                var _a;
                return NUMERIC_KEYWORDS.includes(key) ? __assign((_a = {}, _a[key] = value, _a), accumulator) : accumulator;
            }, {});
        }
    },
    {
        id: 'pick-string-keywords',
        condition: function (schema) {
            return schema.type === 'string' &&
                lodash_1.difference(Object.keys(schema), STRING_KEYWORDS).length > 0;
        },
        transform: function (schema) {
            return lodash_1.reduce(schema, function (accumulator, value, key) {
                var _a;
                return STRING_KEYWORDS.includes(key) ? __assign((_a = {}, _a[key] = value, _a), accumulator) : accumulator;
            }, {});
        }
    },
    {
        id: 'pick-object-keywords',
        condition: function (schema) {
            return schema.type === 'object' &&
                lodash_1.difference(Object.keys(schema), OBJECT_KEYWORDS).length > 0;
        },
        transform: function (schema) {
            return lodash_1.reduce(schema, function (accumulator, value, key) {
                var _a;
                return OBJECT_KEYWORDS.includes(key) ? __assign((_a = {}, _a[key] = value, _a), accumulator) : accumulator;
            }, {});
        }
    },
    {
        id: 'pick-array-keywords',
        condition: function (schema) {
            return schema.type === 'array' &&
                lodash_1.difference(Object.keys(schema), ARRAY_KEYWORDS).length > 0;
        },
        transform: function (schema) {
            return lodash_1.reduce(schema, function (accumulator, value, key) {
                var _a;
                return ARRAY_KEYWORDS.includes(key) ? __assign((_a = {}, _a[key] = value, _a), accumulator) : accumulator;
            }, {});
        }
    },
    {
        id: 'pick-null-keywords',
        condition: function (schema) {
            return schema.type === 'null' &&
                lodash_1.difference(Object.keys(schema), ANY_KEYWORDS).length > 0;
        },
        transform: function (schema) {
            return lodash_1.reduce(schema, function (accumulator, value, key) {
                var _a;
                return ANY_KEYWORDS.includes(key) ? __assign((_a = {}, _a[key] = value, _a), accumulator) : accumulator;
            }, {});
        }
    },
    {
        id: 'pick-boolean-keywords',
        condition: function (schema) {
            return schema.type === 'boolean' &&
                lodash_1.difference(Object.keys(schema), ANY_KEYWORDS).length > 0;
        },
        transform: function (schema) {
            return lodash_1.reduce(schema, function (accumulator, value, key) {
                var _a;
                return ANY_KEYWORDS.includes(key) ? __assign((_a = {}, _a[key] = value, _a), accumulator) : accumulator;
            }, {});
        }
    }
];
