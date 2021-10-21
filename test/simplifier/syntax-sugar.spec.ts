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

tap.test('should convert a type union to an anyOf', (test) => {
  const schema: Schema = {
    type: [ 'string', 'integer' ],
    minimum: 5,
    maxLength: 1
  }

  const result: Schema = {
    anyOf: [
      {
        type: 'string',
        minLength: 0,
        maxLength: 1
      },
      {
        type: 'integer',
        minimum: 5,
        multipleOf: 1
      }
    ]
  }

  test.strictSame(simplifySchema(schema), result)
  test.end()
})

tap.test('should convert exclusiveMinimum to minimum', (test) => {
  const schema: Schema = {
    type: 'integer',
    exclusiveMinimum: 5
  }

  const result: Schema = {
    type: 'integer',
    multipleOf: 1,
    minimum: 6
  }

  test.strictSame(simplifySchema(schema), result)
  test.end()
})

tap.test('should convert exclusiveMinimum to minimum with existing greater minimum', (test) => {
  const schema: Schema = {
    type: 'integer',
    exclusiveMinimum: 5,
    minimum: 6
  }

  const result: Schema = {
    type: 'integer',
    multipleOf: 1,
    minimum: 6
  }

  test.strictSame(simplifySchema(schema), result)
  test.end()
})

tap.test('should convert exclusiveMinimum to minimum with existing lower minimum', (test) => {
  const schema: Schema = {
    type: 'integer',
    exclusiveMinimum: 5,
    minimum: 4
  }

  const result: Schema = {
    type: 'integer',
    multipleOf: 1,
    minimum: 6
  }

  test.strictSame(simplifySchema(schema), result)
  test.end()
})

tap.test('should convert exclusiveMinimum to minimum inside prefixItems', (test) => {
  const schema: Schema = {
    type: 'array',
    prefixItems: [
      {
        type: 'integer',
        exclusiveMinimum: 5
      }
    ]
  }

  const result: Schema = {
    type: 'array',
    minItems: 0,
    prefixItems: [
      {
        type: 'integer',
        multipleOf: 1,
        minimum: 6
      }
    ]
  }

  test.strictSame(simplifySchema(schema), result)
  test.end()
})
