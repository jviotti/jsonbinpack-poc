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

import ResizableBuffer from '../../utils/resizable-buffer'

import {
  strict as assert
} from 'assert'

import {
  JSONString,
  JSONNumber
} from '../../json'

import {
  BOUNDED_8BITS__ENUM_FIXED,
  BOUNDED__ENUM_VARINT,
  FLOOR__ENUM_VARINT,
  ROOF__MIRROR_ENUM_VARINT
} from '../integer/encode'

import {
  UINT8_MIN,
  UINT8_MAX
} from '../../utils/limits'

import {
  NoOptions,
  BoundedOptions,
  RoofOptions,
  FloorOptions
} from './options'

// TODO: Consider de-duplicating strings by supporting
// new encodings that take an offset pointer instead
// of a string value?

const STRING_ENCODING: BufferEncoding = 'utf8'

export const BOUNDED__PREFIX_LENGTH_8BIT_FIXED = (
  buffer: ResizableBuffer, offset: number, value: JSONString, options: BoundedOptions
): number => {
  assert(options.minimum >= UINT8_MIN)
  assert(options.maximum >= 0)
  assert(options.maximum >= options.minimum)
  assert(options.maximum - options.minimum <= UINT8_MAX)
  const length: JSONNumber = Buffer.byteLength(value, STRING_ENCODING)
  assert(length <= options.maximum)
  const bytesWritten: number = BOUNDED_8BITS__ENUM_FIXED(buffer, offset, length, options)
  return buffer.write(value, offset + bytesWritten,
    length, STRING_ENCODING) + bytesWritten
}

export const BOUNDED__PREFIX_LENGTH_ENUM_VARINT = (
  buffer: ResizableBuffer, offset: number, value: JSONString, options: BoundedOptions
): number => {
  assert(options.minimum >= 0)
  assert(options.minimum <= options.maximum)
  assert(options.maximum >= 0)
  const length: JSONNumber = Buffer.byteLength(value, STRING_ENCODING)
  assert(length >= options.minimum)
  assert(length <= options.maximum)
  const bytesWritten: number = BOUNDED__ENUM_VARINT(buffer, offset, length, options)
  return buffer.write(value, offset + bytesWritten,
    length, STRING_ENCODING) + bytesWritten
}

export const ROOF__PREFIX_LENGTH_8BIT_FIXED = (
  buffer: ResizableBuffer, offset: number, value: JSONString, options: RoofOptions
): number => {
  assert(options.maximum >= 0)
  assert(options.maximum <= UINT8_MAX)
  return BOUNDED__PREFIX_LENGTH_8BIT_FIXED(buffer, offset, value, {
    minimum: 0,
    maximum: options.maximum
  })
}

export const ROOF__PREFIX_LENGTH_ENUM_VARINT = (
  buffer: ResizableBuffer, offset: number, value: JSONString, options: RoofOptions
): number => {
  const length: JSONNumber = Buffer.byteLength(value, STRING_ENCODING)
  assert(options.maximum >= 0)
  assert(length <= options.maximum)
  const bytesWritten: number = ROOF__MIRROR_ENUM_VARINT(buffer, offset, length, options)
  return buffer.write(value, offset + bytesWritten,
    length, STRING_ENCODING) + bytesWritten
}

export const FLOOR__PREFIX_LENGTH_ENUM_VARINT = (
  buffer: ResizableBuffer, offset: number, value: JSONString, options: FloorOptions
): number => {
  assert(options.minimum >= 0)
  const length: JSONNumber = Buffer.byteLength(value, STRING_ENCODING)
  assert(length >= options.minimum)
  const bytesWritten: number = FLOOR__ENUM_VARINT(buffer, offset, length, options)
  return buffer.write(value, offset + bytesWritten,
    length, STRING_ENCODING) + bytesWritten
}

export const ARBITRARY__PREFIX_LENGTH_VARINT = (
  buffer: ResizableBuffer, offset: number, value: JSONString, _options: NoOptions
): number => {
  return FLOOR__PREFIX_LENGTH_ENUM_VARINT(buffer, offset, value, {
    minimum: 0
  })
}
