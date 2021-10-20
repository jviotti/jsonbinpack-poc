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

tap.test('should convert an integer with equal bounds to enum', (test) => {
  const schema: Schema = {
    type: 'integer',
    maximum: 3,
    minimum: 3
  }

  const result: Schema = {
    type: 'integer',
    multipleOf: 1,
    enum: [ 3 ]
  }

  test.strictSame(simplifySchema(schema), result)
  test.end()
})

tap.test('should convert a number with equal bounds to enum', (test) => {
  const schema: Schema = {
    type: 'number',
    maximum: 3,
    minimum: 3
  }

  const result: Schema = {
    type: 'number',
    enum: [ 3 ]
  }

  test.strictSame(simplifySchema(schema), result)
  test.end()
})

tap.test('should convert empty string to enum', (test) => {
  const schema: Schema = {
    type: 'string',
    maxLength: 0
  }

  const result: Schema = {
    type: 'string',
    minLength: 0,
    enum: [ '' ]
  }

  test.strictSame(simplifySchema(schema), result)
  test.end()
})

tap.test('should inline true dependent required keys', (test) => {
  const schema: Schema = {
    type: 'object',
    required: [ 'foo', 'bar' ],
    dependentRequired: {
      bar: [ 'baz' ]
    }
  }

  const result: Schema = {
    type: 'object',
    required: [ 'foo', 'bar', 'baz' ],
    dependentRequired: {},
    minProperties: 3
  }

  test.strictSame(simplifySchema(schema), result)
  test.end()
})
