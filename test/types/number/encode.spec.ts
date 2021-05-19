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
  DOUBLE__IEEE764_LE
} from '../../../lib/types/number/encode'

import ResizableBuffer from '../../../lib/utils/resizable-buffer'

tap.test('DOUBLE__IEEE764_LE: should encode 3.14 as 1f 85 eb 51 b8 1e 09 40', (test) => {
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(8))
  const bytesWritten: number = DOUBLE__IEEE764_LE(buffer, 0, 3.14, {})
  test.strictSame(buffer.getBuffer(), Buffer.from([ 0x1f, 0x85, 0xeb, 0x51, 0xb8, 0x1e, 0x09, 0x40 ]))
  test.is(bytesWritten, 8)
  test.end()
})
