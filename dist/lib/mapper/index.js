"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStates = exports.getEncoding = void 0;
var boolean_1 = require("./boolean");
var null_1 = require("./null");
var number_1 = require("./number");
var integer_1 = require("./integer");
var string_1 = require("./string");
var any_1 = require("./any");
var array_1 = require("./array");
var object_1 = require("./object");
var enum_1 = require("./enum");
var oneof_1 = require("./oneof");
var const_1 = require("./const");
var getEncoding = function (schema) {
    if ('enum' in schema) {
        return enum_1.getEnumEncoding(schema);
    }
    else if ('const' in schema) {
        return const_1.getConstEncoding(schema);
    }
    else if ('oneOf' in schema) {
        return oneof_1.getOneOfEncoding(schema);
    }
    else if (!('type' in schema)) {
        return any_1.getAnyEncoding(schema);
    }
    else if (schema.type === 'boolean') {
        return boolean_1.getBooleanEncoding(schema);
    }
    else if (schema.type === 'integer') {
        return integer_1.getIntegerEncoding(schema);
    }
    else if (schema.type === 'null') {
        return null_1.getNullEncoding(schema);
    }
    else if (schema.type === 'number') {
        return number_1.getNumberEncoding(schema);
    }
    else if (schema.type === 'string') {
        return string_1.getStringEncoding(schema);
    }
    else if (schema.type === 'array') {
        return array_1.getArrayEncoding(schema);
    }
    return object_1.getObjectEncoding(schema);
};
exports.getEncoding = getEncoding;
var getStates = function (schema) {
    if ('enum' in schema) {
        return enum_1.getEnumStates(schema);
    }
    else if ('const' in schema) {
        return const_1.getConstStates(schema);
    }
    else if ('oneOf' in schema) {
        return oneof_1.getOneOfStates(schema);
    }
    else if (!('type' in schema)) {
        return any_1.getAnyStates(schema);
    }
    else if (schema.type === 'boolean') {
        return boolean_1.getBooleanStates(schema);
    }
    else if (schema.type === 'integer') {
        return integer_1.getIntegerStates(schema);
    }
    else if (schema.type === 'null') {
        return null_1.getNullStates(schema);
    }
    else if (schema.type === 'number') {
        return number_1.getNumberStates(schema);
    }
    else if (schema.type === 'string') {
        return string_1.getStringStates(schema);
    }
    else if (schema.type === 'array') {
        return array_1.getArrayStates(schema);
    }
    return object_1.getObjectStates(schema);
};
exports.getStates = getStates;
