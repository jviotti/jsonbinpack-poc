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
  DecodeResult
} from '../base'

import {
  IntegerResult,
  ARBITRARY__ZIGZAG_VARINT,
  FLOOR__ENUM_VARINT
} from '../integer/decode'

export interface NumberResult extends DecodeResult {
  readonly value: JSONNumber;
  readonly bytes: number;
}

export const DOUBLE__IEEE764_LE = (
  buffer: ResizableBuffer, offset: number, _options: NoOptions
): NumberResult => {
  const result: number = buffer.readDoubleLE(offset)
  return {
    value: result,
    bytes: 8
  }
}

export const DOUBLE_VARINT_TRIPLET = (
  buffer: ResizableBuffer, offset: number, options: NoOptions
): NumberResult => {
  const integral: IntegerResult =
    ARBITRARY__ZIGZAG_VARINT(buffer, offset, options)
  const decimal: IntegerResult =
    FLOOR__ENUM_VARINT(buffer, offset + integral.bytes, {
      minimum: 0
    })
  const exponent: IntegerResult =
    FLOOR__ENUM_VARINT(buffer, offset + integral.bytes + decimal.bytes, {
      minimum: 0
    })

  const result: number = exponent.value === 0
    ? parseFloat(`${integral.value}.${decimal.value}`)
    : parseFloat(`0.${'0'.repeat(exponent.value - 1)}${integral.value}${decimal.value}`)
  assert(!isNaN(result))

  return {
    value: result,
    bytes: integral.bytes + decimal.bytes + exponent.bytes
  }
}
