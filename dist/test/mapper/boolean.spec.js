"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var boolean_1 = require("../../lib/mapper/boolean");
tap_1.default.test('should encode a boolean value', function (test) {
    var schema = {
        type: 'boolean'
    };
    var result = boolean_1.getBooleanEncoding(schema);
    test.strictSame(result, {
        type: 'boolean',
        encoding: 'BOOLEAN_8BITS__ENUM_FIXED',
        options: {}
    });
    test.end();
});
