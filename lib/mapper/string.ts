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
  BaseEncodingDefinition
} from './base-encoding-definition'

import {
  EncodingType
} from '../encoder'

import {
  UINT8_MAX
} from '../utils/limits'

import {
  StringEncodingSchema
} from '../schema'

import {
  NoOptions,
  BoundedOptions,
  RoofOptions,
  FloorOptions
} from '../encoder/string/options'

export interface BOUNDED__PREFIX_LENGTH_8BIT_FIXED_ENCODING extends BaseEncodingDefinition {
  readonly type: EncodingType.String;
  readonly encoding: 'BOUNDED__PREFIX_LENGTH_8BIT_FIXED';
  readonly options: BoundedOptions;
}

export interface BOUNDED__PREFIX_LENGTH_ENUM_VARINT_ENCODING extends BaseEncodingDefinition {
  readonly type: EncodingType.String;
  readonly encoding: 'BOUNDED__PREFIX_LENGTH_ENUM_VARINT';
  readonly options: BoundedOptions;
}

export interface ROOF__PREFIX_LENGTH_8BIT_FIXED_ENCODING extends BaseEncodingDefinition {
  readonly type: EncodingType.String;
  readonly encoding: 'ROOF__PREFIX_LENGTH_8BIT_FIXED';
  readonly options: RoofOptions;
}

export interface ROOF__PREFIX_LENGTH_ENUM_VARINT_ENCODING extends BaseEncodingDefinition {
  readonly type: EncodingType.String;
  readonly encoding: 'ROOF__PREFIX_LENGTH_ENUM_VARINT';
  readonly options: RoofOptions;
}

export interface FLOOR__PREFIX_LENGTH_ENUM_VARINT_ENCODING extends BaseEncodingDefinition {
  readonly type: EncodingType.String;
  readonly encoding: 'FLOOR__PREFIX_LENGTH_ENUM_VARINT';
  readonly options: FloorOptions;
}

export interface ARBITRARY__PREFIX_LENGTH_VARINT_ENCODING extends BaseEncodingDefinition {
  readonly type: EncodingType.String;
  readonly encoding: 'ARBITRARY__PREFIX_LENGTH_VARINT';
  readonly options: NoOptions;
}

export type StringEncodingNames =
  'BOUNDED__PREFIX_LENGTH_8BIT_FIXED' |
  'BOUNDED__PREFIX_LENGTH_ENUM_VARINT' |
  'ROOF__PREFIX_LENGTH_8BIT_FIXED' |
  'ROOF__PREFIX_LENGTH_ENUM_VARINT' |
  'FLOOR__PREFIX_LENGTH_ENUM_VARINT' |
  'ARBITRARY__PREFIX_LENGTH_VARINT'
export type StringEncoding =
  BOUNDED__PREFIX_LENGTH_8BIT_FIXED_ENCODING |
  BOUNDED__PREFIX_LENGTH_ENUM_VARINT_ENCODING |
  ROOF__PREFIX_LENGTH_8BIT_FIXED_ENCODING |
  ROOF__PREFIX_LENGTH_ENUM_VARINT_ENCODING |
  FLOOR__PREFIX_LENGTH_ENUM_VARINT_ENCODING |
  ARBITRARY__PREFIX_LENGTH_VARINT_ENCODING

export const getStringEncoding = (schema: StringEncodingSchema): StringEncoding => {
  assert(typeof schema.minLength === 'undefined' || schema.minLength >= 0)
  assert(typeof schema.maxLength === 'undefined' || schema.maxLength >= 0)
  assert(typeof schema.minLength === 'undefined' ||
    typeof schema.maxLength === 'undefined' ||
    schema.maxLength >= schema.minLength)

  if (typeof schema.minLength !== 'undefined' && typeof schema.maxLength !== 'undefined') {
    return {
      type: EncodingType.String,
      encoding: (schema.maxLength - schema.minLength <= UINT8_MAX - 1)
        ? 'BOUNDED__PREFIX_LENGTH_8BIT_FIXED' : 'BOUNDED__PREFIX_LENGTH_ENUM_VARINT',
      options: {
        minimum: schema.minLength,
        maximum: schema.maxLength
      }
    }
  } else if (typeof schema.minLength !== 'undefined' && typeof schema.maxLength === 'undefined') {
    return {
      type: EncodingType.String,
      encoding: 'FLOOR__PREFIX_LENGTH_ENUM_VARINT',
      options: {
        minimum: schema.minLength
      }
    }
  } else if (typeof schema.minLength === 'undefined' && typeof schema.maxLength !== 'undefined') {
    return {
      type: EncodingType.String,
      encoding: schema.maxLength <= UINT8_MAX - 1
        ? 'ROOF__PREFIX_LENGTH_8BIT_FIXED' : 'ROOF__PREFIX_LENGTH_ENUM_VARINT',
      options: {
        maximum: schema.maxLength
      }
    }
  }
  return {
    type: EncodingType.String,
    encoding: 'ARBITRARY__PREFIX_LENGTH_VARINT',
    options: {}
  }
}
