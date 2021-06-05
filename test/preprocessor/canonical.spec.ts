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
  canonicalizeSchema
} from '../../lib/preprocessor/canonical'

import {
  EncodingSchema
} from '../../lib/schema'

tap.test('should canonicalize an allOf with multiple integer schemas', (test) => {
  const result: EncodingSchema = canonicalizeSchema({
    allOf: [
      {
        type: 'integer'
      },
      {
        maximum: 4
      }
    ]
  })

  test.strictSame(result, {
    type: 'integer',
    maximum: 4
  })

  test.end()
})
