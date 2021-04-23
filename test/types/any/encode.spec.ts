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
  ANY__TYPE_PREFIX
} from '../../../lib/types/any/encode'

tap.test('ANY__TYPE_PREFIX: should encode null as 0x07', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(1)
  const bytesWritten: number = ANY__TYPE_PREFIX(buffer, 0, null, {})
  test.strictSame(buffer, Buffer.from([ 0x07 ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('ANY__TYPE_PREFIX: should encode false as 0x06', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(1)
  const bytesWritten: number = ANY__TYPE_PREFIX(buffer, 0, false, {})
  test.strictSame(buffer, Buffer.from([ 0x06 ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('ANY__TYPE_PREFIX: should encode true as 0x05', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(1)
  const bytesWritten: number = ANY__TYPE_PREFIX(buffer, 0, true, {})
  test.strictSame(buffer, Buffer.from([ 0x05 ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('ANY__TYPE_PREFIX: should encode "foo" as 0x00 0x03 + string', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(5)
  const bytesWritten: number = ANY__TYPE_PREFIX(buffer, 0, 'foo', {})
  test.strictSame(buffer, Buffer.from([ 0x00, 0x03, 0x66, 0x6f, 0x6f ]))
  test.is(bytesWritten, 5)
  test.end()
})
