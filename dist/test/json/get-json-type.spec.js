"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tap = require("tap");
var json_1 = require("../../lib/json");
tap.test('should get the type of a truthy boolean', function (test) {
    test.is(json_1.getJSONType(true), json_1.JSONType.boolean);
    test.end();
});
tap.test('should get the type of a falsy boolean', function (test) {
    test.is(json_1.getJSONType(false), json_1.JSONType.boolean);
    test.end();
});
tap.test('should get the type of null', function (test) {
    test.is(json_1.getJSONType(null), json_1.JSONType.null);
    test.end();
});
tap.test('should get the type of a positive integer', function (test) {
    test.is(json_1.getJSONType(5), json_1.JSONType.number);
    test.end();
});
tap.test('should get the type of a negative integer', function (test) {
    test.is(json_1.getJSONType(-5), json_1.JSONType.number);
    test.end();
});
tap.test('should get the type of a positive float', function (test) {
    test.is(json_1.getJSONType(5.4545), json_1.JSONType.number);
    test.end();
});
tap.test('should get the type of a negative float', function (test) {
    test.is(json_1.getJSONType(-5.4545), json_1.JSONType.number);
    test.end();
});
tap.test('should get the type of an empty string', function (test) {
    test.is(json_1.getJSONType(''), json_1.JSONType.string);
    test.end();
});
tap.test('should get the type of a blank string', function (test) {
    test.is(json_1.getJSONType('    '), json_1.JSONType.string);
    test.end();
});
tap.test('should get the type of a non-empty string', function (test) {
    test.is(json_1.getJSONType('foo'), json_1.JSONType.string);
    test.end();
});
tap.test('should get the type of an empty array', function (test) {
    test.is(json_1.getJSONType([]), json_1.JSONType.array);
    test.end();
});
tap.test('should get the type of a non-empty array', function (test) {
    test.is(json_1.getJSONType([1, 2, 3]), json_1.JSONType.array);
    test.end();
});
tap.test('should get the type of an empty object', function (test) {
    test.is(json_1.getJSONType({}), json_1.JSONType.object);
    test.end();
});
tap.test('should get the type of a non-empty object', function (test) {
    test.is(json_1.getJSONType({
        foo: 1
    }), json_1.JSONType.object);
    test.end();
});
