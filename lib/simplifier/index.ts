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
  strict as assert
} from 'assert'

import {
  cloneDeep
} from 'lodash'

import {
  JSONString
} from '../json'

import {
  Schema,
  ObjectSchema
} from '../jsonschema'

import {
  SimplificationRule
} from './rule'

import {
  RULES as RULES_SYNTAX_SUGAR
} from './syntax-sugar'

import {
  RULES as RULES_IMPLICITS
} from './implicits'

import {
  RULES as RULES_SIMPLIFICATION
} from './simplification'

import {
  RULES as RULES_SUPERFLUOUS
} from './superfluous'

import {
  RULES as RULES_HETEROGENEOUS
} from './heterogeneous'

// The concatenation of all rules
const SIMPLIFICATION_RULES: SimplificationRule[] = [
  ...RULES_SYNTAX_SUGAR,
  ...RULES_IMPLICITS,
  ...RULES_SIMPLIFICATION,
  ...RULES_SUPERFLUOUS,
  ...RULES_HETEROGENEOUS
]

// Runtime validation to ensure that rules do not contain
// duplicated identifiers.
for (const [ index, rule ] of SIMPLIFICATION_RULES.entries()) {
  for (const [ subindex, subrule ] of SIMPLIFICATION_RULES.entries()) {
    assert.ok(index === subindex || rule.id !== subrule.id, `Duplicated rule id: ${rule.id}`)
  }
}

const applyRules = (schema: ObjectSchema, hits: Set<string>): ObjectSchema => {
  for (const { id, condition, transform } of SIMPLIFICATION_RULES) {
    // We deep-clone to protect against rule implementations
    // that might accidentally mutate the schema
    if (condition(cloneDeep(schema))) {
      // Abort early on conditions that never stop matching
      // and cause the program to never terminate
      assert.ok(!hits.has(id), `Circular rule: ${id}`)
      hits.add(id)

      // Recurse until no more rules perform any change
      return applyRules(transform(cloneDeep(schema)), hits)
    }
  }

  /*
   * Recurse based on every possible applicator defined by JSON Schema
   */

  // Keywords of type "schema"
  for (const keyword of [
    'items',
    'contains',
    'propertyNames',
    'not',
    'if', 'then', 'else',
    'unevaluatedItems', 'unevaluatedProperties',
    'contentSchema'
  ]) {
    if (typeof schema[keyword] !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      Reflect.set(schema, keyword, simplifySchema(schema[keyword] as Schema))
    }
  }

  // Keywords of type "schema[]"
  for (const keyword of [ 'prefixItems', 'allOf', 'anyOf', 'oneOf' ]) {
    if (typeof schema[keyword] !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      Reflect.set(schema, keyword, (schema[keyword] as Schema[]).map(simplifySchema))
    }
  }

  // TODO: We cannot handle additionalProperties yet as the rest of the codebase
  // assumes that additionalProperties is a boolean schema

  // Keywords of type "string => schema"
  for (const keyword of [ 'properties', 'patternProperties', 'dependentSchemas' ]) {
    if (typeof schema[keyword] !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      for (const [ key, value ] of Object.entries(schema[keyword] as Record<JSONString, Schema>)) {
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        Reflect.set(schema[keyword] as Record<JSONString, Schema>, key, simplifySchema(value))
      }
    }
  }

  return schema
}

export const simplifySchema = (schema: Schema): ObjectSchema => {
  // We avoid putting this particular rule with the others as
  // otherwise every rule inherits the "boolean" type on its
  // signature, which unnecessarily complicates things
  if (typeof schema === 'boolean') {
    return schema ? {} : {
      not: {}
    }
  }

  return applyRules(schema, new Set())
}
