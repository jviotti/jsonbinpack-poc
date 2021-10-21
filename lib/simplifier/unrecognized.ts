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
  difference,
  reduce
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

const KEYWORDS: string[] = [
  '$id', '$vocabulary', '$schema', '$comment', '$defs',
  '$ref', '$dynamicRef', '$anchor', '$dynamicAnchor',

  'prefixItems', 'items', 'contains', 'additionalProperties',
  'properties', 'patternProperties', 'dependentSchemas',
  'propertyNames', 'allOf', 'anyOf', 'oneOf',
  'not', 'if', 'then', 'else',

  'unevaluatedItems', 'unevaluatedProperties',

  'type', 'const', 'enum', 'minimum', 'exclusiveMinimum',
  'maximum', 'exclusiveMaximum', 'multipleOf', 'minLength',
  'maxLength', 'pattern', 'minItems', 'maxItems', 'uniqueItems',
  'minContains', 'maxContains', 'minProperties', 'maxProperties',
  'dependentRequired', 'required',

  'format',

  'contentEncoding', 'contentMediaType', 'contentSchema',

  'title', 'description', 'deprecated',
  'readOnly', 'writeOnly', 'default', 'examples'
]

export const RULES: SimplificationRule[] = [
  {
    id: 'unrecognized-keywords',
    condition: (schema: ObjectSchema): JSONBoolean => {
      return difference(Object.keys(schema), KEYWORDS).length > 0
    },
    transform: (schema: ObjectSchema): ObjectSchema => {
      return reduce(schema, (accumulator: ObjectSchema, value, key) => {
        return KEYWORDS.includes(key) ? {
          [key]: value,
          ...accumulator
        } : accumulator
      }, {})
    }
  }
]
