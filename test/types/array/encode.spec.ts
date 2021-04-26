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
  UNBOUNDED_UNTYPED__LENGTH_PREFIX
} from '../../../lib/types/array/encode'

tap.test('UNBOUNDED_UNTYPED__LENGTH_PREFIX: should encode [ "foo", true, 2000 ]', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(10)
  const bytesWritten: number = UNBOUNDED_UNTYPED__LENGTH_PREFIX(buffer, 0, [
    'foo', true, 2000
  ], {})

  test.strictSame(buffer, Buffer.from([
    0x03, // array length
    0x00, 0x03, 0x66, 0x6f, 0x6f, // "foo"
    0x04, // true
    0x07, 0xd0, 0x0f // 2000
  ]))

  test.is(bytesWritten, 10)
  test.end()
})
