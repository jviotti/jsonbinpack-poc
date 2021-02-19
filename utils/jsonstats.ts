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
  if (typeof document === 'object' && 
    !Array.isArray(document) && 
    document !== null) {
    const keys: string[] = []
    const values: JSONValue[] = []
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
      walk(element, level, metadata)
    }
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

export interface JSONStats {
  readonly size: number;
  readonly type: JSONType;
  readonly keys: CountableStatistics;
  readonly values: CountableStatistics;
}

const getStatistics = (array: JSONValue[]): Statistics => {
  const sorted: JSONValue[] = 
    array.sort((first: JSONValue, second: JSONValue) => {
      return getJSONSize(first) - getJSONSize(second)
    })

  return {
    larger: getJSONSize(sorted[sorted.length - 1]),
    smaller: getJSONSize(sorted[0]),
    median: getJSONSize(sorted[Math.floor(sorted.length / 2)]),
    average: sorted.reduce((accumulator: number, element: JSONValue) => {
      return accumulator + getJSONSize(element)
    }, 0) / sorted.length
  }
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

  return {
    size: getJSONSize(document),
    type: getJSONType(document),
    keys: {
      count: data.keys.length,
      ...getStatistics(data.keys)
    },
    values: {
      count: values.length,
      ...getStatistics(values)
    }
  }
}
