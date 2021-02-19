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
  JSONType,
  getType
} from '../lib/json'

import {
  getStringByteLength
} from '../lib/types/string'

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

interface BasicCountableBreakdownStatistics {
  readonly count: number;
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

const KEYS_EMPTY: KeysStatistics = {
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
}

const EMPTY_COUNTABLE_STATISTICS: CountableStatistics = {
  count: 0,
  larger: 0,
  smaller: 0,
  median: 0,
  average: 0
}

const EMPTY_REDUNDANCY: BasicCountableBreakdownStatistics = {
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

const getBreakdownType = (value: JSONValue): string => {
  const type: JSONType = getType(value)
  if (type === JSONType.Number) {
    if (Number.isInteger(value)) {
      return 'integer'
    }

    return 'real'
  }

  return type
}

export const analyze = (value: JSONValue): JSONStats => {
  const type: JSONType = getType(value)
  const byteLength: number = getStringByteLength(JSON.stringify(value))
  const breakdown: StatisticalTypeBreakdown = {
    integer: EMPTY_COUNTABLE_STATISTICS,
    real: EMPTY_COUNTABLE_STATISTICS,
    boolean: EMPTY_COUNTABLE_STATISTICS,
    string: EMPTY_COUNTABLE_STATISTICS,
    null: EMPTY_COUNTABLE_STATISTICS,
    object: EMPTY_COUNTABLE_STATISTICS,
    array: EMPTY_COUNTABLE_STATISTICS
  }

  const documentStatistics: Statistics = {
    larger: byteLength,
    smaller: byteLength,
    median: byteLength,
    average: byteLength
  }

  return {
    size: byteLength,
    type,
    keys: KEYS_EMPTY,
    values: {
      count: 1,
      ...documentStatistics,
      byLevel: {
        larger: 1,
        smaller: 1,
        median: 1,
        average: 1
      },
      breakdown: Object.assign(breakdown, {
        [getBreakdownType(value)]: {
          count: 1,
          ...documentStatistics
        }
      })
    },
    depth: EMPTY_COUNTABLE_STATISTICS,
    redundancy: EMPTY_REDUNDANCY
  }
}
