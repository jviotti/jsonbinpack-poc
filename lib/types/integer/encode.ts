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
  zigzagEncode
} from '../../utils/zigzag'

import {
  varintEncode
} from '../../utils/varint'

import {
  UINT8_MAX
} from '../../utils/limits'

// Applicable if the difference between maximum and
// minimum fits in an unsigned 8-bit integer
export const BOUNDED_8BITS__ENUM_FIXED = (
  buffer: Buffer, offset: number, value: number,
  minimum: number, maximum: number
): number => {
  assert(maximum >= minimum)
  assert(maximum - minimum <= UINT8_MAX)
  assert(value >= minimum)
  assert(value <= maximum)

  return buffer.writeUInt8(value - minimum, offset) - offset
}

export const BOUNDED_MULTIPLE_8BITS__ENUM_FIXED = (
  buffer: Buffer, offset: number, value: number,
  minimum: number, maximum: number, multiplier: number
): number => {
  assert(maximum >= minimum)
  assert(value >= minimum)
  assert(value <= maximum)
  assert(multiplier >= minimum)
  assert(multiplier <= maximum)
  assert(value % multiplier === 0)

  const absoluteMultiplier: number = Math.abs(multiplier)
  const closestMinimumMultiple: number =
    Math.ceil(minimum / absoluteMultiplier) * absoluteMultiplier
  const closestMaximumMultiple: number =
    Math.ceil(maximum / -absoluteMultiplier) * -absoluteMultiplier
  const enumMinimum: number = closestMinimumMultiple / absoluteMultiplier
  const enumMaximum: number = closestMaximumMultiple / absoluteMultiplier
  assert(enumMaximum - enumMinimum <= UINT8_MAX)

  return BOUNDED_8BITS__ENUM_FIXED(buffer, offset,
    value / absoluteMultiplier,
    enumMinimum,
    enumMaximum)
}

export const BOUNDED__ENUM_VARINT = (
  buffer: Buffer, offset: number, value: number,
  minimum: number, maximum: number
): number => {
  assert(maximum >= minimum)
  assert(value >= minimum)
  assert(value <= maximum)

  return varintEncode(buffer, offset, value - minimum)
}

export const BOUNDED_MULTIPLE__ENUM_VARINT = (
  buffer: Buffer, offset: number, value: number,
  minimum: number, maximum: number, multiplier: number
): number => {
  assert(maximum >= minimum)
  assert(value >= minimum)
  assert(value <= maximum)
  assert(multiplier >= minimum)
  assert(multiplier <= maximum)
  assert(value % multiplier === 0)

  const absoluteMultiplier: number = Math.abs(multiplier)
  const closestMinimumMultiple: number =
    Math.ceil(minimum / absoluteMultiplier) * absoluteMultiplier
  const closestMaximumMultiple: number =
    Math.ceil(maximum / -absoluteMultiplier) * -absoluteMultiplier

  return BOUNDED__ENUM_VARINT(buffer, offset,
    value / absoluteMultiplier,
    closestMinimumMultiple / absoluteMultiplier,
    closestMaximumMultiple / absoluteMultiplier)
}

export const FLOOR__ENUM_VARINT = (
  buffer: Buffer, offset: number, value: number,
  minimum: number,
): number => {
  assert(value >= minimum)
  return varintEncode(buffer, offset, value - minimum)
}

export const FLOOR_MULTIPLE__ENUM_VARINT = (
  buffer: Buffer, offset: number, value: number,
  minimum: number, multiplier: number
): number => {
  assert(value >= minimum)
  assert(value % multiplier === 0)
  assert(multiplier >= minimum)

  const absoluteMultiplier: number = Math.abs(multiplier)
  const closestMinimumMultiple: number =
    Math.ceil(minimum / absoluteMultiplier) * absoluteMultiplier

  return FLOOR__ENUM_VARINT(buffer, offset,
    value / absoluteMultiplier, closestMinimumMultiple / absoluteMultiplier)
}

export const ROOF__MIRROR_ENUM_VARINT = (
  buffer: Buffer, offset: number, value: number,
  maximum: number,
): number => {
  assert(value <= maximum)
  return varintEncode(buffer, offset, (-1 * value) + maximum)
}

export const ROOF_MULTIPLE__MIRROR_ENUM_VARINT = (
  buffer: Buffer, offset: number, value: number,
  maximum: number, multiplier: number
): number => {
  assert(value <= maximum)
  assert(value % multiplier === 0)
  assert(maximum >= multiplier)

  const absoluteMultiplier: number = Math.abs(multiplier)
  const closestMaximumMultiple: number =
    Math.ceil(maximum / -absoluteMultiplier) * -absoluteMultiplier
  return ROOF__MIRROR_ENUM_VARINT(buffer, offset,
    value / absoluteMultiplier, closestMaximumMultiple / absoluteMultiplier)
}

export const ARBITRARY__ZIGZAG_VARINT = (
  buffer: Buffer, offset: number, value: number
): number => {
  return varintEncode(buffer, offset, zigzagEncode(value))
}

export const ARBITRARY_MULTIPLE__ZIGZAG_VARINT = (
  buffer: Buffer, offset: number, value: number,
  multiplier: number
): number => {
  assert(value % multiplier === 0)
  return ARBITRARY__ZIGZAG_VARINT(buffer, offset, value / Math.abs(multiplier))
}
