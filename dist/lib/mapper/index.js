"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEncoding = void 0;
var boolean_1 = require("./boolean");
var null_1 = require("./null");
var number_1 = require("./number");
var integer_1 = require("./integer");
var mapper_1 = require("../types/string/mapper");
var any_1 = require("./any");
var array_1 = require("./array");
var mapper_2 = require("../types/object/mapper");
var enum_1 = require("./enum");
var mapper_3 = require("../types/oneof/mapper");
var getEncoding = function (schema) {
    if ('enum' in schema) {
        return enum_1.getEnumEncoding(schema);
    }
    else if ('oneOf' in schema) {
        return mapper_3.getOneOfEncoding(schema);
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
        return mapper_1.getStringEncoding(schema);
    }
    else if (schema.type === 'array') {
        return array_1.getArrayEncoding(schema);
    }
    else {
        return mapper_2.getObjectEncoding(schema);
    }
};
exports.getEncoding = getEncoding;
