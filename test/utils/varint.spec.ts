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
  varintEncode
} from '../../lib/utils/varint'

tap.test('should encode 1 as 0x01', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(1)
  const offset: number = 0
  const bytesWritten: number = varintEncode(buffer, offset, 1)
  test.strictSame(buffer, Buffer.from([ 0x01 ]))
  test.is(bytesWritten, 1)
  test.end()
})

tap.test('should encode 300 as 0xAC 0x02', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(2)
  const offset: number = 0
  const bytesWritten: number = varintEncode(buffer, offset, 300)
  test.strictSame(buffer, Buffer.from([ 0xAC, 0x02 ]))
  test.is(bytesWritten, 2)
  test.end()
})
