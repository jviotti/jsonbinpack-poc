"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEncoding = void 0;
var mapper_1 = require("../types/boolean/mapper");
var mapper_2 = require("../types/null/mapper");
var mapper_3 = require("../types/number/mapper");
var mapper_4 = require("../types/integer/mapper");
var mapper_5 = require("../types/string/mapper");
var any_1 = require("./any");
var mapper_6 = require("../types/array/mapper");
var mapper_7 = require("../types/object/mapper");
var mapper_8 = require("../types/enum/mapper");
var mapper_9 = require("../types/oneof/mapper");
var getEncoding = function (schema) {
    if ('enum' in schema) {
        return mapper_8.getEnumEncoding(schema);
    }
    else if ('oneOf' in schema) {
        return mapper_9.getOneOfEncoding(schema);
    }
    else if (!('type' in schema)) {
        return any_1.getAnyEncoding(schema);
    }
    else if (schema.type === 'boolean') {
        return mapper_1.getBooleanEncoding(schema);
    }
    else if (schema.type === 'integer') {
        return mapper_4.getIntegerEncoding(schema);
    }
    else if (schema.type === 'null') {
        return mapper_2.getNullEncoding(schema);
    }
    else if (schema.type === 'number') {
        return mapper_3.getNumberEncoding(schema);
    }
    else if (schema.type === 'string') {
        return mapper_5.getStringEncoding(schema);
    }
    else if (schema.type === 'array') {
        return mapper_6.getArrayEncoding(schema);
    }
    else {
        return mapper_7.getObjectEncoding(schema);
    }
};
exports.getEncoding = getEncoding;
