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
import * as fc from 'fast-check'
import * as util from 'util'

import {
  JSONValue
} from '../../lib/json'

import {
  ANY__TYPE_PREFIX as ENCODE_ANY__TYPE_PREFIX
} from '../../lib/types/any/encode'

import {
  AnyResult,
  ANY__TYPE_PREFIX as DECODE_ANY__TYPE_PREFIX
} from '../../lib/types/any/decode'

import ResizableBuffer from '../../lib/utils/resizable-buffer'

tap.test('ANY__TYPE_PREFIX: should handle " "', (test) => {
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(2048))
  const bytesWritten: number = ENCODE_ANY__TYPE_PREFIX(buffer, 0, ' ', {})
  test.is(bytesWritten, 3)
  const result: AnyResult = DECODE_ANY__TYPE_PREFIX(buffer, 0, {})
  test.is(result.bytes, 3)
  test.is(result.value, ' ')
  test.end()
})

tap.test('ANY__TYPE_PREFIX: should handle {"foo":"bar","baz":1}', (test) => {
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(100))
  const bytesWritten: number = ENCODE_ANY__TYPE_PREFIX(buffer, 0, {
    foo: 'bar',
    baz: 1
  }, {})

  test.is(bytesWritten, 17)
  const result: AnyResult = DECODE_ANY__TYPE_PREFIX(buffer, 0, {})
  test.is(result.bytes, 17)
  test.strictSame(result.value, {
    foo: 'bar',
    baz: 1
  })

  test.end()
})

tap.test('ANY__TYPE_PREFIX: should handle [ "foo", true, 2000 ]', (test) => {
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(100))
  const bytesWritten: number = ENCODE_ANY__TYPE_PREFIX(buffer, 0, [
    'foo', true, 2000
  ], {})

  test.is(bytesWritten, 11)
  const result: AnyResult = DECODE_ANY__TYPE_PREFIX(buffer, 0, {})
  test.is(result.bytes, 11)
  test.strictSame(result.value, [ 'foo', true, 2000 ])

  test.end()
})

tap.test('ANY__TYPE_PREFIX: scalars', (test) => {
  fc.assert(fc.property(fc.nat(10), fc.oneof(
    fc.constant(null),
    fc.boolean(),
    fc.integer(),
    fc.float(),
    fc.double(),
    fc.string({ maxLength: 1000 })
  ), (offset: number, value: JSONValue): boolean => {
    const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(2048))
    const bytesWritten: number = ENCODE_ANY__TYPE_PREFIX(buffer, offset, value, {})
    const result: AnyResult = DECODE_ANY__TYPE_PREFIX(buffer, offset, {})
    return bytesWritten > 0 &&
      result.bytes === bytesWritten && result.value === value
  }), {
    verbose: false
  })

  test.end()
})

tap.test('ANY__TYPE_PREFIX: JSON', (test) => {
  fc.assert(fc.property(fc.json(), (json: string): boolean => {
    const value: JSONValue = JSON.parse(json)
    const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(2048))
    const bytesWritten: number = ENCODE_ANY__TYPE_PREFIX(buffer, 0, value, {})
    const result: AnyResult = DECODE_ANY__TYPE_PREFIX(buffer, 0, {})
    return bytesWritten > 0 && result.bytes === bytesWritten &&
      util.isDeepStrictEqual(result.value, value)
  }), {
    verbose: false
  })

  test.end()
})

tap.test('ANY__TYPE_PREFIX: JSON with small ResizableBuffer', (test) => {
  fc.assert(fc.property(fc.json(), (json: string): boolean => {
    const value: JSONValue = JSON.parse(json)
    const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(1))
    const bytesWritten: number = ENCODE_ANY__TYPE_PREFIX(buffer, 0, value, {})
    const result: AnyResult = DECODE_ANY__TYPE_PREFIX(buffer, 0, {})
    return bytesWritten > 0 && result.bytes === bytesWritten &&
      util.isDeepStrictEqual(result.value, value)
  }), {
    verbose: false
  })

  test.end()
})

tap.test('ANY__TYPE_PREFIX: JSON with 0 ResizableBuffer', (test) => {
  fc.assert(fc.property(fc.json(), (json: string): boolean => {
    const value: JSONValue = JSON.parse(json)
    const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(0))
    const bytesWritten: number = ENCODE_ANY__TYPE_PREFIX(buffer, 0, value, {})
    const result: AnyResult = DECODE_ANY__TYPE_PREFIX(buffer, 0, {})
    return bytesWritten > 0 && result.bytes === bytesWritten &&
      util.isDeepStrictEqual(result.value, value)
  }), {
    verbose: false
  })

  test.end()
})
