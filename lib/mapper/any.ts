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
  AnyEncodingSchema
} from '../encoding-schema'

import {
  BaseEncodingDefinition,
  EncodingType
} from '../types/base'

import {
  NoOptions
} from '../types/any/options'

export interface ANY__TYPE_PREFIX_ENCODING extends BaseEncodingDefinition {
  readonly type: EncodingType.Any;
  readonly encoding: 'ANY__TYPE_PREFIX';
  readonly options: NoOptions;
}

export type AnyEncodingNames = 'ANY__TYPE_PREFIX'
export type AnyEncoding = ANY__TYPE_PREFIX_ENCODING

export const getAnyEncoding = (_schema: AnyEncodingSchema): AnyEncoding => {
  return {
    type: EncodingType.Any,
    encoding: 'ANY__TYPE_PREFIX',
    options: {}
  }
}
