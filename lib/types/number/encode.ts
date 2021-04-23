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
  JSONNumber
} from '../../json'

import {
  NoOptions
} from './options'

// TODO: Find out in which case we can safely do a 32-bit floating-point
// numbers encoding

export const DOUBLE__IEEE764_LE = (
  buffer: Buffer, offset: number, value: JSONNumber, _options: NoOptions
): number => {
  return buffer.writeDoubleLE(value, offset) - offset
}
