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

interface KeyStats {
  readonly count: number;
  readonly larger: ByteSize;
  readonly smaller: ByteSize;
  readonly median: ByteSize;
  readonly average: ByteSize;
}

interface TypeBreakdown {
  readonly count: number;
  readonly larger: ByteSize;
  readonly smaller: ByteSize;
  readonly median: ByteSize;
  readonly average: ByteSize;
}

interface Breakdown {
  readonly integer: TypeBreakdown;
  readonly real: TypeBreakdown;
  readonly boolean: TypeBreakdown;
  readonly string: TypeBreakdown;
  readonly null: TypeBreakdown;
  readonly object: TypeBreakdown;
  readonly array: TypeBreakdown;
}

interface ValueStats {
  readonly count: number;
  readonly larger: ByteSize;
  readonly smaller: ByteSize;
  readonly median: ByteSize;
  readonly average: ByteSize;
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
  readonly keys: KeyStats;
  readonly values: ValueStats;
  readonly nesting: NestingStats;
  readonly redundancy: RedundancyStats;
}

export const analyze = (value: JSONValue): JSONStats => {
  return {
    minifiedByteSize: (!value) * 2
  }
}
