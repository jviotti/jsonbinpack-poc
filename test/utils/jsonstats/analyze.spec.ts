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

tap.test('should analyze the survey test object', (test) => {
  const document: JSONObject = {
    tags: [],
    tz: -25200,
    days: [ 1, 1, 2, 1 ],
    coord: [ -90.0715, 29.9510 ],
    data: [
      {
        name: 'ox03',
        staff: true
      },
      {
        name: null,
        staff: false,
        extra: {
          info: ''
        }
      },
      {
        name: 'ox03',
        staff: true
      },
      {}
    ]
  }

  const result: JSONStats = {
    size: 184,
    type: JSONType.object,
    depth: {
      count: 6,
      larger: 2,
      smaller: 0,
      median: 1,
      average: 1
    },
    keys: {
      count: 13,
      larger: 7,
      smaller: 4,
      median: 6,
      average: 6.230769230769231,
      byLevel: {
        larger: 5,
        smaller: 0,
        median: 2,
        average: 2.1666666666666665,
      }
    },
    redundancy: {
      keys: 4,
      values: {
        count: 5,
        breakdown: {
          integer: 2,
          real: 0,
          boolean: 1,
          string: 1,
          null: 0,
          object: 1,
          array: 0
        }
      }
    },
    values: {
      count: 14,
      larger: 8,
      smaller: 1,
      median: 4,
      average: 3.9285714285714284,
      byLevel: {
        larger: 2,
        smaller: 0,
        median: 2,
        average: 1.3333333333333333,
      },
      breakdown: {
        integer: {
          count: 5,
          larger: 6,
          smaller: 1,
          median: 1,
          average: 2
        },
        real: {
          count: 2,
          larger: 8,
          smaller: 6,
          median: 8,
          average: 7
        },
        boolean: {
          count: 3,
          larger: 5,
          smaller: 4,
          median: 4,
          average: 4.333333333333333
        },
        string: {
          larger: 6,
          count: 3,
          smaller: 2,
          median: 6,
          average: 4.666666666666667
        },
        null: {
          count: 1,
          larger: 4,
          smaller: 4,
          median: 4,
          average: 4
        },
        object: {
          count: 6,
          larger: 184,
          smaller: 2,
          median: 28,
          average: 50
        },
        array: {
          count: 4,
          larger: 110,
          smaller: 2,
          median: 17,
          average: 34.5
        }
      }
    }
  }

  test.strictSame(analyze(document), result)
  test.end()
})
