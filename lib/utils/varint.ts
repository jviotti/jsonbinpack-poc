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

// Inspired by https://github.com/jacekv/varintjs/blob/master/varint.js

const MSB: number = 0b10000000
const REST: number = 0b0111111

export const varintEncode = (buffer: Buffer, offset: number, value: number): number => {
  let accumulator: number = value
  let cursor: number = offset

  while (accumulator > REST) {
    cursor = buffer.writeUInt8((accumulator & REST) | MSB, cursor)
    accumulator >>>= 7
  }

  cursor = buffer.writeUInt8(accumulator, cursor)
  return cursor - offset
}
