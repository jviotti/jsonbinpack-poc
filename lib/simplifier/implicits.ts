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
  intersection
} from 'lodash'

import {
  JSONBoolean
} from '../json'

import {
  ObjectSchema
} from '../jsonschema'

import {
  SimplificationRule
} from './rule'

export const RULES: SimplificationRule[] = [
  {
    id: 'implicit-type-union',
    condition: (schema: ObjectSchema): JSONBoolean => {
      return intersection(Object.keys(schema), [
        'type', 'const', 'enum',

        // Generic applicators
        'anyOf', 'oneOf', 'allOf', 'not', 'if', 'then', 'else',

        // Reference keywords
        '$ref', '$dynamicRef'
      ]).length === 0
    },
    transform: (schema: ObjectSchema): ObjectSchema => {
      return Object.assign(schema, {
        type: [ 'null', 'boolean', 'object', 'array', 'string', 'number', 'integer' ]
      })
    }
  },
  {
    id: 'implicit-unit-multiple-of',

    // Notice we don't consider the number type, as 1 is not
    // the unit of multiplication for real numbers.
    // i.e. 2.5 % 1 !== 0
    condition: (schema: ObjectSchema): JSONBoolean => {
      return Array.isArray(schema.type)
        ? (typeof schema.multipleOf === 'undefined' && schema.type.includes('integer'))
        : (typeof schema.multipleOf === 'undefined' && schema.type === 'integer')
    },
    transform: (schema: ObjectSchema): ObjectSchema => {
      return Object.assign(schema, { multipleOf: 1 })
    }
  },
  {
    id: 'implicit-array-lower-bound',
    condition: (schema: ObjectSchema): JSONBoolean => {
      return schema.type === 'array' && !('minItems' in schema)
    },
    transform: (schema: ObjectSchema): ObjectSchema => {
      return Object.assign(schema, { minItems: 0 })
    }
  },
  {
    id: 'implicit-string-lower-bound',
    condition: (schema: ObjectSchema): JSONBoolean => {
      return schema.type === 'string' && !('minLength' in schema)
    },
    transform: (schema: ObjectSchema): ObjectSchema => {
      return Object.assign(schema, { minLength: 0 })
    }
  },
  {
    id: 'implicit-object-lower-bound',
    condition: (schema: ObjectSchema): JSONBoolean => {
      return schema.type === 'object' && !('minProperties' in schema)
    },
    transform: (schema: ObjectSchema): ObjectSchema => {
      return Object.assign(schema, { minProperties: 0 })
    }
  },
  {
    id: 'implicit-array-items',
    condition: (schema: ObjectSchema): JSONBoolean => {
      return schema.type === 'array' && !('items' in schema)
    },
    transform: (schema: ObjectSchema): ObjectSchema => {
      return Object.assign(schema, { items: true })
    }
  }
]
