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
  JSONObject
} from '../../json'

import {
  BitsetResult,
  bitsetDecode
} from '../../utils/bitset'

import {
  IntegerResult,
  FLOOR__ENUM_VARINT
} from '../integer/decode'

import {
  AnyResult,
  ANY__TYPE_PREFIX
} from '../any/decode'

import {
  TypedKeysOptions,
  OptionalBoundedOptions,
  RequiredBoundedOptions
} from './options'

import {
  decode,
  Encoding,
  DecodeResult
} from '../../encoder'

export interface ObjectResult extends DecodeResult {
  readonly value: JSONObject;
  readonly bytes: number;
}

export const REQUIRED_BOUNDED_TYPED_OBJECT = (
  buffer: Buffer, offset: number, options: RequiredBoundedOptions
): ObjectResult => {
  const result: JSONObject = {}
  let cursor: number = offset
  for (const key of options.requiredProperties) {
    const encoding: Encoding = options.propertyEncodings[key]
    const propertyResult: DecodeResult = decode(buffer, cursor, encoding)
    assert(propertyResult.bytes >= 0)
    Reflect.set(result, key, propertyResult.value)
    cursor += propertyResult.bytes
  }

  return {
    value: result,
    bytes: cursor - offset
  }
}

export const OPTIONAL_BOUNDED_TYPED_OBJECT = (
  buffer: Buffer, offset: number, options: OptionalBoundedOptions
): ObjectResult => {
  const bitsetLength: IntegerResult = FLOOR__ENUM_VARINT(buffer, offset, {
    minimum: 0
  })

  assert(bitsetLength.value >= 0)
  const bitsetResult: BitsetResult = bitsetDecode(
    buffer, offset + bitsetLength.bytes, bitsetLength.value)
  assert(bitsetResult.value.length === bitsetLength.value)

  const result: JSONObject = {}
  let cursor: number = bitsetLength.bytes + bitsetResult.bytes
  for (const [ index, value ] of bitsetResult.value.entries()) {
    if (!value) {
      continue
    }

    const key: string = options.optionalProperties[index]
    const encoding: Encoding = options.propertyEncodings[key]
    const propertyResult: DecodeResult = decode(buffer, cursor, encoding)
    assert(propertyResult.bytes >= 0)
    Reflect.set(result, key, propertyResult.value)
    cursor += propertyResult.bytes
  }

  return {
    value: result,
    bytes: cursor - offset
  }
}

export const ARBITRARY_TYPED_KEYS_OBJECT = (
  buffer: Buffer, offset: number, options: TypedKeysOptions
): ObjectResult => {
  const result: IntegerResult = FLOOR__ENUM_VARINT(buffer, offset, {
    minimum: 0
  })

  assert(result.value >= 0)

  let count: number = 0
  let cursor: number = result.bytes
  let value: JSONObject = {}

  while (count < result.value) {
    const keyResult: DecodeResult =
      decode(buffer, cursor, options.keyEncoding)
    assert(typeof keyResult.value === 'string')
    assert(keyResult.bytes >= 0)
    cursor += keyResult.bytes

    const valueResult: AnyResult =
      ANY__TYPE_PREFIX(buffer, cursor, {})
    assert(valueResult.bytes >= 0)
    cursor += valueResult.bytes

    Reflect.set(value, keyResult.value, valueResult.value)
    count += 1
  }

  return {
    value,
    bytes: cursor - offset
  }
}
