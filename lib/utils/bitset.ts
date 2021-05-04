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

const getBytesToStoreBits = (bits: number): number => {
  return ((bits + 7) & (-8)) / 8
}

export const bitsetEncode = (
  buffer: Buffer, offset: number, bits: boolean[]
): number => {
  const bytes: number = getBytesToStoreBits(bits.length)
  let result: number = 0
  for (const [ index, bit ] of bits.entries()) {
    if (bit) {
      result |= (1 << index)
    }
  }

  return buffer.writeUIntLE(result >>> 0, offset, bytes) - offset
}

export const bitsetDecode = (
  buffer: Buffer, offset: number, length: number
): boolean[] => {
  const value: number = buffer.readUIntLE(offset, getBytesToStoreBits(length))
  const result: boolean[] = []

  while (result.length < length) {
    result.push(Boolean((1 << result.length) & value))
  }

  return result
}
