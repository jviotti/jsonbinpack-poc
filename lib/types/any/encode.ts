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
  Type
} from './types'

import {
  BOUNDED_8BITS__ENUM_FIXED,
  FLOOR__ENUM_VARINT
} from '../integer/encode'

import {
  ARBITRARY__PREFIX_LENGTH_VARINT
} from '../string/encode'

import {
  DOUBLE__IEEE764_LE
} from '../number/encode'

const encodeTypeTag = (buffer: Buffer, offset: number, tag: number): number => {
  return BOUNDED_8BITS__ENUM_FIXED(buffer, offset, tag, {
    minimum: 0,
    // TODO: Find a way to keep this automatically in sync with "Type"
    maximum: 10
  })
}

export const ANY__TYPE_PREFIX = (
  buffer: Buffer, offset: number, value: JSONValue, _options: NoOptions
): number => {
  // TODO: Implement array and object support
  if (Array.isArray(value)) {
    throw new Error('TODO: Unimplemented')
  } else if (typeof value === 'object' && value !== null) {
    throw new Error('TODO: Unimplemented')
  }

  // Encode a null value (at the type level)
  if (value === null) {
    return encodeTypeTag(buffer, offset, Type.Null)

  // Encode a boolean value (at the type level)
  } else if (typeof value === 'boolean') {
    return encodeTypeTag(buffer, offset, value ? Type.True : Type.False)

  // Encode a string value
  } else if (typeof value === 'string') {
    const tagBytes: number = encodeTypeTag(buffer, offset, Type.String)
    const valueBytes: number =
      ARBITRARY__PREFIX_LENGTH_VARINT(buffer, offset + tagBytes, value, {})
    return tagBytes + valueBytes

  // Encode an integer value
  } else if (Number.isInteger(value)) {

    if (value >= 0) {
      // TODO: Use UINT8_MAX constant
      if (value <= 255) {
        const tagBytes: number =
          encodeTypeTag(buffer, offset, Type.PositiveIntegerByte)
        const valueBytes: number =
          BOUNDED_8BITS__ENUM_FIXED(buffer, offset + tagBytes, value, {
            // TODO: Add UINT8_MIN for this
            minimum: 0,
            // TODO: Use UINT8_MAX constant
            maximum: 255
          })
        return tagBytes + valueBytes
      }

      const tagBytes: number =
        encodeTypeTag(buffer, offset, Type.PositiveInteger)
      const valueBytes: number =
        FLOOR__ENUM_VARINT(buffer, offset + tagBytes, value, {
          minimum: 0
        })
      return tagBytes + valueBytes
    }

    const absoluteValue: number = Math.abs(value) - 1
    if (absoluteValue <= 255) {
      const tagBytes: number =
        encodeTypeTag(buffer, offset, Type.NegativeIntegerByte)
      const valueBytes: number =
        BOUNDED_8BITS__ENUM_FIXED(buffer, offset + tagBytes, absoluteValue, {
          // TODO: Add UINT8_MIN for this
          minimum: 0,
          // TODO: Use UINT8_MAX constant
          maximum: 255
        })
      return tagBytes + valueBytes
    }

    const tagBytes: number =
      encodeTypeTag(buffer, offset, Type.NegativeInteger)
    const valueBytes: number =
      FLOOR__ENUM_VARINT(buffer, offset + tagBytes, absoluteValue, {
        minimum: 0
      })
    return tagBytes + valueBytes
  // Encode an number value
  } else {
    const tagBytes: number = encodeTypeTag(buffer, offset, Type.Number)

    // TODO: Maybe force-try if a 32-bit results in precision lost
    // and if not use a different "32-bit" number type and encoding

    const valueBytes: number =
      DOUBLE__IEEE764_LE(buffer, offset + tagBytes, value, {})
    return tagBytes + valueBytes
  }
}
