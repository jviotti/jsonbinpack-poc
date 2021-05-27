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
  JSONNumber
} from '../../json'

import {
  NoOptions
} from './options'

import {
  DecodeResult
} from '../base'

import {
  zigzagDecode
} from '../../utils/zigzag'

import {
  varintDecode,
  VarintDecodeResult
} from '../../utils/varint'

export interface NumberResult extends DecodeResult {
  readonly value: JSONNumber;
  readonly bytes: number;
}

export const DOUBLE__IEEE764_LE = (
  buffer: ResizableBuffer, offset: number, _options: NoOptions
): NumberResult => {
  const result: number = buffer.readDoubleLE(offset)
  return {
    value: result,
    bytes: 8
  }
}

export const DOUBLE_VARINT_TUPLE = (
  buffer: ResizableBuffer, offset: number, _options: NoOptions
): NumberResult => {
  const integralResult: VarintDecodeResult = varintDecode(buffer, offset)
  const pointResult: VarintDecodeResult =
    varintDecode(buffer, offset + integralResult.bytes)
  const integralValue: bigint = zigzagDecode(integralResult.value)
  const integral: string = integralValue.toString()
  const point: number = Number(zigzagDecode(pointResult.value))
  const bytes: number = integralResult.bytes + pointResult.bytes

  if (point === 0) {
    return {
      value: Number(integralValue),
      bytes
    }
  }

  return {
    value: parseFloat(point < 0
      ? `0.${'0'.repeat(Math.abs(point) - 1)}${integral}`
      : integral.slice(0, point) + '.' + integral.slice(point)),
    bytes
  }
}
