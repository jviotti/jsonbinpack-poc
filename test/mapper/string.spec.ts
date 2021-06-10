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
  EncodingSchema
} from '../../lib/schema'

import {
  Encoding,
  getStates,
  getEncoding
} from '../../lib/mapper'

tap.test('should encode string with format: date', (test) => {
  const schema: EncodingSchema = {
    type: 'string',
    format: 'date'
  }

  const result: Encoding = getEncoding(schema, 0)
  test.is(getStates(schema, 0), Infinity)
  test.strictSame(result, {
    type: 'string',
    encoding: 'RFC3339_DATE_INTEGER_TRIPLET',
    options: {}
  })

  test.end()
})

tap.test('should encode a simple string', (test) => {
  const schema: EncodingSchema = {
    type: 'string'
  }

  const result: Encoding = getEncoding(schema, 0)
  test.is(getStates(schema, 0), Infinity)
  test.strictSame(result, {
    type: 'string',
    encoding: 'ARBITRARY__PREFIX_LENGTH_VARINT',
    options: {}
  })

  test.end()
})

tap.test('should encode a string with minLength', (test) => {
  const schema: EncodingSchema = {
    type: 'string',
    minLength: 5
  }

  const result: Encoding = getEncoding(schema, 0)
  test.is(getStates(schema, 0), Infinity)
  test.strictSame(result, {
    type: 'string',
    encoding: 'FLOOR__PREFIX_LENGTH_ENUM_VARINT',
    options: {
      minimum: 5
    }
  })

  test.end()
})

tap.test('should encode a string with maxLength >= 255', (test) => {
  const schema: EncodingSchema = {
    type: 'string',
    maxLength: 256
  }

  const result: Encoding = getEncoding(schema, 0)
  test.is(getStates(schema, 0), Infinity)
  test.strictSame(result, {
    type: 'string',
    encoding: 'ROOF__PREFIX_LENGTH_ENUM_VARINT',
    options: {
      maximum: 256
    }
  })

  test.end()
})

tap.test('should encode a string with maxLength < 255', (test) => {
  const schema: EncodingSchema = {
    type: 'string',
    maxLength: 254
  }

  const result: Encoding = getEncoding(schema, 0)
  test.is(getStates(schema, 0), Infinity)
  test.strictSame(result, {
    type: 'string',
    encoding: 'ROOF__PREFIX_LENGTH_8BIT_FIXED',
    options: {
      maximum: 254
    }
  })

  test.end()
})

tap.test('should encode a string with maxLength = 255', (test) => {
  const schema: EncodingSchema = {
    type: 'string',
    maxLength: 255
  }

  const result: Encoding = getEncoding(schema, 0)
  test.is(getStates(schema, 0), Infinity)
  test.strictSame(result, {
    type: 'string',
    encoding: 'ROOF__PREFIX_LENGTH_ENUM_VARINT',
    options: {
      maximum: 255
    }
  })

  test.end()
})

tap.test('should encode a string with minLength and maxLength < 255', (
  test
) => {
  const schema: EncodingSchema = {
    type: 'string',
    minLength: 100,
    maxLength: 300
  }

  const result: Encoding = getEncoding(schema, 0)
  test.is(getStates(schema, 0), Infinity)
  test.strictSame(result, {
    type: 'string',
    encoding: 'BOUNDED__PREFIX_LENGTH_8BIT_FIXED',
    options: {
      minimum: 100,
      maximum: 300
    }
  })

  test.end()
})

tap.test('should encode a string with minLength and maxLength > 255', (
  test
) => {
  const schema: EncodingSchema = {
    type: 'string',
    minLength: 100,
    maxLength: 600
  }

  const result: Encoding = getEncoding(schema, 0)
  test.is(getStates(schema, 0), Infinity)
  test.strictSame(result, {
    type: 'string',
    encoding: 'BOUNDED__PREFIX_LENGTH_ENUM_VARINT',
    options: {
      minimum: 100,
      maximum: 600
    }
  })

  test.end()
})
