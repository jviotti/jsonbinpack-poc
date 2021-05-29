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
  ArrayEncodingSchema
} from '../../lib/encoding-schema'

import {
  ArrayEncoding,
  getArrayEncoding
} from '../../lib/mapper/array'

tap.test('should encode an arbitrary array', (test) => {
  const schema: ArrayEncodingSchema = {
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
  const schema: ArrayEncodingSchema = {
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
  const schema: ArrayEncodingSchema = {
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
  const schema: ArrayEncodingSchema = {
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
  const schema: ArrayEncodingSchema = {
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
  const schema: ArrayEncodingSchema = {
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
  const schema: ArrayEncodingSchema = {
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

tap.test('should encode an semi-typed scalar heterogeneous array', (test) => {
  const schema: ArrayEncodingSchema = {
    type: 'array',
    prefixItems: [
      {
        type: 'integer'
      },
      {
        type: 'string',
        maxLength: 5
      }
    ]
  }

  const result: ArrayEncoding = getArrayEncoding(schema)
  test.strictSame(result, {
    type: 'array',
    encoding: 'UNBOUNDED_SEMITYPED__LENGTH_PREFIX',
    options: {
      prefixEncodings: [
        {
          type: 'integer',
          encoding: 'ARBITRARY__ZIGZAG_VARINT',
          options: {}
        },
        {
          type: 'string',
          encoding: 'ROOF__PREFIX_LENGTH_8BIT_FIXED',
          options: {
            maximum: 5
          }
        }
      ]
    }
  })

  test.end()
})

tap.test('should encode an semi-typed array with minItems', (test) => {
  const schema: ArrayEncodingSchema = {
    type: 'array',
    minItems: 5,
    prefixItems: [
      {
        type: 'integer'
      },
      {
        type: 'string',
        maxLength: 5
      }
    ]
  }

  const result: ArrayEncoding = getArrayEncoding(schema)
  test.strictSame(result, {
    type: 'array',
    encoding: 'FLOOR_SEMITYPED__LENGTH_PREFIX',
    options: {
      minimum: 5,
      prefixEncodings: [
        {
          type: 'integer',
          encoding: 'ARBITRARY__ZIGZAG_VARINT',
          options: {}
        },
        {
          type: 'string',
          encoding: 'ROOF__PREFIX_LENGTH_8BIT_FIXED',
          options: {
            maximum: 5
          }
        }
      ]
    }
  })

  test.end()
})

tap.test('should encode an semi + fully typed array with minItems', (test) => {
  const schema: ArrayEncodingSchema = {
    type: 'array',
    minItems: 5,
    items: {
      type: 'array'
    },
    prefixItems: [
      {
        type: 'integer'
      },
      {
        type: 'string',
        maxLength: 5
      }
    ]
  }

  const result: ArrayEncoding = getArrayEncoding(schema)
  test.strictSame(result, {
    type: 'array',
    encoding: 'FLOOR_TYPED__LENGTH_PREFIX',
    options: {
      minimum: 5,
      encoding: {
        type: 'array',
        encoding: 'UNBOUNDED_SEMITYPED__LENGTH_PREFIX',
        options: {
          prefixEncodings: []
        }
      },
      prefixEncodings: [
        {
          type: 'integer',
          encoding: 'ARBITRARY__ZIGZAG_VARINT',
          options: {}
        },
        {
          type: 'string',
          encoding: 'ROOF__PREFIX_LENGTH_8BIT_FIXED',
          options: {
            maximum: 5
          }
        }
      ]
    }
  })

  test.end()
})
