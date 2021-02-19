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

type ByteSize = number

// TODO: Refactor and de-duplicate these interface definitions

interface SizeCountStats {
  readonly count: number;
  readonly larger: ByteSize;
  readonly smaller: ByteSize;
  readonly median: ByteSize;
  readonly average: ByteSize;
}

interface Breakdown {
  readonly integer: SizeCountStats;
  readonly real: SizeCountStats;
  readonly boolean: SizeCountStats;
  readonly string: SizeCountStats;
  readonly null: SizeCountStats;
  readonly object: SizeCountStats;
  readonly array: SizeCountStats;
}

interface ValueStats extends SizeCountStats {
  readonly breakdown: Breakdown;
}

interface NestingStats {
  readonly levels: number;
  readonly largerDepth: number;
  readonly smallerDepth: number;
  readonly medianDepth: number;
  readonly averageDepth: number;

  readonly minimumKeysInLevel: number;
  readonly maximumKeysInLevel: number;
  readonly medianKeysInLevel: number;
  readonly averageKeysInLevel: number;

  readonly minimumValuesInLevel: number;
  readonly maximumValuesInLevel: number;
  readonly medianValuesInLevel: number;
  readonly averageValuesInLevel: number;
}

interface RedundancyStats {
  readonly integer: number;
  readonly real: number;
  readonly boolean: number;
  readonly string: number;
  readonly null: number;
  readonly object: number;
  readonly array: number;
}

export interface JSONStats {
  readonly minifiedSize: ByteSize;
  readonly type: JSONType;
  readonly keys: SizeCountStats;
  readonly values: ValueStats;
  readonly nesting: NestingStats;
  readonly redundancy: RedundancyStats;
}

export const analyze = (value: JSONValue): JSONStats => {
  console.log(value)
  return {
    minifiedSize: 0,
    type: JSONType.Boolean,
    keys: {
      count: 0,
      larger: 0,
      smaller: 0,
      median: 0,
      average: 0
    },
    values: {
      count: 0,
      larger: 0,
      smaller: 0,
      median: 0,
      average: 0,
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
    nesting: {
      levels: 0,
      largerDepth: 0,
      smallerDepth: 0,
      medianDepth: 0,
      averageDepth: 0,

      minimumKeysInLevel: 0,
      maximumKeysInLevel: 0,
      medianKeysInLevel: 0,
      averageKeysInLevel: 0,

      minimumValuesInLevel: 0,
      maximumValuesInLevel: 0,
      medianValuesInLevel: 0,
      averageValuesInLevel: 0
    },
    redundancy: {
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
