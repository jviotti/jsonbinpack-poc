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
var e_1, _a, e_2, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.simplifySchema = void 0;
var assert_1 = require("assert");
var lodash_1 = require("lodash");
var syntax_sugar_1 = require("./syntax-sugar");
var SIMPLIFICATION_RULES = syntax_sugar_1.RULES;
try {
    for (var _c = __values(SIMPLIFICATION_RULES.entries()), _d = _c.next(); !_d.done; _d = _c.next()) {
        var _e = __read(_d.value, 2), index = _e[0], rule = _e[1];
        try {
            for (var _f = (e_2 = void 0, __values(SIMPLIFICATION_RULES.entries())), _g = _f.next(); !_g.done; _g = _f.next()) {
                var _h = __read(_g.value, 2), subindex = _h[0], subrule = _h[1];
                assert_1.strict.ok(index === subindex || rule.id !== subrule.id, "Duplicated rule id: " + rule.id);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
            }
            finally { if (e_2) throw e_2.error; }
        }
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
    }
    finally { if (e_1) throw e_1.error; }
}
var applyRules = function (schema, hits) {
    var e_3, _a, e_4, _b, e_5, _c, e_6, _d, e_7, _e;
    try {
        for (var SIMPLIFICATION_RULES_1 = __values(SIMPLIFICATION_RULES), SIMPLIFICATION_RULES_1_1 = SIMPLIFICATION_RULES_1.next(); !SIMPLIFICATION_RULES_1_1.done; SIMPLIFICATION_RULES_1_1 = SIMPLIFICATION_RULES_1.next()) {
            var _f = SIMPLIFICATION_RULES_1_1.value, id = _f.id, condition = _f.condition, transform = _f.transform;
            if (condition(lodash_1.cloneDeep(schema))) {
                assert_1.strict.ok(!hits.has(id), "Circular rule: " + id);
                hits.add(id);
                return applyRules(transform(lodash_1.cloneDeep(schema)), hits);
            }
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (SIMPLIFICATION_RULES_1_1 && !SIMPLIFICATION_RULES_1_1.done && (_a = SIMPLIFICATION_RULES_1.return)) _a.call(SIMPLIFICATION_RULES_1);
        }
        finally { if (e_3) throw e_3.error; }
    }
    try {
        for (var _g = __values([
            'items',
            'contains',
            'propertyNames',
            'not',
            'if', 'then', 'else',
            'unevaluatedItems', 'unevaluatedProperties',
            'contentSchema'
        ]), _h = _g.next(); !_h.done; _h = _g.next()) {
            var keyword = _h.value;
            if (typeof schema[keyword] !== 'undefined') {
                Reflect.set(schema, keyword, exports.simplifySchema(schema[keyword]));
            }
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
        }
        finally { if (e_4) throw e_4.error; }
    }
    try {
        for (var _j = __values(['prefixItems', 'allOf', 'anyOf', 'oneOf']), _k = _j.next(); !_k.done; _k = _j.next()) {
            var keyword = _k.value;
            if (typeof schema[keyword] !== 'undefined') {
                Reflect.set(schema, keyword, schema[keyword].map(exports.simplifySchema));
            }
        }
    }
    catch (e_5_1) { e_5 = { error: e_5_1 }; }
    finally {
        try {
            if (_k && !_k.done && (_c = _j.return)) _c.call(_j);
        }
        finally { if (e_5) throw e_5.error; }
    }
    try {
        for (var _l = __values(['patternProperties', 'dependentSchemas']), _m = _l.next(); !_m.done; _m = _l.next()) {
            var keyword = _m.value;
            if (typeof schema[keyword] !== 'undefined') {
                try {
                    for (var _o = (e_7 = void 0, __values(Object.entries(schema[keyword]))), _p = _o.next(); !_p.done; _p = _o.next()) {
                        var _q = __read(_p.value, 2), key = _q[0], value = _q[1];
                        Reflect.set(schema[keyword], key, exports.simplifySchema(value));
                    }
                }
                catch (e_7_1) { e_7 = { error: e_7_1 }; }
                finally {
                    try {
                        if (_p && !_p.done && (_e = _o.return)) _e.call(_o);
                    }
                    finally { if (e_7) throw e_7.error; }
                }
            }
        }
    }
    catch (e_6_1) { e_6 = { error: e_6_1 }; }
    finally {
        try {
            if (_m && !_m.done && (_d = _l.return)) _d.call(_l);
        }
        finally { if (e_6) throw e_6.error; }
    }
    return schema;
};
var simplifySchema = function (schema) {
    if (typeof schema === 'boolean') {
        return schema ? {} : {
            not: {}
        };
    }
    return applyRules(schema, new Set());
};
exports.simplifySchema = simplifySchema;
