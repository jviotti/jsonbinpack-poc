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
  JSONObject
} from '../../json'

import {
  encode
} from '../../encoder'

import {
  TypedKeysOptions
} from './options'

import {
  FLOOR__ENUM_VARINT
} from '../integer/encode'

import {
  ANY__TYPE_PREFIX
} from '../any/encode'

export const ARBITRARY_TYPED_KEYS_OBJECT = (
  buffer: Buffer, offset: number, value: JSONObject, options: TypedKeysOptions
): number => {
  let cursor: number = FLOOR__ENUM_VARINT(
    buffer, offset, Object.keys(value).length, {
      minimum: 0
    })

  for (const [ key, objectValue ] of Object.entries(value)) {
    cursor += encode(buffer, cursor, options.keyEncoding, key)
    cursor += ANY__TYPE_PREFIX(buffer, cursor, objectValue, {})
  }

  return cursor
}
