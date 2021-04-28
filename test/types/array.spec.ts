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
} from '../../lib/types/array/options'

import {
  BOUNDED_8BITS_SEMITYPED__LENGTH_PREFIX as ENCODE_BOUNDED_8BITS_SEMITYPED__LENGTH_PREFIX
} from '../../lib/types/array/encode'

import {
  ArrayResult,
  BOUNDED_8BITS_SEMITYPED__LENGTH_PREFIX as DECODE_BOUNDED_8BITS_SEMITYPED__LENGTH_PREFIX
} from '../../lib/types/array/decode'

tap.test('BOUNDED_8BITS_SEMITYPED__LENGTH_PREFIX: [ "foo", true, 2000 ] ([])', (test) => {
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
