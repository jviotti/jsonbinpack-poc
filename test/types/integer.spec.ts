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
  FLOOR__ENUM_VARINT as ENCODE_FLOOR__ENUM_VARINT,
  ARBITRARY__ZIGZAG_VARINT as ENCODE_ARBITRARY__ZIGZAG_VARINT,
  ARBITRARY_MULTIPLE__ZIGZAG_VARINT as ENCODE_ARBITRARY_MULTIPLE__ZIGZAG_VARINT
} from '../../lib/types/integer/encode'

import {
  IntegerResult,
  FLOOR__ENUM_VARINT as DECODE_FLOOR__ENUM_VARINT,
  ARBITRARY__ZIGZAG_VARINT as DECODE_ARBITRARY__ZIGZAG_VARINT,
  ARBITRARY_MULTIPLE__ZIGZAG_VARINT as DECODE_ARBITRARY_MULTIPLE__ZIGZAG_VARINT
} from '../../lib/types/integer/decode'

tap.test('FLOOR__ENUM_VARINT', (test) => {
  fc.assert(fc.property(fc.integer({
    min: 0
  }), fc.integer({
    min: 0
  }), (
    value: number, minimum: number
  ): boolean => {
    fc.pre(value >= minimum)
    const buffer: Buffer = Buffer.allocUnsafe(8)
    const bytesWritten: number = ENCODE_FLOOR__ENUM_VARINT(buffer, 0, value, minimum)
    const result: IntegerResult = DECODE_FLOOR__ENUM_VARINT(buffer, 0, minimum)
    return bytesWritten > 0 && result.bytes === bytesWritten && result.value === value
  }), {
    verbose: false
  })

  test.end()
})

tap.test('ARBITRARY__ZIGZAG_VARINT', (test) => {
  fc.assert(fc.property(fc.integer(), (value: number): boolean => {
    const buffer: Buffer = Buffer.allocUnsafe(8)
    const bytesWritten: number = ENCODE_ARBITRARY__ZIGZAG_VARINT(buffer, 0, value)
    const result: IntegerResult = DECODE_ARBITRARY__ZIGZAG_VARINT(buffer, 0)
    return bytesWritten > 0 && result.bytes === bytesWritten && result.value === value
  }), {
    verbose: false
  })

  test.end()
})

tap.test('ARBITRARY_MULTIPLE__ZIGZAG_VARINT', (test) => {
  fc.assert(fc.property(fc.integer(), fc.integer(), (
    value: number, multiplier: number
  ): boolean => {
    fc.pre(value % multiplier === 0);
    const buffer: Buffer = Buffer.allocUnsafe(8)
    const bytesWritten: number =
      ENCODE_ARBITRARY_MULTIPLE__ZIGZAG_VARINT(buffer, 0, value, multiplier)
    const result: IntegerResult =
      DECODE_ARBITRARY_MULTIPLE__ZIGZAG_VARINT(buffer, 0, multiplier)
    return bytesWritten > 0 && result.bytes === bytesWritten && result.value === value
  }), {
    verbose: false
  })

  test.end()
})
