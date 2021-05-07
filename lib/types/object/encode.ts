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
  encode,
  Encoding
} from '../../encoder'

import {
  bitsetEncode
} from '../../utils/bitset'

import {
  TypedKeysOptions,
  BoundedTypedOptions,
  UnboundedTypedOptions,
  RequiredUnboundedTypedOptions,
  OptionalBoundedTypedOptions,
  OptionalUnboundedTypedOptions,
  RequiredBoundedTypedOptions
} from './options'

import {
  FLOOR__ENUM_VARINT
} from '../integer/encode'

export const REQUIRED_ONLY_BOUNDED_TYPED_OBJECT = (
  buffer: Buffer, offset: number, value: JSONObject, options: RequiredBoundedTypedOptions
): number => {
  assert(Object.keys(value).length === options.requiredProperties.length)

  let cursor: number = offset
  for (const key of options.requiredProperties) {
    const encoding: Encoding | undefined = options.propertyEncodings[key]
    assert(typeof encoding !== 'undefined')
    cursor += encode(buffer, cursor, encoding, value[key])
  }

  return cursor - offset
}

export const NON_REQUIRED_BOUNDED_TYPED_OBJECT = (
  buffer: Buffer, offset: number, value: JSONObject, options: OptionalBoundedTypedOptions
): number => {
  assert(Object.keys(value).length <= options.optionalProperties.length)

  const lengthBytes: number = FLOOR__ENUM_VARINT(
    buffer, offset, options.optionalProperties.length, {
      minimum: 0
    })

  const keys: string[] = []
  const bitset: boolean[] = []
  for (const property of options.optionalProperties) {
    const isPropertySet: boolean = typeof value[property] !== 'undefined'
    bitset.push(isPropertySet)
    if (isPropertySet) {
      keys.push(property)
    }
  }

  const bitsetBytes: number = bitsetEncode(buffer, offset + lengthBytes, bitset)
  let cursor = offset + lengthBytes + bitsetBytes
  for (const key of keys) {
    const encoding: Encoding | undefined = options.propertyEncodings[key]
    assert(typeof encoding !== 'undefined')
    const bytesWritten: number = encode(buffer, cursor, encoding, value[key])
    cursor += bytesWritten
  }

  return cursor - offset
}

export const MIXED_BOUNDED_TYPED_OBJECT = (
  buffer: Buffer, offset: number, value: JSONObject, options: BoundedTypedOptions
): number => {
  assert(Object.keys(value).length <=
    options.requiredProperties.length + options.optionalProperties.length)

  const requiredSubset: JSONObject = {}
  for (const key of options.requiredProperties) {
    Reflect.set(requiredSubset, key, value[key])
  }

  const optionalSubset: JSONObject = {}
  for (const key of options.optionalProperties) {
    Reflect.set(optionalSubset, key, value[key])
  }

  const requiredBytes: number = REQUIRED_ONLY_BOUNDED_TYPED_OBJECT(
    buffer, offset, requiredSubset, {
      propertyEncodings: options.propertyEncodings,
      requiredProperties: options.requiredProperties
    })

  return requiredBytes + NON_REQUIRED_BOUNDED_TYPED_OBJECT(
    buffer, offset + requiredBytes, optionalSubset, {
      propertyEncodings: options.propertyEncodings,
      optionalProperties: options.optionalProperties
    })
}

export const ARBITRARY_TYPED_KEYS_OBJECT = (
  buffer: Buffer, offset: number, value: JSONObject, options: TypedKeysOptions
): number => {
  let cursor: number = offset + FLOOR__ENUM_VARINT(
    buffer, offset, Object.keys(value).length, {
      minimum: 0
    })

  for (const [ key, objectValue ] of Object.entries(value)) {
    cursor += encode(buffer, cursor, options.keyEncoding, key)
    cursor += encode(buffer, cursor, options.encoding, objectValue)
  }

  return cursor - offset
}

export const REQUIRED_UNBOUNDED_TYPED_OBJECT = (
  buffer: Buffer, offset: number, value: JSONObject, options: RequiredUnboundedTypedOptions
): number => {
  assert(options.requiredProperties.length > 0)

  const required: Set<string> = new Set<string>(options.requiredProperties)
  const requiredSubset: JSONObject = {}
  const rest: JSONObject = {}

  for (const key of Object.keys(value)) {
    Reflect.set(required.has(key) ? requiredSubset : rest, key, value[key])
  }

  const requiredBytes: number = REQUIRED_ONLY_BOUNDED_TYPED_OBJECT(
    buffer, offset, requiredSubset, {
      propertyEncodings: options.propertyEncodings,
      requiredProperties: options.requiredProperties
    })

  return requiredBytes + ARBITRARY_TYPED_KEYS_OBJECT(buffer, offset + requiredBytes, rest, {
    keyEncoding: options.keyEncoding,
    encoding: options.encoding
  })
}

export const OPTIONAL_UNBOUNDED_TYPED_OBJECT = (
  buffer: Buffer, offset: number, value: JSONObject, options: OptionalUnboundedTypedOptions
): number => {
  assert(Object.keys(options.propertyEncodings).length === options.optionalProperties.length)
  const optional: Set<string> = new Set<string>(options.optionalProperties)
  const optionalSubset: JSONObject = {}
  const rest: JSONObject = {}

  for (const key of Object.keys(value)) {
    Reflect.set(optional.has(key) ? optionalSubset : rest, key, value[key])
  }

  const optionalBytes: number = NON_REQUIRED_BOUNDED_TYPED_OBJECT(
    buffer, offset, optionalSubset, {
      propertyEncodings: options.propertyEncodings,
      optionalProperties: options.optionalProperties
    })

  return optionalBytes + ARBITRARY_TYPED_KEYS_OBJECT(buffer, offset + optionalBytes, rest, {
    keyEncoding: options.keyEncoding,
    encoding: options.encoding
  })
}

export const MIXED_UNBOUNDED_TYPED_OBJECT = (
  buffer: Buffer, offset: number, value: JSONObject, options: UnboundedTypedOptions
): number => {
  const required: Set<string> = new Set<string>(options.requiredProperties)
  const optional: Set<string> = new Set<string>(options.optionalProperties)

  const requiredSubset: JSONObject = {}
  const optionalSubset: JSONObject = {}

  const rest: JSONObject = {}

  for (const key of Object.keys(value)) {
    if (required.has(key)) {
      Reflect.set(requiredSubset, key, value[key])
    } else if (optional.has(key)) {
      Reflect.set(optionalSubset, key, value[key])
    } else {
      Reflect.set(rest, key, value[key])
    }
  }

  const requiredBytes: number = REQUIRED_ONLY_BOUNDED_TYPED_OBJECT(
    buffer, offset, requiredSubset, {
      propertyEncodings: options.propertyEncodings,
      requiredProperties: options.requiredProperties
    })

  const optionalBytes: number = NON_REQUIRED_BOUNDED_TYPED_OBJECT(
    buffer, offset + requiredBytes, optionalSubset, {
      propertyEncodings: options.propertyEncodings,
      optionalProperties: options.optionalProperties
    })

  return requiredBytes + optionalBytes + ARBITRARY_TYPED_KEYS_OBJECT(
    buffer, offset + requiredBytes + optionalBytes, rest, {
      keyEncoding: options.keyEncoding,
      encoding: options.encoding
    })
}
