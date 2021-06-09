"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneOfEncoding = exports.getOneOfStates = void 0;
var encoder_1 = require("../encoder");
var index_1 = require("./index");
var getOneOfStates = function (schema) {
    return schema.oneOf.reduce(function (accumulator, choice) {
        var states = index_1.getStates(choice);
        return accumulator * (Array.isArray(states) ? states.length : states);
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
