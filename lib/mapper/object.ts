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
  isDeepStrictEqual
} from 'util'

import {
  JSONValue
} from '../json'

import {
  getStringEncoding,
  StringEncoding
} from './string'

import {
  Encoding,
  getStates,
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
  RequiredBoundedTypedOptions,
  PackedUnboundedOptions
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

export interface PACKED_UNBOUNDED_OBJECT_ENCODING extends BaseEncodingDefinition {
  readonly type: EncodingType.Object;
  readonly encoding: 'PACKED_UNBOUNDED_OBJECT';
  readonly options: PackedUnboundedOptions;
}

export type ObjectEncodingNames =
  'REQUIRED_ONLY_BOUNDED_TYPED_OBJECT' |
  'NON_REQUIRED_BOUNDED_TYPED_OBJECT' |
  'MIXED_BOUNDED_TYPED_OBJECT' |
  'ARBITRARY_TYPED_KEYS_OBJECT' |
  'REQUIRED_UNBOUNDED_TYPED_OBJECT' |
  'OPTIONAL_UNBOUNDED_TYPED_OBJECT' |
  'MIXED_UNBOUNDED_TYPED_OBJECT' |
  'PACKED_UNBOUNDED_OBJECT'
export type ObjectEncoding =
  REQUIRED_ONLY_BOUNDED_TYPED_OBJECT_ENCODING |
  NON_REQUIRED_BOUNDED_TYPED_OBJECT_ENCODING |
  MIXED_BOUNDED_TYPED_OBJECT_ENCODING |
  ARBITRARY_TYPED_KEYS_OBJECT_ENCODING |
  REQUIRED_UNBOUNDED_TYPED_OBJECT_ENCODING |
  OPTIONAL_UNBOUNDED_TYPED_OBJECT_ENCODING |
  MIXED_UNBOUNDED_TYPED_OBJECT_ENCODING |
  PACKED_UNBOUNDED_OBJECT_ENCODING

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

// TODO: This definition can probably be greatly improved once we
// support the maxProperties JSON Schema keyword.
export const getObjectStates = (schema: ObjectEncodingSchema): number | JSONValue[] => {
  const encoding: ObjectEncoding = getObjectEncoding(schema)
  if (encoding.encoding === 'REQUIRED_ONLY_BOUNDED_TYPED_OBJECT' ||
    encoding.encoding === 'NON_REQUIRED_BOUNDED_TYPED_OBJECT' ||
    encoding.encoding === 'MIXED_BOUNDED_TYPED_OBJECT') {
    return Object.keys(encoding.options.propertyEncodings).reduce(
      (accumulator: number, property: string): number => {
      const propertyEncoding: Encoding =
          encoding.options.propertyEncodings[property]
      const states: number | JSONValue[] = getStates(propertyEncoding)
      const propertyStates: number = Array.isArray(states) ? states.length : states

      if ('optionalProperties' in encoding.options &&
        Array.isArray(encoding.options.optionalProperties) &&
        encoding.options.optionalProperties.includes(property)) {
        // As non being present (optional) counts as yet another state
        return accumulator * (propertyStates + 1)
      }

      return accumulator * propertyStates
    }, 1)
  }

  return Infinity
}

export const getObjectEncoding = (schema: ObjectEncodingSchema): ObjectEncoding => {
  const additionalProperties: Encoding | null =
    parseAdditionalProperties(schema.additionalProperties)

  const properties: Record<string, EncodingSchema> = schema.properties ?? {}
  const propertyEncodings: Record<string, Encoding> = Object.keys(properties)
    .reduce((accumulator: Record<string, Encoding>, key: string) => {
      accumulator[key] = getEncoding(properties[key])
      return accumulator
    }, {})

  const unsortedRequiredBooleanProperties: string[] = []
  const nonBooleanRequiredProperties: string[] = []

  for (const key of schema.required ?? []) {
    const encoding: Encoding | null = propertyEncodings[key] ?? additionalProperties ?? null
    if (encoding !== null && encoding.type === EncodingType.Boolean) {
      unsortedRequiredBooleanProperties.push(key)
    } else {
      nonBooleanRequiredProperties.push(key)
    }
  }

  const booleanRequiredProperties: string[] =
    unsortedRequiredBooleanProperties.sort((left: string, right: string) => {
      return left.localeCompare(right)
    })

  const requiredProperties: string[] =
    nonBooleanRequiredProperties.sort((left: string, right: string) => {
      return left.localeCompare(right)
    })

  const optionalProperties: string[] = Object.keys(properties)
    .filter((key: string) => {
      return !requiredProperties.includes(key) && !booleanRequiredProperties.includes(key)
    }).sort((left: string, right: string) => {
      return left.localeCompare(right)
    })

  const allRequiredProperties: string[] =
    booleanRequiredProperties.concat(requiredProperties)
  const allProperties: string[] = allRequiredProperties.concat(optionalProperties)
  for (const key of allProperties) {
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
          requiredProperties,
          booleanRequiredProperties
        }
      }
    } else if (allRequiredProperties.length === 0) {
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
        requiredProperties,
        booleanRequiredProperties
      }
    }
  }

  if (additionalProperties !== null &&
    requiredProperties.length > 0 &&
    additionalProperties.type === EncodingType.Integer &&
    additionalProperties.encoding === 'BOUNDED_8BITS__ENUM_FIXED') {

    const propertiesDefinition: Record<string, EncodingSchema> =
      schema.properties ?? {}
    const packedRequiredProperties: string[] = []
    const unpackedRequiredProperties: string[] = []
    for (const key of schema.required ?? []) {
      if (booleanRequiredProperties.includes(key)) {
        continue
      }

      if (!(key in propertiesDefinition)) {
        packedRequiredProperties.push(key)
      } else if (isDeepStrictEqual(additionalProperties,
        getEncoding(propertiesDefinition[key]))) {
        packedRequiredProperties.push(key)
      } else {
        unpackedRequiredProperties.push(key)
      }
    }

    const packedPropertyEncodings: Record<string, Encoding> =
      Object.keys(propertyEncodings).reduce((accumulator: Record<string, Encoding>, key: string) => {
        if (!packedRequiredProperties.includes(key)) {
          accumulator[key] = propertyEncodings[key]
        }

        return accumulator
      }, {})

    return {
      type: EncodingType.Object,
      encoding: 'PACKED_UNBOUNDED_OBJECT',
      options: {
        packedEncoding: additionalProperties,
        packedRequiredProperties: packedRequiredProperties.sort(
          (left: string, right: string) => {
            return left.localeCompare(right)
          }),
        propertyEncodings: packedPropertyEncodings,
        optionalProperties,
        requiredProperties: unpackedRequiredProperties.sort(
          (left: string, right: string) => {
            return left.localeCompare(right)
          }),
        booleanRequiredProperties,
        keyEncoding
      }
    }
  }

  if (allRequiredProperties.length > 0 && optionalProperties.length > 0) {
    return {
      type: EncodingType.Object,
      encoding: 'MIXED_UNBOUNDED_TYPED_OBJECT',
      options: {
        propertyEncodings,
        optionalProperties,
        requiredProperties,
        booleanRequiredProperties,
        keyEncoding,
        encoding: additionalProperties
      }
    }
  } else if (allRequiredProperties.length > 0 && optionalProperties.length === 0) {
    return {
      type: EncodingType.Object,
      encoding: 'REQUIRED_UNBOUNDED_TYPED_OBJECT',
      options: {
        encoding: additionalProperties,
        propertyEncodings,
        keyEncoding,
        requiredProperties,
        booleanRequiredProperties
      }
    }
  } else if (allRequiredProperties.length === 0 && optionalProperties.length > 0) {
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
