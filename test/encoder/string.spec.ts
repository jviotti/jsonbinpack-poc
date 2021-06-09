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
  RFC3339_DATE_INTEGER_TRIPLET as ENCODE_RFC3339_DATE_INTEGER_TRIPLET,
  BOUNDED__PREFIX_LENGTH_8BIT_FIXED as ENCODE_BOUNDED__PREFIX_LENGTH_8BIT_FIXED,
  BOUNDED__PREFIX_LENGTH_ENUM_VARINT as ENCODE_BOUNDED__PREFIX_LENGTH_ENUM_VARINT,
  ROOF__PREFIX_LENGTH_8BIT_FIXED as ENCODE_ROOF__PREFIX_LENGTH_8BIT_FIXED,
  ROOF__PREFIX_LENGTH_ENUM_VARINT as ENCODE_ROOF__PREFIX_LENGTH_ENUM_VARINT,
  FLOOR__PREFIX_LENGTH_ENUM_VARINT as ENCODE_FLOOR__PREFIX_LENGTH_ENUM_VARINT,
  ARBITRARY__PREFIX_LENGTH_VARINT as ENCODE_ARBITRARY__PREFIX_LENGTH_VARINT
} from '../../lib/encoder/string/encode'

import {
  StringResult,
  RFC3339_DATE_INTEGER_TRIPLET as DECODE_RFC3339_DATE_INTEGER_TRIPLET,
  BOUNDED__PREFIX_LENGTH_8BIT_FIXED as DECODE_BOUNDED__PREFIX_LENGTH_8BIT_FIXED,
  BOUNDED__PREFIX_LENGTH_ENUM_VARINT as DECODE_BOUNDED__PREFIX_LENGTH_ENUM_VARINT,
  ROOF__PREFIX_LENGTH_8BIT_FIXED as DECODE_ROOF__PREFIX_LENGTH_8BIT_FIXED,
  ROOF__PREFIX_LENGTH_ENUM_VARINT as DECODE_ROOF__PREFIX_LENGTH_ENUM_VARINT,
  FLOOR__PREFIX_LENGTH_ENUM_VARINT as DECODE_FLOOR__PREFIX_LENGTH_ENUM_VARINT,
  ARBITRARY__PREFIX_LENGTH_VARINT as DECODE_ARBITRARY__PREFIX_LENGTH_VARINT
} from '../../lib/encoder/string/decode'

import {
  BoundedOptions,
  RoofOptions,
  FloorOptions
} from '../../lib/encoder/string/options'

import {
  UINT8_MAX
} from '../../lib/utils/limits'

import {
  ResizableBuffer,
  EncodingContext,
  getDefaultEncodingContext
} from '../../lib/encoder'

tap.test('RFC3339_DATE_INTEGER_TRIPLET: should handle "2014-10-01"', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(4))
  const bytesWritten: number =
    ENCODE_RFC3339_DATE_INTEGER_TRIPLET(buffer, 0, '2014-10-01', {}, context)
  test.is(bytesWritten, 4)
  const result: StringResult = DECODE_RFC3339_DATE_INTEGER_TRIPLET(buffer, 0, {})
  test.is(result.bytes, bytesWritten)
  test.is(result.value, '2014-10-01')
  test.end()
})

tap.test('ARBITRARY__PREFIX_LENGTH_VARINT: should handle " "', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(2048))
  const bytesWritten: number = ENCODE_ARBITRARY__PREFIX_LENGTH_VARINT(buffer, 0, ' ', {}, context)
  test.is(bytesWritten, 2)
  const result: StringResult = DECODE_ARBITRARY__PREFIX_LENGTH_VARINT(buffer, 0, {})
  test.is(result.bytes, 2)
  test.is(result.value, ' ')
  test.end()
})

