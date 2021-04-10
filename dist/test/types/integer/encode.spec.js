"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tap_1 = __importDefault(require("tap"));
var encode_1 = require("../../../lib/types/integer/encode");
tap_1.default.test('XXXXXX', function (test) {
    test.strictSame(encode_1.BOUNDED(5, 0, 10), Buffer.from([5]));
    test.end();
});
