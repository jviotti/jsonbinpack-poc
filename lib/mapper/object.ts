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
  getStringEncoding,
  StringEncoding
} from './string'

import {
  Encoding,
  getEncoding
} from './index'

import {
  EncodingType
} from '../encoder'

import {
  BaseEncodingDefinition
} from './base-encoding-definition'

import {
  TypedKeysOptions,
  BoundedTypedOptions,
  UnboundedTypedOptions,
  RequiredUnboundedTypedOptions,
  OptionalBoundedTypedOptions,
  OptionalUnboundedTypedOptions,
  RequiredBoundedTypedOptions
} from '../encoder/object/options'

import {
  EncodingSchema,
  ObjectEncodingSchema
} from '../schema'

export interface REQUIRED_ONLY_BOUNDED_TYPED_OBJECT_ENCODING extends BaseEncodingDefinition {
  readonly type: EncodingType.Object;
  readonly encoding: 'REQUIRED_ONLY_BOUNDED_TYPED_OBJECT';
  readonly options: RequiredBoundedTypedOptions;
}

export interface NON_REQUIRED_BOUNDED_TYPED_OBJECT_ENCODING extends BaseEncodingDefinition {
  readonly type: EncodingType.Object;
  readonly encoding: 'NON_REQUIRED_BOUNDED_TYPED_OBJECT';
  readonly options: OptionalBoundedTypedOptions;
}

export interface MIXED_BOUNDED_TYPED_OBJECT_ENCODING extends BaseEncodingDefinition {
  readonly type: EncodingType.Object;
  readonly encoding: 'MIXED_BOUNDED_TYPED_OBJECT';
  readonly options: BoundedTypedOptions;
}

export interface ARBITRARY_TYPED_KEYS_OBJECT_ENCODING extends BaseEncodingDefinition {
  readonly type: EncodingType.Object;
  readonly encoding: 'ARBITRARY_TYPED_KEYS_OBJECT';
  readonly options: TypedKeysOptions;
}

export interface REQUIRED_UNBOUNDED_TYPED_OBJECT_ENCODING extends BaseEncodingDefinition {
  readonly type: EncodingType.Object;
  readonly encoding: 'REQUIRED_UNBOUNDED_TYPED_OBJECT';
  readonly options: RequiredUnboundedTypedOptions;
}

export interface OPTIONAL_UNBOUNDED_TYPED_OBJECT_ENCODING extends BaseEncodingDefinition {
  readonly type: EncodingType.Object;
  readonly encoding: 'OPTIONAL_UNBOUNDED_TYPED_OBJECT';
  readonly options: OptionalUnboundedTypedOptions;
}

export interface MIXED_UNBOUNDED_TYPED_OBJECT_ENCODING extends BaseEncodingDefinition {
  readonly type: EncodingType.Object;
  readonly encoding: 'MIXED_UNBOUNDED_TYPED_OBJECT';
  readonly options: UnboundedTypedOptions;
}

export type ObjectEncodingNames =
  'REQUIRED_ONLY_BOUNDED_TYPED_OBJECT' |
  'NON_REQUIRED_BOUNDED_TYPED_OBJECT' |
  'MIXED_BOUNDED_TYPED_OBJECT' |
  'ARBITRARY_TYPED_KEYS_OBJECT' |
  'REQUIRED_UNBOUNDED_TYPED_OBJECT' |
  'OPTIONAL_UNBOUNDED_TYPED_OBJECT' |
  'MIXED_UNBOUNDED_TYPED_OBJECT'
export type ObjectEncoding =
  REQUIRED_ONLY_BOUNDED_TYPED_OBJECT_ENCODING |
  NON_REQUIRED_BOUNDED_TYPED_OBJECT_ENCODING |
  MIXED_BOUNDED_TYPED_OBJECT_ENCODING |
  ARBITRARY_TYPED_KEYS_OBJECT_ENCODING |
  REQUIRED_UNBOUNDED_TYPED_OBJECT_ENCODING |
  OPTIONAL_UNBOUNDED_TYPED_OBJECT_ENCODING |
  MIXED_UNBOUNDED_TYPED_OBJECT_ENCODING

const parseAdditionalProperties = (
  value: undefined | boolean | EncodingSchema
): Encoding | null => {
  if (typeof value === 'boolean' && !value) {
    return null
  }

  const schema: EncodingSchema =
    (typeof value === 'undefined' || (typeof value === 'boolean' && value))
      ? {} : value
  return getEncoding(schema)
}

export const getObjectEncoding = (schema: ObjectEncodingSchema): ObjectEncoding => {
  const additionalProperties: Encoding | null =
    parseAdditionalProperties(schema.additionalProperties)
  const requiredProperties: string[] =
    (schema.required ?? []).sort((left: string, right: string) => {
      return left.localeCompare(right)
    })

  const properties: Record<string, EncodingSchema> = schema.properties ?? {}
  const optionalProperties: string[] = Object.keys(properties)
    .filter((key: string) => {
      return !requiredProperties.includes(key)
    }).sort((left: string, right: string) => {
      return left.localeCompare(right)
    })

  const propertyEncodings: Record<string, Encoding> = Object.keys(properties)
    .reduce((accumulator: Record<string, Encoding>, key: string) => {
      accumulator[key] = getEncoding(properties[key])
      return accumulator
    }, {})

  for (const key of requiredProperties.concat(optionalProperties)) {
    if (!(key in propertyEncodings)) {
      propertyEncodings[key] = additionalProperties ?? getEncoding({})
    }
  }

  const keyEncoding: StringEncoding =
    getStringEncoding(schema.propertyNames ?? {
      type: 'string'
    })

  // Bounded encodings
  if (additionalProperties === null) {
    if (optionalProperties.length === 0) {
      return {
        type: EncodingType.Object,
        encoding: 'REQUIRED_ONLY_BOUNDED_TYPED_OBJECT',
        options: {
          propertyEncodings,
          requiredProperties
        }
      }
    } else if (requiredProperties.length === 0) {
      return {
        type: EncodingType.Object,
        encoding: 'NON_REQUIRED_BOUNDED_TYPED_OBJECT',
        options: {
          propertyEncodings,
          optionalProperties
        }
      }
    }
    return {
      type: EncodingType.Object,
      encoding: 'MIXED_BOUNDED_TYPED_OBJECT',
      options: {
        propertyEncodings,
        optionalProperties,
        requiredProperties
      }
    }
  }

  if (requiredProperties.length > 0 && optionalProperties.length > 0) {
    return {
      type: EncodingType.Object,
      encoding: 'MIXED_UNBOUNDED_TYPED_OBJECT',
      options: {
        propertyEncodings,
        optionalProperties,
        requiredProperties,
        keyEncoding,
        encoding: additionalProperties
      }
    }
  } else if (requiredProperties.length > 0 && optionalProperties.length === 0) {
    return {
      type: EncodingType.Object,
      encoding: 'REQUIRED_UNBOUNDED_TYPED_OBJECT',
      options: {
        encoding: additionalProperties,
        propertyEncodings,
        keyEncoding,
        requiredProperties
      }
    }
  } else if (requiredProperties.length === 0 && optionalProperties.length > 0) {
    return {
      type: EncodingType.Object,
      encoding: 'OPTIONAL_UNBOUNDED_TYPED_OBJECT',
      options: {
        encoding: additionalProperties,
        propertyEncodings,
        keyEncoding,
        optionalProperties
      }
    }
  }

  return {
    type: EncodingType.Object,
    encoding: 'ARBITRARY_TYPED_KEYS_OBJECT',
    options: {
      encoding: additionalProperties,
      keyEncoding
    }
  }
}
