"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULES = void 0;
var assert_1 = require("assert");
var lodash_1 = require("lodash");
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
            return schema.type === 'string' &&
                'maxLength' in schema && schema.maxLength === 0;
        },
        transform: function (schema) {
            Reflect.deleteProperty(schema, 'maxLength');
            return Object.assign(schema, {
                const: ''
            });
        }
    },
    {
        id: 'empty-array',
        condition: function (schema) {
            return schema.type === 'array' &&
                'maxItems' in schema && schema.maxItems === 0;
        },
        transform: function (schema) {
            Reflect.deleteProperty(schema, 'maxItems');
            return Object.assign(schema, {
                const: []
            });
        }
    },
    {
        id: 'empty-object',
        condition: function (schema) {
            return schema.type === 'object' &&
                'maxProperties' in schema && schema.maxProperties === 0;
        },
        transform: function (schema) {
            Reflect.deleteProperty(schema, 'maxProperties');
            return Object.assign(schema, {
                const: {}
            });
        }
    },
    {
        id: 'dependent-required-tautology',
        condition: function (schema) {
            return typeof schema.dependentRequired === 'object' &&
                !Array.isArray(schema.dependentRequired) &&
                schema.dependentRequired !== null && Array.isArray(schema.required) &&
                lodash_1.intersection(Object.keys(schema.dependentRequired), schema.required).length > 0;
        },
        transform: function (schema) {
            var e_1, _a, e_2, _b;
            assert_1.strict(Array.isArray(schema.required));
            assert_1.strict(typeof schema.dependentRequired === 'object' &&
                !Array.isArray(schema.dependentRequired) &&
                schema.dependentRequired !== null);
            try {
                for (var _c = __values(lodash_1.intersection(Object.keys(schema.dependentRequired), schema.required)), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var name_1 = _d.value;
                    try {
                        for (var _e = (e_2 = void 0, __values(schema.dependentRequired[name_1])), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var key = _f.value;
                            if (!schema.required.includes(key)) {
                                schema.required.push(key);
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    Reflect.deleteProperty(schema.dependentRequired, name_1);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return schema;
        }
    }
];
