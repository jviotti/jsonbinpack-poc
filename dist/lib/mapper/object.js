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
exports.getObjectEncoding = exports.getObjectStates = void 0;
var util_1 = require("util");
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
var getObjectStates = function (schema) {
    var encoding = exports.getObjectEncoding(schema);
    if (encoding.encoding === 'REQUIRED_ONLY_BOUNDED_TYPED_OBJECT' ||
        encoding.encoding === 'NON_REQUIRED_BOUNDED_TYPED_OBJECT' ||
        encoding.encoding === 'MIXED_BOUNDED_TYPED_OBJECT') {
        return Object.keys(encoding.options.propertyEncodings).reduce(function (accumulator, property) {
            var propertyEncoding = encoding.options.propertyEncodings[property];
            var propertyStates = index_1.getStates(propertyEncoding);
            if ('optionalProperties' in encoding.options &&
                Array.isArray(encoding.options.optionalProperties) &&
                encoding.options.optionalProperties.includes(property)) {
                return accumulator * (propertyStates + 1);
            }
            return accumulator * propertyStates;
        }, 1);
    }
    return Infinity;
};
exports.getObjectStates = getObjectStates;
var getObjectEncoding = function (schema) {
    var e_1, _a, e_2, _b, e_3, _c;
    var _d, _e, _f, _g, _h, _j, _k;
    var additionalProperties = parseAdditionalProperties(schema.additionalProperties);
    var properties = (_d = schema.properties) !== null && _d !== void 0 ? _d : {};
    var propertyEncodings = Object.keys(properties)
        .reduce(function (accumulator, key) {
        accumulator[key] = index_1.getEncoding(properties[key]);
        return accumulator;
    }, {});
    var unsortedRequiredBooleanProperties = [];
    var nonBooleanRequiredProperties = [];
    try {
        for (var _l = __values((_e = schema.required) !== null && _e !== void 0 ? _e : []), _m = _l.next(); !_m.done; _m = _l.next()) {
            var key = _m.value;
            var encoding = (_g = (_f = propertyEncodings[key]) !== null && _f !== void 0 ? _f : additionalProperties) !== null && _g !== void 0 ? _g : null;
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
            if (_m && !_m.done && (_a = _l.return)) _a.call(_l);
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
    var allRequiredProperties = booleanRequiredProperties.concat(requiredProperties);
    var allProperties = allRequiredProperties.concat(optionalProperties);
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
    var keyEncoding = string_1.getStringEncoding((_h = schema.propertyNames) !== null && _h !== void 0 ? _h : {
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
        else if (allRequiredProperties.length === 0) {
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
    if (additionalProperties !== null &&
        requiredProperties.length > 0 &&
        additionalProperties.type === encoder_1.EncodingType.Integer &&
        additionalProperties.encoding === 'BOUNDED_8BITS__ENUM_FIXED') {
        var propertiesDefinition = (_j = schema.properties) !== null && _j !== void 0 ? _j : {};
        var packedRequiredProperties_1 = [];
        var unpackedRequiredProperties = [];
        try {
            for (var _o = __values((_k = schema.required) !== null && _k !== void 0 ? _k : []), _p = _o.next(); !_p.done; _p = _o.next()) {
                var key = _p.value;
                if (booleanRequiredProperties.includes(key)) {
                    continue;
                }
                if (!(key in propertiesDefinition)) {
                    packedRequiredProperties_1.push(key);
                }
                else if (util_1.isDeepStrictEqual(additionalProperties, index_1.getEncoding(propertiesDefinition[key]))) {
                    packedRequiredProperties_1.push(key);
                }
                else {
                    unpackedRequiredProperties.push(key);
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_p && !_p.done && (_c = _o.return)) _c.call(_o);
            }
            finally { if (e_3) throw e_3.error; }
        }
        var packedPropertyEncodings = Object.keys(propertyEncodings).reduce(function (accumulator, key) {
            if (!packedRequiredProperties_1.includes(key)) {
                accumulator[key] = propertyEncodings[key];
            }
            return accumulator;
        }, {});
        return {
            type: encoder_1.EncodingType.Object,
            encoding: 'PACKED_UNBOUNDED_OBJECT',
            options: {
                packedEncoding: additionalProperties,
                packedRequiredProperties: packedRequiredProperties_1.sort(function (left, right) {
                    return left.localeCompare(right);
                }),
                propertyEncodings: packedPropertyEncodings,
                optionalProperties: optionalProperties,
                requiredProperties: unpackedRequiredProperties.sort(function (left, right) {
                    return left.localeCompare(right);
                }),
                booleanRequiredProperties: booleanRequiredProperties,
                keyEncoding: keyEncoding
            }
        };
    }
    if (allRequiredProperties.length > 0 && optionalProperties.length > 0) {
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
    else if (allRequiredProperties.length > 0 && optionalProperties.length === 0) {
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
    else if (allRequiredProperties.length === 0 && optionalProperties.length > 0) {
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
