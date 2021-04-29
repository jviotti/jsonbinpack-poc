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

import tap from 'tap'

import {
  ArrayCanonicalSchema
} from '../../../lib/canonical-schema'

import {
  ArrayEncoding,
  getArrayEncoding
} from '../../../lib/types/array/mapper'

tap.test('should encode an arbitrary array', (test) => {
  const schema: ArrayCanonicalSchema = {
    type: 'array'
  }

  const result: ArrayEncoding = getArrayEncoding(schema)
  test.strictSame(result, {
    type: 'array',
    encoding: 'UNBOUNDED_SEMITYPED__LENGTH_PREFIX',
    options: {
      prefixEncodings: []
    }
  })

  test.end()
})

tap.test('should encode an arbitrary array with minItems', (test) => {
  const schema: ArrayCanonicalSchema = {
    type: 'array',
    minItems: 10
  }

  const result: ArrayEncoding = getArrayEncoding(schema)
  test.strictSame(result, {
    type: 'array',
    encoding: 'FLOOR_SEMITYPED__LENGTH_PREFIX',
    options: {
      minimum: 10,
      prefixEncodings: []
    }
  })

  test.end()
})

tap.test('should encode an arbitrary array with maxItems = 256', (test) => {
  const schema: ArrayCanonicalSchema = {
    type: 'array',
    maxItems: 256
  }

  const result: ArrayEncoding = getArrayEncoding(schema)
  test.strictSame(result, {
    type: 'array',
    encoding: 'ROOF_SEMITYPED__LENGTH_PREFIX',
    options: {
      maximum: 256,
      prefixEncodings: []
    }
  })

  test.end()
})

tap.test('should encode an arbitrary array with maxItems = 255', (test) => {
  const schema: ArrayCanonicalSchema = {
    type: 'array',
    maxItems: 255
  }

  const result: ArrayEncoding = getArrayEncoding(schema)
  test.strictSame(result, {
    type: 'array',
    encoding: 'ROOF_8BITS_SEMITYPED__LENGTH_PREFIX',
    options: {
      maximum: 255,
      prefixEncodings: []
    }
  })

  test.end()
})

tap.test('should encode an arbitrary array with maxItems < 255', (test) => {
  const schema: ArrayCanonicalSchema = {
    type: 'array',
    maxItems: 10
  }

  const result: ArrayEncoding = getArrayEncoding(schema)
  test.strictSame(result, {
    type: 'array',
    encoding: 'ROOF_8BITS_SEMITYPED__LENGTH_PREFIX',
    options: {
      maximum: 10,
      prefixEncodings: []
    }
  })

  test.end()
})

tap.test('should encode an arbitrary array with maxItems - minItems < 255', (test) => {
  const schema: ArrayCanonicalSchema = {
    type: 'array',
    maxItems: 10,
    minItems: 3
  }

  const result: ArrayEncoding = getArrayEncoding(schema)
  test.strictSame(result, {
    type: 'array',
    encoding: 'BOUNDED_8BITS_SEMITYPED__LENGTH_PREFIX',
    options: {
      minimum: 3,
      maximum: 10,
      prefixEncodings: []
    }
  })

  test.end()
})

tap.test('should encode an arbitrary array with maxItems - minItems > 255', (test) => {
  const schema: ArrayCanonicalSchema = {
    type: 'array',
    maxItems: 450,
    minItems: 30
  }

  const result: ArrayEncoding = getArrayEncoding(schema)
  test.strictSame(result, {
    type: 'array',
    encoding: 'BOUNDED_SEMITYPED__LENGTH_PREFIX',
    options: {
      minimum: 30,
      maximum: 450,
      prefixEncodings: []
    }
  })

  test.end()
})

// TODO: Add semityped tests with prefixEncodings
// TODO: Add typed tests with no prefixEncodings
// TODO: Add typed tests with prefixEncodings
