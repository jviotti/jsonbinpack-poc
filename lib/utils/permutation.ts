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
  JSONValue
} from '../json'

// Inspired by https://stackoverflow.com/a/64904542
export const generatePermutations = (list: JSONValue[], size: number): JSONValue[][] => {
  if (size === 0) {
    return []
  }

  if (size === 1) {
    return list.map((element: JSONValue): JSONValue[] => {
      return [ element ]
    })
  }

  return list.flatMap((element: JSONValue): JSONValue[][] => {
    return generatePermutations(list, size - 1).map((item: JSONValue[]): JSONValue[] => {
      return [ element, ...item ]
    })
  })
}
