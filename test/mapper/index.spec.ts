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
} from '../../lib/encoding-schema'

import {
  Encoding,
  getEncoding
} from '../../lib/mapper'

tap.test('should get an integer encoding', (test) => {
  const schema: EncodingSchema = {
    type: 'integer',
    minimum: 5
  }

  const encoding: Encoding = getEncoding(schema)
  test.strictSame(encoding, {
    type: 'integer',
    encoding: 'FLOOR__ENUM_VARINT',
    options: {
      minimum: 5
    }
  })

  test.end()
})

tap.test('should get a string encoding', (test) => {
  const schema: EncodingSchema = {
    type: 'string',
    maxLength: 20
  }

  const encoding: Encoding = getEncoding(schema)
  test.strictSame(encoding, {
    type: 'string',
    encoding: 'ROOF__PREFIX_LENGTH_8BIT_FIXED',
    options: {
      maximum: 20
    }
  })

  test.end()
})

tap.test('should get an enum encoding', (test) => {
  const schema: EncodingSchema = {
    enum: [ 'foo' ]
  }

  const encoding: Encoding = getEncoding(schema)
  test.strictSame(encoding, {
    type: 'enum',
    encoding: 'BOUNDED_CHOICE_INDEX',
    options: {
      choices: [ 'foo' ]
    }
  })

  test.end()
})
