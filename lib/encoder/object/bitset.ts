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

import ResizableBuffer from '../../utils/resizable-buffer'

import {
  DecodeResult
} from '../index'

const getBytesToStoreBits = (bits: number): number => {
  return ((bits + 7) & (-8)) / 8
}

export const bitsetEncode = (
  buffer: ResizableBuffer, offset: number, bits: boolean[]
): number => {
  if (bits.length === 0) {
    return 0
  }

  const bytes: number = getBytesToStoreBits(bits.length)
  let result: number = 0
  for (const [ index, bit ] of bits.entries()) {
    if (bit) {
      result |= (1 << index)
    }
  }

  return buffer.writeUIntLE(result >>> 0, offset, bytes) - offset
}

export interface BitsetResult extends DecodeResult {
  value: boolean[];
}

export const bitsetDecode = (
  buffer: ResizableBuffer, offset: number, length: number
): BitsetResult => {
  if (length === 0) {
    return {
      value: [],
      bytes: 0
    }
  }

  const bytes: number = getBytesToStoreBits(length)
  const value: number = buffer.readUIntLE(offset, bytes)
  const result: boolean[] = []

  while (result.length < length) {
    result.push(Boolean((1 << result.length) & value))
  }

  return {
    value: result,
    bytes
  }
}
