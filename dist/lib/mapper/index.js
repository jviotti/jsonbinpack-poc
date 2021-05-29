"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEncoding = void 0;
var boolean_1 = require("./boolean");
var mapper_1 = require("../types/null/mapper");
var mapper_2 = require("../types/number/mapper");
var mapper_3 = require("../types/integer/mapper");
var mapper_4 = require("../types/string/mapper");
var any_1 = require("./any");
var array_1 = require("./array");
var mapper_5 = require("../types/object/mapper");
var mapper_6 = require("../types/enum/mapper");
var mapper_7 = require("../types/oneof/mapper");
var getEncoding = function (schema) {
    if ('enum' in schema) {
        return mapper_6.getEnumEncoding(schema);
    }
    else if ('oneOf' in schema) {
        return mapper_7.getOneOfEncoding(schema);
    }
    else if (!('type' in schema)) {
        return any_1.getAnyEncoding(schema);
    }
    else if (schema.type === 'boolean') {
        return boolean_1.getBooleanEncoding(schema);
    }
    else if (schema.type === 'integer') {
        return mapper_3.getIntegerEncoding(schema);
    }
    else if (schema.type === 'null') {
        return mapper_1.getNullEncoding(schema);
    }
    else if (schema.type === 'number') {
        return mapper_2.getNumberEncoding(schema);
    }
    else if (schema.type === 'string') {
        return mapper_4.getStringEncoding(schema);
    }
    else if (schema.type === 'array') {
        return array_1.getArrayEncoding(schema);
    }
    else {
        return mapper_5.getObjectEncoding(schema);
    }
};
exports.getEncoding = getEncoding;
