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
} from '../../json'

import {
  NoOptions
} from './options'

import {
  FLOOR__ENUM_VARINT
} from '../integer/encode'

import {
  ANY__TYPE_PREFIX
} from '../any/encode'

export const UNBOUNDED_UNTYPED__LENGTH_PREFIX = (
  buffer: Buffer, offset: number, value: JSONValue[], _options: NoOptions
): number => {
  const length: number = value.length
  const lengthBytes: number = FLOOR__ENUM_VARINT(buffer, offset, length, {
    minimum: 0
  })

  let bytesWritten = lengthBytes
  for (const element of value) {
    const elementBytes: number = ANY__TYPE_PREFIX(buffer, offset + bytesWritten, element, {})
    bytesWritten += elementBytes
  }

  return bytesWritten
}
