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
  IntegerCanonicalSchema
} from '../../canonical-schema'

import {
  BaseEncodingDefinition
} from '../../encoding'

import {
  UINT8_MAX
} from '../../utils/limits'

import {
  NoOptions,
  FloorOptions,
  FloorMultiplierOptions,
  RoofOptions,
  RoofMultiplierOptions,
  MultiplierOptions,
  BoundedOptions,
  BoundedMultiplierOptions
} from './options'

export interface BOUNDED_8BITS__ENUM_FIXED_ENCODING extends BaseEncodingDefinition {
  readonly encoding: 'BOUNDED_8BITS__ENUM_FIXED';
  readonly options: BoundedOptions;
}

export interface BOUNDED_MULTIPLE_8BITS__ENUM_FIXED_ENCODING extends BaseEncodingDefinition {
  readonly encoding: 'BOUNDED_MULTIPLE_8BITS__ENUM_FIXED';
  readonly options: BoundedMultiplierOptions;
}

export interface BOUNDED__ENUM_VARINT_ENCODING extends BaseEncodingDefinition {
  readonly encoding: 'BOUNDED__ENUM_VARINT';
  readonly options: BoundedOptions;
}

export interface BOUNDED_MULTIPLE__ENUM_VARINT_ENCODING extends BaseEncodingDefinition {
  readonly encoding: 'BOUNDED_MULTIPLE__ENUM_VARINT';
  readonly options: BoundedMultiplierOptions;
}

export interface FLOOR__ENUM_VARINT_ENCODING extends BaseEncodingDefinition {
  readonly encoding: 'FLOOR__ENUM_VARINT';
  readonly options: FloorOptions;
}

export interface FLOOR_MULTIPLE__ENUM_VARINT_ENCODING extends BaseEncodingDefinition {
  readonly encoding: 'FLOOR_MULTIPLE__ENUM_VARINT';
  readonly options: FloorMultiplierOptions;
}

export interface ROOF__MIRROR_ENUM_VARINT_ENCODING extends BaseEncodingDefinition {
  readonly encoding: 'ROOF__MIRROR_ENUM_VARINT';
  readonly options: RoofOptions;
}

export interface ROOF_MULTIPLE__MIRROR_ENUM_VARINT_ENCODING extends BaseEncodingDefinition {
  readonly encoding: 'ROOF_MULTIPLE__MIRROR_ENUM_VARINT';
  readonly options: RoofMultiplierOptions;
}

export interface ARBITRARY__ZIGZAG_VARINT_ENCODING extends BaseEncodingDefinition {
  readonly encoding: 'ARBITRARY__ZIGZAG_VARINT';
  readonly options: NoOptions;
}

export interface ARBITRARY_MULTIPLE__ZIGZAG_VARINT_ENCODING extends BaseEncodingDefinition {
  readonly encoding: 'ARBITRARY_MULTIPLE__ZIGZAG_VARINT';
  readonly options: MultiplierOptions;
}

export type IntegerEncoding =
  BOUNDED_8BITS__ENUM_FIXED_ENCODING |
  BOUNDED_MULTIPLE_8BITS__ENUM_FIXED_ENCODING |
  BOUNDED__ENUM_VARINT_ENCODING |
  BOUNDED_MULTIPLE__ENUM_VARINT_ENCODING |
  FLOOR__ENUM_VARINT_ENCODING |
  FLOOR_MULTIPLE__ENUM_VARINT_ENCODING |
  ROOF__MIRROR_ENUM_VARINT_ENCODING |
  ROOF_MULTIPLE__MIRROR_ENUM_VARINT_ENCODING |
  ARBITRARY__ZIGZAG_VARINT_ENCODING |
  ARBITRARY_MULTIPLE__ZIGZAG_VARINT_ENCODING

export const getIntegerEncoding = (schema: IntegerCanonicalSchema): IntegerEncoding => {
  assert(typeof schema.minimum === 'undefined' ||
    typeof schema.maximum === 'undefined' ||
    schema.maximum >= schema.minimum)

  if (typeof schema.minimum !== 'undefined' &&
    typeof schema.maximum !== 'undefined' && typeof schema.multipleOf !== 'undefined') {
    // TODO: Handle 8-bits case
    return {
      encoding: 'BOUNDED_MULTIPLE__ENUM_VARINT',
      options: {
        minimum: schema.minimum,
        maximum: schema.maximum,
        multiplier: schema.multipleOf
      }
    }
  } else if (typeof schema.minimum !== 'undefined' &&
    typeof schema.maximum !== 'undefined' && !('multipleOf' in schema)) {
    return {
      encoding: (schema.maximum - schema.minimum <= UINT8_MAX)
        ? 'BOUNDED_8BITS__ENUM_FIXED' : 'BOUNDED__ENUM_VARINT',
      options: {
        minimum: schema.minimum,
        maximum: schema.maximum,
      }
    }
  } else if (typeof schema.minimum !== 'undefined' &&
    typeof schema.maximum === 'undefined' && typeof schema.multipleOf !== 'undefined') {
    return {
      encoding: 'FLOOR_MULTIPLE__ENUM_VARINT',
      options: {
        minimum: schema.minimum,
        multiplier: schema.multipleOf
      }
    }
  } else if (typeof schema.minimum !== 'undefined' &&
    typeof schema.maximum === 'undefined' && !('multipleOf' in schema)) {
    return {
      encoding: 'FLOOR__ENUM_VARINT',
      options: {
        minimum: schema.minimum
      }
    }
  } else if (typeof schema.minimum === 'undefined' &&
    typeof schema.maximum !== 'undefined' && typeof schema.multipleOf !== 'undefined') {
    return {
      encoding: 'ROOF_MULTIPLE__MIRROR_ENUM_VARINT',
      options: {
        maximum: schema.maximum,
        multiplier: schema.multipleOf
      }
    }
  } else if (typeof schema.minimum === 'undefined' &&
    typeof schema.maximum !== 'undefined' && !('multipleOf' in schema)) {
    return {
      encoding: 'ROOF__MIRROR_ENUM_VARINT',
      options: {
        maximum: schema.maximum
      }
    }
  } else if (typeof schema.minimum === 'undefined' &&
    typeof schema.maximum === 'undefined' && typeof schema.multipleOf !== 'undefined') {
    return {
      encoding: 'ARBITRARY_MULTIPLE__ZIGZAG_VARINT',
      options: {
        multiplier: schema.multipleOf
      }
    }
  } else {
    return {
      encoding: 'ARBITRARY__ZIGZAG_VARINT',
      options: {}
    }
  }
}
