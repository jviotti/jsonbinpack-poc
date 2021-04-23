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
  BooleanEncoding
} from './types/boolean/mapper'

import {
  NullEncoding
} from './types/null/mapper'

import {
  NumberEncoding
} from './types/number/mapper'

import {
  IntegerEncoding
} from './types/integer/mapper'

import {
  StringEncoding
} from './types/string/mapper'

export interface BaseEncodingDefinition {
  readonly encoding: string;
  readonly options: object;
}

// The union of all possible encodings
export type Encoding =
  BooleanEncoding |
  NullEncoding |
  NumberEncoding |
  IntegerEncoding |
  StringEncoding
