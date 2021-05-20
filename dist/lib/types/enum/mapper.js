"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnumEncoding = void 0;
var base_1 = require("../base");
var limits_1 = require("../../utils/limits");
var getEnumEncoding = function (schema) {
    return {
        type: base_1.EncodingType.Enum,
        encoding: schema.enum.length > limits_1.UINT8_MAX ? 'LARGE_BOUNDED_CHOICE_INDEX' : 'BOUNDED_CHOICE_INDEX',
        options: {
            choices: schema.enum
        }
    };
};
exports.getEnumEncoding = getEnumEncoding;
