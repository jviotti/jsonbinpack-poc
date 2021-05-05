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
} from '../../encoder'

import {
  StringEncoding
} from '../string/mapper'

export interface RequiredBoundedTypedOptions {
  propertyEncodings: Record<string, Encoding>;
  encoding: Encoding;
  requiredProperties: string[];
}

export interface OptionalBoundedTypedOptions {
  propertyEncodings: Record<string, Encoding>;
  encoding: Encoding;
  optionalProperties: string[];
}

export interface BoundedTypedOptions extends
  OptionalBoundedTypedOptions, RequiredBoundedTypedOptions {}

// Implies additionalProperties: NOT false
// Implies required: []
// Implies properties: {}
export interface TypedKeysOptions {
  keyEncoding: StringEncoding;
}

export interface RequiredUnboundedTypedOptions extends TypedKeysOptions {
  propertyEncodings: Record<string, Encoding>;
  encoding: Encoding;
  requiredProperties: string[];
}

export type ObjectOptions =
  OptionalBoundedTypedOptions |
  RequiredBoundedTypedOptions |
  RequiredUnboundedTypedOptions |
  BoundedTypedOptions |
  TypedKeysOptions
