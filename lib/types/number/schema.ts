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

export interface SchemaNumber {
  readonly type: 'number';

  /*
   * For now we don't take these schema arguments into
   * consideration, but we might in the future if we
   * implement different real number encodings.
   */

  // The exclusiveMinimum and exclusiveMaximum keywords
  // should be transformed to minimum and maximum
  readonly minimum?: number;
  readonly maximum?: number;

  readonly multipleOf?: number;
}

export enum EncodingNumber {
  DOUBLE__IEEE764_LE = 'DOUBLE__IEEE764_LE'
}

export const getNumberEncoding = (_schema: SchemaNumber): EncodingNumber => {
  return EncodingNumber.DOUBLE__IEEE764_LE
}
