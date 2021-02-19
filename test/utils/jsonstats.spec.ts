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

import * as tap from 'tap'

import {
  analyze,
  JSONStats
} from '../../utils/jsonstats'

import {
  JSONValue,
  JSONType
} from '../../lib/json'

tap.test('should analyze a true boolean value', (test) => {
  const value: JSONValue = true
  const stats: JSONStats = analyze(value)

  test.strictSame(stats, {
    size: 4,
    type: JSONType.Boolean,
    keys: {
      count: 0,
      larger: 0,
      smaller: 0,
      median: 0,
      average: 0,
      byLevel: {
        larger: 0,
        smaller: 0,
        median: 0,
        average: 0
      }
    },
    values: {
      count: 1,
      larger: 4,
      smaller: 4,
      median: 4,
      average: 4,
      byLevel: {
        larger: 4,
        smaller: 4,
        median: 4,
        average: 4
      },
      breakdown: {
        integer: {
          count: 0,
          larger: 0,
          smaller: 0,
          median: 0,
          average: 0
        },
        real: {
          count: 0,
          larger: 0,
          smaller: 0,
          median: 0,
          average: 0
        },
        boolean: {
          count: 1,
          larger: 4,
          smaller: 4,
          median: 4,
          average: 4
        },
        string: {
          count: 0,
          larger: 0,
          smaller: 0,
          median: 0,
          average: 0
        },
        null: {
          count: 0,
          larger: 0,
          smaller: 0,
          median: 0,
          average: 0
        },
        object: {
          count: 0,
          larger: 0,
          smaller: 0,
          median: 0,
          average: 0
        },
        array: {
          count: 0,
          larger: 0,
          smaller: 0,
          median: 0,
          average: 0
        }
      }
    },
    depth: {
      count: 0,
      larger: 0,
      smaller: 0,
      median: 0,
      average: 0
    },
    redundancy: {
      count: 0,
      breakdown: {
        integer: 0,
        real: 0,
        boolean: 0,
        string: 0,
        null: 0,
        object: 0,
        array: 0
      }
    }
  })

  test.end()
})
