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
  NumberEncodingSchema
} from '../encoding-schema'

import {
  BaseEncodingDefinition,
  EncodingType
} from '../types/base'

import {
  NoOptions
} from '../types/number/options'

export interface DOUBLE_VARINT_TUPLE_ENCODING extends BaseEncodingDefinition {
  readonly type: EncodingType.Number;
  readonly encoding: 'DOUBLE_VARINT_TUPLE';
  readonly options: NoOptions;
}

export type NumberEncodingNames = 'DOUBLE_VARINT_TUPLE'
export type NumberEncoding = DOUBLE_VARINT_TUPLE_ENCODING

export const getNumberEncoding = (_schema: NumberEncodingSchema): NumberEncoding => {
  return {
    type: EncodingType.Number,
    encoding: 'DOUBLE_VARINT_TUPLE',
    options: {}
  }
}
