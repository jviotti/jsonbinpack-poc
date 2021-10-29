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

import tap from 'tap'

import {
  Schema
} from '../../lib/jsonschema'

import {
  simplifySchema
} from '../../lib/simplifier'

tap.test('should convert a schema without type into a type union', (test) => {
  const schema: Schema = {
    minimum: 5
  }

  const result: Schema = {
    anyOf: [
      {
        enum: [ null ],
        minimum: 5
      },
      {
        enum: [ false, true ],
        minimum: 5
      },
      {
        type: 'object',
        additionalProperties: {},
        properties: {},
        required: [],
        minProperties: 0
      },
      {
        type: 'array',
        items: {},
        minItems: 0
      },
      {
        type: 'string',
        minLength: 0
      },
      {
        type: 'number',
        minimum: 5
      },
      {
        type: 'integer',
        multipleOf: 1,
        minimum: 5
      }
    ]
  }

  test.strictSame(simplifySchema(schema), result)
  test.end()
})
