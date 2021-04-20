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
  BOUNDED__PREFIX_LENGTH_8BIT_FIXED as ENCODE_BOUNDED__PREFIX_LENGTH_8BIT_FIXED,
  BOUNDED__PREFIX_LENGTH_ENUM_VARINT as ENCODE_BOUNDED__PREFIX_LENGTH_ENUM_VARINT,
  ROOF__PREFIX_LENGTH_8BIT_FIXED as ENCODE_ROOF__PREFIX_LENGTH_8BIT_FIXED,
  ROOF__PREFIX_LENGTH_ENUM_VARINT as ENCODE_ROOF__PREFIX_LENGTH_ENUM_VARINT,
  FLOOR__PREFIX_LENGTH_ENUM_VARINT as ENCODE_FLOOR__PREFIX_LENGTH_ENUM_VARINT,
  ARBITRARY__PREFIX_LENGTH_VARINT as ENCODE_ARBITRARY__PREFIX_LENGTH_VARINT
} from '../../lib/types/string/encode'

import {
  StringResult,
  BOUNDED__PREFIX_LENGTH_8BIT_FIXED as DECODE_BOUNDED__PREFIX_LENGTH_8BIT_FIXED,
  BOUNDED__PREFIX_LENGTH_ENUM_VARINT as DECODE_BOUNDED__PREFIX_LENGTH_ENUM_VARINT,
  ROOF__PREFIX_LENGTH_8BIT_FIXED as DECODE_ROOF__PREFIX_LENGTH_8BIT_FIXED,
  ROOF__PREFIX_LENGTH_ENUM_VARINT as DECODE_ROOF__PREFIX_LENGTH_ENUM_VARINT,
  FLOOR__PREFIX_LENGTH_ENUM_VARINT as DECODE_FLOOR__PREFIX_LENGTH_ENUM_VARINT,
  ARBITRARY__PREFIX_LENGTH_VARINT as DECODE_ARBITRARY__PREFIX_LENGTH_VARINT
} from '../../lib/types/string/decode'

tap.test('BOUNDED__PREFIX_LENGTH_8BIT_FIXED (ASCII)', (test) => {
  const arbitrary = fc.nat(255).chain((maximum: number) => {
    return fc.tuple(
      fc.nat(maximum),
      fc.constant(maximum),
      fc.string({ maxLength: maximum })
    )
  })

  fc.assert(fc.property(arbitrary, ([ minimum, maximum, value ]): boolean => {
    fc.pre(Buffer.byteLength(value, 'utf8') >= minimum)
    const buffer: Buffer = Buffer.allocUnsafe(256)
    const bytesWritten: number = ENCODE_BOUNDED__PREFIX_LENGTH_8BIT_FIXED(buffer, 0, value, minimum, maximum)
    const result: StringResult = DECODE_BOUNDED__PREFIX_LENGTH_8BIT_FIXED(buffer, 0, minimum, maximum)
    return bytesWritten > 0 && result.bytes === bytesWritten && result.value === value
  }), {
    verbose: false
  })

  test.end()
})

tap.test('BOUNDED__PREFIX_LENGTH_ENUM_VARINT (ASCII)', (test) => {
  const arbitrary = fc.nat(1000).chain((maximum: number) => {
    return fc.tuple(
      fc.nat(maximum),
      fc.constant(maximum),
      fc.string({ maxLength: maximum })
    )
  })

  fc.assert(fc.property(arbitrary, ([ minimum, maximum, value ]): boolean => {
    fc.pre(Buffer.byteLength(value, 'utf8') >= minimum)
    const buffer: Buffer = Buffer.allocUnsafe(2048)
    const bytesWritten: number = ENCODE_BOUNDED__PREFIX_LENGTH_ENUM_VARINT(buffer, 0, value, minimum, maximum)
    const result: StringResult = DECODE_BOUNDED__PREFIX_LENGTH_ENUM_VARINT(buffer, 0, minimum, maximum)
    return bytesWritten > 0 && result.bytes === bytesWritten && result.value === value
  }), {
    verbose: false
  })

  test.end()
})

tap.test('ROOF__PREFIX_LENGTH_8BIT_FIXED (ASCII)', (test) => {
  const arbitrary = fc.nat(255).chain((maximum: number) => {
    return fc.tuple(
      fc.constant(maximum),
      fc.string({ maxLength: maximum })
    )
  })

  fc.assert(fc.property(arbitrary, ([ maximum, value ]): boolean => {
    const buffer: Buffer = Buffer.allocUnsafe(256)
    const bytesWritten: number = ENCODE_ROOF__PREFIX_LENGTH_8BIT_FIXED(buffer, 0, value, maximum)
    const result: StringResult = DECODE_ROOF__PREFIX_LENGTH_8BIT_FIXED(buffer, 0, maximum)
    return bytesWritten > 0 && result.bytes === bytesWritten && result.value === value
  }), {
    verbose: false
  })

  test.end()
})

tap.test('ROOF__PREFIX_LENGTH_ENUM_VARINT (ASCII)', (test) => {
  const arbitrary = fc.nat(1000).chain((maximum: number) => {
    return fc.tuple(
      fc.constant(maximum),
      fc.string({ maxLength: maximum })
    )
  })

  fc.assert(fc.property(arbitrary, ([ maximum, value ]): boolean => {
    const buffer: Buffer = Buffer.allocUnsafe(2048)
    const bytesWritten: number = ENCODE_ROOF__PREFIX_LENGTH_ENUM_VARINT(buffer, 0, value, maximum)
    const result: StringResult = DECODE_ROOF__PREFIX_LENGTH_ENUM_VARINT(buffer, 0, maximum)
    return bytesWritten > 0 && result.bytes === bytesWritten && result.value === value
  }), {
    verbose: false
  })

  test.end()
})

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
