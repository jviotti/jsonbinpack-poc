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
  StringCanonicalSchema
} from '../../canonical-schema'

import {
  strict as assert
} from 'assert'

import {
  UINT8_MAX
} from '../../utils/limits'

export enum StringEncoding {
  BOUNDED__PREFIX_LENGTH_8BIT_FIXED = 'BOUNDED__PREFIX_LENGTH_8BIT_FIXED',
  BOUNDED__PREFIX_LENGTH_ENUM_VARINT = 'BOUNDED__PREFIX_LENGTH_ENUM_VARINT',
  ROOF__PREFIX_LENGTH_8BIT_FIXED = 'ROOF__PREFIX_LENGTH_8BIT_FIXED',
  ROOF__PREFIX_LENGTH_ENUM_VARINT = 'ROOF__PREFIX_LENGTH_ENUM_VARINT',
  FLOOR__PREFIX_LENGTH_ENUM_VARINT = 'FLOOR__PREFIX_LENGTH_ENUM_VARINT',
  ARBITRARY__PREFIX_LENGTH_VARINT = 'ARBITRARY__PREFIX_LENGTH_VARINT'
}

export const getStringEncoding = (schema: StringCanonicalSchema): StringEncoding => {
  assert(typeof schema.minLength === 'undefined' || schema.minLength >= 0)
  assert(typeof schema.maxLength === 'undefined' || schema.maxLength >= 0)
  assert(typeof schema.minLength === 'undefined' ||
    typeof schema.maxLength === 'undefined' ||
    schema.maxLength >= schema.minLength)

  if (typeof schema.minLength !== 'undefined' && typeof schema.maxLength !== 'undefined') {
    if (schema.maxLength - schema.minLength <= UINT8_MAX) {
      return StringEncoding.BOUNDED__PREFIX_LENGTH_8BIT_FIXED
    }

    return StringEncoding.BOUNDED__PREFIX_LENGTH_ENUM_VARINT
  } else if (typeof schema.minLength !== 'undefined' && typeof schema.maxLength === 'undefined') {
    return StringEncoding.FLOOR__PREFIX_LENGTH_ENUM_VARINT
  } else if (typeof schema.minLength === 'undefined' && typeof schema.maxLength !== 'undefined') {
    if (schema.maxLength <= UINT8_MAX) {
      return StringEncoding.ROOF__PREFIX_LENGTH_8BIT_FIXED
    }

    return StringEncoding.ROOF__PREFIX_LENGTH_ENUM_VARINT
  } else {
    return StringEncoding.ARBITRARY__PREFIX_LENGTH_VARINT
  }
}
