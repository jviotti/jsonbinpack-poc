"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dereferenceSchema = exports.validateSchema = void 0;
var jsonschema_1 = require("./jsonschema");
Object.defineProperty(exports, "validateSchema", { enumerable: true, get: function () { return jsonschema_1.validateSchema; } });
var deref_1 = require("./deref");
Object.defineProperty(exports, "dereferenceSchema", { enumerable: true, get: function () { return deref_1.dereferenceSchema; } });
