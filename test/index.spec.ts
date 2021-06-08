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

import tap from 'tap'

import {
  readdirSync,
  readFileSync,
  writeFileSync
} from 'fs'

import {
  resolve
} from 'path'

import {
  JSONValue,
  JSONSchema,
  compileSchema,
  encode,
  decode,
  Encoding
} from '../lib'

import {
  validateSchema
} from '../lib/schema'

import {
  preprocessSchema
} from '../lib/preprocessor'

const TEST_DIRECTORY: string = resolve(__dirname, 'jsonbinpack')
const SRC_TEST_DIRECTORY: string = resolve(__dirname, '..', '..', 'test', 'jsonbinpack')

for (const testCase of readdirSync(TEST_DIRECTORY)) {
  tap.test(testCase, async (test) => {
    const testCasePath: string = resolve(TEST_DIRECTORY, testCase)
    const schema: JSONSchema = JSON.parse(readFileSync(resolve(testCasePath, 'schema.json'), 'utf8'))
    const value: JSONValue = JSON.parse(readFileSync(resolve(testCasePath, 'document.json'), 'utf8'))

    test.true(validateSchema(await preprocessSchema(schema), value))

    const encoding: Encoding = await compileSchema(schema)

    // Record the encoding schema for debugging purposes
    writeFileSync(
      resolve(SRC_TEST_DIRECTORY, testCase, 'encoding.json'),
      JSON.stringify(encoding, null, 2), 'utf8')
    writeFileSync(
      resolve(TEST_DIRECTORY, testCase, 'encoding.json'),
      JSON.stringify(encoding, null, 2), 'utf8')

    const buffer: Buffer = encode(encoding, value)
    const result: JSONValue = decode(encoding, buffer)

    // Record the buffer for debugging purposes too
    writeFileSync(resolve(SRC_TEST_DIRECTORY, testCase, 'output.bin'), buffer)

    // Record the buffer size for debugging purposes
    writeFileSync(resolve(SRC_TEST_DIRECTORY, testCase, 'size'), String(buffer.length), 'utf8')

    test.strictSame(value, result)
    test.end()
  })
}
