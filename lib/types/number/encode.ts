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

import ResizableBuffer from '../../utils/resizable-buffer'

import {
  JSONNumber
} from '../../json'

import {
  NoOptions
} from './options'

import {
  ARBITRARY__ZIGZAG_VARINT,
  FLOOR__ENUM_VARINT
} from '../integer/encode'

import {
  EncodingContext
} from '../../context'

export const DOUBLE__IEEE764_LE = (
  buffer: ResizableBuffer, offset: number, value: JSONNumber, _options: NoOptions, _context: EncodingContext
): number => {
  return buffer.writeDoubleLE(value, offset) - offset
}

export const DOUBLE_VARINT_TRIPLET = (
  buffer: ResizableBuffer, offset: number, value: JSONNumber,
  options: NoOptions, context: EncodingContext
): number => {
  // A probably very inefficient way of splitting a real number
  // into an integral, decimal, and exponent part
  const fragments: string[] = value.toString().split('.')
  const integral: number = parseInt(fragments[0], 10)
  const decimalFragments: string[] = (fragments[1] ?? '0').split('e-')
  const decimal: number = parseInt(decimalFragments[0], 10)
  const exponent: number = parseInt(decimalFragments[1] ?? 0, 10)

  assert(!isNaN(integral))
  assert(!isNaN(decimal))
  assert(!isNaN(exponent))
  assert(decimal >= 0)
  assert(exponent >= 0)

  const integralBytes: number = ARBITRARY__ZIGZAG_VARINT(
    buffer, offset, integral, options, context)
  const decimalBytes: number = FLOOR__ENUM_VARINT(
    buffer, offset + integralBytes, decimal, {
      minimum: 0
    }, context)
  const exponentBytes: number = FLOOR__ENUM_VARINT(
    buffer, offset + integralBytes + decimalBytes, exponent, {
      minimum: 0
    }, context)
  return integralBytes + decimalBytes + exponentBytes
}
