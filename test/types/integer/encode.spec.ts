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
  BOUNDED
} from '../../../lib/types/integer/encode'

tap.test('BOUNDED should encode 5 (0..10)', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(1)
  const offset: number = 0
  BOUNDED(buffer, offset, 5, 0, 10)
  test.strictSame(buffer, Buffer.from([ 0b00000101 ]))
  test.end()
})

tap.test('BOUNDED should encode 5 (5..10)', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(1)
  const offset: number = 0
  BOUNDED(buffer, offset, 5, 5, 10)
  test.strictSame(buffer, Buffer.from([ 0b00000000 ]))
  test.end()
})

tap.test('BOUNDED should encode 5 (4..10)', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(1)
  const offset: number = 0
  BOUNDED(buffer, offset, 5, 4, 10)
  test.strictSame(buffer, Buffer.from([ 0b00000001 ]))
  test.end()
})

tap.test('BOUNDED should encode 0 (0..0)', (test) => {
  const buffer: Buffer = Buffer.alloc(1, 0)
  const offset: number = 0
  BOUNDED(buffer, offset, 0, 0, 0)
  test.strictSame(buffer, Buffer.from([ 0b00000000 ]))
  test.end()
})

tap.test('BOUNDED should encode 5 (5..5)', (test) => {
  const buffer: Buffer = Buffer.alloc(1, 0)
  const offset: number = 0
  BOUNDED(buffer, offset, 5, 5, 5)
  test.strictSame(buffer, Buffer.from([ 0b00000000 ]))
  test.end()
})

tap.test('BOUNDED should encode -5 (-5..-5)', (test) => {
  const buffer: Buffer = Buffer.alloc(1, 0)
  const offset: number = 0
  BOUNDED(buffer, offset, -5, -5, -5)
  test.strictSame(buffer, Buffer.from([ 0b00000000 ]))
  test.end()
})

tap.test('BOUNDED should encode -2 (-5..10)', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(1)
  const offset: number = 0
  BOUNDED(buffer, offset, -2, -5, 10)
  test.strictSame(buffer, Buffer.from([ 0b00000011 ]))
  test.end()
})

tap.test('BOUNDED should encode -2 (-5..-1)', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(1)
  const offset: number = 0
  BOUNDED(buffer, offset, -2, -5, -1)
  test.strictSame(buffer, Buffer.from([ 0b00000011 ]))
  test.end()
})

tap.test('BOUNDED should encode 5 (0..65535)', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(2)
  const offset: number = 0
  BOUNDED(buffer, offset, 5, 0, 65535)
  test.strictSame(buffer, Buffer.from([ 0b00000101, 0x00000000 ]))
  test.end()
})
