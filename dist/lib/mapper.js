"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEncoding = void 0;
var mapper_1 = require("./types/boolean/mapper");
var mapper_2 = require("./types/null/mapper");
var mapper_3 = require("./types/number/mapper");
var mapper_4 = require("./types/integer/mapper");
var mapper_5 = require("./types/string/mapper");
var mapper_6 = require("./types/any/mapper");
var getEncoding = function (schema) {
    if (!('type' in schema)) {
        return mapper_6.getAnyEncoding(schema);
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
        throw new Error('TODO: Unimplemented');
    }
    else {
        throw new Error('TODO: Unimplemented');
    }
};
exports.getEncoding = getEncoding;
