"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileSchema = void 0;
var _2020_1 = __importDefault(require("ajv/dist/2020"));
var ajv = new _2020_1.default({
    strict: true,
    strictTypes: true,
    strictTuples: true,
    validateFormats: true
});
var compileSchema = function (schema) {
    return ajv.compile(schema);
};
exports.compileSchema = compileSchema;
