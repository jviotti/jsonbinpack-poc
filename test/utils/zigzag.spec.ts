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
  zigzagEncode,
} from '../../lib/utils/zigzag'

const BITS: number = 32

tap.test('should encode 0 as 0', (test) => {
  test.is(zigzagEncode(0, BITS), 0)
  test.end()
})

tap.test('should encode -1 as 1', (test) => {
  test.is(zigzagEncode(-1, BITS), 1)
  test.end()
})

tap.test('should encode 1 as 2', (test) => {
  test.is(zigzagEncode(1, BITS), 2)
  test.end()
})

tap.test('should encode -2 as 3', (test) => {
  test.is(zigzagEncode(-2, BITS), 3)
  test.end()
})
