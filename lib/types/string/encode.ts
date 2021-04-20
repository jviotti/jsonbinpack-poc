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

import {
  FLOOR__ENUM_VARINT
} from '../integer/encode'

const STRING_ENCODING: BufferEncoding = 'utf8'

export const ARBITRARY__PREFIX_LENGTH_VARINT = (
  buffer: Buffer, offset: number, value: string
): number => {
  const length: number = Buffer.byteLength(value, STRING_ENCODING)
  const bytesWritten: number = FLOOR__ENUM_VARINT(buffer, offset, length, 0)
  return buffer.write(value, offset + bytesWritten,
    length, STRING_ENCODING) + bytesWritten
}
