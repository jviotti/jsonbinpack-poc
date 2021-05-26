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
  DOUBLE__IEEE764_LE as ENCODE_DOUBLE__IEEE764_LE,
  DOUBLE_VARINT_TRIPLET as ENCODE_DOUBLE_VARINT_TRIPLET
} from '../../lib/types/number/encode'

import {
  NumberResult,
  DOUBLE__IEEE764_LE as DECODE_DOUBLE__IEEE764_LE,
  DOUBLE_VARINT_TRIPLET as DECODE_DOUBLE_VARINT_TRIPLET
} from '../../lib/types/number/decode'

import {
  EncodingContext,
  getDefaultEncodingContext
} from '../../lib/context'

import ResizableBuffer from '../../lib/utils/resizable-buffer'

tap.test('DOUBLE__IEEE764_LE', (test) => {
  fc.assert(fc.property(fc.nat(10), fc.double(), (offset: number, value: number): boolean => {
    const context: EncodingContext = getDefaultEncodingContext()
    const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(offset + 8))
    const bytesWritten: number = ENCODE_DOUBLE__IEEE764_LE(buffer, offset, value, {}, context)
    const result: NumberResult = DECODE_DOUBLE__IEEE764_LE(buffer, offset, {})
    return bytesWritten === 8 && result.bytes === bytesWritten && result.value === value
  }), {
    verbose: false
  })

  test.end()
})

tap.test('DOUBLE_VARINT_TRIPLET: 2.980232223226409e-7', (test) => {
  const offset: number = 0

  // This equals 0.0000002980232223226409
  const value: number = 2.980232223226409e-7

  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(10))
  const bytesWritten: number = ENCODE_DOUBLE_VARINT_TRIPLET(buffer, offset, value, {}, context)
  const result: NumberResult = DECODE_DOUBLE_VARINT_TRIPLET(buffer, offset, {})

  test.is(bytesWritten, 10)
  test.is(result.bytes, bytesWritten)
  test.is(result.value, value)

  test.end()
})
