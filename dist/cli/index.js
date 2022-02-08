#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var packageJSON = __importStar(require("../package.json"));
var lib_1 = require("../lib");
var COMMAND = process.argv[2];
if (COMMAND !== 'compile' && COMMAND !== 'serialize' && COMMAND !== 'deserialize' && COMMAND !== 'version') {
    console.error("Usage: " + packageJSON.name + " <compile | serialize | deserialize> <arguments...>");
    console.error('\nCommands:\n');
    console.error('    compile <schema.json>');
    console.error('    serialize <encoding.json> <document.json>');
    console.error('    deserialize <encoding.json> <binary.bin>');
    console.error('    version');
    console.error('\nExamples:\n');
    console.error("    $ " + packageJSON.name + " compile my/schema.json > encoding.json");
    console.error("    $ " + packageJSON.name + " serialize encoding.json my/document.json > output.bin");
    console.error("    $ " + packageJSON.name + " deserialize encoding.json output.bin > document.json");
    process.exit(1);
}
if (COMMAND === 'version') {
    console.log(packageJSON.version);
}
else if (COMMAND === 'compile') {
    var schemaPath = process.argv[3];
    if (typeof schemaPath !== 'string') {
        console.error('Missing input JSON Schema file');
        process.exit(1);
    }
    var schema = JSON.parse(fs_1.readFileSync(schemaPath, 'utf8'));
    lib_1.compileSchema(schema).then(function (encoding) {
        console.log(JSON.stringify(encoding, null, 2));
        process.exit(0);
    }).catch(function (error) {
        throw error;
    });
}
else if (COMMAND === 'serialize') {
    var encodingPath = process.argv[3];
    if (typeof encodingPath !== 'string') {
        console.error('Missing input encoding document');
        process.exit(1);
    }
    var documentPath = process.argv[4];
    if (typeof documentPath !== 'string') {
        console.error('Missing input document');
        process.exit(1);
    }
    var encoding = JSON.parse(fs_1.readFileSync(encodingPath, 'utf8'));
    var document_1 = JSON.parse(fs_1.readFileSync(documentPath, 'utf8'));
    var buffer = lib_1.serialize(encoding, document_1);
    process.stdout.write(buffer, function () {
        process.exit(0);
    });
}
else {
    var encodingPath = process.argv[3];
    if (typeof encodingPath !== 'string') {
        console.error('Missing input encoding document');
        process.exit(1);
    }
    var binaryPath = process.argv[4];
    if (typeof binaryPath !== 'string') {
        console.error('Missing binary file');
        process.exit(1);
    }
    var encoding = JSON.parse(fs_1.readFileSync(encodingPath, 'utf8'));
    var binary = fs_1.readFileSync(binaryPath);
    var result = lib_1.deserialize(encoding, binary);
    console.log(JSON.stringify(result, null, 2));
    process.exit(0);
}
