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
import * as _ from 'lodash'

import {
  JSONValue,
  JSONTypeCategory,
  getJSONSize,
  getJSONType,
  getJSONTypeCategory
} from '../lib/json'

interface CountSizeStats {
  count: number;
  byteSize: number;
}

interface ValuesStats {
  numeric: CountSizeStats;
  textual: CountSizeStats;
  boolean: CountSizeStats;
  structural: CountSizeStats;
}

export interface JSONStats {
  byteSize: number;
  maxNestingDepth: number;
  largestLevel: number;
  keys: CountSizeStats;
  values: ValuesStats;
  duplicatedKeys: number;
  duplicatedValues: number;
}

const DEFAULT_ACCUMULATOR: JSONStats = {
  byteSize: 0,
  maxNestingDepth: 0,
  largestLevel: 0,
  duplicatedKeys: 0,
  duplicatedValues: 0,
  keys: {
    count: 0,
    byteSize: 0
  },
  values: {
    numeric: {
      count: 0,
      byteSize: 0
    },
    textual: {
      count: 0,
      byteSize: 0
    },
    boolean: {
      count: 0,
      byteSize: 0
    },
    structural: {
      count: 0,
      byteSize: 0
    }
  }
}

export const analyze = (
  document: JSONValue,
  level: number = 0,
  accumulator: JSONStats = DEFAULT_ACCUMULATOR,
  keys: Set<string> = new Set(),
  values: JSONValue[] = [],
  levels: number[] = []
): JSONStats => {
  values.push(clone(document))
  accumulator.byteSize =
    accumulator.byteSize || getJSONSize(document)
  levels[level] = levels[level] || 0

  accumulator.maxNestingDepth =
    Math.max(accumulator.maxNestingDepth, level)
  const category: JSONTypeCategory =
    getJSONTypeCategory(getJSONType(document))
  accumulator.values[category].count += 1

  if (typeof document === 'object' &&
    !Array.isArray(document) && document !== null) {
    // The curly braces
    const numberOfKeys: number = Object.keys(document).length
    accumulator.values.structural.byteSize +=
      2 + (numberOfKeys * 2) - Math.min(numberOfKeys, 1)

    for (const [ key, value ] of Object.entries(document)) {
      if (value === undefined) {
        continue
      }

      keys.add(key)
      accumulator.keys.count += 1
      accumulator.keys.byteSize += getJSONSize(key)
      analyze(value, level + 1, accumulator, keys, values, levels)
    }
  } else if (Array.isArray(document)) {
    accumulator.values.structural.byteSize +=
      2 + document.length - Math.min(document.length, 1)

    for (const element of document) {
      analyze(element, level + 1, accumulator, keys, values, levels)
    }
  } else {
    const documentSize: number = getJSONSize(document)
    accumulator.values[category].byteSize += documentSize
    levels[level] += documentSize
  }

  accumulator.largestLevel = levels.lastIndexOf(Math.max(...levels))
  accumulator.duplicatedKeys = accumulator.keys.count - keys.size
  accumulator.duplicatedValues =
    accumulator.values.numeric.count +
    accumulator.values.textual.count +
    accumulator.values.boolean.count +
    accumulator.values.structural.count -

    // eslint-disable-next-line @typescript-eslint/unbound-method
    _.uniqWith(values, _.isEqual).length

  return accumulator
}
