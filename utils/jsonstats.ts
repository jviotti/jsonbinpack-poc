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
  getJSONSize
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
  keys: CountSizeStats;
  values: ValuesStats;
}

const DEFAULT_ACCUMULATOR: JSONStats = {
  byteSize: 0,
  maxNestingDepth: 0,
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

enum JSONValueCategory {
  numeric = 'numeric',
  textual = 'textual',
  boolean = 'boolean',
  structural = 'structural'
}

const getValueCategory = (value: JSONValue): JSONValueCategory => {
  if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
    return JSONValueCategory.structural
  } else if (Array.isArray(value)) {
    return JSONValueCategory.structural
  } else if (typeof value === 'string') {
    return JSONValueCategory.textual
  // We consider null to be a boolean value as in "three valued logic"
  } else if (typeof value === 'boolean' || value === null) {
    return JSONValueCategory.boolean
  } else {
    return JSONValueCategory.numeric
  }
}

// TODO: Keep track of duplicates as well
export const analyze = (
  document: JSONValue,
  level: number = 0,
  accumulator: JSONStats = DEFAULT_ACCUMULATOR
): JSONStats => {
  accumulator.byteSize = accumulator.byteSize || getJSONSize(document)
  accumulator.maxNestingDepth = Math.max(accumulator.maxNestingDepth, level)
  const category: JSONValueCategory = getValueCategory(document)
  accumulator.values[category].count += 1

  if (typeof document === 'object' && !Array.isArray(document) && document !== null) {
    // The curly braces
    accumulator.values.structural.byteSize += 2
    const numberOfKeys: number = Object.keys(document).length
    if (numberOfKeys > 0) {
      // The colons + the comma
      accumulator.values.structural.byteSize += (numberOfKeys * 2) - 1
    }

    for (const [ key, value ] of Object.entries(document)) {
      if (value === undefined) {
        continue
      }

      accumulator.keys.count += 1
      accumulator.keys.byteSize += getJSONSize(key)
      analyze(value, level + 1, accumulator)
    }
  } else if (Array.isArray(document)) {
    // The brackets
    accumulator.values.structural.byteSize += 2
    // The commas
    accumulator.values.structural.byteSize += document.length - 1

    for (const element of document) {
      analyze(element, level + 1, accumulator)
    }
  } else {
    accumulator.values[category].byteSize += getJSONSize(document)
  }

  return accumulator
}
