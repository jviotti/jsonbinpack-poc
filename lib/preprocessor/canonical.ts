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
  pick
} from 'lodash'

import {
  JSONSchema
} from './deref'

import {
  EncodingSchema,
  BooleanEncodingSchema,
  IntegerEncodingSchema,
  NullEncodingSchema,
  NumberEncodingSchema,
  StringEncodingSchema,
  ArrayEncodingSchema,
  ObjectEncodingSchema
} from '../schema'

const SCHEMA_BOOLEAN_KEYS: Array<keyof BooleanEncodingSchema> = [ 'type' ]
const SCHEMA_INTEGER_KEYS: Array<keyof IntegerEncodingSchema> =
  [ 'type', 'minimum', 'maximum', 'multipleOf' ]
const SCHEMA_NULL_KEYS: Array<keyof NullEncodingSchema> = [ 'type' ]
const SCHEMA_NUMBER_KEYS: Array<keyof NumberEncodingSchema> = [ 'type' ]
const SCHEMA_STRING_KEYS: Array<keyof StringEncodingSchema> =
  [ 'type', 'maxLength', 'minLength', 'format', 'contentEncoding', 'contentMediaType', 'contentSchema' ]
const SCHEMA_ARRAY_KEYS: Array<keyof ArrayEncodingSchema> =
  [ 'type', 'maxItems', 'minItems', 'items', 'prefixItems' ]
const SCHEMA_OBJECT_KEYS: Array<keyof ObjectEncodingSchema> =
  [ 'type', 'additionalProperties', 'required', 'propertyNames', 'properties' ]

export const canonicalizeSchema = (schema: JSONSchema): EncodingSchema => {
  if (typeof schema.allOf !== 'undefined') {
    return canonicalizeSchema(Object.assign({}, ...schema.allOf))
  }

  switch (schema.type) {
    case 'boolean': return pick(schema, SCHEMA_BOOLEAN_KEYS)
    case 'integer': return pick(schema, SCHEMA_INTEGER_KEYS)
    case 'null': return pick(schema, SCHEMA_NULL_KEYS)
    case 'number': return pick(schema, SCHEMA_NUMBER_KEYS)
    case 'string': return pick(schema, SCHEMA_STRING_KEYS)
    case 'array': return pick(schema, SCHEMA_ARRAY_KEYS)
    case 'object': return pick(schema, SCHEMA_OBJECT_KEYS)

    // The any type
    default: return {}
  }
}
