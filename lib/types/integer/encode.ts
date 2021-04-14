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
  zigzagEncode
} from '../../utils/zigzag'

import {
  varintEncode
} from '../../utils/varint'

export const ARBITRARY__ZIGZAG_VARINT = (
  buffer: Buffer, offset: number,
  value: number
): number => {
  return varintEncode(buffer, offset, zigzagEncode(value))
}

export const ARBITRARY_MULTIPLE__ZIGZAG_VARINT = (
  buffer: Buffer, offset: number,
  value: number, multiplier: number
): number => {
  return ARBITRARY__ZIGZAG_VARINT(buffer, offset, value / Math.abs(multiplier))
}
