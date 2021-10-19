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
  }
]
