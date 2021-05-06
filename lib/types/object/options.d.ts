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

// TODO: Revise the names of these options interfaces

interface TypedPropertiesOptions {
  propertyEncodings: Record<string, Encoding>;
}

interface HomogeneousPropertiesOptions {
  encoding: Encoding;
}

export interface RequiredBoundedTypedOptions extends TypedPropertiesOptions {
  requiredProperties: string[];
}

export interface OptionalBoundedTypedOptions extends TypedPropertiesOptions {
  optionalProperties: string[];
}

export interface BoundedTypedOptions extends
  OptionalBoundedTypedOptions, RequiredBoundedTypedOptions, HomogeneousPropertiesOptions {}

export interface TypedKeysOptions extends HomogeneousPropertiesOptions {
  keyEncoding: StringEncoding;
}

export interface RequiredUnboundedTypedOptions extends
  RequiredBoundedTypedOptions, TypedKeysOptions, HomogeneousPropertiesOptions {}

export interface OptionalUnboundedTypedOptions extends
  OptionalBoundedTypedOptions, TypedKeysOptions, HomogeneousPropertiesOptions {}

export interface UnboundedTypedOptions extends
  BoundedTypedOptions, TypedKeysOptions {}

export type ObjectOptions =
  RequiredBoundedTypedOptions |
  OptionalBoundedTypedOptions |
  BoundedTypedOptions |
  TypedKeysOptions |
  OptionalUnboundedTypedOptions |
  RequiredUnboundedTypedOptions |
  UnboundedTypedOptions
