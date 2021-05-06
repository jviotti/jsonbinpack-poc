"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getObjectEncoding = void 0;
var mapper_1 = require("../string/mapper");
var mapper_2 = require("../../mapper");
var base_1 = require("../base");
var parseAdditionalProperties = function (value) {
    if (typeof value === 'boolean' && !value) {
        return null;
    }
    var schema = (typeof value === 'undefined' || (typeof value === 'boolean' && value))
        ? {} : value;
    return mapper_2.getEncoding(schema);
};
var getObjectEncoding = function (schema) {
    var e_1, _a;
    var _b, _c, _d;
    var additionalProperties = parseAdditionalProperties(schema.additionalProperties);
    var requiredProperties = ((_b = schema.required) !== null && _b !== void 0 ? _b : []).sort(function (left, right) {
        return left.localeCompare(right);
    });
    var properties = (_c = schema.properties) !== null && _c !== void 0 ? _c : {};
    var optionalProperties = Object.keys(properties)
        .filter(function (key) {
        return requiredProperties.indexOf(key) === -1;
    }).sort(function (left, right) {
        return left.localeCompare(right);
    });
    var propertyEncodings = Object.keys(properties)
        .reduce(function (accumulator, key) {
        accumulator[key] = mapper_2.getEncoding(properties[key]);
        return accumulator;
    }, {});
    try {
        for (var _e = __values(requiredProperties.concat(optionalProperties)), _f = _e.next(); !_f.done; _f = _e.next()) {
            var key = _f.value;
            if (!(key in propertyEncodings)) {
                propertyEncodings[key] = additionalProperties !== null && additionalProperties !== void 0 ? additionalProperties : mapper_2.getEncoding({});
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
        }
        finally { if (e_1) throw e_1.error; }
    }
    var keyEncoding = mapper_1.getStringEncoding((_d = schema.propertyNames) !== null && _d !== void 0 ? _d : {
        type: 'string'
    });
    if (additionalProperties === null) {
        if (optionalProperties.length === 0) {
            return {
                type: base_1.EncodingType.Object,
                encoding: 'REQUIRED_ONLY_BOUNDED_TYPED_OBJECT',
                options: {
                    propertyEncodings: propertyEncodings,
                    requiredProperties: requiredProperties
                }
            };
        }
        else if (requiredProperties.length === 0) {
            return {
                type: base_1.EncodingType.Object,
                encoding: 'NON_REQUIRED_BOUNDED_TYPED_OBJECT',
                options: {
                    propertyEncodings: propertyEncodings,
                    optionalProperties: optionalProperties
                }
            };
        }
        else {
            return {
                type: base_1.EncodingType.Object,
                encoding: 'MIXED_BOUNDED_TYPED_OBJECT',
                options: {
                    propertyEncodings: propertyEncodings,
                    encoding: mapper_2.getEncoding({}),
                    optionalProperties: optionalProperties,
                    requiredProperties: requiredProperties
                }
            };
        }
    }
    return {
        type: base_1.EncodingType.Object,
        encoding: 'ARBITRARY_TYPED_KEYS_OBJECT',
        options: {
            encoding: mapper_2.getEncoding({}),
            keyEncoding: keyEncoding
        }
    };
};
exports.getObjectEncoding = getObjectEncoding;
