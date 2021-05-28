"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneOfEncoding = void 0;
var base_1 = require("../base");
var mapper_1 = require("../../mapper");
var getOneOfEncoding = function (schema) {
    return {
        type: base_1.EncodingType.OneOf,
        encoding: 'ONEOF_CHOICE_INDEX_PREFIX',
        options: {
            schemas: schema.oneOf.map(function (item) {
                return {
                    schema: item,
                    encoding: mapper_1.getEncoding(item)
                };
            })
        }
    };
};
exports.getOneOfEncoding = getOneOfEncoding;
