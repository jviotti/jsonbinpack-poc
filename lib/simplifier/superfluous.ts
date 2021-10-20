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
    id: 'content-schema-without-content-media-type',
    condition: (schema: ObjectSchema): JSONBoolean => {
      return 'contentSchema' in schema && !('contentMediaType' in schema)
    },
    transform: (schema: ObjectSchema): ObjectSchema => {
      Reflect.deleteProperty(schema, 'contentSchema')
      return schema
    }
  },
  {
    id: 'max-min-contains-without-contains',
    condition: (schema: ObjectSchema): JSONBoolean => {
      return !('contains' in schema) &&
        ('minContains' in schema || 'maxContains' in schema)
    },
    transform: (schema: ObjectSchema): ObjectSchema => {
      Reflect.deleteProperty(schema, 'minContains')
      Reflect.deleteProperty(schema, 'maxContains')
      return schema
    }
  },
  {
    id: 'unsatisfiable-max-contains',
    condition: (schema: ObjectSchema): JSONBoolean => {
      return typeof schema.maxContains === 'number' &&
        typeof schema.maxItems === 'number' &&
        schema.maxContains >= schema.maxItems
    },
    transform: (schema: ObjectSchema): ObjectSchema => {
      Reflect.deleteProperty(schema, 'maxContains')
      return schema
    }
  },
  {
    id: 'implied-array-uniqueness',
    condition: (schema: ObjectSchema): JSONBoolean => {
      const hasUniqueItems: boolean =
        typeof schema.uniqueItems === 'boolean' && schema.uniqueItems

      // The below branches are in case the rule that removes maxItems = 0
      // in an array runs before this rule.
      return hasUniqueItems && (
        (typeof schema.maxItems === 'number' && schema.maxItems <= 1) ||
        (Array.isArray(schema.const) && schema.const.length <= 1) ||
        (Array.isArray(schema.enum) && schema.enum.length === 1 &&
          Array.isArray(schema.enum[0]) && schema.enum[0].length <= 1)
      )
    },
    transform: (schema: ObjectSchema): ObjectSchema => {
      Reflect.deleteProperty(schema, 'uniqueItems')
      return schema
    }
  }
]
