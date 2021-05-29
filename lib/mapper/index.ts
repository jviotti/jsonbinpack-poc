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
  Encoding
} from '../encoder'

import {
  EncodingSchema
} from '../encoding-schema'

import {
  getBooleanEncoding
} from '../types/boolean/mapper'

import {
  getNullEncoding
} from '../types/null/mapper'

import {
  getNumberEncoding
} from '../types/number/mapper'

import {
  getIntegerEncoding
} from '../types/integer/mapper'

import {
  getStringEncoding
} from '../types/string/mapper'

import {
  getAnyEncoding
} from '../types/any/mapper'

import {
  getArrayEncoding
} from '../types/array/mapper'

import {
  getObjectEncoding
} from '../types/object/mapper'

import {
  getEnumEncoding
} from '../types/enum/mapper'

import {
  getOneOfEncoding
} from '../types/oneof/mapper'

export const getEncoding = (schema: EncodingSchema): Encoding => {
  if ('enum' in schema) {
    return getEnumEncoding(schema)
  } else if ('oneOf' in schema) {
    return getOneOfEncoding(schema)
  } else if (!('type' in schema)) {
    return getAnyEncoding(schema)
  } else if (schema.type === 'boolean') {
    return getBooleanEncoding(schema)
  } else if (schema.type === 'integer') {
    return getIntegerEncoding(schema)
  } else if (schema.type === 'null') {
    return getNullEncoding(schema)
  } else if (schema.type === 'number') {
    return getNumberEncoding(schema)
  } else if (schema.type === 'string') {
    return getStringEncoding(schema)
  } else if (schema.type === 'array') {
    return getArrayEncoding(schema)
  } else {
    return getObjectEncoding(schema)
  }
}
