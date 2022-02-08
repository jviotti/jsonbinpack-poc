#!/usr/bin/env node

/*
 * Copyright 2021 Juan Cruz Viotti
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  readFileSync
} from 'fs'

import * as packageJSON from '../package.json'

import {
  JSONValue,
  JSONSchema,
  serialize,
  deserialize,
  compileSchema,
  Encoding
} from '../lib'

const COMMAND: string | undefined = process.argv[2]
if (COMMAND !== 'compile' && COMMAND !== 'serialize' && COMMAND !== 'deserialize' && COMMAND !== 'version') {
  console.error(`Usage: ${packageJSON.name} <compile | serialize | deserialize> <arguments...>`)
  console.error('\nCommands:\n')
  console.error('    compile <schema.json>')
  console.error('    serialize <encoding.json> <document.json>')
  console.error('    deserialize <encoding.json> <binary.bin>')
  console.error('    version')
  console.error('\nExamples:\n')
  console.error(`    $ ${packageJSON.name} compile my/schema.json > encoding.json`)
  console.error(`    $ ${packageJSON.name} serialize encoding.json my/document.json > output.bin`)
  console.error(`    $ ${packageJSON.name} deserialize encoding.json output.bin > document.json`)
  process.exit(1)
}

if (COMMAND === 'version') {
  console.log(packageJSON.version)
} else if (COMMAND === 'compile') {
  const schemaPath: string | undefined = process.argv[3]
  if (typeof schemaPath !== 'string') {
    console.error('Missing input JSON Schema file')
    process.exit(1)
  }

  const schema: JSONSchema | boolean = JSON.parse(readFileSync(schemaPath, 'utf8'))
  compileSchema(schema).then((encoding: Encoding) => {
    console.log(JSON.stringify(encoding, null, 2))
    process.exit(0)
  }).catch((error) => {
    throw error
  })
} else if (COMMAND === 'serialize') {
  const encodingPath: string | undefined = process.argv[3]
  if (typeof encodingPath !== 'string') {
    console.error('Missing input encoding document')
    process.exit(1)
  }

  const documentPath: string | undefined = process.argv[4]
  if (typeof documentPath !== 'string') {
    console.error('Missing input document')
    process.exit(1)
  }

  const encoding: Encoding = JSON.parse(readFileSync(encodingPath, 'utf8'))
  const document: JSONValue = JSON.parse(readFileSync(documentPath, 'utf8'))
  const buffer: Buffer = serialize(encoding, document)
  process.stdout.write(buffer, () => {
    process.exit(0)
  })
} else {
  const encodingPath: string | undefined = process.argv[3]
  if (typeof encodingPath !== 'string') {
    console.error('Missing input encoding document')
    process.exit(1)
  }

  const binaryPath: string | undefined = process.argv[4]
  if (typeof binaryPath !== 'string') {
    console.error('Missing binary file')
    process.exit(1)
  }

  const encoding: Encoding = JSON.parse(readFileSync(encodingPath, 'utf8'))
  const binary: Buffer = readFileSync(binaryPath)
  const result: JSONValue = deserialize(encoding, binary)
  console.log(JSON.stringify(result, null, 2))
  process.exit(0)
}
