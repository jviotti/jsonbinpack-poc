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
  UINT8_MAX
} from '../../utils/limits'

export interface SchemaString {
  readonly type: 'string';
  readonly maxLength?: number;
  readonly minLength?: number;

  // See http://json-schema.org/draft/2020-12/json-schema-validation.html#rfc.section.7.3
  // TODO: We can use these in the future to apply more clever encodings
  readonly format?:
    'date-time' | 'date' | 'time' | 'duration' |
    'email' | 'idn-email' |
    'hostname' | 'idn-hostname' |
    'ipv4' | 'ipv6' |
    'uri' | 'uri-reference' | 'iri' | 'iri-reference' | 'uuid' |
    'uri-template' |
    'json-pointer' | 'relative-json-pointer' |
    'regex';

  readonly pattern?: string;

  // TODO: We can use these in the future to apply more clever encodings
  readonly contentEncoding?: string;
  readonly contentMediaType?: string;

  // TODO: Define this once we have a proper type to
  // represent a schema
  // readonly contentSchema?: XXXXX;
}

export enum EncodingString {
  BOUNDED__PREFIX_LENGTH_8BIT_FIXED = 'BOUNDED__PREFIX_LENGTH_8BIT_FIXED',
  BOUNDED__PREFIX_LENGTH_ENUM_VARINT = 'BOUNDED__PREFIX_LENGTH_ENUM_VARINT',
  ROOF__PREFIX_LENGTH_8BIT_FIXED = 'ROOF__PREFIX_LENGTH_8BIT_FIXED',
  ROOF__PREFIX_LENGTH_ENUM_VARINT = 'ROOF__PREFIX_LENGTH_ENUM_VARINT',
  FLOOR__PREFIX_LENGTH_ENUM_VARINT = 'FLOOR__PREFIX_LENGTH_ENUM_VARINT',
  ARBITRARY__PREFIX_LENGTH_VARINT = 'ARBITRARY__PREFIX_LENGTH_VARINT'
}

export const getStringEncoding = (schema: SchemaString): EncodingString => {
  if (typeof schema.minLength !== 'undefined' && typeof schema.maxLength !== 'undefined') {
    if (schema.maxLength - schema.minLength <= UINT8_MAX) {
      return EncodingString.BOUNDED__PREFIX_LENGTH_8BIT_FIXED
    }

    return EncodingString.BOUNDED__PREFIX_LENGTH_ENUM_VARINT
  } else if (typeof schema.minLength !== 'undefined' && typeof schema.maxLength === 'undefined') {
    return EncodingString.FLOOR__PREFIX_LENGTH_ENUM_VARINT
  } else if (typeof schema.minLength === 'undefined' && typeof schema.maxLength !== 'undefined') {
    if (schema.maxLength <= UINT8_MAX) {
      return EncodingString.ROOF__PREFIX_LENGTH_8BIT_FIXED
    }

    return EncodingString.ROOF__PREFIX_LENGTH_ENUM_VARINT
  } else {
    return EncodingString.ARBITRARY__PREFIX_LENGTH_VARINT
  }
}
