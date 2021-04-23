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
  BooleanEncoding
} from './types/boolean/mapper'

import {
  NullEncoding
} from './types/null/mapper'

import {
  NumberEncoding
} from './types/number/mapper'

import {
  IntegerEncoding
} from './types/integer/mapper'

import {
  StringEncoding
} from './types/string/mapper'

import {
  EncodingType
} from './types/base'

import {
  JSONValue
} from './json'

export {
  EncodingType
} from './types/base'

import * as BOOLEAN from './types/boolean/encode'
import * as INTEGER from './types/integer/encode'
import * as NULL from './types/null/encode'
import * as NUMBER from './types/number/encode'
import * as STRING from './types/string/encode'

// The union of all possible encodings
export type Encoding =
  BooleanEncoding |
  NullEncoding |
  NumberEncoding |
  IntegerEncoding |
  StringEncoding

const TYPE_INDEX: Map<EncodingType, object> = new Map()
TYPE_INDEX.set(EncodingType.Boolean, BOOLEAN)
TYPE_INDEX.set(EncodingType.Integer, INTEGER)
TYPE_INDEX.set(EncodingType.Null, NULL)
TYPE_INDEX.set(EncodingType.Number, NUMBER)
TYPE_INDEX.set(EncodingType.String, STRING)

export const encode = (
  buffer: Buffer, offset: number, encoding: Encoding, value: JSONValue
): number => {
  const fns: object | undefined = TYPE_INDEX.get(encoding.type)

  // This is the only place in the codebase where we throw away
  // typing in order to dynamically load encoding functions
  // from an encoding definition.
  // Maybe there is a way to do this in a type-safe manner?
  // @ts-ignore
  return fns[encoding.encoding](buffer, offset, value, encoding.options)
}