tap.test('BOUNDED__PREFIX_LENGTH_8BIT_FIXED (ASCII)', (test) => {
  const arbitrary = fc.nat(UINT8_MAX - 1).chain((maximum: number) => {
    return fc.tuple(
      fc.nat(10),
      fc.nat(maximum),
      fc.constant(maximum),
      fc.string({
        maxLength: maximum
      })
    )
  })

  fc.assert(fc.property(arbitrary, ([ offset, minimum, maximum, value ]): boolean => {
    fc.pre(Buffer.byteLength(value, 'utf8') >= minimum)
    const context: EncodingContext = getDefaultEncodingContext()
    const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(offset + UINT8_MAX + 1))
    const bytesWritten: number = ENCODE_BOUNDED__PREFIX_LENGTH_8BIT_FIXED(
      buffer, offset, value, {
        minimum, maximum
      }, context)
    const result: StringResult = DECODE_BOUNDED__PREFIX_LENGTH_8BIT_FIXED(
      buffer, offset, {
        minimum, maximum
      })
    return bytesWritten > 0 && result.bytes === bytesWritten && result.value === value
  }), {
    verbose: false
  })

  test.end()
})

tap.test('BOUNDED__PREFIX_LENGTH_ENUM_VARINT (ASCII)', (test) => {
  const arbitrary = fc.nat(1000).chain((maximum: number) => {
    return fc.tuple(
      fc.nat(10),
      fc.nat(maximum),
      fc.constant(maximum),
      fc.string({
        maxLength: maximum
      })
    )
  })

  fc.assert(fc.property(arbitrary, ([ offset, minimum, maximum, value ]): boolean => {
    fc.pre(Buffer.byteLength(value, 'utf8') >= minimum)
    const context: EncodingContext = getDefaultEncodingContext()
    const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(2048))
    const bytesWritten: number =
      ENCODE_BOUNDED__PREFIX_LENGTH_ENUM_VARINT(buffer, offset, value, {
        minimum, maximum
      }, context)
    const result: StringResult =
      DECODE_BOUNDED__PREFIX_LENGTH_ENUM_VARINT(buffer, offset, {
        minimum, maximum
      })
    return bytesWritten > 0 && result.bytes === bytesWritten && result.value === value
  }), {
    verbose: false
  })

  test.end()
})

tap.test('ROOF__PREFIX_LENGTH_8BIT_FIXED (ASCII)', (test) => {
  const arbitrary = fc.nat(UINT8_MAX - 1).chain((maximum: number) => {
    return fc.tuple(
      fc.nat(10),
      fc.constant(maximum),
      fc.string({
        maxLength: maximum
      })
    )
  })

  fc.assert(fc.property(arbitrary, ([ offset, maximum, value ]): boolean => {
    const context: EncodingContext = getDefaultEncodingContext()
    const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(offset + UINT8_MAX + 1))
    const bytesWritten: number =
      ENCODE_ROOF__PREFIX_LENGTH_8BIT_FIXED(buffer, offset, value, {
        maximum
      }, context)
    const result: StringResult =
      DECODE_ROOF__PREFIX_LENGTH_8BIT_FIXED(buffer, offset, {
        maximum
      })
    return bytesWritten > 0 && result.bytes === bytesWritten && result.value === value
  }), {
    verbose: false
  })

  test.end()
})

tap.test('ROOF__PREFIX_LENGTH_ENUM_VARINT (ASCII)', (test) => {
  const arbitrary = fc.nat(1000).chain((maximum: number) => {
    return fc.tuple(
      fc.nat(10),
      fc.constant(maximum),
      fc.string({
        maxLength: maximum
      })
    )
  })

  fc.assert(fc.property(arbitrary, ([ offset, maximum, value ]): boolean => {
    const context: EncodingContext = getDefaultEncodingContext()
    const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(2048))
    const bytesWritten: number =
      ENCODE_ROOF__PREFIX_LENGTH_ENUM_VARINT(buffer, offset, value, {
        maximum
      }, context)
    const result: StringResult =
      DECODE_ROOF__PREFIX_LENGTH_ENUM_VARINT(buffer, offset, {
        maximum
      })

    return bytesWritten > 0 && result.bytes === bytesWritten && result.value === value
  }), {
    verbose: false
  })

  test.end()
})

