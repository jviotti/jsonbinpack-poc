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
  IntegerResult,
  BOUNDED_8BITS__ENUM_FIXED
} from '../integer/decode'

import {
  ANY__TYPE_PREFIX
} from '../any/decode'

import {
  decode,
  Encoding
} from '../../encoder'

import {
  UINT8_MAX
} from '../../utils/limits'

import {
  SemiTypedBoundedOptions
} from './options'

import {
  DecodeResult
} from '../base'

export interface ArrayResult extends DecodeResult {
  readonly value: JSONValue[];
  readonly bytes: number;
}

const decodeArray = (
  buffer: Buffer, offset: number, length: number,
  prefixEncodings: Encoding[], defaultEncoding?: Encoding
): ArrayResult => {
  let index = 0
  let cursor = offset
  const result = []

  while (index < length) {
    const encoding: Encoding | undefined =
      prefixEncodings[index] ?? defaultEncoding
    const elementResult: DecodeResult = typeof encoding === 'undefined'
      ? ANY__TYPE_PREFIX(buffer, cursor, {})
      : decode(buffer, cursor, encoding)
    cursor += elementResult.bytes
    result.push(elementResult.value)
    index += 1
  }

  return {
    value: result,
    bytes: cursor
  }
}

export const BOUNDED_8BITS_SEMITYPED__LENGTH_PREFIX = (
  buffer: Buffer, offset: number, options: SemiTypedBoundedOptions
): ArrayResult => {
  assert(options.maximum >= 0)
  assert(options.minimum >= 0)
  assert(options.maximum >= options.minimum)
  assert(options.maximum - options.minimum <= UINT8_MAX)

  const lengthResult: IntegerResult = BOUNDED_8BITS__ENUM_FIXED(buffer, offset, {
    minimum: options.minimum,
    maximum: options.maximum
  })

  return decodeArray(
    buffer, lengthResult.bytes, lengthResult.value, options.prefixEncodings)
}
