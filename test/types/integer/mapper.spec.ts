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
  IntegerCanonicalSchema
} from '../../../lib/canonical-schema'

import {
  EncodingInteger,
  getIntegerEncoding
} from '../../../lib/types/integer/mapper'

import * as ENCODE_FUNCTIONS from '../../../lib/types/integer/encode'
import * as DECODE_FUNCTIONS from '../../../lib/types/integer/decode'

tap.test('the encoding enum should include all encoding functions', (test) => {
  test.strictSame(Object.values(EncodingInteger).sort(), Object.keys(ENCODE_FUNCTIONS).sort())
  test.strictSame(Object.values(EncodingInteger).sort(), Object.keys(DECODE_FUNCTIONS).sort())
  test.end()
})

tap.test('should encode an arbitrary integer', (test) => {
  const schema: IntegerCanonicalSchema = {
    type: 'integer'
  }

  const encoding: EncodingInteger = getIntegerEncoding(schema)
  test.is(encoding, EncodingInteger.ARBITRARY__ZIGZAG_VARINT)
  test.end()
})

tap.test('should encode an arbitrary integer with multipleOf', (test) => {
  const schema: IntegerCanonicalSchema = {
    type: 'integer',
    multipleOf: 5
  }

  const encoding: EncodingInteger = getIntegerEncoding(schema)
  test.is(encoding, EncodingInteger.ARBITRARY_MULTIPLE__ZIGZAG_VARINT)
  test.end()
})

tap.test('should encode an integer with minimum', (test) => {
  const schema: IntegerCanonicalSchema = {
    type: 'integer',
    minimum: 0
  }

  const encoding: EncodingInteger = getIntegerEncoding(schema)
  test.is(encoding, EncodingInteger.FLOOR__ENUM_VARINT)
  test.end()
})

tap.test('should encode an integer with minimum and multipleOf', (test) => {
  const schema: IntegerCanonicalSchema = {
    type: 'integer',
    minimum: 0,
    multipleOf: 5
  }

  const encoding: EncodingInteger = getIntegerEncoding(schema)
  test.is(encoding, EncodingInteger.FLOOR_MULTIPLE__ENUM_VARINT)
  test.end()
})

tap.test('should encode an integer with maximum', (test) => {
  const schema: IntegerCanonicalSchema = {
    type: 'integer',
    maximum: 100
  }

  const encoding: EncodingInteger = getIntegerEncoding(schema)
  test.is(encoding, EncodingInteger.ROOF__MIRROR_ENUM_VARINT)
  test.end()
})

tap.test('should encode an integer with maximum and multipleOf', (test) => {
  const schema: IntegerCanonicalSchema = {
    type: 'integer',
    maximum: 100,
    multipleOf: 5
  }

  const encoding: EncodingInteger = getIntegerEncoding(schema)
  test.is(encoding, EncodingInteger.ROOF_MULTIPLE__MIRROR_ENUM_VARINT)
  test.end()
})

tap.test('should encode an 8-bit integer with minimum and maximum', (test) => {
  const schema: IntegerCanonicalSchema = {
    type: 'integer',
    minimum: -100,
    maximum: 100
  }

  const encoding: EncodingInteger = getIntegerEncoding(schema)
  test.is(encoding, EncodingInteger.BOUNDED_8BITS__ENUM_FIXED)
  test.end()
})

tap.test('should encode an >8-bit integer with minimum and maximum', (test) => {
  const schema: IntegerCanonicalSchema = {
    type: 'integer',
    minimum: -100,
    maximum: 100000
  }

  const encoding: EncodingInteger = getIntegerEncoding(schema)
  test.is(encoding, EncodingInteger.BOUNDED__ENUM_VARINT)
  test.end()
})
