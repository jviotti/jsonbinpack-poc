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
  JSONString
} from '../../json'

import {
  strict as assert
} from 'assert'

import {
  IntegerResult,
  BOUNDED_8BITS__ENUM_FIXED,
  BOUNDED__ENUM_VARINT,
  FLOOR__ENUM_VARINT,
  ROOF__MIRROR_ENUM_VARINT
} from '../integer/decode'

import {
  NoOptions,
  BoundedOptions,
  RoofOptions,
  FloorOptions
} from './options'

import {
  UINT8_MAX
} from '../../utils/limits'

import {
  DecodeResult
} from '../base'

export interface StringResult extends DecodeResult {
  readonly value: JSONString;
  readonly bytes: number;
}

const STRING_ENCODING: BufferEncoding = 'utf8'

const readSharedString = (
  buffer: ResizableBuffer, offset: number, prefix: IntegerResult, length: IntegerResult
): StringResult => {
  const pointerOffset: number = offset + prefix.bytes + length.bytes
  const pointer: IntegerResult = FLOOR__ENUM_VARINT(buffer, pointerOffset, {
    minimum: 0
  })

  const stringOffset: number = pointerOffset - pointer.value
  return {
    value: buffer.toString(
      STRING_ENCODING, stringOffset, stringOffset + length.value - 1),
    bytes: prefix.bytes + length.bytes + pointer.bytes
  }
}

export const BOUNDED__PREFIX_LENGTH_8BIT_FIXED = (
  buffer: ResizableBuffer, offset: number, options: BoundedOptions
): StringResult => {
  assert(options.minimum >= 0)
  assert(options.maximum >= options.minimum)
  assert(options.maximum - options.minimum <= UINT8_MAX)
  const prefix: IntegerResult = BOUNDED_8BITS__ENUM_FIXED(buffer, offset, {
    minimum: options.minimum,
    maximum: options.maximum + 1
  })

  if (prefix.value === 0) {
    const length: IntegerResult = BOUNDED_8BITS__ENUM_FIXED(
      buffer, offset + prefix.bytes, {
        minimum: options.minimum,
        maximum: options.maximum + 1
      })

    return readSharedString(buffer, offset, prefix, length)
  }

  return {
    value: buffer.toString(
      STRING_ENCODING, offset + prefix.bytes, offset + prefix.bytes + prefix.value - 1),
    bytes: prefix.bytes + prefix.value - 1
  }
}

export const BOUNDED__PREFIX_LENGTH_ENUM_VARINT = (
  buffer: ResizableBuffer, offset: number, options: BoundedOptions
): StringResult => {
  assert(options.minimum >= 0)
  assert(options.maximum >= options.minimum)
  const length: IntegerResult = BOUNDED__ENUM_VARINT(buffer, offset, {
    minimum: options.minimum,
    maximum: options.maximum + 1
  })
  return {
    value: buffer.toString(
      STRING_ENCODING, offset + length.bytes, offset + length.bytes + length.value - 1),
    bytes: length.bytes + length.value - 1
  }
}

export const ROOF__PREFIX_LENGTH_8BIT_FIXED = (
  buffer: ResizableBuffer, offset: number, options: RoofOptions
): StringResult => {
  assert(options.maximum >= 0)
  assert(options.maximum <= UINT8_MAX)
  return BOUNDED__PREFIX_LENGTH_8BIT_FIXED(buffer, offset, {
    minimum: 0,
    maximum: options.maximum
  })
}

export const ROOF__PREFIX_LENGTH_ENUM_VARINT = (
  buffer: ResizableBuffer, offset: number, options: RoofOptions
): StringResult => {
  assert(options.maximum >= 0)
  const length: IntegerResult = ROOF__MIRROR_ENUM_VARINT(buffer, offset, options)
  return {
    value: buffer.toString(
      STRING_ENCODING, offset + length.bytes, offset + length.bytes + length.value + 1),
    bytes: length.bytes + length.value + 1
  }
}

export const FLOOR__PREFIX_LENGTH_ENUM_VARINT = (
  buffer: ResizableBuffer, offset: number, options: FloorOptions
): StringResult => {
  assert(options.minimum >= 0)
  const length: IntegerResult = FLOOR__ENUM_VARINT(buffer, offset, options)
  return {
    value: buffer.toString(
      STRING_ENCODING, offset + length.bytes, offset + length.bytes + length.value - 1),
    bytes: length.bytes + length.value - 1
  }
}

export const ARBITRARY__PREFIX_LENGTH_VARINT = (
  buffer: ResizableBuffer, offset: number, _options: NoOptions
): StringResult => {
  return FLOOR__PREFIX_LENGTH_ENUM_VARINT(buffer, offset, {
    minimum: 0
  })
}
