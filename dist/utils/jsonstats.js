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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.qualify = exports.summarize = exports.JSONStatsSizeQualifier = exports.analyze = void 0;
var fs = require("fs");
var _ = require("lodash");
var json_1 = require("../lib/json");
var DEFAULT_ACCUMULATOR = {
    byteSize: 0,
    maxNestingDepth: 0,
    largestLevel: 0,
    duplicatedKeys: 0,
    duplicatedValues: 0,
    keys: {
        count: 0,
        byteSize: 0
    },
    values: {
        numeric: {
            count: 0,
            byteSize: 0
        },
        textual: {
            count: 0,
            byteSize: 0
        },
        boolean: {
            count: 0,
            byteSize: 0
        },
        structural: {
            count: 0,
            byteSize: 0
        }
    }
};
var clone = function (value) {
    return JSON.parse(JSON.stringify(value));
};
var analyze = function (document, level, accumulator, keys, values, levels) {
    var e_1, _a, e_2, _b;
    if (level === void 0) { level = 0; }
    if (accumulator === void 0) { accumulator = clone(DEFAULT_ACCUMULATOR); }
    if (keys === void 0) { keys = new Set(); }
    if (values === void 0) { values = []; }
    if (levels === void 0) { levels = []; }
    values.push(clone(document));
    accumulator.byteSize =
        accumulator.byteSize || json_1.getJSONSize(document);
    levels[level] = levels[level] || 0;
    accumulator.maxNestingDepth =
        Math.max(accumulator.maxNestingDepth, level);
    var category = json_1.getJSONTypeCategory(json_1.getJSONType(document));
    accumulator.values[category].count += 1;
    if (typeof document === 'object' &&
        !Array.isArray(document) && document !== null) {
        var numberOfKeys = Object.keys(document).length;
        accumulator.values.structural.byteSize +=
            2 + (numberOfKeys * 2) - Math.min(numberOfKeys, 1);
        try {
            for (var _c = __values(Object.entries(document)), _d = _c.next(); !_d.done; _d = _c.next()) {
                var _e = __read(_d.value, 2), key = _e[0], value = _e[1];
                if (value === undefined) {
                    continue;
                }
                keys.add(key);
                accumulator.keys.count += 1;
                accumulator.keys.byteSize += json_1.getJSONSize(key);
                exports.analyze(value, level + 1, accumulator, keys, values, levels);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    else if (Array.isArray(document)) {
        accumulator.values.structural.byteSize +=
            2 + document.length - Math.min(document.length, 1);
        try {
            for (var document_1 = __values(document), document_1_1 = document_1.next(); !document_1_1.done; document_1_1 = document_1.next()) {
                var element = document_1_1.value;
                exports.analyze(element, level + 1, accumulator, keys, values, levels);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (document_1_1 && !document_1_1.done && (_b = document_1.return)) _b.call(document_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
    }
    else {
        var documentSize = json_1.getJSONSize(document);
        accumulator.values[category].byteSize += documentSize;
        levels[level] += documentSize;
    }
    accumulator.largestLevel = levels.lastIndexOf(Math.max.apply(Math, __spread(levels)));
    accumulator.duplicatedKeys = accumulator.keys.count - keys.size;
    if (level === 0) {
        accumulator.duplicatedValues =
            accumulator.values.numeric.count +
                accumulator.values.textual.count +
                accumulator.values.boolean.count +
                accumulator.values.structural.count -
                _.uniqWith(values, _.isEqual).length;
    }
    else {
        accumulator.duplicatedValues = 0;
    }
    return accumulator;
};
exports.analyze = analyze;
var percentage = function (total, local) {
    return total === 0 ? 0 : local * 100 / total;
};
var JSONStatsSizeQualifier;
(function (JSONStatsSizeQualifier) {
    JSONStatsSizeQualifier["tiny"] = "tiny";
    JSONStatsSizeQualifier["small"] = "small";
    JSONStatsSizeQualifier["large"] = "large";
})(JSONStatsSizeQualifier = exports.JSONStatsSizeQualifier || (exports.JSONStatsSizeQualifier = {}));
var getSizeQualifier = function (byteSize) {
    if (byteSize < 100) {
        return JSONStatsSizeQualifier.tiny;
    }
    else if (byteSize < 1000) {
        return JSONStatsSizeQualifier.small;
    }
    return JSONStatsSizeQualifier.large;
};
var summarize = function (stats) {
    var valuesCount = stats.values.numeric.count +
        stats.values.textual.count +
        stats.values.boolean.count +
        stats.values.structural.count;
    var structuralRawWeight = percentage(valuesCount, stats.values.structural.count) *
        percentage(stats.byteSize, stats.values.structural.byteSize);
    var keysRawWeight = percentage(valuesCount, stats.keys.count) *
        percentage(stats.byteSize, stats.keys.byteSize);
    return {
        size: getSizeQualifier(stats.byteSize),
        keysRedundancy: percentage(stats.keys.count, stats.duplicatedKeys),
        valuesRedundancy: percentage(valuesCount, stats.duplicatedValues),
        nestingWeight: stats.maxNestingDepth * stats.largestLevel,
        numericWeight: percentage(10000, percentage(valuesCount, stats.values.numeric.count) *
            percentage(stats.byteSize, stats.values.numeric.byteSize)),
        textualWeight: percentage(10000, percentage(valuesCount, stats.values.textual.count) *
            percentage(stats.byteSize, stats.values.textual.byteSize)),
        booleanWeight: percentage(10000, percentage(valuesCount, stats.values.boolean.count) *
            percentage(stats.byteSize, stats.values.boolean.byteSize)),
        structuralWeight: percentage(20000, structuralRawWeight + keysRawWeight)
    };
};
exports.summarize = summarize;
var qualify = function (summary) {
    var qualifiers = [summary.size];
    if (summary.numericWeight > summary.textualWeight &&
        summary.numericWeight > summary.booleanWeight) {
        qualifiers.push('numeric-heavy');
    }
    else if (summary.textualWeight > summary.numericWeight &&
        summary.textualWeight > summary.booleanWeight) {
        qualifiers.push('textual-heavy');
    }
    else {
        qualifiers.push('boolean-heavy');
    }
    if (summary.valuesRedundancy >= 25) {
        qualifiers.push('highly-redundant');
    }
    else {
        qualifiers.push('little-redundant');
    }
    if (summary.nestingWeight < 10) {
        qualifiers.push('little-nested');
    }
    else {
        qualifiers.push('highly-nested');
    }
    return qualifiers;
};
exports.qualify = qualify;
if (((_a = process.mainModule) === null || _a === void 0 ? void 0 : _a.filename) === __filename) {
    var COMMAND = process.argv[2];
    var FILE = process.argv[3];
    var help = function () {
        var commands = '<analyze|summarize|qualify>';
        console.error("Usage: " + process.argv[0] + " " + process.argv[1] + " " + commands + " <file>");
    };
    if (typeof COMMAND === 'undefined' || typeof FILE === 'undefined') {
        help();
        process.exit(1);
    }
    var normalize = function (value) {
        if (value.charCodeAt(0) === 0xFEFF) {
            return value.slice(1);
        }
        return value;
    };
    var json = JSON.parse(normalize(fs.readFileSync(FILE, 'utf8')));
    var stats = exports.analyze(json);
    if (COMMAND === 'analyze') {
        console.log(JSON.stringify(stats, null, 2));
    }
    else if (COMMAND === 'summarize') {
        console.log(JSON.stringify(exports.summarize(stats), null, 2));
    }
    else if (COMMAND === 'qualify') {
        console.log(JSON.stringify(exports.qualify(exports.summarize(stats)), null, 2));
    }
    else {
        help();
        process.exit(1);
    }
}
