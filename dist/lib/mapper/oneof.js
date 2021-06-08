"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneOfEncoding = exports.getOneOfStates = void 0;
var index_1 = require("./index");
var encoder_1 = require("../encoder");
var getOneOfStates = function (schema) {
    return schema.oneOf.reduce(function (accumulator, choice) {
        return accumulator * index_1.getStates(choice);
    }, 1);
};
exports.getOneOfStates = getOneOfStates;
var getOneOfEncoding = function (schema) {
    return {
        type: encoder_1.EncodingType.OneOf,
        encoding: 'ONEOF_CHOICE_INDEX_PREFIX',
        options: {
            schemas: schema.oneOf.map(function (item) {
                return {
                    schema: item,
                    encoding: index_1.getEncoding(item)
                };
            })
        }
    };
};
exports.getOneOfEncoding = getOneOfEncoding;
