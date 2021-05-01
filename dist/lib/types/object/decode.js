"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ARBITRARY_TYPED_KEYS_OBJECT = void 0;
var assert_1 = require("assert");
var decode_1 = require("../integer/decode");
var decode_2 = require("../any/decode");
var encoder_1 = require("../../encoder");
var ARBITRARY_TYPED_KEYS_OBJECT = function (buffer, offset, options) {
    var result = decode_1.FLOOR__ENUM_VARINT(buffer, offset, {
        minimum: 0
    });
    assert_1.strict(result.value >= 0);
    var count = 0;
    var cursor = result.bytes;
    var value = {};
    while (count < result.value) {
        var keyResult = encoder_1.decode(buffer, cursor, options.keyEncoding);
        assert_1.strict(typeof keyResult.value === 'string');
        assert_1.strict(keyResult.bytes >= 0);
        cursor += keyResult.bytes;
        var valueResult = decode_2.ANY__TYPE_PREFIX(buffer, cursor, {});
        assert_1.strict(valueResult.bytes >= 0);
        cursor += valueResult.bytes;
        Reflect.set(value, keyResult.value, valueResult.value);
        count += 1;
    }
    return {
        value: value,
        bytes: cursor
    };
};
exports.ARBITRARY_TYPED_KEYS_OBJECT = ARBITRARY_TYPED_KEYS_OBJECT;