tap.test('FLOOR__PREFIX_LENGTH_ENUM_VARINT (ASCII)', (test) => {
  const arbitrary = fc.nat(2000).chain((minimum: number) => {
    return fc.tuple(
      fc.nat(10),
      fc.constant(minimum),
      fc.string({
        minLength: minimum, maxLength: 2000
      })
    )
  })

  fc.assert(fc.property(arbitrary, ([ offset, minimum, value ]): boolean => {
    const context: EncodingContext = getDefaultEncodingContext()
    const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(2048))
    const bytesWritten: number =
      ENCODE_FLOOR__PREFIX_LENGTH_ENUM_VARINT(buffer, offset, value, {
        minimum
      }, context)
    const result: StringResult =
      DECODE_FLOOR__PREFIX_LENGTH_ENUM_VARINT(buffer, offset, {
        minimum
      })
    return bytesWritten > 0 && result.bytes === bytesWritten && result.value === value
  }), {
    verbose: false
  })

  test.end()
})

tap.test('ARBITRARY__PREFIX_LENGTH_VARINT (ASCII)', (test) => {
  fc.assert(fc.property(fc.nat(10), fc.string({
    maxLength: 1000
  }), (
    offset: number, value: string
  ): boolean => {
    const context: EncodingContext = getDefaultEncodingContext()
    const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(2048))
    const bytesWritten: number =
      ENCODE_ARBITRARY__PREFIX_LENGTH_VARINT(buffer, offset, value, {}, context)
    const result: StringResult =
      DECODE_ARBITRARY__PREFIX_LENGTH_VARINT(buffer, offset, {})
    return bytesWritten > 0 && result.bytes === bytesWritten && result.value === value
  }), {
    verbose: false
  })

  test.end()
})

tap.test('BOUNDED__PREFIX_LENGTH_8BIT_FIXED: shared string', (
  test
) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(7))
  const options: BoundedOptions = {
    minimum: 0,
    maximum: 4
  }

  const bytesWritten1: number = ENCODE_BOUNDED__PREFIX_LENGTH_8BIT_FIXED(
    buffer, 0, 'foo', options, context)

  const bytesWritten2: number = ENCODE_BOUNDED__PREFIX_LENGTH_8BIT_FIXED(
    buffer, bytesWritten1, 'foo', options, context)

  test.is(bytesWritten1, 4)
  test.is(bytesWritten2, 3)

  const decode1: StringResult = DECODE_BOUNDED__PREFIX_LENGTH_8BIT_FIXED(
    buffer, 0, options)

  test.is(decode1.bytes, bytesWritten1)
  test.is(decode1.value, 'foo')

  const decode2: StringResult = DECODE_BOUNDED__PREFIX_LENGTH_8BIT_FIXED(
    buffer, decode1.bytes, options)

  test.is(decode2.bytes, bytesWritten2)
  test.is(decode2.value, 'foo')

  test.end()
})

tap.test('BOUNDED__PREFIX_LENGTH_ENUM_VARINT: shared string', (
  test
) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(7))
  const options: BoundedOptions = {
    minimum: 0,
    maximum: 4
  }

  const bytesWritten1: number = ENCODE_BOUNDED__PREFIX_LENGTH_ENUM_VARINT(
    buffer, 0, 'foo', options, context)

  const bytesWritten2: number = ENCODE_BOUNDED__PREFIX_LENGTH_ENUM_VARINT(
    buffer, bytesWritten1, 'foo', options, context)

  test.is(bytesWritten1, 4)
  test.is(bytesWritten2, 3)

  const decode1: StringResult = DECODE_BOUNDED__PREFIX_LENGTH_ENUM_VARINT(
    buffer, 0, options)

  test.is(decode1.bytes, bytesWritten1)
  test.is(decode1.value, 'foo')

  const decode2: StringResult = DECODE_BOUNDED__PREFIX_LENGTH_ENUM_VARINT(
    buffer, decode1.bytes, options)

  test.is(decode2.bytes, bytesWritten2)
  test.is(decode2.value, 'foo')

  test.end()
})

