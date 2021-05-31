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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var e_1, _a;
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var fs_1 = require("fs");
var path_1 = require("path");
var lib_1 = require("../lib");
var TEST_DIRECTORY = path_1.resolve(__dirname, 'jsonbinpack');
var SRC_TEST_DIRECTORY = path_1.resolve(__dirname, '..', '..', 'test', 'jsonbinpack');
var _loop_1 = function (testCase) {
    tap_1.default.test(testCase, function (test) {
        var testCasePath = path_1.resolve(TEST_DIRECTORY, testCase);
        var schema = JSON.parse(fs_1.readFileSync(path_1.resolve(testCasePath, 'schema.json'), 'utf8'));
        var value = JSON.parse(fs_1.readFileSync(path_1.resolve(testCasePath, 'document.json'), 'utf8'));
        var encoding = lib_1.compileEncodingSchema(schema);
        fs_1.writeFileSync(path_1.resolve(SRC_TEST_DIRECTORY, testCase, 'encoding.json'), JSON.stringify(encoding, null, 2), 'utf8');
        fs_1.writeFileSync(path_1.resolve(TEST_DIRECTORY, testCase, 'encoding.json'), JSON.stringify(encoding, null, 2), 'utf8');
        var buffer = lib_1.encode(encoding, value);
        var result = lib_1.decode(encoding, buffer);
        test.strictSame(value, result);
        test.end();
    });
};
try {
    for (var _b = __values(fs_1.readdirSync(TEST_DIRECTORY)), _c = _b.next(); !_c.done; _c = _b.next()) {
        var testCase = _c.value;
        _loop_1(testCase);
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
    }
    finally { if (e_1) throw e_1.error; }
}
