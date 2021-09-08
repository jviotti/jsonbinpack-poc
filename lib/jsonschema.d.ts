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
  JSONValue,
  JSONNumber,
  JSONString,
  JSONBoolean
} from './json'

export interface ObjectSchema {
  readonly [index: string]: JSONValue | Schema | Schema[] | undefined;

  // https://json-schema.org/draft/2020-12/vocab/core
  readonly $id?: JSONString;
  readonly $vocabulary?: Record<JSONString, JSONBoolean>;
  readonly $schema?: JSONString;
  readonly $comment?: JSONString;
  readonly $defs?: Record<JSONString, Schema>;
  readonly $ref?: JSONString;
  readonly $dynamicRef?: JSONString;
  readonly $anchor?: JSONString;
  readonly $dynamicAnchor?: JSONString;

  // https://json-schema.org/draft/2020-12/vocab/applicator
  readonly prefixItems?: Schema[];
  readonly items?: Schema;
  readonly contains?: Schema;
  readonly additionalProperties?: Schema;
  readonly properties?: Record<JSONString, Schema>;
  readonly patternProperties?: Record<JSONString, Schema>;
  readonly dependentSchemas?: Record<JSONString, Schema>;
  readonly propertyNames?: Schema;
  readonly allOf?: Schema[];
  readonly anyOf?: Schema[];
  readonly oneOf?: Schema[];
  readonly not?: Schema;
  readonly if?: Schema;
  readonly then?: Schema;
  readonly else?: Schema;

  // https://json-schema.org/draft/2020-12/vocab/unevaluated
  readonly unevaluatedItems?: Schema;
  readonly unevaluatedProperties?: Schema;

  // https://json-schema.org/draft/2020-12/vocab/validation
  readonly type?: string;
  readonly const?: JSONValue;
  readonly enum?: JSONValue[];
  readonly minimum?: JSONNumber;
  readonly maximum?: JSONNumber;
  readonly exclusiveMinimum?: JSONNumber;
  readonly exclusiveMaximum?: JSONNumber;
  readonly multipleOf?: JSONNumber;
  readonly minLength?: JSONNumber;
  readonly maxLength?: JSONNumber;
  readonly pattern?: JSONString;
  readonly minItems?: JSONNumber;
  readonly maxItems?: JSONNumber;
  readonly uniqueItems?: JSONBoolean;
  readonly minContains?: JSONNumber;
  readonly maxContains?: JSONNumber;
  readonly minProperties?: JSONNumber;
  readonly maxProperties?: JSONNumber;
  readonly dependentRequired?: Record<JSONString, JSONString[]>;
  readonly required?: JSONString[];

  // https://json-schema.org/draft/2020-12/vocab/format-annotation
  // https://json-schema.org/draft/2020-12/vocab/format-assertion
  readonly format?: JSONString;

  // https://json-schema.org/draft/2020-12/vocab/content
  readonly contentEncoding?: JSONString;
  readonly contentMediaType?: JSONString;
  readonly contentSchema?: Schema;

  // https://json-schema.org/draft/2020-12/vocab/meta-data
  readonly title?: JSONString;
  readonly description?: JSONString;
  readonly deprecated?: JSONBoolean;
  readonly readOnly?: JSONBoolean;
  readonly writeOnly?: JSONBoolean;
  readonly default?: JSONValue;
  readonly examples?: JSONValue[];
}

/**
 * A JSON Schema MUST be an object or a boolean.
 * See http://json-schema.org/draft/2019-09/json-schema-core.html#rfc.section.4.3
 */
export type Schema = ObjectSchema | boolean
