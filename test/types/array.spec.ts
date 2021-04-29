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
  JSONValue,
  JSONNumber
} from '../../lib/json'

import {
  getIntegerEncoding,
  IntegerEncoding
} from '../../lib/types/integer/mapper'

import {
  SemiTypedOptions,
  SemiTypedBoundedOptions
} from '../../lib/types/array/options'

import {
  UNBOUNDED_SEMITYPED__LENGTH_PREFIX as ENCODE_UNBOUNDED_SEMITYPED__LENGTH_PREFIX,
  UNBOUNDED_TYPED__LENGTH_PREFIX as ENCODE_UNBOUNDED_TYPED__LENGTH_PREFIX,
  BOUNDED_8BITS_SEMITYPED__LENGTH_PREFIX as ENCODE_BOUNDED_8BITS_SEMITYPED__LENGTH_PREFIX
} from '../../lib/types/array/encode'

import {
  ArrayResult,
  UNBOUNDED_SEMITYPED__LENGTH_PREFIX as DECODE_UNBOUNDED_SEMITYPED__LENGTH_PREFIX,
  UNBOUNDED_TYPED__LENGTH_PREFIX as DECODE_UNBOUNDED_TYPED__LENGTH_PREFIX,
  BOUNDED_8BITS_SEMITYPED__LENGTH_PREFIX as DECODE_BOUNDED_8BITS_SEMITYPED__LENGTH_PREFIX
} from '../../lib/types/array/decode'

tap.test('BOUNDED_8BITS_SEMITYPED__LENGTH_PREFIX: [ "foo", true, 2000 ] (2..3 [])', (test) => {
  const value: JSONValue = [ 'foo', true, 2000 ]
  const buffer: Buffer = Buffer.allocUnsafe(10)
  const options: SemiTypedBoundedOptions = {
    prefixEncodings: [],
    minimum: 2,
    maximum: 3
  }

  const bytesWritten: number =
    ENCODE_BOUNDED_8BITS_SEMITYPED__LENGTH_PREFIX(buffer, 0, value, options)
  const result: ArrayResult =
    DECODE_BOUNDED_8BITS_SEMITYPED__LENGTH_PREFIX(buffer, 0, options)

  test.is(bytesWritten, 10)
  test.is(bytesWritten, result.bytes)
  test.strictSame(result.value, value)
  test.end()
})

tap.test('UNBOUNDED_SEMITYPED__LENGTH_PREFIX: [] ([])', (test) => {
  const value: JSONValue = []
  const buffer: Buffer = Buffer.allocUnsafe(1)
  const options: SemiTypedOptions = {
    prefixEncodings: []
  }

  const bytesWritten: number =
    ENCODE_UNBOUNDED_SEMITYPED__LENGTH_PREFIX(buffer, 0, value, options)
  const result: ArrayResult =
    DECODE_UNBOUNDED_SEMITYPED__LENGTH_PREFIX(buffer, 0, options)

  test.is(bytesWritten, 1)
  test.is(bytesWritten, result.bytes)
  test.strictSame(result.value, value)
  test.end()
})

tap.test('UNBOUNDED_SEMITYPED__LENGTH_PREFIX (scalars)', (test) => {
  fc.assert(fc.property(fc.array(fc.oneof(
    fc.constant(null),
    fc.boolean(),
    fc.integer(),
    fc.float(),
    fc.double(),
    fc.string({ maxLength: 10 })
  )), (value: JSONValue[]): boolean => {
    const buffer: Buffer = Buffer.allocUnsafe(2048)
    const offset: number = 0

    const bytesWritten: number =
      ENCODE_UNBOUNDED_SEMITYPED__LENGTH_PREFIX(buffer, offset, value, {
        prefixEncodings: []
      })

    const result: ArrayResult =
      DECODE_UNBOUNDED_SEMITYPED__LENGTH_PREFIX(buffer, offset, {
        prefixEncodings: []
      })

    return bytesWritten > 0 && result.bytes === bytesWritten &&
      util.isDeepStrictEqual(result.value, value)
  }), {
    verbose: false
  })

  test.end()
})

tap.test('UNBOUNDED_TYPED__LENGTH_PREFIX ([], integer)', (test) => {
  fc.assert(fc.property(fc.array(fc.integer()), (value: JSONNumber[]): boolean => {
    const buffer: Buffer = Buffer.allocUnsafe(2048)
    const offset: number = 0

    const encoding: IntegerEncoding = getIntegerEncoding({
      type: 'integer'
    })

    const bytesWritten: number =
      ENCODE_UNBOUNDED_TYPED__LENGTH_PREFIX(buffer, offset, value, {
        prefixEncodings: [],
        encoding
      })

    const result: ArrayResult =
      DECODE_UNBOUNDED_TYPED__LENGTH_PREFIX(buffer, offset, {
        prefixEncodings: [],
        encoding
      })

    return bytesWritten > 0 && result.bytes === bytesWritten &&
      util.isDeepStrictEqual(result.value, value)
  }), {
    verbose: false
  })

  test.end()
})
