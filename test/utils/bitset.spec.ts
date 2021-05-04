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
  bitsetEncode,
  bitsetDecode
} from '../../lib/utils/bitset'

tap.test('should encode [ true ] as 0000 0001', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(1)
  const offset: number = 0
  const bits: boolean[] = [ true ]
  const bytesWritten: number = bitsetEncode(buffer, offset, bits)
  test.strictSame(buffer, Buffer.from([ 0b00000001 ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('should encode [ false, false, true, false, true ] as 0001 0100', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(1)
  const offset: number = 0
  const bits: boolean[] = [ false, false, true, false, true ]
  const bytesWritten: number = bitsetEncode(buffer, offset, bits)
  test.strictSame(buffer, Buffer.from([ 0b00010100 ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('should encode [ false, false, true, false, true, true, false, true, true ] as 1011 0100 0000 0001', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(2)
  const offset: number = 0
  const bits: boolean[] = [ false, false, true, false, true, true, false, true, true ]
  const bytesWritten: number = bitsetEncode(buffer, offset, bits)
  test.strictSame(buffer, Buffer.from([ 0b10110100, 0b00000001 ]))
  test.is(bytesWritten, 2)
  test.end()
})

// TODO: Use fast-check to generate arrays of booleans

tap.test('should decode 0000 0001 as [ true ]', (test) => {
  const offset: number = 0
  const buffer: Buffer = Buffer.from([ 0b00000001 ])
  const bits: boolean[] = bitsetDecode(buffer, offset, 1)
  test.strictSame(bits, [ true ])
  test.end()
})

tap.test('should decode 0001 0100 as [ false, false, true, false, true ]', (test) => {
  const offset: number = 0
  const buffer: Buffer = Buffer.from([ 0b00010100 ])
  const bits: boolean[] = bitsetDecode(buffer, offset, 5)
  test.strictSame(bits, [ false, false, true, false, true ])
  test.end()
})
