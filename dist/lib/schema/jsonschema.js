"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
var _2020_1 = __importDefault(require("ajv/dist/2020"));
var ajv_formats_1 = __importDefault(require("ajv-formats"));
var ajv = new _2020_1.default({
    strict: true,
    strictTypes: true,
    strictTuples: true,
    strictRequired: false,
    validateFormats: true
});
ajv_formats_1.default(ajv);
var validateSchema = function (schema, value) {
    var validateFunction = ajv.compile(schema);
    return validateFunction(value);
};
exports.validateSchema = validateSchema;
