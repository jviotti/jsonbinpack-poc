"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var canonical_1 = require("../../lib/preprocessor/canonical");
tap_1.default.test('should canonicalize an allOf with multiple integer schemas', function (test) {
    var result = canonical_1.canonicalizeSchema({
        allOf: [
            {
                type: 'integer'
            },
            {
                maximum: 4
            }
        ]
    });
    test.strictSame(result, {
        type: 'integer',
        maximum: 4
    });
    test.end();
});
