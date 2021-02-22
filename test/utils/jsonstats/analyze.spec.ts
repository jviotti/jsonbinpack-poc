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
  JSONObject,
  JSONType
} from '../../../lib/json'

import {
  JSONStats,
  analyze
} from '../../../utils/jsonstats'

tap.test('should analyze a simple lat/lon object', (test) => {
  const document: JSONObject = {
    latitude: 48.858093,
    longitude: 2.294694
  }

  const result: JSONStats = {
    size: 43,
    type: JSONType.object,
    depth: {
      count: 1,
      larger: 0,
      smaller: 0,
      median: 0,
      average: 0
    },
    keys: {
      count: 2,
      larger: 11,
      smaller: 10,
      median: 11,
      average: 10.5,
      byLevel: {
        larger: 2,
        smaller: 2,
        median: 2,
        average: 2,
      }
    },
    redundancy: {
      keys: 0,
      values: {
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
    },
    values: {
      count: 2,
      larger: 9,
      smaller: 8,
      median: 9,
      average: 8.5,
      byLevel: {
        larger: 2,
        smaller: 2,
        median: 2,
        average: 2,
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
          count: 2,
          larger: 9,
          smaller: 8,
          median: 9,
          average: 8.5
        },
        boolean: {
          count: 0,
          larger: 0,
          smaller: 0,
          median: 0,
          average: 0
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
          count: 1,
          larger: 43,
          smaller: 43,
          median: 43,
          average: 43
        },
        array: {
          count: 0,
          larger: 0,
          smaller: 0,
          median: 0,
          average: 0
        }
      }
    }
  }

  test.strictSame(analyze(document), result)
  test.end()
})
