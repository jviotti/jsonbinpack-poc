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
  JSONValue
} from '../../lib/json'

import {
  SemiTypedBoundedOptions
} from '../../lib/encoder/array/options'

import {
  BOUNDED_8BITS_SEMITYPED_LENGTH_PREFIX as ENCODE_BOUNDED_8BITS_SEMITYPED_LENGTH_PREFIX
} from '../../lib/encoder/array/encode'

import {
  ArrayResult,
  BOUNDED_8BITS_SEMITYPED_LENGTH_PREFIX as DECODE_BOUNDED_8BITS_SEMITYPED_LENGTH_PREFIX
} from '../../lib/encoder/array/decode'

import {
  ResizableBuffer,
  EncodingContext,
  getDefaultEncodingContext
} from '../../lib/encoder'

tap.test('BOUNDED_8BITS_SEMITYPED_LENGTH_PREFIX: [ "foo", true, 2000 ] (2..3 [])', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const value: JSONValue = [ 'foo', true, 2000 ]
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(10))
  const options: SemiTypedBoundedOptions = {
    prefixEncodings: [],
    minimum: 2,
    maximum: 3
  }

  const bytesWritten: number =
    ENCODE_BOUNDED_8BITS_SEMITYPED_LENGTH_PREFIX(buffer, 0, value, options, context)
  const result: ArrayResult =
    DECODE_BOUNDED_8BITS_SEMITYPED_LENGTH_PREFIX(buffer, 0, options)

  test.is(bytesWritten, 9)
  test.is(bytesWritten, result.bytes)
  test.strictSame(result.value, value)
  test.end()
})
