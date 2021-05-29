"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEncoding = void 0;
var boolean_1 = require("./boolean");
var mapper_1 = require("../types/null/mapper");
var mapper_2 = require("../types/number/mapper");
var integer_1 = require("./integer");
var mapper_3 = require("../types/string/mapper");
var any_1 = require("./any");
var array_1 = require("./array");
var mapper_4 = require("../types/object/mapper");
var enum_1 = require("./enum");
var mapper_5 = require("../types/oneof/mapper");
var getEncoding = function (schema) {
    if ('enum' in schema) {
        return enum_1.getEnumEncoding(schema);
    }
    else if ('oneOf' in schema) {
        return mapper_5.getOneOfEncoding(schema);
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
        return mapper_1.getNullEncoding(schema);
    }
    else if (schema.type === 'number') {
        return mapper_2.getNumberEncoding(schema);
    }
    else if (schema.type === 'string') {
        return mapper_3.getStringEncoding(schema);
    }
    else if (schema.type === 'array') {
        return array_1.getArrayEncoding(schema);
    }
    else {
        return mapper_4.getObjectEncoding(schema);
    }
};
exports.getEncoding = getEncoding;
