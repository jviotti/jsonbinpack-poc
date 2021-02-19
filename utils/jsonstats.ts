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

import * as _ from 'lodash'
import * as clone from 'clone'

import {
  JSONValue,
  JSONObject,
  JSONType,
  getJSONType,
  getJSONSize
} from '../lib/json'

const getType = (value: JSONValue): string => {
  const type: JSONType = getJSONType(value)
  if (type === JSONType.Number) {
    if (Number.isInteger(value)) {
      return 'integer'
    }

    return 'real'
  }

  return type
}

interface ValuesCollector {
  [key: string]: Array<any>;
  object: JSONObject[];
  array: JSONValue[][];
  boolean: boolean[];
  integer: number[];
  real: number[];
  string: string[];
  null: JSONValue[];
}

interface LevelCollector {
  depth: number;
  keys: string[];
  values: JSONValue[];
}

interface Collector {
  keys: string[];
  values: ValuesCollector;
  levels: LevelCollector[],
}

const walk = (
  document: JSONValue,
  level: number,
  metadata: Collector
): Collector => {
  const type: string = getType(document)
  metadata.values[type].push(clone(document))
  const keys: string[] = []
  const values: JSONValue[] = []

  if (typeof document === 'object' && 
    !Array.isArray(document) && 
    document !== null) {
    for (const [ key, value ] of Object.entries(document)) {
      if (typeof value === 'undefined') {
        continue
      }

      metadata.keys.push(key)
      keys.push(clone(key))
      values.push(clone(value))
      walk(value, level + 1, metadata)
    }

    metadata.levels.push({
      depth: level,
      keys,
      values
    })
  } else if (Array.isArray(document)) {
    for (const element of document) {
      values.push(clone(element))
      walk(element, level, metadata)
    }

    metadata.levels.push({
      depth: level,
      keys,
      values
    })
  } 

  return metadata
}

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

interface CountableBreakdownStatistics extends CountableStatistics {
  readonly breakdown: StatisticalTypeBreakdown;
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

interface BasicCountableBreakdownStatistics {
  readonly count: number;
  readonly breakdown: CountableTypeBreakdown;
}

interface RedundancyStatistics {
  readonly keys: number;
  readonly values: BasicCountableBreakdownStatistics;
}

export interface JSONStats {
  readonly size: number;
  readonly type: JSONType;
  readonly keys: CountableStatistics;
  readonly values: CountableBreakdownStatistics;
  readonly depth: CountableStatistics;
  readonly redundancy: RedundancyStatistics;
}

type NumericTransformer = (value: JSONValue) => number

const getStatistics = (
  array: JSONValue[],
  transformer: NumericTransformer
): Statistics => {
  if (array.length === 0) {
    return {
      larger: 0,
      smaller: 0,
      median: 0,
      average: 0
    }
  }

  const sorted: JSONValue[] = 
    array.sort((first: JSONValue, second: JSONValue) => {
      return transformer(first) - transformer(second)
    })

  return {
    larger: transformer(sorted[sorted.length - 1]),
    smaller: transformer(sorted[0]),
    median: transformer(sorted[Math.floor(sorted.length / 2)]),
    average: sorted.reduce((accumulator: number, element: JSONValue) => {
      return accumulator + transformer(element)
    }, 0) / sorted.length
  }
}

const getDuplicatesCount = (array: JSONValue[]): number => {
  return array.length - _.uniqWith(array, _.isEqual).length
}

export const analyze = (document: JSONValue): JSONStats => {
  const data: Collector = walk(document, 0, {
    keys: [],
    levels: [],
    values: {
      object: [],
      array: [],
      boolean: [],
      integer: [],
      real: [],
      string: [],
      null: []
    }
  })

  console.log(data)

  const values: JSONValue[] = [ 
    ...data.values.boolean, 
    ...data.values.integer, 
    ...data.values.real, 
    ...data.values.string,
    ...data.values.null 
  ]

  const depth: number[] = data.levels.map((level: LevelCollector) => {
    return level.depth
  })

  const valuesRedundancy: CountableTypeBreakdown = {
    integer: getDuplicatesCount(data.values.integer),
    real: getDuplicatesCount(data.values.real),
    boolean: getDuplicatesCount(data.values.boolean),
    string: getDuplicatesCount(data.values.string),
    null: getDuplicatesCount(data.values.null),
    object: getDuplicatesCount(data.values.object),
    array: getDuplicatesCount(data.values.array)
  }

  return {
    size: getJSONSize(document),
    type: getJSONType(document),
    depth: {
      count: depth.length,
      ...getStatistics(_.uniq(depth), _.identity)
    },
    keys: {
      count: data.keys.length,
      ...getStatistics(data.keys, getJSONSize)
    },
    redundancy: {
      keys: getDuplicatesCount(data.keys),
      values: {
        count: Object.values(valuesRedundancy).reduce(
          (accumulator: number, element: number): number => {
            return accumulator + element
          }, 0),
        breakdown: valuesRedundancy
      }
    },
    values: {
      count: values.length,
      ...getStatistics(values, getJSONSize),
      breakdown: {
        object: {
          count: data.values.object.length,
          ...getStatistics(data.values.object, getJSONSize)
        },
        array: {
          count: data.values.array.length,
          ...getStatistics(data.values.array, getJSONSize)
        },
        boolean: {
          count: data.values.boolean.length,
          ...getStatistics(data.values.boolean, getJSONSize)
        },
        integer: {
          count: data.values.integer.length,
          ...getStatistics(data.values.integer, getJSONSize)
        },
        real: {
          count: data.values.real.length,
          ...getStatistics(data.values.real, getJSONSize)
        },
        string: {
          count: data.values.string.length,
          ...getStatistics(data.values.string, getJSONSize)
        },
        null: {
          count: data.values.null.length,
          ...getStatistics(data.values.null, getJSONSize)
        }
      }
    }
  }
}
