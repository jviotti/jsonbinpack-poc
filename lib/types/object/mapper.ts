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
  BaseEncodingDefinition,
  EncodingType
} from '../base'

import {
  TypedKeysOptions,
  BoundedTypedOptions,
  UnboundedTypedOptions,
  RequiredUnboundedTypedOptions,
  OptionalBoundedTypedOptions,
  OptionalUnboundedTypedOptions,
  RequiredBoundedTypedOptions
} from './options'

export interface REQUIRED_ONLY_BOUNDED_TYPED_OBJECT_ENCODING extends BaseEncodingDefinition {
  readonly type: EncodingType.Object;
  readonly encoding: 'REQUIRED_ONLY_BOUNDED_TYPED_OBJECT';
  readonly options: RequiredBoundedTypedOptions;
}

export interface NON_REQUIRED_BOUNDED_TYPED_OBJECT_ENCODING extends BaseEncodingDefinition {
  readonly type: EncodingType.Object;
  readonly encoding: 'NON_REQUIRED_BOUNDED_TYPED_OBJECT';
  readonly options: OptionalBoundedTypedOptions;
}

export interface MIXED_BOUNDED_TYPED_OBJECT_ENCODING extends BaseEncodingDefinition {
  readonly type: EncodingType.Object;
  readonly encoding: 'MIXED_BOUNDED_TYPED_OBJECT';
  readonly options: BoundedTypedOptions;
}

export interface ARBITRARY_TYPED_KEYS_OBJECT_ENCODING extends BaseEncodingDefinition {
  readonly type: EncodingType.Object;
  readonly encoding: 'ARBITRARY_TYPED_KEYS_OBJECT';
  readonly options: TypedKeysOptions;
}

export interface REQUIRED_UNBOUNDED_TYPED_OBJECT_ENCODING extends BaseEncodingDefinition {
  readonly type: EncodingType.Object;
  readonly encoding: 'REQUIRED_UNBOUNDED_TYPED_OBJECT';
  readonly options: RequiredUnboundedTypedOptions;
}

export interface OPTIONAL_UNBOUNDED_TYPED_OBJECT_ENCODING extends BaseEncodingDefinition {
  readonly type: EncodingType.Object;
  readonly encoding: 'OPTIONAL_UNBOUNDED_TYPED_OBJECT';
  readonly options: OptionalUnboundedTypedOptions;
}

export interface MIXED_UNBOUNDED_TYPED_OBJECT_ENCODING extends BaseEncodingDefinition {
  readonly type: EncodingType.Object;
  readonly encoding: 'MIXED_UNBOUNDED_TYPED_OBJECT';
  readonly options: UnboundedTypedOptions;
}

export type ObjectEncodingNames =
  'REQUIRED_ONLY_BOUNDED_TYPED_OBJECT' |
  'NON_REQUIRED_BOUNDED_TYPED_OBJECT' |
  'MIXED_BOUNDED_TYPED_OBJECT' |
  'ARBITRARY_TYPED_KEYS_OBJECT' |
  'REQUIRED_UNBOUNDED_TYPED_OBJECT' |
  'OPTIONAL_UNBOUNDED_TYPED_OBJECT' |
  'MIXED_UNBOUNDED_TYPED_OBJECT'
export type ObjectEncoding =
  REQUIRED_ONLY_BOUNDED_TYPED_OBJECT_ENCODING |
  NON_REQUIRED_BOUNDED_TYPED_OBJECT_ENCODING |
  MIXED_BOUNDED_TYPED_OBJECT_ENCODING |
  ARBITRARY_TYPED_KEYS_OBJECT_ENCODING |
  REQUIRED_UNBOUNDED_TYPED_OBJECT_ENCODING |
  OPTIONAL_UNBOUNDED_TYPED_OBJECT_ENCODING |
  MIXED_UNBOUNDED_TYPED_OBJECT_ENCODING
