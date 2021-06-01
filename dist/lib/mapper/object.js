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
var string_1 = require("./string");
var index_1 = require("./index");
var encoder_1 = require("../encoder");
var parseAdditionalProperties = function (value) {
    if (typeof value === 'boolean' && !value) {
        return null;
    }
    var schema = (typeof value === 'undefined' || (typeof value === 'boolean' && value))
        ? {} : value;
    return index_1.getEncoding(schema);
};
var getObjectEncoding = function (schema) {
    var e_1, _a, e_2, _b;
    var _c, _d, _e, _f, _g;
    var additionalProperties = parseAdditionalProperties(schema.additionalProperties);
    var properties = (_c = schema.properties) !== null && _c !== void 0 ? _c : {};
    var propertyEncodings = Object.keys(properties)
        .reduce(function (accumulator, key) {
        accumulator[key] = index_1.getEncoding(properties[key]);
        return accumulator;
    }, {});
    var unsortedRequiredBooleanProperties = [];
    var nonBooleanRequiredProperties = [];
    try {
        for (var _h = __values((_d = schema.required) !== null && _d !== void 0 ? _d : []), _j = _h.next(); !_j.done; _j = _h.next()) {
            var key = _j.value;
            var encoding = (_f = (_e = propertyEncodings[key]) !== null && _e !== void 0 ? _e : additionalProperties) !== null && _f !== void 0 ? _f : null;
            if (encoding !== null && encoding.type === encoder_1.EncodingType.Boolean) {
                unsortedRequiredBooleanProperties.push(key);
            }
            else {
                nonBooleanRequiredProperties.push(key);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_j && !_j.done && (_a = _h.return)) _a.call(_h);
        }
        finally { if (e_1) throw e_1.error; }
    }
    var booleanRequiredProperties = unsortedRequiredBooleanProperties.sort(function (left, right) {
        return left.localeCompare(right);
    });
    var requiredProperties = nonBooleanRequiredProperties.sort(function (left, right) {
        return left.localeCompare(right);
    });
    var optionalProperties = Object.keys(properties)
        .filter(function (key) {
        return !requiredProperties.includes(key) && !booleanRequiredProperties.includes(key);
    }).sort(function (left, right) {
        return left.localeCompare(right);
    });
    var allProperties = booleanRequiredProperties.concat(requiredProperties).concat(optionalProperties);
    try {
        for (var allProperties_1 = __values(allProperties), allProperties_1_1 = allProperties_1.next(); !allProperties_1_1.done; allProperties_1_1 = allProperties_1.next()) {
            var key = allProperties_1_1.value;
            if (!(key in propertyEncodings)) {
                propertyEncodings[key] = additionalProperties !== null && additionalProperties !== void 0 ? additionalProperties : index_1.getEncoding({});
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (allProperties_1_1 && !allProperties_1_1.done && (_b = allProperties_1.return)) _b.call(allProperties_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    var keyEncoding = string_1.getStringEncoding((_g = schema.propertyNames) !== null && _g !== void 0 ? _g : {
        type: 'string'
    });
    if (additionalProperties === null) {
        if (optionalProperties.length === 0) {
            return {
                type: encoder_1.EncodingType.Object,
                encoding: 'REQUIRED_ONLY_BOUNDED_TYPED_OBJECT',
                options: {
                    propertyEncodings: propertyEncodings,
                    requiredProperties: requiredProperties,
                    booleanRequiredProperties: booleanRequiredProperties
                }
            };
        }
        else if (requiredProperties.length === 0) {
            return {
                type: encoder_1.EncodingType.Object,
                encoding: 'NON_REQUIRED_BOUNDED_TYPED_OBJECT',
                options: {
                    propertyEncodings: propertyEncodings,
                    optionalProperties: optionalProperties
                }
            };
        }
        return {
            type: encoder_1.EncodingType.Object,
            encoding: 'MIXED_BOUNDED_TYPED_OBJECT',
            options: {
                propertyEncodings: propertyEncodings,
                optionalProperties: optionalProperties,
                requiredProperties: requiredProperties,
                booleanRequiredProperties: booleanRequiredProperties
            }
        };
    }
    if (requiredProperties.length > 0 && optionalProperties.length > 0) {
        return {
            type: encoder_1.EncodingType.Object,
            encoding: 'MIXED_UNBOUNDED_TYPED_OBJECT',
            options: {
                propertyEncodings: propertyEncodings,
                optionalProperties: optionalProperties,
                requiredProperties: requiredProperties,
                booleanRequiredProperties: booleanRequiredProperties,
                keyEncoding: keyEncoding,
                encoding: additionalProperties
            }
        };
    }
    else if (requiredProperties.length > 0 && optionalProperties.length === 0) {
        return {
            type: encoder_1.EncodingType.Object,
            encoding: 'REQUIRED_UNBOUNDED_TYPED_OBJECT',
            options: {
                encoding: additionalProperties,
                propertyEncodings: propertyEncodings,
                keyEncoding: keyEncoding,
                requiredProperties: requiredProperties,
                booleanRequiredProperties: booleanRequiredProperties
            }
        };
    }
    else if (requiredProperties.length === 0 && optionalProperties.length > 0) {
        return {
            type: encoder_1.EncodingType.Object,
            encoding: 'OPTIONAL_UNBOUNDED_TYPED_OBJECT',
            options: {
                encoding: additionalProperties,
                propertyEncodings: propertyEncodings,
                keyEncoding: keyEncoding,
                optionalProperties: optionalProperties
            }
        };
    }
    return {
        type: encoder_1.EncodingType.Object,
        encoding: 'ARBITRARY_TYPED_KEYS_OBJECT',
        options: {
            encoding: additionalProperties,
            keyEncoding: keyEncoding
        }
    };
};
exports.getObjectEncoding = getObjectEncoding;
