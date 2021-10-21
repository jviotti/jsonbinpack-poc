"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var simplifier_1 = require("../../lib/simplifier");
tap_1.default.test('should remove unrecognized keywords', function (test) {
    var schema = {
        type: 'number',
        foo: 'bar',
        minimum: 5
    };
    var result = {
        type: 'number',
        minimum: 5
    };
    test.strictSame(simplifier_1.simplifySchema(schema), result);
    test.end();
});
