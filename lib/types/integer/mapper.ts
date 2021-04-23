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
  IntegerCanonicalSchema
} from '../../canonical-schema'

import {
  strict as assert
} from 'assert'

import {
  UINT8_MAX
} from '../../utils/limits'

export enum IntegerEncoding {
  BOUNDED_8BITS__ENUM_FIXED = 'BOUNDED_8BITS__ENUM_FIXED',
  BOUNDED_MULTIPLE_8BITS__ENUM_FIXED = 'BOUNDED_MULTIPLE_8BITS__ENUM_FIXED',
  BOUNDED__ENUM_VARINT = 'BOUNDED__ENUM_VARINT',
  BOUNDED_MULTIPLE__ENUM_VARINT = 'BOUNDED_MULTIPLE__ENUM_VARINT',
  FLOOR__ENUM_VARINT = 'FLOOR__ENUM_VARINT',
  FLOOR_MULTIPLE__ENUM_VARINT = 'FLOOR_MULTIPLE__ENUM_VARINT',
  ROOF__MIRROR_ENUM_VARINT = 'ROOF__MIRROR_ENUM_VARINT',
  ROOF_MULTIPLE__MIRROR_ENUM_VARINT = 'ROOF_MULTIPLE__MIRROR_ENUM_VARINT',
  ARBITRARY__ZIGZAG_VARINT = 'ARBITRARY__ZIGZAG_VARINT',
  ARBITRARY_MULTIPLE__ZIGZAG_VARINT = 'ARBITRARY_MULTIPLE__ZIGZAG_VARINT'
}

export const getIntegerEncoding = (schema: IntegerCanonicalSchema): IntegerEncoding => {
  assert(typeof schema.minimum === 'undefined' ||
    typeof schema.maximum === 'undefined' ||
    schema.maximum >= schema.minimum)

  if (typeof schema.minimum !== 'undefined' &&
    typeof schema.maximum !== 'undefined' && 'multipleOf' in schema) {
    // TODO: Handle 8-bits case
    return IntegerEncoding.BOUNDED_MULTIPLE__ENUM_VARINT
  } else if (typeof schema.minimum !== 'undefined' &&
    typeof schema.maximum !== 'undefined' && !('multipleOf' in schema)) {
    if (schema.maximum - schema.minimum <= UINT8_MAX) {
      return IntegerEncoding.BOUNDED_8BITS__ENUM_FIXED
    }

    return IntegerEncoding.BOUNDED__ENUM_VARINT
  } else if (typeof schema.minimum !== 'undefined' &&
    typeof schema.maximum === 'undefined' && 'multipleOf' in schema) {
    return IntegerEncoding.FLOOR_MULTIPLE__ENUM_VARINT
  } else if (typeof schema.minimum !== 'undefined' &&
    typeof schema.maximum === 'undefined' && !('multipleOf' in schema)) {
    return IntegerEncoding.FLOOR__ENUM_VARINT
  } else if (typeof schema.minimum === 'undefined' &&
    typeof schema.maximum !== 'undefined' && 'multipleOf' in schema) {
    return IntegerEncoding.ROOF_MULTIPLE__MIRROR_ENUM_VARINT
  } else if (typeof schema.minimum === 'undefined' &&
    typeof schema.maximum !== 'undefined' && !('multipleOf' in schema)) {
    return IntegerEncoding.ROOF__MIRROR_ENUM_VARINT
  } else if (typeof schema.minimum === 'undefined' &&
    typeof schema.maximum === 'undefined' && 'multipleOf' in schema) {
    return IntegerEncoding.ARBITRARY_MULTIPLE__ZIGZAG_VARINT
  } else {
    return IntegerEncoding.ARBITRARY__ZIGZAG_VARINT
  }
}
