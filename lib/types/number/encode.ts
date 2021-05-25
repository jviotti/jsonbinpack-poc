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
  JSONNumber
} from '../../json'

import {
  NoOptions
} from './options'

import {
  EncodingContext
} from '../../context'

// TODO: Find out in which case we can safely do a 32-bit floating-point
// numbers encoding
// TODO: Otherwise encode integral and decimal parts as two different
// integers. The first one can be zigzag + varint and the decimal one
// always varint (as it can't be negative by definition)
// Maybe we can choose between this an IEEE764 depending on the
// amount of digits?

// TODO: Replace this with just a pair of 2 var ints (one zigzag and one not zigzag) that represent
// the numbers before and after the period. This will likely be much better for cases like geojson

export const DOUBLE__IEEE764_LE = (
  buffer: ResizableBuffer, offset: number, value: JSONNumber, _options: NoOptions, _context: EncodingContext
): number => {
  return buffer.writeDoubleLE(value, offset) - offset
}