tap.test('ROOF__PREFIX_LENGTH_8BIT_FIXED: shared string', (
  test
) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(7))
  const options: RoofOptions = {
    maximum: 4
  }

  const bytesWritten1: number = ENCODE_ROOF__PREFIX_LENGTH_8BIT_FIXED(
    buffer, 0, 'foo', options, context)

  const bytesWritten2: number = ENCODE_ROOF__PREFIX_LENGTH_8BIT_FIXED(
    buffer, bytesWritten1, 'foo', options, context)

  test.is(bytesWritten1, 4)
  test.is(bytesWritten2, 3)

  const decode1: StringResult = DECODE_ROOF__PREFIX_LENGTH_8BIT_FIXED(
    buffer, 0, options)

  test.is(decode1.bytes, bytesWritten1)
  test.is(decode1.value, 'foo')

  const decode2: StringResult = DECODE_ROOF__PREFIX_LENGTH_8BIT_FIXED(
    buffer, decode1.bytes, options)

  test.is(decode2.bytes, bytesWritten2)
  test.is(decode2.value, 'foo')

  test.end()
})

tap.test('ROOF__PREFIX_LENGTH_ENUM_VARINT: shared string', (
  test
) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(7))
  const options: RoofOptions = {
    maximum: 4
  }

  const bytesWritten1: number = ENCODE_ROOF__PREFIX_LENGTH_ENUM_VARINT(
    buffer, 0, 'foo', options, context)

  const bytesWritten2: number = ENCODE_ROOF__PREFIX_LENGTH_ENUM_VARINT(
    buffer, bytesWritten1, 'foo', options, context)

  test.is(bytesWritten1, 4)
  test.is(bytesWritten2, 3)

  const decode1: StringResult = DECODE_ROOF__PREFIX_LENGTH_ENUM_VARINT(
    buffer, 0, options)

  test.is(decode1.bytes, bytesWritten1)
  test.is(decode1.value, 'foo')

  const decode2: StringResult = DECODE_ROOF__PREFIX_LENGTH_ENUM_VARINT(
    buffer, decode1.bytes, options)

  test.is(decode2.bytes, bytesWritten2)
  test.is(decode2.value, 'foo')

  test.end()
})

tap.test('FLOOR__PREFIX_LENGTH_ENUM_VARINT: shared string', (
  test
) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(7))
  const options: FloorOptions = {
    minimum: 2
  }

  const bytesWritten1: number = ENCODE_FLOOR__PREFIX_LENGTH_ENUM_VARINT(
    buffer, 0, 'foo', options, context)

  const bytesWritten2: number = ENCODE_FLOOR__PREFIX_LENGTH_ENUM_VARINT(
    buffer, bytesWritten1, 'foo', options, context)

  test.is(bytesWritten1, 4)
  test.is(bytesWritten2, 3)

  const decode1: StringResult = DECODE_FLOOR__PREFIX_LENGTH_ENUM_VARINT(
    buffer, 0, options)

  test.is(decode1.bytes, bytesWritten1)
  test.is(decode1.value, 'foo')

  const decode2: StringResult = DECODE_FLOOR__PREFIX_LENGTH_ENUM_VARINT(
    buffer, decode1.bytes, options)

  test.is(decode2.bytes, bytesWritten2)
  test.is(decode2.value, 'foo')

  test.end()
})

tap.test('ARBITRARY__PREFIX_LENGTH_VARINT: shared string', (
  test
) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(7))

  const bytesWritten1: number = ENCODE_ARBITRARY__PREFIX_LENGTH_VARINT(
    buffer, 0, 'foo', {}, context)

  const bytesWritten2: number = ENCODE_ARBITRARY__PREFIX_LENGTH_VARINT(
    buffer, bytesWritten1, 'foo', {}, context)

  test.is(bytesWritten1, 4)
  test.is(bytesWritten2, 3)

  const decode1: StringResult = DECODE_ARBITRARY__PREFIX_LENGTH_VARINT(
    buffer, 0, {})

  test.is(decode1.bytes, bytesWritten1)
  test.is(decode1.value, 'foo')

  const decode2: StringResult = DECODE_ARBITRARY__PREFIX_LENGTH_VARINT(
    buffer, decode1.bytes, {})

  test.is(decode2.bytes, bytesWritten2)
  test.is(decode2.value, 'foo')

  test.end()
})
