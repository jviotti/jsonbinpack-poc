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

import {
  FLOOR__PREFIX_LENGTH_ENUM_VARINT as ENCODE_FLOOR__PREFIX_LENGTH_ENUM_VARINT,
  ARBITRARY__PREFIX_LENGTH_VARINT as ENCODE_ARBITRARY__PREFIX_LENGTH_VARINT
} from '../../lib/types/string/encode'

import {
  StringResult,
  FLOOR__PREFIX_LENGTH_ENUM_VARINT as DECODE_FLOOR__PREFIX_LENGTH_ENUM_VARINT,
  ARBITRARY__PREFIX_LENGTH_VARINT as DECODE_ARBITRARY__PREFIX_LENGTH_VARINT
} from '../../lib/types/string/decode'

tap.test('FLOOR__PREFIX_LENGTH_ENUM_VARINT (ASCII)', (test) => {
  const arbitrary = fc.nat(2000).chain((minimum: number) => {
    return fc.tuple(
      fc.constant(minimum),
      fc.string({ minLength: minimum, maxLength: 2000 })
    )
  })

  fc.assert(fc.property(arbitrary, ([ minimum, value ]): boolean => {
    const buffer: Buffer = Buffer.allocUnsafe(2048)
    const bytesWritten: number = ENCODE_FLOOR__PREFIX_LENGTH_ENUM_VARINT(buffer, 0, value, minimum)
    const result: StringResult = DECODE_FLOOR__PREFIX_LENGTH_ENUM_VARINT(buffer, 0, minimum)
    return bytesWritten > 0 && result.bytes === bytesWritten && result.value === value
  }), {
    verbose: false
  })

  test.end()
})

tap.test('ARBITRARY__PREFIX_LENGTH_VARINT (ASCII)', (test) => {
  fc.assert(fc.property(fc.string({ maxLength: 1000 }), (value: string): boolean => {
    const buffer: Buffer = Buffer.allocUnsafe(2048)
    const bytesWritten: number = ENCODE_ARBITRARY__PREFIX_LENGTH_VARINT(buffer, 0, value)
    const result: StringResult = DECODE_ARBITRARY__PREFIX_LENGTH_VARINT(buffer, 0)
    return bytesWritten > 0 && result.bytes === bytesWritten && result.value === value
  }), {
    verbose: false
  })

  test.end()
})
