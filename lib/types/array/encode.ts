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
  JSONValue
} from '../../json'

import {
  NoOptions,
  RoofOptions,
  FloorOptions,
  BoundedOptions
} from './options'

import {
  FLOOR__ENUM_VARINT,
  BOUNDED__ENUM_VARINT
} from '../integer/encode'

import {
  ANY__TYPE_PREFIX
} from '../any/encode'

export const BOUNDED_UNTYPED__LENGTH_PREFIX = (
  buffer: Buffer, offset: number, value: JSONValue[], options: BoundedOptions
): number => {
  assert(options.maximum >= 0)
  assert(options.minimum >= 0)
  assert(options.maximum >= options.minimum)
  assert(value.length >= options.minimum)
  assert(value.length <= options.maximum)

  const lengthBytes: number =
    BOUNDED__ENUM_VARINT(buffer, offset, value.length, {
      minimum: options.minimum,
      maximum: options.maximum
    })

  let bytesWritten = lengthBytes
  for (const element of value) {
    const elementBytes: number =
      ANY__TYPE_PREFIX(buffer, offset + bytesWritten, element, {})
    bytesWritten += elementBytes
  }

  return bytesWritten
}

export const FLOOR_UNTYPED__LENGTH_PREFIX = (
  buffer: Buffer, offset: number, value: JSONValue[], options: FloorOptions
): number => {
  assert(options.minimum >= 0)
  assert(value.length >= options.minimum)

  const lengthBytes: number =
    FLOOR__ENUM_VARINT(buffer, offset, value.length, options)

  let bytesWritten = lengthBytes
  for (const element of value) {
    const elementBytes: number =
      ANY__TYPE_PREFIX(buffer, offset + bytesWritten, element, {})
    bytesWritten += elementBytes
  }

  return bytesWritten
}

export const ROOF_UNTYPED__LENGTH_PREFIX = (
  buffer: Buffer, offset: number, value: JSONValue[], options: RoofOptions
): number => {
  assert(options.maximum >= 0)
  assert(value.length <= options.maximum)

  return BOUNDED_UNTYPED__LENGTH_PREFIX(buffer, offset, value, {
    minimum: 0,
    maximum: options.maximum
  })
}

export const UNBOUNDED_UNTYPED__LENGTH_PREFIX = (
  buffer: Buffer, offset: number, value: JSONValue[], _options: NoOptions
): number => {
  return FLOOR_UNTYPED__LENGTH_PREFIX(buffer, offset, value, {
    minimum: 0
  })
}
