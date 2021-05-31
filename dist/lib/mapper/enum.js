"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnumEncoding = void 0;
var encoder_1 = require("../encoder");
var limits_1 = require("../utils/limits");
var getEnumEncoding = function (schema) {
    return {
        type: encoder_1.EncodingType.Enum,
        encoding: schema.enum.length > limits_1.UINT8_MAX ? 'LARGE_BOUNDED_CHOICE_INDEX' : 'BOUNDED_CHOICE_INDEX',
        options: {
            choices: schema.enum
        }
    };
};
exports.getEnumEncoding = getEnumEncoding;
