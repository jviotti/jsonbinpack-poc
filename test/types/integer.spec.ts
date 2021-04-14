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
  BOUNDED_8BITS__ENUM_FIXED as ENCODE_BOUNDED_8BITS__ENUM_FIXED,
  BOUNDED__ENUM_VARINT as ENCODE_BOUNDED__ENUM_VARINT,
  FLOOR__ENUM_VARINT as ENCODE_FLOOR__ENUM_VARINT,
  ROOF__MIRROR_ENUM_VARINT as ENCODE_ROOF__MIRROR_ENUM_VARINT,
  ARBITRARY__ZIGZAG_VARINT as ENCODE_ARBITRARY__ZIGZAG_VARINT,
  ARBITRARY_MULTIPLE__ZIGZAG_VARINT as ENCODE_ARBITRARY_MULTIPLE__ZIGZAG_VARINT
} from '../../lib/types/integer/encode'

import {
  IntegerResult,
  BOUNDED_8BITS__ENUM_FIXED as DECODE_BOUNDED_8BITS__ENUM_FIXED,
  BOUNDED__ENUM_VARINT as DECODE_BOUNDED__ENUM_VARINT,
  FLOOR__ENUM_VARINT as DECODE_FLOOR__ENUM_VARINT,
  ROOF__MIRROR_ENUM_VARINT as DECODE_ROOF__MIRROR_ENUM_VARINT,
  ARBITRARY__ZIGZAG_VARINT as DECODE_ARBITRARY__ZIGZAG_VARINT,
  ARBITRARY_MULTIPLE__ZIGZAG_VARINT as DECODE_ARBITRARY_MULTIPLE__ZIGZAG_VARINT
} from '../../lib/types/integer/decode'

const UINT8_MAX: number = Math.pow(2, 8) - 1

tap.test('BOUNDED_8BITS__ENUM_FIXED', (test) => {
  const arbitrary = fc.integer().chain((minimum: number) => {
    return fc.tuple(
      fc.constant(minimum),
      fc.integer(minimum, minimum + UINT8_MAX),
      fc.integer(minimum, minimum + UINT8_MAX))
  })

  fc.assert(fc.property(arbitrary, ([ minimum, maximum, value ]): boolean => {
    fc.pre(value <= maximum)
    const buffer: Buffer = Buffer.allocUnsafe(1)
    const bytesWritten: number =
      ENCODE_BOUNDED_8BITS__ENUM_FIXED(buffer, 0, value, minimum, maximum)
    const result: IntegerResult =
      DECODE_BOUNDED_8BITS__ENUM_FIXED(buffer, 0, minimum, maximum)
    return bytesWritten === 1 && result.bytes === bytesWritten && result.value === value
  }), {
    verbose: false
  })

  test.end()
})

tap.test('BOUNDED__ENUM_VARINT', (test) => {
  fc.assert(fc.property(fc.integer(), fc.integer(), fc.integer(), (
    value: number, minimum: number, maximum: number
  ): boolean => {
    fc.pre(value >= minimum && value <= maximum)
    const buffer: Buffer = Buffer.allocUnsafe(8)
    const bytesWritten: number = ENCODE_BOUNDED__ENUM_VARINT(buffer, 0, value, minimum, maximum)
    const result: IntegerResult = DECODE_BOUNDED__ENUM_VARINT(buffer, 0, minimum, maximum)
    return bytesWritten > 0 && result.bytes === bytesWritten && result.value === value
  }), {
    verbose: false
  })

  test.end()
})

tap.test('FLOOR__ENUM_VARINT', (test) => {
  fc.assert(fc.property(fc.integer(), fc.integer(), (
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

tap.test('ROOF__MIRROR_ENUM_VARINT', (test) => {
  fc.assert(fc.property(fc.integer(), fc.integer(), (
    value: number, maximum: number
  ): boolean => {
    fc.pre(value <= maximum)
    const buffer: Buffer = Buffer.allocUnsafe(8)
    const bytesWritten: number =
      ENCODE_ROOF__MIRROR_ENUM_VARINT(buffer, 0, value, maximum)
    const result: IntegerResult =
      DECODE_ROOF__MIRROR_ENUM_VARINT(buffer, 0, maximum)
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
    fc.pre(value % multiplier === 0)
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

tap.test('ROOF__MIRROR_ENUM_VARINT: should encode -3 (..-2) as 0x01', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(1)
  const bytesWritten: number = ENCODE_ROOF__MIRROR_ENUM_VARINT(buffer, 0, -3, -2)
  test.strictSame(buffer, Buffer.from([ 0x01 ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('ROOF__MIRROR_ENUM_VARINT: should encode 8 (..10) as 0x02', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(1)
  const bytesWritten: number = ENCODE_ROOF__MIRROR_ENUM_VARINT(buffer, 0, 8, 10)
  test.strictSame(buffer, Buffer.from([ 0x02 ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('ARBITRARY__ZIGZAG_VARINT: should encode -25200 as 0xdf 0x89 0x03', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(3)
  const bytesWritten: number = ENCODE_ARBITRARY__ZIGZAG_VARINT(buffer, 0, -25200)
  test.strictSame(buffer, Buffer.from([ 0xdf, 0x89, 0x03 ]))
  test.is(bytesWritten, 3)
  test.end()
})

tap.test('ARBITRARY_MULTIPLE__ZIGZAG_VARINT: should encode 10 / 5  as 0x04', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(1)
  const bytesWritten: number = ENCODE_ARBITRARY_MULTIPLE__ZIGZAG_VARINT(buffer, 0, 10, 5)
  test.strictSame(buffer, Buffer.from([ 0x04 ]))
  test.is(bytesWritten, 1)
  test.end()
})
