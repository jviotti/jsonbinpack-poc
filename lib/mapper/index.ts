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
} from '../json'

import {
  NumberEncodingNames,
  NumberEncoding,
  getNumberStates,
  getNumberEncoding
} from './number'

import {
  IntegerEncodingNames,
  IntegerEncoding,
  getIntegerStates,
  getIntegerEncoding
} from './integer'

import {
  StringEncodingNames,
  StringEncoding,
  getStringStates,
  getStringEncoding
} from './string'

import {
  AnyEncodingNames,
  AnyEncoding,
  getAnyStates,
  getAnyEncoding
} from './any'

import {
  ArrayEncodingNames,
  ArrayEncoding,
  getArrayStates,
  getArrayEncoding
} from './array'

import {
  ObjectEncodingNames,
  ObjectEncoding,
  getObjectStates,
  getObjectEncoding
} from './object'

import {
  EnumEncodingNames,
  EnumEncoding,
  getEnumStates,
  getEnumEncoding
} from './enum'

import {
  OneOfEncodingNames,
  OneOfEncoding,
  getOneOfStates,
  getOneOfEncoding
} from './oneof'

import {
  EncodingSchema
} from '../schema'

export {
  NumberEncoding
} from './number'

export {
  IntegerEncoding
} from './integer'

export {
  StringEncoding
} from './string'

export {
  AnyEncoding
} from './any'

export {
  ArrayEncoding
} from './array'

export {
  ObjectEncoding
} from './object'

export {
  EnumEncoding
} from './enum'

export {
  OneOfEncoding
} from './oneof'

export type EncodingNames =
  NumberEncodingNames |
  IntegerEncodingNames |
  StringEncodingNames |
  AnyEncodingNames |
  ArrayEncodingNames |
  ObjectEncodingNames |
  EnumEncodingNames |
  OneOfEncodingNames

// The union of all possible encodings
export type Encoding =
  NumberEncoding |
  IntegerEncoding |
  StringEncoding |
  AnyEncoding |
  ArrayEncoding |
  ObjectEncoding |
  EnumEncoding |
  OneOfEncoding

export const getEncoding = (schema: EncodingSchema, level: number): Encoding => {
  // This case should be handled by the canonicalizer
  assert(typeof schema !== 'boolean')

  if ('enum' in schema) {
    return getEnumEncoding(schema, level)
  } else if ('oneOf' in schema) {
    return getOneOfEncoding(schema, level)
  } else if (!('type' in schema)) {
    return getAnyEncoding(schema, level)
  } else if (schema.type === 'boolean') {
    return getEnumEncoding({
      enum: [ false, true ]
    }, level)
  } else if (schema.type === 'integer') {
    return getIntegerEncoding(schema, level)
  } else if (schema.type === 'number') {
    return getNumberEncoding(schema, level)
  } else if (schema.type === 'string') {
    return getStringEncoding(schema, level)
  } else if (schema.type === 'array') {
    return getArrayEncoding(schema, level)
  }
  return getObjectEncoding(schema, level)
}

export const getStates = (schema: EncodingSchema): number | JSONValue[] => {
  if ('enum' in schema) {
    return getEnumStates(schema)
  } else if ('oneOf' in schema) {
    return getOneOfStates(schema)
  } else if (!('type' in schema)) {
    return getAnyStates(schema)
  } else if (schema.type === 'boolean') {
    return getEnumStates({
      enum: [ false, true ]
    })
  } else if (schema.type === 'integer') {
    return getIntegerStates(schema)
  } else if (schema.type === 'number') {
    return getNumberStates(schema)
  } else if (schema.type === 'string') {
    return getStringStates(schema)
  } else if (schema.type === 'array') {
    return getArrayStates(schema)
  }

  return getObjectStates(schema)
}
