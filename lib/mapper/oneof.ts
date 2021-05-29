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
  EncodingSchema,
  OneOfEncodingSchema
} from '../encoding-schema'

import {
  BaseEncodingDefinition
} from './base-encoding-definition'

import {
  SchemasOptions
} from '../types/oneof/options'

import {
  EncodingType,
  getEncoding
} from './index'

export interface ONEOF_CHOICE_INDEX_PREFIX_ENCODING extends BaseEncodingDefinition {
  readonly type: EncodingType.OneOf;
  readonly encoding: 'ONEOF_CHOICE_INDEX_PREFIX';
  readonly options: SchemasOptions;
}

export type OneOfEncodingNames = 'ONEOF_CHOICE_INDEX_PREFIX'
export type OneOfEncoding = ONEOF_CHOICE_INDEX_PREFIX_ENCODING

export const getOneOfEncoding = (schema: OneOfEncodingSchema): OneOfEncoding => {
  return {
    type: EncodingType.OneOf,
    encoding: 'ONEOF_CHOICE_INDEX_PREFIX',
    options: {
      schemas: schema.oneOf.map((item: EncodingSchema) => {
        return {
          schema: item,
          encoding: getEncoding(item)
        }
      })
    }
  }
}
