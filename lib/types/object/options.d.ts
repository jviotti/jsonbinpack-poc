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
// TODO: Write object mapping function to ensure these make sense
// The mapping function should start by doing the required/optional sorting stuff
// and then applying logic based on that rather than on the presence of the keywords

interface TypedPropertiesOptions {
  propertyEncodings: Record<string, Encoding>;
}

interface HomogeneousPropertiesOptions {
  encoding: Encoding;
}

export interface RequiredBoundedTypedOptions extends
  TypedPropertiesOptions, HomogeneousPropertiesOptions {
    requiredProperties: string[];
  }

export interface OptionalBoundedTypedOptions extends
  TypedPropertiesOptions, HomogeneousPropertiesOptions {
    optionalProperties: string[];
  }

export interface BoundedTypedOptions extends
  OptionalBoundedTypedOptions, RequiredBoundedTypedOptions {}

export interface TypedKeysOptions extends HomogeneousPropertiesOptions {
  keyEncoding: StringEncoding;
}

export interface RequiredUnboundedTypedOptions extends
  RequiredBoundedTypedOptions, TypedKeysOptions {}

export interface OptionalUnboundedTypedOptions extends
  OptionalBoundedTypedOptions, TypedKeysOptions {}

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
