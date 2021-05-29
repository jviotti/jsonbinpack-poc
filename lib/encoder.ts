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
  BooleanEncoding
} from './mapper/boolean'

import {
  NullEncoding
} from './mapper/null'

import {
  NumberEncoding
} from './mapper/number'

import {
  IntegerEncoding
} from './mapper/integer'

import {
  StringEncoding
} from './types/string/mapper'

import {
  AnyEncoding
} from './mapper/any'

import {
  ArrayEncoding
} from './mapper/array'

import {
  ObjectEncoding
} from './types/object/mapper'

import {
  EnumEncoding
} from './mapper/enum'

import {
  OneOfEncoding
} from './types/oneof/mapper'

import {
  EncodingType,
  DecodeResult
} from './types/base'

import {
  JSONValue
} from './json'

import ResizableBuffer from './utils/resizable-buffer'

import {
  EncodingContext
} from './context'

export {
  EncodingType,
  DecodeResult
} from './types/base'

import * as ENCODE_BOOLEAN from './types/boolean/encode'
import * as ENCODE_INTEGER from './types/integer/encode'
import * as ENCODE_NULL from './types/null/encode'
import * as ENCODE_NUMBER from './types/number/encode'
import * as ENCODE_STRING from './types/string/encode'
import * as ENCODE_ANY from './types/any/encode'
import * as ENCODE_ARRAY from './types/array/encode'
import * as ENCODE_OBJECT from './types/object/encode'
import * as ENCODE_ENUM from './types/enum/encode'
import * as ENCODE_ONEOF from './types/oneof/encode'

import * as DECODE_BOOLEAN from './types/boolean/decode'
import * as DECODE_INTEGER from './types/integer/decode'
import * as DECODE_NULL from './types/null/decode'
import * as DECODE_NUMBER from './types/number/decode'
import * as DECODE_STRING from './types/string/decode'
import * as DECODE_ANY from './types/any/decode'
import * as DECODE_ARRAY from './types/array/decode'
import * as DECODE_OBJECT from './types/object/decode'
import * as DECODE_ENUM from './types/enum/decode'
import * as DECODE_ONEOF from './types/oneof/decode'

// The union of all possible encodings
export type Encoding =
  BooleanEncoding |
  NullEncoding |
  NumberEncoding |
  IntegerEncoding |
  StringEncoding |
  AnyEncoding |
  ArrayEncoding |
  ObjectEncoding |
  EnumEncoding |
  OneOfEncoding

const ENCODE_TYPE_INDEX: Map<EncodingType, object> = new Map()
const DECODE_TYPE_INDEX: Map<EncodingType, object> = new Map()

ENCODE_TYPE_INDEX.set(EncodingType.Boolean, ENCODE_BOOLEAN)
ENCODE_TYPE_INDEX.set(EncodingType.Integer, ENCODE_INTEGER)
ENCODE_TYPE_INDEX.set(EncodingType.Null, ENCODE_NULL)
ENCODE_TYPE_INDEX.set(EncodingType.Number, ENCODE_NUMBER)
ENCODE_TYPE_INDEX.set(EncodingType.String, ENCODE_STRING)
ENCODE_TYPE_INDEX.set(EncodingType.Any, ENCODE_ANY)
ENCODE_TYPE_INDEX.set(EncodingType.Array, ENCODE_ARRAY)
ENCODE_TYPE_INDEX.set(EncodingType.Object, ENCODE_OBJECT)
ENCODE_TYPE_INDEX.set(EncodingType.Enum, ENCODE_ENUM)
ENCODE_TYPE_INDEX.set(EncodingType.OneOf, ENCODE_ONEOF)

DECODE_TYPE_INDEX.set(EncodingType.Boolean, DECODE_BOOLEAN)
DECODE_TYPE_INDEX.set(EncodingType.Integer, DECODE_INTEGER)
DECODE_TYPE_INDEX.set(EncodingType.Null, DECODE_NULL)
DECODE_TYPE_INDEX.set(EncodingType.Number, DECODE_NUMBER)
DECODE_TYPE_INDEX.set(EncodingType.String, DECODE_STRING)
DECODE_TYPE_INDEX.set(EncodingType.Any, DECODE_ANY)
DECODE_TYPE_INDEX.set(EncodingType.Array, DECODE_ARRAY)
DECODE_TYPE_INDEX.set(EncodingType.Object, DECODE_OBJECT)
DECODE_TYPE_INDEX.set(EncodingType.Enum, DECODE_ENUM)
DECODE_TYPE_INDEX.set(EncodingType.OneOf, DECODE_ONEOF)

export const encode = (
  buffer: ResizableBuffer, offset: number, encoding: Encoding,
  value: JSONValue, context: EncodingContext
): number => {
  const fns: object | undefined = ENCODE_TYPE_INDEX.get(encoding.type)
  assert(typeof fns !== 'undefined')

  // This is the only place in the codebase where we throw away
  // typing in order to dynamically load encoding functions
  // from an encoding definition.
  // Maybe there is a way to do this in a type-safe manner?
  // @ts-ignore
  return fns[encoding.encoding](buffer, offset, value, encoding.options, context)
}

export const decode = (
  buffer: ResizableBuffer, offset: number, encoding: Encoding
): DecodeResult => {
  const fns: object | undefined = DECODE_TYPE_INDEX.get(encoding.type)
  assert(typeof fns !== 'undefined')

  // This is the only place in the codebase where we throw away
  // typing in order to dynamically load encoding functions
  // from an encoding definition.
  // Maybe there is a way to do this in a type-safe manner?
  // @ts-ignore
  return fns[encoding.encoding](buffer, offset, encoding.options)
}
