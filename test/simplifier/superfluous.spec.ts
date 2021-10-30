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

tap.test('should remove contentSchema if no contentMediaType', (test) => {
  const schema: Schema = {
    type: 'string',
    contentSchema: {
      type: 'integer'
    }
  }

  const result: Schema = {
    type: 'string',
    minLength: 0
  }

  test.strictSame(simplifySchema(schema), result)
  test.end()
})

tap.test('should remove minContains if no contains', (test) => {
  const schema: Schema = {
    type: 'array',
    minContains: 4
  }

  const result: Schema = {
    type: 'array',
    items: {},
    minItems: 0
  }

  test.strictSame(simplifySchema(schema), result)
  test.end()
})

tap.test('should remove maxContains if no contains', (test) => {
  const schema: Schema = {
    type: 'array',
    maxContains: 4
  }

  const result: Schema = {
    type: 'array',
    items: {},
    minItems: 0
  }

  test.strictSame(simplifySchema(schema), result)
  test.end()
})

tap.test('an empty array is unique by definition', (test) => {
  const schema: Schema = {
    type: 'array',
    uniqueItems: true,
    maxItems: 0
  }

  const result: Schema = {
    type: 'array',
    items: {},
    minItems: 0,
    enum: [ [] ]
  }

  test.strictSame(simplifySchema(schema), result)
  test.end()
})

tap.test('a array with one element is unique by definition', (test) => {
  const schema: Schema = {
    type: 'array',
    uniqueItems: true,
    maxItems: 1
  }

  const result: Schema = {
    type: 'array',
    items: {},
    minItems: 0,
    maxItems: 1
  }

  test.strictSame(simplifySchema(schema), result)
  test.end()
})

tap.test('should remove if when the then and else keywords are missing', (test) => {
  const schema: Schema = {
    type: 'number',
    if: {
      type: 'integer'
    }
  }

  const result: Schema = {
    type: 'number'
  }

  test.strictSame(simplifySchema(schema), result)
  test.end()
})

tap.test('should remove then and else when no if', (test) => {
  const schema: Schema = {
    type: 'number',
    then: {
      type: 'integer'
    },
    else: {
      type: 'array'
    }
  }

  const result: Schema = {
    type: 'number'
  }

  test.strictSame(simplifySchema(schema), result)
  test.end()
})

tap.test('should remove an empty properties', (test) => {
  const schema: Schema = {
    type: 'object',
    properties: {}
  }

  const result: Schema = {
    type: 'object',
    additionalProperties: {},
    properties: {},
    required: [],
    minProperties: 0
  }

  test.strictSame(simplifySchema(schema), result)
  test.end()
})

tap.test('should remove an empty patternProperties', (test) => {
  const schema: Schema = {
    type: 'object',
    patternProperties: {}
  }

  const result: Schema = {
    type: 'object',
    additionalProperties: {},
    properties: {},
    required: [],
    minProperties: 0
  }

  test.strictSame(simplifySchema(schema), result)
  test.end()
})
