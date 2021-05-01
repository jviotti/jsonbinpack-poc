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
  ARBITRARY_TYPED_KEYS_OBJECT
} from '../../../lib/types/object/encode'

import {
  getStringEncoding
} from '../../../lib/types/string/mapper'

tap.test('ARBITRARY_TYPED_KEYS_OBJECT: should encode untyped {foo:"bar",baz:1}', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(16)
  const bytesWritten: number = ARBITRARY_TYPED_KEYS_OBJECT(buffer, 0, {
    foo: 'bar',
    baz: 1
  }, {
    keyEncoding: getStringEncoding({
      type: 'string'
    })
  })

  test.strictSame(buffer, Buffer.from([
    0x02, // length
    0x03, 0x66, 0x6f, 0x6f, // key length + 'foo'
    0x00, 0x03, 0x62, 0x61, 0x72, // string tag + length + 'bar'
    0x03, 0x62, 0x61, 0x7a, // key length + 'baz'
    0x09, 0x01 // positive integer type tag + 1
  ]))

  test.is(bytesWritten, 16)
  test.end()
})

tap.test('ARBITRARY_TYPED_KEYS_OBJECT: should encode typed {foo:"bar",baz:1}', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(16)
  const bytesWritten: number = ARBITRARY_TYPED_KEYS_OBJECT(buffer, 0, {
    foo: 'bar',
    baz: 1
  }, {
    keyEncoding: getStringEncoding({
      type: 'string',
      minLength: 3
    })
  })

  test.strictSame(buffer, Buffer.from([
    0x02, // length
    0x00, 0x66, 0x6f, 0x6f, // key length + 'foo'
    0x00, 0x03, 0x62, 0x61, 0x72, // string tag + length + 'bar'
    0x00, 0x62, 0x61, 0x7a, // key length + 'baz'
    0x09, 0x01 // positive integer type tag + 1
  ]))

  test.is(bytesWritten, 16)
  test.end()
})
