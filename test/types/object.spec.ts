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
  JSONObject
} from '../../lib/json'

import {
  ARBITRARY_TYPED_KEYS_OBJECT as ENCODE_ARBITRARY_TYPED_KEYS_OBJECT
} from '../../lib/types/object/encode'

import {
  ObjectResult,
  ARBITRARY_TYPED_KEYS_OBJECT as DECODE_ARBITRARY_TYPED_KEYS_OBJECT
} from '../../lib/types/object/decode'

import {
  StringEncoding,
  getStringEncoding
} from '../../lib/types/string/mapper'

tap.test('ARBITRARY_TYPED_KEYS_OBJECT: untyped {foo:"bar",baz:1}', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(16)
  const value: JSONObject = {
    foo: 'bar',
    baz: 1
  }

  const keyEncoding: StringEncoding = getStringEncoding({
    type: 'string'
  })

  const bytesWritten: number = ENCODE_ARBITRARY_TYPED_KEYS_OBJECT(
    buffer, 0, value, {
      keyEncoding
    })

  const result: ObjectResult = DECODE_ARBITRARY_TYPED_KEYS_OBJECT(
    buffer, 0, {
      keyEncoding
    })

  test.is(bytesWritten, result.bytes)
  test.strictSame(result.value, value)
  test.end()
})

tap.test('ARBITRARY_TYPED_KEYS_OBJECT: typed {foo:"bar",baz:1}', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(16)
  const value: JSONObject = {
    foo: 'bar',
    baz: 1
  }

  const keyEncoding: StringEncoding = getStringEncoding({
    type: 'string',
    minLength: 3
  })

  const bytesWritten: number = ENCODE_ARBITRARY_TYPED_KEYS_OBJECT(
    buffer, 0, value, {
      keyEncoding
    })

  const result: ObjectResult = DECODE_ARBITRARY_TYPED_KEYS_OBJECT(
    buffer, 0, {
      keyEncoding
    })

  test.is(bytesWritten, result.bytes)
  test.strictSame(result.value, value)
  test.end()
})
