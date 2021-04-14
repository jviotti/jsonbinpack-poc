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

const MOST_SIGNIFICANT_BIT: number = 0b10000000
const LEAST_SIGNIFICANT_BITS: number = 0b01111111

export const varintEncode = (buffer: Buffer, offset: number, value: number): number => {
  let accumulator: number = value
  let cursor: number = offset

  while (accumulator > LEAST_SIGNIFICANT_BITS) {
    cursor = buffer.writeUInt8(
      (accumulator & LEAST_SIGNIFICANT_BITS) | MOST_SIGNIFICANT_BIT, cursor)
    accumulator >>>= 7
  }

  cursor = buffer.writeUInt8(accumulator, cursor)
  return cursor - offset
}

export interface VarintDecodeResult {
  value: number;
  bytes: number;
}

export const varintDecode = (buffer: Buffer, offset: number): VarintDecodeResult => {
  let result: number = 0
  let cursor: number = offset

  while (true) {
    const value: number = buffer.readUInt8(cursor)
    result += ((value & LEAST_SIGNIFICANT_BITS) << (7 * (cursor - offset))) >>> 0
    cursor += 1
    if ((value & MOST_SIGNIFICANT_BIT) === 0) {
      break
    }
  }

  return {
    value: result,
    bytes: cursor - offset
  }
}
