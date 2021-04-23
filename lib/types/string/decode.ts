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
  JSONString
} from '../../json'

import {
  strict as assert
} from 'assert'

import {
  IntegerResult,
  BOUNDED_8BITS__ENUM_FIXED,
  BOUNDED__ENUM_VARINT,
  FLOOR__ENUM_VARINT
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
} from '../../encoding'

export interface StringResult extends DecodeResult {
  readonly value: JSONString;
  readonly bytes: number;
}

const STRING_ENCODING: BufferEncoding = 'utf8'

export const BOUNDED__PREFIX_LENGTH_8BIT_FIXED = (
  buffer: Buffer, offset: number, options: BoundedOptions
): StringResult => {
  assert(options.minimum >= 0)
  assert(options.maximum >= options.minimum)
  assert(options.maximum - options.minimum <= UINT8_MAX)
  const length: IntegerResult = BOUNDED_8BITS__ENUM_FIXED(buffer, offset, options)
  return {
    value: buffer.toString(
      STRING_ENCODING, length.bytes, length.bytes + length.value),
    bytes: length.bytes + length.value
  }
}

export const BOUNDED__PREFIX_LENGTH_ENUM_VARINT = (
  buffer: Buffer, offset: number, options: BoundedOptions
): StringResult => {
  assert(options.minimum >= 0)
  assert(options.maximum >= options.minimum)
  const length: IntegerResult = BOUNDED__ENUM_VARINT(buffer, offset, options)
  return {
    value: buffer.toString(
      STRING_ENCODING, length.bytes, length.bytes + length.value),
    bytes: length.bytes + length.value
  }
}

export const ROOF__PREFIX_LENGTH_8BIT_FIXED = (
  buffer: Buffer, offset: number, options: RoofOptions
): StringResult => {
  assert(options.maximum >= 0)
  assert(options.maximum <= UINT8_MAX)
  return BOUNDED__PREFIX_LENGTH_8BIT_FIXED(buffer, offset, {
    minimum: 0,
    maximum: options.maximum
  })
}

export const ROOF__PREFIX_LENGTH_ENUM_VARINT = (
  buffer: Buffer, offset: number, options: RoofOptions
): StringResult => {
  return BOUNDED__PREFIX_LENGTH_ENUM_VARINT(buffer, offset, {
    minimum: 0,
    maximum: options.maximum
  })
}

export const FLOOR__PREFIX_LENGTH_ENUM_VARINT = (
  buffer: Buffer, offset: number, options: FloorOptions
): StringResult => {
  assert(options.minimum >= 0)
  const length: IntegerResult = FLOOR__ENUM_VARINT(buffer, offset, options)
  return {
    value: buffer.toString(
      STRING_ENCODING, length.bytes, length.bytes + length.value),
    bytes: length.bytes + length.value
  }
}

export const ARBITRARY__PREFIX_LENGTH_VARINT = (
  buffer: Buffer, offset: number, _options: NoOptions
): StringResult => {
  return FLOOR__PREFIX_LENGTH_ENUM_VARINT(buffer, offset, {
    minimum: 0
  })
}
