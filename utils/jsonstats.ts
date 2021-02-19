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
  JSONValue,
  JSONType
} from '../lib/json'

interface Statistics {
  readonly larger: number;
  readonly smaller: number;
  readonly median: number;
  readonly average: number;
}

interface CountableStatistics extends Statistics {
  readonly count: number;
}

interface StatisticalTypeBreakdown {
  readonly integer: CountableStatistics;
  readonly real: CountableStatistics;
  readonly boolean: CountableStatistics;
  readonly string: CountableStatistics;
  readonly null: CountableStatistics;
  readonly object: CountableStatistics;
  readonly array: CountableStatistics;
}

interface CountableTypeBreakdown {
  readonly integer: number;
  readonly real: number;
  readonly boolean: number;
  readonly string: number;
  readonly null: number;
  readonly object: number;
  readonly array: number;
}

interface CountableBreakdownStatistics extends CountableStatistics {
  readonly breakdown: StatisticalTypeBreakdown;
}

interface BasicCountableBreakdownStatistics extends CountableStatistics {
  readonly breakdown: CountableTypeBreakdown;
}

interface KeysStatistics extends CountableStatistics {
  readonly byLevel: Statistics;
}

interface ValuesStatistics extends CountableBreakdownStatistics {
  readonly byLevel: Statistics;
}

export interface JSONStats {
  readonly size: number;
  readonly type: JSONType;
  readonly keys: KeysStatistics;
  readonly values: ValuesStatistics;
  readonly depth: CountableStatistics;
  readonly redundancy: BasicCountableBreakdownStatistics;
}

export const analyze = (value: JSONValue): JSONStats => {
  console.log(value)
  return {
    size: 0,
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
      larger: 0,
      smaller: 0,
      median: 0,
      average: 0,
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
  }
}
