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
  JSONNumber
} from '../../json'

import {
  zigzagEncode
} from '../../utils/zigzag'

import {
  varintEncode
} from '../../utils/varint'

import {
  UINT8_MAX
} from '../../utils/limits'

import {
  NoOptions,
  FloorOptions,
  FloorMultiplierOptions,
  RoofOptions,
  RoofMultiplierOptions,
  MultiplierOptions,
  BoundedOptions,
  BoundedMultiplierOptions
} from './options'

// Applicable if the difference between maximum and
// minimum fits in an unsigned 8-bit integer
export const BOUNDED_8BITS__ENUM_FIXED = (
  buffer: ResizableBuffer, offset: number, value: JSONNumber,
  options: BoundedOptions
): number => {
  assert(options.maximum >= options.minimum)
  assert(options.maximum - options.minimum <= UINT8_MAX)
  assert(value >= options.minimum)
  assert(value <= options.maximum)

  return buffer.writeUInt8(value - options.minimum, offset) - offset
}

export const BOUNDED_MULTIPLE_8BITS__ENUM_FIXED = (
  buffer: ResizableBuffer, offset: number, value: JSONNumber,
  options: BoundedMultiplierOptions
): number => {
  assert(options.maximum >= options.minimum)
  assert(value >= options.minimum)
  assert(value <= options.maximum)
  assert(options.multiplier >= options.minimum)
  assert(options.multiplier <= options.maximum)
  assert(value % options.multiplier === 0)

  const absoluteMultiplier: number = Math.abs(options.multiplier)
  const closestMinimumMultiple: number =
    Math.ceil(options.minimum / absoluteMultiplier) * absoluteMultiplier
  const closestMaximumMultiple: number =
    Math.ceil(options.maximum / -absoluteMultiplier) * -absoluteMultiplier
  const enumMinimum: number = closestMinimumMultiple / absoluteMultiplier
  const enumMaximum: number = closestMaximumMultiple / absoluteMultiplier
  assert(enumMaximum - enumMinimum <= UINT8_MAX)

  return BOUNDED_8BITS__ENUM_FIXED(buffer, offset,
    value / absoluteMultiplier, {
      minimum: enumMinimum,
      maximum: enumMaximum
    })
}

export const BOUNDED__ENUM_VARINT = (
  buffer: ResizableBuffer, offset: number, value: JSONNumber,
  options: BoundedOptions
): number => {
  assert(options.maximum >= options.minimum)
  assert(value >= options.minimum)
  assert(value <= options.maximum)

  return varintEncode(buffer, offset, value - options.minimum)
}

export const BOUNDED_MULTIPLE__ENUM_VARINT = (
  buffer: ResizableBuffer, offset: number, value: JSONNumber,
  options: BoundedMultiplierOptions
): number => {
  assert(options.maximum >= options.minimum)
  assert(value >= options.minimum)
  assert(value <= options.maximum)
  assert(options.multiplier >= options.minimum)
  assert(options.multiplier <= options.maximum)
  assert(value % options.multiplier === 0)

  const absoluteMultiplier: number = Math.abs(options.multiplier)
  const closestMinimumMultiple: number =
    Math.ceil(options.minimum / absoluteMultiplier) * absoluteMultiplier
  const closestMaximumMultiple: number =
    Math.ceil(options.maximum / -absoluteMultiplier) * -absoluteMultiplier

  return BOUNDED__ENUM_VARINT(buffer, offset,
    value / absoluteMultiplier, {
      minimum: closestMinimumMultiple / absoluteMultiplier,
      maximum: closestMaximumMultiple / absoluteMultiplier
    })
}

export const FLOOR__ENUM_VARINT = (
  buffer: ResizableBuffer, offset: number, value: JSONNumber,
  options: FloorOptions
): number => {
  assert(value >= options.minimum)
  return varintEncode(buffer, offset, value - options.minimum)
}

export const FLOOR_MULTIPLE__ENUM_VARINT = (
  buffer: ResizableBuffer, offset: number, value: JSONNumber,
  options: FloorMultiplierOptions
): number => {
  assert(value >= options.minimum)
  assert(value % options.multiplier === 0)
  assert(options.multiplier >= options.minimum)

  const absoluteMultiplier: number = Math.abs(options.multiplier)
  const closestMinimumMultiple: number =
    Math.ceil(options.minimum / absoluteMultiplier) * absoluteMultiplier

  return FLOOR__ENUM_VARINT(buffer, offset,
    value / absoluteMultiplier, {
      minimum: closestMinimumMultiple / absoluteMultiplier
    })
}

export const ROOF__MIRROR_ENUM_VARINT = (
  buffer: ResizableBuffer, offset: number, value: JSONNumber,
  options: RoofOptions
): number => {
  assert(value <= options.maximum)
  return varintEncode(buffer, offset, (-1 * value) + options.maximum)
}

export const ROOF_MULTIPLE__MIRROR_ENUM_VARINT = (
  buffer: ResizableBuffer, offset: number, value: JSONNumber,
  options: RoofMultiplierOptions
): number => {
  assert(value <= options.maximum)
  assert(value % options.multiplier === 0)
  assert(options.maximum >= options.multiplier)

  const absoluteMultiplier: number = Math.abs(options.multiplier)
  const closestMaximumMultiple: number =
    Math.ceil(options.maximum / -absoluteMultiplier) * -absoluteMultiplier
  return ROOF__MIRROR_ENUM_VARINT(buffer, offset,
    value / absoluteMultiplier, {
      maximum: closestMaximumMultiple / absoluteMultiplier
    })
}

export const ARBITRARY__ZIGZAG_VARINT = (
  buffer: ResizableBuffer, offset: number, value: JSONNumber, _options: NoOptions
): number => {
  return varintEncode(buffer, offset, zigzagEncode(value))
}

export const ARBITRARY_MULTIPLE__ZIGZAG_VARINT = (
  buffer: ResizableBuffer, offset: number, value: JSONNumber,
  options: MultiplierOptions
): number => {
  assert(value % options.multiplier === 0)
  return ARBITRARY__ZIGZAG_VARINT(
    buffer, offset, value / Math.abs(options.multiplier), {})
}
