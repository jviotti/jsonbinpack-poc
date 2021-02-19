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

type JSONScalar = number | boolean | string | null

// As documented in https://www.json.org
export enum JSONType {
  Number = 'number',
  Boolean = 'boolean',
  String = 'string',
  Null = 'null',
  Object = 'object',
  Array = 'array'
}

export interface JSONObject {
  readonly [key: string]: JSONValue | undefined;
}

export type JSONValue =
  JSONObject | JSONValue[] | JSONScalar

export const getElement =
  (document: JSONObject | JSONValue[],
    key: string | number): JSONValue | undefined => {
    if (!Array.isArray(document)) {
      return document[key]
    }

    if (typeof key === 'string') {
      return null
    }

    return document[key]
  }
