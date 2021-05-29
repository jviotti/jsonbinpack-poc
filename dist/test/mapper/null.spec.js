"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var null_1 = require("../../lib/mapper/null");
tap_1.default.test('should encode a null value', function (test) {
    var schema = {
        type: 'null'
    };
    var result = null_1.getNullEncoding(schema);
    test.strictSame(result, {
        type: 'null',
        encoding: 'NULL_8BITS__ENUM_FIXED',
        options: {}
    });
    test.end();
});
