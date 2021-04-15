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
  BOUNDED_8BITS__ENUM_FIXED,
  BOUNDED__ENUM_VARINT,
  FLOOR__ENUM_VARINT,
  ROOF__MIRROR_ENUM_VARINT,
  ROOF_MULTIPLE__MIRROR_ENUM_VARINT,
  ARBITRARY__ZIGZAG_VARINT,
  ARBITRARY_MULTIPLE__ZIGZAG_VARINT,
} from '../../../lib/types/integer/encode'

tap.test('BOUNDED_8BITS__ENUM_FIXED: should encode -5 (-5..-1) as 0x00', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(1)
  const bytesWritten: number = BOUNDED_8BITS__ENUM_FIXED(buffer, 0, -5, -5, -1)
  test.strictSame(buffer, Buffer.from([ 0x00 ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('BOUNDED_8BITS__ENUM_FIXED: should encode 2 (-5..5) as 0x07', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(1)
  const bytesWritten: number = BOUNDED_8BITS__ENUM_FIXED(buffer, 0, 2, -5, 5)
  test.strictSame(buffer, Buffer.from([ 0x07 ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('BOUNDED_8BITS__ENUM_FIXED: should encode 5 (2..8) as 0x03', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(1)
  const bytesWritten: number = BOUNDED_8BITS__ENUM_FIXED(buffer, 0, 5, 2, 8)
  test.strictSame(buffer, Buffer.from([ 0x03 ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('BOUNDED__ENUM_VARINT: should encode -5 (-5..-1) as 0x00', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(1)
  const bytesWritten: number = BOUNDED__ENUM_VARINT(buffer, 0, -5, -5, -1)
  test.strictSame(buffer, Buffer.from([ 0x00 ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('BOUNDED__ENUM_VARINT: should encode 2 (-5..5) as 0x07', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(1)
  const bytesWritten: number = BOUNDED__ENUM_VARINT(buffer, 0, 2, -5, 5)
  test.strictSame(buffer, Buffer.from([ 0x07 ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('BOUNDED__ENUM_VARINT: should encode 5 (2..8) as 0x03', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(1)
  const bytesWritten: number = BOUNDED__ENUM_VARINT(buffer, 0, 5, 2, 8)
  test.strictSame(buffer, Buffer.from([ 0x03 ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('FLOOR__ENUM_VARINT: should encode -3 (-10..) as 0x07', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(1)
  const bytesWritten: number = FLOOR__ENUM_VARINT(buffer, 0, -3, -10)
  test.strictSame(buffer, Buffer.from([ 0x07 ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('FLOOR__ENUM_VARINT: should encode 5 (2..) as 0x03', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(1)
  const bytesWritten: number = FLOOR__ENUM_VARINT(buffer, 0, 5, 2)
  test.strictSame(buffer, Buffer.from([ 0x03 ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('ROOF__MIRROR_ENUM_VARINT: should encode -3 (..-2) as 0x01', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(1)
  const bytesWritten: number = ROOF__MIRROR_ENUM_VARINT(buffer, 0, -3, -2)
  test.strictSame(buffer, Buffer.from([ 0x01 ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('ROOF__MIRROR_ENUM_VARINT: should encode 8 (..10) as 0x02', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(1)
  const bytesWritten: number = ROOF__MIRROR_ENUM_VARINT(buffer, 0, 8, 10)
  test.strictSame(buffer, Buffer.from([ 0x02 ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('ROOF_MULTIPLE__MIRROR_ENUM_VARINT: should encode -15 (..-5) / -5 as 0x02', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(1)
  const bytesWritten: number = ROOF_MULTIPLE__MIRROR_ENUM_VARINT(buffer, 0, -15, -5, -5)
  test.strictSame(buffer, Buffer.from([ 0x02 ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('ROOF_MULTIPLE__MIRROR_ENUM_VARINT: should encode 5 (..16) / 5 as 0x02', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(1)
  const bytesWritten: number = ROOF_MULTIPLE__MIRROR_ENUM_VARINT(buffer, 0, 5, 16, 5)
  test.strictSame(buffer, Buffer.from([ 0x02 ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('ROOF_MULTIPLE__MIRROR_ENUM_VARINT: should encode 10 (..15) / 5 as 0x01', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(1)
  const bytesWritten: number = ROOF_MULTIPLE__MIRROR_ENUM_VARINT(buffer, 0, 10, 15, 5)
  test.strictSame(buffer, Buffer.from([ 0x01 ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('ROOF_MULTIPLE__MIRROR_ENUM_VARINT: should encode 10 (..15) / -5 as 0x01', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(1)
  const bytesWritten: number = ROOF_MULTIPLE__MIRROR_ENUM_VARINT(buffer, 0, 10, 15, -5)
  test.strictSame(buffer, Buffer.from([ 0x01 ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('ARBITRARY__ZIGZAG_VARINT: should encode -25200 as 0xdf 0x89 0x03', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(3)
  const bytesWritten: number = ARBITRARY__ZIGZAG_VARINT(buffer, 0, -25200)
  test.strictSame(buffer, Buffer.from([ 0xdf, 0x89, 0x03 ]))
  test.is(bytesWritten, 3)
  test.end()
})

tap.test('ARBITRARY_MULTIPLE__ZIGZAG_VARINT: should encode 10 / 5  as 0x04', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(1)
  const bytesWritten: number = ARBITRARY_MULTIPLE__ZIGZAG_VARINT(buffer, 0, 10, 5)
  test.strictSame(buffer, Buffer.from([ 0x04 ]))
  test.is(bytesWritten, 1)
  test.end()
})
