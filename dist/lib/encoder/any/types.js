"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNull = exports.isFalse = exports.isTrue = exports.getMetadata = exports.getTypeTag = exports.isType = exports.BooleanSubtype = exports.Type = void 0;
var assert_1 = require("assert");
var limits_1 = require("../../utils/limits");
var Type;
(function (Type) {
    Type[Type["SharedString"] = 0] = "SharedString";
    Type[Type["String"] = 1] = "String";
    Type[Type["Object"] = 2] = "Object";
    Type[Type["Array"] = 3] = "Array";
    Type[Type["Number"] = 4] = "Number";
    Type[Type["Boolean"] = 5] = "Boolean";
    Type[Type["PositiveInteger"] = 8] = "PositiveInteger";
    Type[Type["NegativeInteger"] = 9] = "NegativeInteger";
    Type[Type["PositiveIntegerByte"] = 10] = "PositiveIntegerByte";
    Type[Type["NegativeIntegerByte"] = 11] = "NegativeIntegerByte";
})(Type = exports.Type || (exports.Type = {}));
var BooleanSubtype;
(function (BooleanSubtype) {
    BooleanSubtype[BooleanSubtype["False"] = 0] = "False";
    BooleanSubtype[BooleanSubtype["True"] = 1] = "True";
    BooleanSubtype[BooleanSubtype["Null"] = 2] = "Null";
})(BooleanSubtype = exports.BooleanSubtype || (exports.BooleanSubtype = {}));
var isType = function (type, value) {
    assert_1.strict(type >= limits_1.UINT4_MIN && type <= limits_1.UINT4_MAX);
    assert_1.strict(value >= limits_1.UINT8_MIN && value <= limits_1.UINT8_MAX);
    return (value & 15) === type;
};
exports.isType = isType;
var getTypeTag = function (type, metadata) {
    assert_1.strict(type >= limits_1.UINT4_MIN && type <= limits_1.UINT4_MAX);
    assert_1.strict(metadata >= limits_1.UINT4_MIN && metadata <= limits_1.UINT4_MAX);
    return (metadata << 4) | type;
};
exports.getTypeTag = getTypeTag;
var getMetadata = function (value) {
    assert_1.strict(value >= limits_1.UINT8_MIN && value <= limits_1.UINT8_MAX);
    return value >>> 4;
};
exports.getMetadata = getMetadata;
var isTrue = function (value) {
    return exports.isType(Type.Boolean, value) &&
        exports.getMetadata(value) === BooleanSubtype.True;
};
exports.isTrue = isTrue;
var isFalse = function (value) {
    return exports.isType(Type.Boolean, value) &&
        exports.getMetadata(value) === BooleanSubtype.False;
};
exports.isFalse = isFalse;
var isNull = function (value) {
    return exports.isType(Type.Boolean, value) &&
        exports.getMetadata(value) === BooleanSubtype.Null;
};
exports.isNull = isNull;
