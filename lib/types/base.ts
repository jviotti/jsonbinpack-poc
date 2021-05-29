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
  JSONValue
} from '../json'

import {
  BooleanOptions
} from './boolean/options'

import {
  NullOptions
} from './null/options'

import {
  NumberOptions
} from './number/options'

import {
  IntegerOptions
} from './integer/options'

import {
  StringOptions
} from './string/options'

import {
  AnyOptions
} from './any/options'

import {
  ArrayOptions
} from './array/options'

import {
  ObjectOptions
} from './object/options'

import {
  EnumOptions
} from './enum/options'

import {
  OneOfOptions
} from './oneof/options'

import {
  BooleanEncodingNames
} from '../mapper/boolean'

import {
  NullEncodingNames
} from '../mapper/null'

import {
  NumberEncodingNames
} from './number/mapper'

import {
  IntegerEncodingNames
} from '../mapper/integer'

import {
  StringEncodingNames
} from './string/mapper'

import {
  AnyEncodingNames
} from '../mapper/any'

import {
  ArrayEncodingNames
} from '../mapper/array'

import {
  ObjectEncodingNames
} from './object/mapper'

import {
  EnumEncodingNames
} from '../mapper/enum'

import {
  OneOfEncodingNames
} from './oneof/mapper'

export interface DecodeResult {
  readonly value: JSONValue;
  readonly bytes: number;
}

export enum EncodingType {
  Boolean = 'boolean',
  Integer = 'integer',
  Null = 'null',
  Number = 'number',
  String = 'string',
  Array = 'array',
  Object = 'object',
  Any = 'any',
  Enum = 'enum',
  OneOf = 'oneOf'
}

export type EncodingNames =
  BooleanEncodingNames |
  NullEncodingNames |
  NumberEncodingNames |
  IntegerEncodingNames |
  StringEncodingNames |
  AnyEncodingNames |
  ArrayEncodingNames |
  ObjectEncodingNames |
  EnumEncodingNames |
  OneOfEncodingNames

export interface BaseEncodingDefinition {
  readonly type: EncodingType;
  readonly encoding: EncodingNames;
  readonly options:
    BooleanOptions |
    NullOptions |
    NumberOptions |
    IntegerOptions |
    StringOptions |
    AnyOptions |
    ArrayOptions |
    ObjectOptions |
    EnumOptions |
    OneOfOptions;
}
