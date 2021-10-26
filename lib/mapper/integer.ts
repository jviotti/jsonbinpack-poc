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
  range
} from 'lodash'

import {
  JSONValue
} from '../json'

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
  FloorMultiplierOptions,
  RoofMultiplierOptions,
  MultiplierOptions,
  BoundedMultiplierOptions
} from '../encoder/integer/options'

import {
  IntegerEncodingSchema
} from '../schema'

export interface BOUNDED_MULTIPLE_8BITS_ENUM_FIXED_ENCODING extends BaseEncodingDefinition {
  readonly type: EncodingType.Integer;
  readonly encoding: 'BOUNDED_MULTIPLE_8BITS_ENUM_FIXED';
  readonly options: BoundedMultiplierOptions;
}

export interface FLOOR_MULTIPLE_ENUM_VARINT_ENCODING extends BaseEncodingDefinition {
  readonly type: EncodingType.Integer;
  readonly encoding: 'FLOOR_MULTIPLE_ENUM_VARINT';
  readonly options: FloorMultiplierOptions;
}

export interface ROOF_MULTIPLE_MIRROR_ENUM_VARINT_ENCODING extends BaseEncodingDefinition {
  readonly type: EncodingType.Integer;
  readonly encoding: 'ROOF_MULTIPLE_MIRROR_ENUM_VARINT';
  readonly options: RoofMultiplierOptions;
}

export interface ARBITRARY_MULTIPLE_ZIGZAG_VARINT_ENCODING extends BaseEncodingDefinition {
  readonly type: EncodingType.Integer;
  readonly encoding: 'ARBITRARY_MULTIPLE_ZIGZAG_VARINT';
  readonly options: MultiplierOptions;
}

export type IntegerEncodingNames =
  'BOUNDED_MULTIPLE_8BITS_ENUM_FIXED' |
  'FLOOR_MULTIPLE_ENUM_VARINT' |
  'ROOF_MULTIPLE_MIRROR_ENUM_VARINT' |
  'ARBITRARY_MULTIPLE_ZIGZAG_VARINT'
export type IntegerEncoding =
  BOUNDED_MULTIPLE_8BITS_ENUM_FIXED_ENCODING |
  FLOOR_MULTIPLE_ENUM_VARINT_ENCODING |
  ROOF_MULTIPLE_MIRROR_ENUM_VARINT_ENCODING |
  ARBITRARY_MULTIPLE_ZIGZAG_VARINT_ENCODING

export const getIntegerStates = (schema: IntegerEncodingSchema): number | JSONValue[] => {
  if (typeof schema.maximum === 'number' &&
    typeof schema.minimum === 'number') {
    // TODO: De-duplicate this logic on encoder/integer/encode
    const absoluteMultiplier: number = Math.abs(schema.multipleOf ?? 1)
    const enumMinimum: number = Math.ceil(schema.minimum / absoluteMultiplier)
    const enumMaximum: number = Math.floor(schema.maximum / absoluteMultiplier)

    // It is pointless to calculate the exact amount of states after a certain point
    if (enumMaximum - enumMinimum > UINT8_MAX) {
      return enumMaximum - enumMinimum + 1
    }

    return range(enumMinimum, enumMaximum + 1).map((value: number) => {
      return value * absoluteMultiplier
    })
  }

  return Infinity
}

export const getIntegerEncoding = (schema: IntegerEncodingSchema, _level: number): IntegerEncoding => {
  assert(typeof schema.minimum === 'undefined' ||
    typeof schema.maximum === 'undefined' ||
    schema.maximum >= schema.minimum)

  const states: number | JSONValue[] = getIntegerStates(schema)
  const statesLength = typeof states === 'number' ? states : states.length

  if (typeof schema.minimum !== 'undefined' && typeof schema.maximum !== 'undefined') {
    if (statesLength <= UINT8_MAX) {
      return {
        type: EncodingType.Integer,
        encoding: 'BOUNDED_MULTIPLE_8BITS_ENUM_FIXED',
        options: {
          minimum: schema.minimum,
          maximum: schema.maximum,
          multiplier: schema.multipleOf ?? 1
        }
      }
    }

    return {
      type: EncodingType.Integer,
      encoding: 'FLOOR_MULTIPLE_ENUM_VARINT',
      options: {
        minimum: schema.minimum,
        multiplier: schema.multipleOf ?? 1
      }
    }
  } else if (typeof schema.minimum !== 'undefined' && typeof schema.maximum === 'undefined') {
    return {
      type: EncodingType.Integer,
      encoding: 'FLOOR_MULTIPLE_ENUM_VARINT',
      options: {
        minimum: schema.minimum,
        multiplier: schema.multipleOf ?? 1
      }
    }
  } else if (typeof schema.minimum === 'undefined' && typeof schema.maximum !== 'undefined') {
    return {
      type: EncodingType.Integer,
      encoding: 'ROOF_MULTIPLE_MIRROR_ENUM_VARINT',
      options: {
        maximum: schema.maximum,
        multiplier: schema.multipleOf ?? 1
      }
    }
  }

  return {
    type: EncodingType.Integer,
    encoding: 'ARBITRARY_MULTIPLE_ZIGZAG_VARINT',
    options: {
      multiplier: schema.multipleOf ?? 1
    }
  }
}
