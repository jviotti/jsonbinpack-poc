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
  intersection,
  uniqWith,
  isEqual
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
    id: 'equal-numeric-bounds-as-const',
    condition: (schema: ObjectSchema): JSONBoolean => {
      return 'minimum' in schema && 'maximum' in schema &&
        schema.minimum === schema.maximum
    },
    transform: (schema: ObjectSchema): ObjectSchema => {
      const value = schema.maximum
      Reflect.deleteProperty(schema, 'maximum')
      Reflect.deleteProperty(schema, 'minimum')
      return Object.assign(schema, {
        const: value
      })
    }
  },
  {
    id: 'empty-string',
    condition: (schema: ObjectSchema): JSONBoolean => {
      return schema.type === 'string' &&
        'maxLength' in schema && schema.maxLength === 0
    },
    transform: (schema: ObjectSchema): ObjectSchema => {
      Reflect.deleteProperty(schema, 'maxLength')
      return Object.assign(schema, {
        const: ''
      })
    }
  },
  {
    id: 'empty-array',
    condition: (schema: ObjectSchema): JSONBoolean => {
      return schema.type === 'array' &&
        'maxItems' in schema && schema.maxItems === 0
    },
    transform: (schema: ObjectSchema): ObjectSchema => {
      Reflect.deleteProperty(schema, 'maxItems')
      return Object.assign(schema, {
        const: []
      })
    }
  },
  {
    id: 'empty-object',
    condition: (schema: ObjectSchema): JSONBoolean => {
      return schema.type === 'object' &&
        'maxProperties' in schema && schema.maxProperties === 0
    },
    transform: (schema: ObjectSchema): ObjectSchema => {
      Reflect.deleteProperty(schema, 'maxProperties')
      return Object.assign(schema, {
        const: {}
      })
    }
  },
  {
    id: 'dependent-required-tautology',
    condition: (schema: ObjectSchema): JSONBoolean => {
      return typeof schema.dependentRequired === 'object' &&
        !Array.isArray(schema.dependentRequired) &&
        schema.dependentRequired !== null && Array.isArray(schema.required) &&
        intersection(Object.keys(schema.dependentRequired), schema.required).length > 0
    },
    transform: (schema: ObjectSchema): ObjectSchema => {
      assert(Array.isArray(schema.required))
      assert(typeof schema.dependentRequired === 'object' &&
        !Array.isArray(schema.dependentRequired) &&
        schema.dependentRequired !== null)

      for (const name of intersection(Object.keys(schema.dependentRequired), schema.required)) {
        for (const key of schema.dependentRequired[name]) {
          if (!schema.required.includes(key)) {
            schema.required.push(key)
          }
        }

        Reflect.deleteProperty(schema.dependentRequired, name)
      }

      return schema
    }
  },
  {
    id: 'duplicate-allof-branches',
    condition: (schema: ObjectSchema): JSONBoolean => {
      return Array.isArray(schema.allOf) &&
        uniqWith(schema.allOf, isEqual).length !== schema.allOf.length
      return schema.type === 'object' &&
        'maxProperties' in schema && schema.maxProperties === 0
    },
    transform: (schema: ObjectSchema): ObjectSchema => {
      return Object.assign(schema, {
        allOf: uniqWith(schema.allOf, isEqual)
      })
    }
  },
  {
    id: 'duplicate-anyof-branches',
    condition: (schema: ObjectSchema): JSONBoolean => {
      return Array.isArray(schema.anyOf) &&
        uniqWith(schema.anyOf, isEqual).length !== schema.anyOf.length
      return schema.type === 'object' &&
        'maxProperties' in schema && schema.maxProperties === 0
    },
    transform: (schema: ObjectSchema): ObjectSchema => {
      return Object.assign(schema, {
        anyOf: uniqWith(schema.anyOf, isEqual)
      })
    }
  }
]
