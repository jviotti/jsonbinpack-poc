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

tap.test('should convert a boolean schema to an enum', (test) => {
  const schema: Schema = {
    type: 'boolean'
  }

  const result: Schema = {
    enum: [ false, true ]
  }

  test.strictSame(simplifySchema(schema), result)
  test.end()
})

tap.test('should convert a boolean schema inside prefixItems to an enum', (test) => {
  const schema: Schema = {
    prefixItems: [
      {
        type: 'boolean'
      }
    ]
  }

  const result: Schema = {
    prefixItems: [
      {
        enum: [ false, true ]
      }
    ]
  }

  test.strictSame(simplifySchema(schema), result)
  test.end()
})

tap.test('should convert a boolean schema inside items to an enum', (test) => {
  const schema: Schema = {
    items: {
      type: 'boolean'
    }
  }

  const result: Schema = {
    items: {
      enum: [ false, true ]
    }
  }

  test.strictSame(simplifySchema(schema), result)
  test.end()
})

tap.test('should convert a boolean schema inside patternProperties to an enum', (test) => {
  const schema: Schema = {
    patternProperties: {
      '^foo$': {
        type: 'boolean'
      }
    }
  }

  const result: Schema = {
    patternProperties: {
      '^foo$': {
        enum: [ false, true ]
      }
    }
  }

  test.strictSame(simplifySchema(schema), result)
  test.end()
})
