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
  strict as assert
} from 'assert'

import {
  BOUNDED_8BITS__ENUM_FIXED,
  BOUNDED__ENUM_VARINT,
  FLOOR__ENUM_VARINT
} from '../integer/encode'

const STRING_ENCODING: BufferEncoding = 'utf8'

// TODO: BOUNDED 8bit
// TODO: BOUNDED >8bit

export const ROOF__PREFIX_LENGTH_8BIT_FIXED = (
  buffer: Buffer, offset: number, value: string, maximum: number
): number => {
  assert(maximum >= 0)
  assert(maximum <= 255)
  const length: number = Buffer.byteLength(value, STRING_ENCODING)
  const bytesWritten: number = BOUNDED_8BITS__ENUM_FIXED(buffer, offset, length, 0, maximum)
  return buffer.write(value, offset + bytesWritten,
    length, STRING_ENCODING) + bytesWritten
}

export const ROOF__PREFIX_LENGTH_ENUM_VARINT = (
  buffer: Buffer, offset: number, value: string, maximum: number
): number => {
  assert(maximum >= 0)
  const length: number = Buffer.byteLength(value, STRING_ENCODING)
  const bytesWritten: number = BOUNDED__ENUM_VARINT(buffer, offset, length, 0, maximum)
  return buffer.write(value, offset + bytesWritten,
    length, STRING_ENCODING) + bytesWritten
}

export const FLOOR__PREFIX_LENGTH_ENUM_VARINT = (
  buffer: Buffer, offset: number, value: string, minimum: number
): number => {
  assert(minimum >= 0)
  const length: number = Buffer.byteLength(value, STRING_ENCODING)
  assert(length >= minimum)
  const bytesWritten: number = FLOOR__ENUM_VARINT(buffer, offset, length, minimum)
  return buffer.write(value, offset + bytesWritten,
    length, STRING_ENCODING) + bytesWritten
}

export const ARBITRARY__PREFIX_LENGTH_VARINT = (
  buffer: Buffer, offset: number, value: string
): number => {
  return FLOOR__PREFIX_LENGTH_ENUM_VARINT(buffer, offset, value, 0)
}
