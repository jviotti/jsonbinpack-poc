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
var KEYWORDS = [
    '$id', '$vocabulary', '$schema', '$comment', '$defs',
    '$ref', '$dynamicRef', '$anchor', '$dynamicAnchor',
    'prefixItems', 'items', 'contains', 'additionalProperties',
    'properties', 'patternProperties', 'dependentSchemas',
    'propertyNames', 'allOf', 'anyOf', 'oneOf',
    'not', 'if', 'then', 'else',
    'unevaluatedItems', 'unevaluatedProperties',
    'type', 'const', 'enum', 'minimum', 'exclusiveMinimum',
    'maximum', 'exclusiveMaximum', 'multipleOf', 'minLength',
    'maxLength', 'pattern', 'minItems', 'maxItems', 'uniqueItems',
    'minContains', 'maxContains', 'minProperties', 'maxProperties',
    'dependentRequired', 'required',
    'format',
    'contentEncoding', 'contentMediaType', 'contentSchema',
    'title', 'description', 'deprecated',
    'readOnly', 'writeOnly', 'default', 'examples'
];
exports.RULES = [
    {
        id: 'unrecognized-keywords',
        condition: function (schema) {
            return lodash_1.difference(Object.keys(schema), KEYWORDS).length > 0;
        },
        transform: function (schema) {
            return lodash_1.reduce(schema, function (accumulator, value, key) {
                var _a;
                return KEYWORDS.includes(key) ? __assign((_a = {}, _a[key] = value, _a), accumulator) : accumulator;
            }, {});
        }
    }
];
