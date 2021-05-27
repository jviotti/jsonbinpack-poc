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
  DOUBLE__IEEE764_LE,
  DOUBLE_VARINT_TRIPLET
} from '../../../lib/types/number/encode'

import {
  EncodingContext,
  getDefaultEncodingContext
} from '../../../lib/context'

import ResizableBuffer from '../../../lib/utils/resizable-buffer'

tap.test('DOUBLE__IEEE764_LE: should encode 3.14 as 1f 85 eb 51 b8 1e 09 40', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(8))
  const bytesWritten: number = DOUBLE__IEEE764_LE(buffer, 0, 3.14, {}, context)
  test.strictSame(buffer.getBuffer(), Buffer.from([ 0x1f, 0x85, 0xeb, 0x51, 0xb8, 0x1e, 0x09, 0x40 ]))
  test.is(bytesWritten, 8)
  test.end()
})

tap.test('DOUBLE_VARINT_TRIPLET: should encode a positive real number', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(3))
  const bytesWritten: number = DOUBLE_VARINT_TRIPLET(buffer, 0, 3.14, {}, context)
  test.strictSame(buffer.getBuffer(), Buffer.from([ 0xf4, 0x04, 0x02 ]))
  test.is(bytesWritten, 3)
  test.end()
})

tap.test('DOUBLE_VARINT_TRIPLET: should encode a positive integer', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(2))
  const bytesWritten: number = DOUBLE_VARINT_TRIPLET(buffer, 0, 5, {}, context)
  test.strictSame(buffer.getBuffer(), Buffer.from([ 0x0a, 0x00 ]))
  test.is(bytesWritten, 2)
  test.end()
})

tap.test('DOUBLE_VARINT_TRIPLET: should encode a negative real number', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(3))
  const bytesWritten: number = DOUBLE_VARINT_TRIPLET(buffer, 0, -3.14, {}, context)
  test.strictSame(buffer.getBuffer(), Buffer.from([ 0xf3, 0x04, 0x04 ]))
  test.is(bytesWritten, 3)
  test.end()
})

tap.test('DOUBLE_VARINT_TRIPLET: should encode a negative integer', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(2))
  const bytesWritten: number = DOUBLE_VARINT_TRIPLET(buffer, 0, -5, {}, context)
  test.strictSame(buffer.getBuffer(), Buffer.from([ 0x09, 0x00 ]))
  test.is(bytesWritten, 2)
  test.end()
})

tap.test('DOUBLE_VARINT_TRIPLET: should encode zero', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(2))
  const bytesWritten: number = DOUBLE_VARINT_TRIPLET(buffer, 0, 0, {}, context)
  test.strictSame(buffer.getBuffer(), Buffer.from([ 0x00, 0x09 ]))
  test.is(bytesWritten, 2)
  test.end()
})

tap.test('DOUBLE_VARINT_TRIPLET: should encode a positive real number with an exponent', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(9))
  const bytesWritten: number = DOUBLE_VARINT_TRIPLET(buffer, 0, 2.980232223226409e-7, {}, context)
  test.strictSame(buffer.getBuffer(),
    Buffer.from([ 0xd2, 0xe8, 0x9b, 0xb0, 0xac, 0xa0, 0xcb, 0x0a, 0x0d ]))
  test.is(bytesWritten, 9)
  test.end()
})
