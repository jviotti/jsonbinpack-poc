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
  StringCanonicalSchema
} from '../../../lib/canonical-schema'

import {
  StringEncoding,
  getStringEncoding
} from '../../../lib/types/string/mapper'

import * as ENCODE_FUNCTIONS from '../../../lib/types/string/encode'
import * as DECODE_FUNCTIONS from '../../../lib/types/string/decode'

tap.test('the encoding enum should include all encoding functions', (test) => {
  test.strictSame(Object.values(StringEncoding).sort(), Object.keys(ENCODE_FUNCTIONS).sort())
  test.strictSame(Object.values(StringEncoding).sort(), Object.keys(DECODE_FUNCTIONS).sort())
  test.end()
})

tap.test('should encode a simple string', (test) => {
  const schema: StringCanonicalSchema = {
    type: 'string'
  }

  const encoding: StringEncoding = getStringEncoding(schema)
  test.is(encoding, StringEncoding.ARBITRARY__PREFIX_LENGTH_VARINT)
  test.end()
})

tap.test('should encode a string with minLength', (test) => {
  const schema: StringCanonicalSchema = {
    type: 'string',
    minLength: 5
  }

  const encoding: StringEncoding = getStringEncoding(schema)
  test.is(encoding, StringEncoding.FLOOR__PREFIX_LENGTH_ENUM_VARINT)
  test.end()
})

tap.test('should encode a string with maxLength >= 255', (test) => {
  const schema: StringCanonicalSchema = {
    type: 'string',
    maxLength: 256
  }

  const encoding: StringEncoding = getStringEncoding(schema)
  test.is(encoding, StringEncoding.ROOF__PREFIX_LENGTH_ENUM_VARINT)
  test.end()
})

tap.test('should encode a string with maxLength < 255', (test) => {
  const schema: StringCanonicalSchema = {
    type: 'string',
    maxLength: 254
  }

  const encoding: StringEncoding = getStringEncoding(schema)
  test.is(encoding, StringEncoding.ROOF__PREFIX_LENGTH_8BIT_FIXED)
  test.end()
})

tap.test('should encode a string with maxLength = 255', (test) => {
  const schema: StringCanonicalSchema = {
    type: 'string',
    maxLength: 255
  }

  const encoding: StringEncoding = getStringEncoding(schema)
  test.is(encoding, StringEncoding.ROOF__PREFIX_LENGTH_8BIT_FIXED)
  test.end()
})

tap.test('should encode a string with minLength and maxLength < 255', (test) => {
  const schema: StringCanonicalSchema = {
    type: 'string',
    minLength: 100,
    maxLength: 300
  }

  const encoding: StringEncoding = getStringEncoding(schema)
  test.is(encoding, StringEncoding.BOUNDED__PREFIX_LENGTH_8BIT_FIXED)
  test.end()
})

tap.test('should encode a string with minLength and maxLength > 255', (test) => {
  const schema: StringCanonicalSchema = {
    type: 'string',
    minLength: 100,
    maxLength: 600
  }

  const encoding: StringEncoding = getStringEncoding(schema)
  test.is(encoding, StringEncoding.BOUNDED__PREFIX_LENGTH_ENUM_VARINT)
  test.end()
})
