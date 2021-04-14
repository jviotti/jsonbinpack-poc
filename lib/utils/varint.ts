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
const REST: number = 0b01111111

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

export interface VarintDecodeResult {
  value: number;
  bytes: number;
}

// TODO: Try to refactor this function
// TODO: Return the number of written bytes somehow
export const varintDecode = (buffer: Buffer, offset: number): VarintDecodeResult => {
  let result: number = 0
  let cursor: number = offset
  let count: number = 0
  let next: boolean = true

  while (next) {
    const value: number = buffer.readUInt8(cursor)
    next = (value & MSB) !== 0
    result += (value & REST) << (7 * count)
    count += 1
    cursor += 1
  }

  return {
    value: result,
    bytes: count
  }
}
