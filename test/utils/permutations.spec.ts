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

import tap from 'tap'

import {
  JSONValue
} from '../../lib/json'

import {
  generatePermutations,
} from '../../lib/utils/permutation'

tap.test('should generate the 0-permutations of [ null ]', (test) => {
  const result: JSONValue[][] = generatePermutations([ null ], 0)
  test.strictSame(result, [])
  test.end()
})

tap.test('should generate the 1-permutations of [ null ]', (test) => {
  const result: JSONValue[][] = generatePermutations([ null ], 1)
  test.strictSame(result, [
    [ null ]
  ])

  test.end()
})

tap.test('should generate the 1-permutations of [ false, true ]', (test) => {
  const result: JSONValue[][] = generatePermutations([ false, true ], 1)
  test.strictSame(result, [
    [ false ],
    [ true ]
  ])

  test.end()
})

tap.test('should generate the 2-permutations of [ false, true ]', (test) => {
  const result: JSONValue[][] = generatePermutations([ false, true ], 2)
  test.strictSame(result, [
    [ false, false ],
    [ false, true ],
    [ true, false ],
    [ true, true ]
  ])

  test.end()
})

tap.test('should generate the 3-permutations of [ false, true ]', (test) => {
  const result: JSONValue[][] = generatePermutations([ false, true ], 3)
  test.strictSame(result, [
    [ false, false, false ],
    [ false, false, true ],
    [ false, true, false ],
    [ false, true, true ],
    [ true, false, false ],
    [ true, false, true ],
    [ true, true, false ],
    [ true, true, true ]
  ])

  test.end()
})
