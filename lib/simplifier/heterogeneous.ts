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

const KEYWORDS_CORE: string[] =
  [ '$id', '$vocabulary', '$schema', '$comment', '$defs',
    '$ref', '$dynamicRef', '$anchor', '$dynamicAnchor' ]

const KEYWORDS_APPLICATOR: string[] =
  [ 'prefixItems', 'items', 'contains', 'additionalProperties',
    'properties', 'patternProperties', 'dependentSchemas', 'propertyNames',
    'allOf', 'anyOf', 'oneOf', 'not', 'if', 'then', 'else' ]

const KEYWORDS_FORMAT_ASSERTION: string[] = [ 'format' ]
const KEYWORDS_FORMAT_ANNOTATION: string[] = [ 'format' ]

const KEYWORDS_CONTENT: string[] =
  [ 'contentEncoding', 'contentMediaType', 'contentSchema' ]

const KEYWORDS_META_DATA: string[] =
  [ 'title', 'description', 'deprecated',
    'readOnly', 'writeOnly', 'default', 'examples' ]

const ANY_KEYWORDS: string[] = KEYWORDS_CORE.concat(KEYWORDS_META_DATA).concat([
  'allOf', 'anyOf', 'oneOf', 'not', 'if', 'then', 'else'
]).concat([ 'type', 'const', 'enum' ])

const NUMERIC_KEYWORDS: string[] = ANY_KEYWORDS.concat([
  'minimum', 'exclusiveMinimum', 'maximum', 'exclusiveMaximum', 'multipleOf' ])

const STRING_KEYWORDS: string[] = ANY_KEYWORDS
  .concat(KEYWORDS_CONTENT)
  .concat(KEYWORDS_FORMAT_ASSERTION)
  .concat(KEYWORDS_FORMAT_ANNOTATION)
  .concat([ 'minLength', 'maxLength', 'pattern' ])

const OBJECT_KEYWORDS: string[] = ANY_KEYWORDS
  .concat(difference(KEYWORDS_APPLICATOR, [ 'prefixItems', 'items', 'contains' ]))
  .concat([ 'unevaluatedProperties' ])
  .concat([ 'minProperties', 'maxProperties', 'dependentRequired', 'required' ])

const ARRAY_KEYWORDS: string[] = ANY_KEYWORDS
  .concat([ 'prefixItems', 'items', 'contains' ])
  .concat([ 'unevaluatedItems' ])
  .concat([ 'minContains', 'maxContains', 'pattern', 'minItems', 'maxItems', 'uniqueItems' ])

export const RULES: SimplificationRule[] = [
  {
    id: 'pick-numeric-keywords',
    condition: (schema: ObjectSchema): JSONBoolean => {
      return (schema.type === 'integer' || schema.type === 'number') &&
        difference(Object.keys(schema), NUMERIC_KEYWORDS).length > 0
    },
    transform: (schema: ObjectSchema): ObjectSchema => {
      return reduce(schema, (accumulator: ObjectSchema, value, key) => {
        return NUMERIC_KEYWORDS.includes(key) ? {
          [key]: value,
          ...accumulator
        } : accumulator
      }, {})
    }
  },
  {
    id: 'pick-string-keywords',
    condition: (schema: ObjectSchema): JSONBoolean => {
      return schema.type === 'string' &&
        difference(Object.keys(schema), STRING_KEYWORDS).length > 0
    },
    transform: (schema: ObjectSchema): ObjectSchema => {
      return reduce(schema, (accumulator: ObjectSchema, value, key) => {
        return STRING_KEYWORDS.includes(key) ? {
          [key]: value,
          ...accumulator
        } : accumulator
      }, {})
    }
  },
  {
    id: 'pick-object-keywords',
    condition: (schema: ObjectSchema): JSONBoolean => {
      return schema.type === 'object' &&
        difference(Object.keys(schema), OBJECT_KEYWORDS).length > 0
    },
    transform: (schema: ObjectSchema): ObjectSchema => {
      return reduce(schema, (accumulator: ObjectSchema, value, key) => {
        return OBJECT_KEYWORDS.includes(key) ? {
          [key]: value,
          ...accumulator
        } : accumulator
      }, {})
    }
  },
  {
    id: 'pick-array-keywords',
    condition: (schema: ObjectSchema): JSONBoolean => {
      return schema.type === 'array' &&
        difference(Object.keys(schema), ARRAY_KEYWORDS).length > 0
    },
    transform: (schema: ObjectSchema): ObjectSchema => {
      return reduce(schema, (accumulator: ObjectSchema, value, key) => {
        return ARRAY_KEYWORDS.includes(key) ? {
          [key]: value,
          ...accumulator
        } : accumulator
      }, {})
    }
  },
  {
    id: 'pick-null-keywords',
    condition: (schema: ObjectSchema): JSONBoolean => {
      return schema.type === 'null' &&
        difference(Object.keys(schema), ANY_KEYWORDS).length > 0
    },
    transform: (schema: ObjectSchema): ObjectSchema => {
      return reduce(schema, (accumulator: ObjectSchema, value, key) => {
        return ANY_KEYWORDS.includes(key) ? {
          [key]: value,
          ...accumulator
        } : accumulator
      }, {})
    }
  },
  {
    id: 'pick-boolean-keywords',
    condition: (schema: ObjectSchema): JSONBoolean => {
      return schema.type === 'boolean' &&
        difference(Object.keys(schema), ANY_KEYWORDS).length > 0
    },
    transform: (schema: ObjectSchema): ObjectSchema => {
      return reduce(schema, (accumulator: ObjectSchema, value, key) => {
        return ANY_KEYWORDS.includes(key) ? {
          [key]: value,
          ...accumulator
        } : accumulator
      }, {})
    }
  }
]
