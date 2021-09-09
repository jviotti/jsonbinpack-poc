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

import ResizableBuffer from '../resizable-buffer'

import {
  JSONNumber
} from '../../json'

import {
  UINT8_MAX
} from '../../utils/limits'

import {
  FloorMultiplierOptions,
  RoofMultiplierOptions,
  MultiplierOptions,
  BoundedMultiplierOptions
} from './options'

import {
  EncodingContext
} from '../context'

import {
  zigzagEncode
} from './zigzag'

import {
  varintEncode
} from './varint'

export const BOUNDED_MULTIPLE_8BITS_ENUM_FIXED = (
  buffer: ResizableBuffer, offset: number, value: JSONNumber,
  options: BoundedMultiplierOptions, _context: EncodingContext
): number => {
  assert(options.maximum >= options.minimum)
  assert(value >= options.minimum)
  assert(value <= options.maximum)
  assert(value % options.multiplier === 0)

  const absoluteMultiplier: number = Math.abs(options.multiplier)
  const enumMinimum: number = Math.ceil(options.minimum / absoluteMultiplier)
  const enumMaximum: number = Math.floor(options.maximum / absoluteMultiplier)
  assert(enumMaximum - enumMinimum <= UINT8_MAX)

  return buffer.writeUInt8((value / absoluteMultiplier) - enumMinimum, offset) - offset
}

export const FLOOR_MULTIPLE_ENUM_VARINT = (
  buffer: ResizableBuffer, offset: number, value: JSONNumber,
  options: FloorMultiplierOptions, _context: EncodingContext
): number => {
  assert(value >= options.minimum)
  assert(value % options.multiplier === 0)
  const absoluteMultiplier: number = Math.abs(options.multiplier)
  return varintEncode(buffer, offset, BigInt(
    (value / absoluteMultiplier) - Math.ceil(options.minimum / absoluteMultiplier)))
}

export const ROOF_MULTIPLE_MIRROR_ENUM_VARINT = (
  buffer: ResizableBuffer, offset: number, value: JSONNumber,
  options: RoofMultiplierOptions, _context: EncodingContext
): number => {
  assert(value <= options.maximum)
  assert(value % options.multiplier === 0)
  const absoluteMultiplier: number = Math.abs(options.multiplier)
  return varintEncode(buffer, offset, BigInt(
    Math.floor(options.maximum / absoluteMultiplier) - (value / absoluteMultiplier)))
}

export const ARBITRARY_MULTIPLE_ZIGZAG_VARINT = (
  buffer: ResizableBuffer, offset: number, value: JSONNumber,
  options: MultiplierOptions, _context: EncodingContext
): number => {
  assert(value % options.multiplier === 0)
  return varintEncode(buffer, offset,
    zigzagEncode(BigInt(value / Math.abs(options.multiplier))))
}
