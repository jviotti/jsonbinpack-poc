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
import * as fc from 'fast-check'
import * as util from 'util'

import {
  JSONObject
} from '../../lib/json'

import {
  EncodingType
} from '../../lib/types/base'

import {
  getAnyEncoding
} from '../../lib/types/any/mapper'

import {
  TypedKeysOptions,
  RequiredUnboundedTypedOptions,
  OptionalUnboundedTypedOptions,
  BoundedTypedOptions,
  UnboundedTypedOptions,
  RequiredBoundedTypedOptions,
  OptionalBoundedTypedOptions
} from '../../lib/types/object/options'

import {
  ARBITRARY_TYPED_KEYS_OBJECT as ENCODE_ARBITRARY_TYPED_KEYS_OBJECT,
  NON_REQUIRED_BOUNDED_TYPED_OBJECT as ENCODE_NON_REQUIRED_BOUNDED_TYPED_OBJECT,
  REQUIRED_ONLY_BOUNDED_TYPED_OBJECT as ENCODE_REQUIRED_ONLY_BOUNDED_TYPED_OBJECT,
  MIXED_BOUNDED_TYPED_OBJECT as ENCODE_MIXED_BOUNDED_TYPED_OBJECT,
  REQUIRED_UNBOUNDED_TYPED_OBJECT as ENCODE_REQUIRED_UNBOUNDED_TYPED_OBJECT,
  OPTIONAL_UNBOUNDED_TYPED_OBJECT as ENCODE_OPTIONAL_UNBOUNDED_TYPED_OBJECT,
  MIXED_UNBOUNDED_TYPED_OBJECT as ENCODE_MIXED_UNBOUNDED_TYPED_OBJECT
} from '../../lib/types/object/encode'

import {
  ObjectResult,
  ARBITRARY_TYPED_KEYS_OBJECT as DECODE_ARBITRARY_TYPED_KEYS_OBJECT,
  NON_REQUIRED_BOUNDED_TYPED_OBJECT as DECODE_NON_REQUIRED_BOUNDED_TYPED_OBJECT,
  REQUIRED_ONLY_BOUNDED_TYPED_OBJECT as DECODE_REQUIRED_ONLY_BOUNDED_TYPED_OBJECT,
  MIXED_BOUNDED_TYPED_OBJECT as DECODE_MIXED_BOUNDED_TYPED_OBJECT,
  REQUIRED_UNBOUNDED_TYPED_OBJECT as DECODE_REQUIRED_UNBOUNDED_TYPED_OBJECT,
  OPTIONAL_UNBOUNDED_TYPED_OBJECT as DECODE_OPTIONAL_UNBOUNDED_TYPED_OBJECT,
  MIXED_UNBOUNDED_TYPED_OBJECT as DECODE_MIXED_UNBOUNDED_TYPED_OBJECT
} from '../../lib/types/object/decode'

import {
  StringEncoding,
  getStringEncoding
} from '../../lib/types/string/mapper'

import {
  getIntegerEncoding
} from '../../lib/types/integer/mapper'

tap.test('ARBITRARY_TYPED_KEYS_OBJECT: scalars values', (test) => {
  const options: TypedKeysOptions = {
    keyEncoding: getStringEncoding({
      type: 'string'
    }),
    encoding: {
      type: EncodingType.Any,
      encoding: 'ANY__TYPE_PREFIX',
      options: {}
    }
  }

  fc.assert(fc.property(fc.nat(10), fc.dictionary(fc.string(), fc.oneof(
    fc.constant(null),
    fc.boolean(),
    fc.integer(),
    fc.float(),
    fc.double(),
    fc.string({ maxLength: 10 })
  )), (offset: number, value: JSONObject): boolean => {
    const buffer: Buffer = Buffer.allocUnsafe(2048)
    const bytesWritten: number = ENCODE_ARBITRARY_TYPED_KEYS_OBJECT(
      buffer, offset, value, options)
    const result: ObjectResult = DECODE_ARBITRARY_TYPED_KEYS_OBJECT(
      buffer, offset, options)
    return bytesWritten > 0 && result.bytes === bytesWritten &&
      util.isDeepStrictEqual(result.value, value)
  }), {
    verbose: false
  })

  test.end()
})

tap.test('ARBITRARY_TYPED_KEYS_OBJECT: untyped {foo:"bar",baz:1}', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(16)
  const value: JSONObject = {
    foo: 'bar',
    baz: 1
  }

  const keyEncoding: StringEncoding = getStringEncoding({
    type: 'string'
  })

  const bytesWritten: number = ENCODE_ARBITRARY_TYPED_KEYS_OBJECT(
    buffer, 0, value, {
      keyEncoding,
      encoding: {
        type: EncodingType.Any,
        encoding: 'ANY__TYPE_PREFIX',
        options: {}
      }
    })

  const result: ObjectResult = DECODE_ARBITRARY_TYPED_KEYS_OBJECT(
    buffer, 0, {
      keyEncoding,
      encoding: {
        type: EncodingType.Any,
        encoding: 'ANY__TYPE_PREFIX',
        options: {}
      }
    })

  test.is(bytesWritten, result.bytes)
  test.strictSame(result.value, value)
  test.end()
})

tap.test('ARBITRARY_TYPED_KEYS_OBJECT: typed {foo:"bar",baz:1}', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(16)
  const value: JSONObject = {
    foo: 'bar',
    baz: 1
  }

  const keyEncoding: StringEncoding = getStringEncoding({
    type: 'string',
    minLength: 3
  })

  const bytesWritten: number = ENCODE_ARBITRARY_TYPED_KEYS_OBJECT(
    buffer, 0, value, {
      keyEncoding,
      encoding: {
        type: EncodingType.Any,
        encoding: 'ANY__TYPE_PREFIX',
        options: {}
      }
    })

  const result: ObjectResult = DECODE_ARBITRARY_TYPED_KEYS_OBJECT(
    buffer, 0, {
      keyEncoding,
      encoding: {
        type: EncodingType.Any,
        encoding: 'ANY__TYPE_PREFIX',
        options: {}
      }
    })

  test.is(bytesWritten, result.bytes)
  test.strictSame(result.value, value)
  test.end()
})

tap.test('NON_REQUIRED_BOUNDED_TYPED_OBJECT: typed {foo:"bar",baz:1}', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(7)
  const value: JSONObject = {
    foo: 'bar',
    baz: 1
  }

  const options: OptionalBoundedTypedOptions = {
    optionalProperties: [ 'baz', 'bar', 'foo', 'qux' ],
    propertyEncodings: {
      foo: getStringEncoding({
        type: 'string'
      }),
      baz: getIntegerEncoding({
        type: 'integer',
        minimum: 0
      }),
      bar: getAnyEncoding({}),
      qux: getAnyEncoding({})
    }
  }

  const bytesWritten: number = ENCODE_NON_REQUIRED_BOUNDED_TYPED_OBJECT(
    buffer, 0, value, options)

  const result: ObjectResult = DECODE_NON_REQUIRED_BOUNDED_TYPED_OBJECT(
    buffer, 0, options)

  test.is(bytesWritten, result.bytes)
  test.strictSame(result.value, value)
  test.end()
})

tap.test('REQUIRED_ONLY_BOUNDED_TYPED_OBJECT: typed {foo:"bar",baz:1}', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(5)
  const value: JSONObject = {
    foo: 'bar',
    baz: 1
  }

  const options: RequiredBoundedTypedOptions = {
    requiredProperties: [ 'baz', 'foo' ],
    propertyEncodings: {
      foo: getStringEncoding({
        type: 'string'
      }),
      baz: getIntegerEncoding({
        type: 'integer',
        minimum: 0
      })
    }
  }

  const bytesWritten: number = ENCODE_REQUIRED_ONLY_BOUNDED_TYPED_OBJECT(
    buffer, 0, value, options)

  const result: ObjectResult = DECODE_REQUIRED_ONLY_BOUNDED_TYPED_OBJECT(
    buffer, 0, options)

  test.is(bytesWritten, result.bytes)
  test.strictSame(result.value, value)
  test.end()
})

tap.test('MIXED_BOUNDED_TYPED_OBJECT: typed {foo:"bar",baz:1} with one required', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(7)
  const value: JSONObject = {
    foo: 'bar',
    baz: 1
  }

  const options: BoundedTypedOptions = {
    requiredProperties: [ 'foo' ],
    optionalProperties: [ 'baz' ],
    propertyEncodings: {
      foo: getStringEncoding({
        type: 'string'
      }),
      baz: getIntegerEncoding({
        type: 'integer',
        minimum: 0
      })
    }
  }

  const bytesWritten: number = ENCODE_MIXED_BOUNDED_TYPED_OBJECT(buffer, 0, value, options)
  const result: ObjectResult = DECODE_MIXED_BOUNDED_TYPED_OBJECT(buffer, 0, options)

  test.is(bytesWritten, result.bytes)
  test.strictSame(result.value, value)
  test.end()
})

tap.test('MIXED_BOUNDED_TYPED_OBJECT: {foo:"bar",baz:1} with one missing optional', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(6)
  const value: JSONObject = {
    foo: 'bar'
  }

  const options: BoundedTypedOptions = {
    requiredProperties: [ 'foo' ],
    optionalProperties: [ 'baz' ],
    propertyEncodings: {
      foo: getStringEncoding({
        type: 'string'
      }),
      baz: getIntegerEncoding({
        type: 'integer',
        minimum: 0
      })
    }
  }

  const bytesWritten: number = ENCODE_MIXED_BOUNDED_TYPED_OBJECT(buffer, 0, value, options)
  const result: ObjectResult = DECODE_MIXED_BOUNDED_TYPED_OBJECT(buffer, 0, options)

  test.is(bytesWritten, result.bytes)
  test.strictSame(result.value, value)
  test.end()
})

tap.test('REQUIRED_UNBOUNDED_TYPED_OBJECT: semityped {foo:"bar",baz:1}', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(11)
  const value: JSONObject = {
    foo: 'bar',
    baz: 1
  }

  const options: RequiredUnboundedTypedOptions = {
    requiredProperties: [ 'foo' ],
    propertyEncodings: {
      foo: getStringEncoding({
        type: 'string'
      })
    },
    keyEncoding: getStringEncoding({
      type: 'string'
    }),
    encoding: {
      type: EncodingType.Any,
      encoding: 'ANY__TYPE_PREFIX',
      options: {}
    }
  }

  const bytesWritten: number = ENCODE_REQUIRED_UNBOUNDED_TYPED_OBJECT(buffer, 0, value, options)
  const result: ObjectResult = DECODE_REQUIRED_UNBOUNDED_TYPED_OBJECT(buffer, 0, options)

  test.is(bytesWritten, result.bytes)
  test.strictSame(result.value, value)
  test.end()
})

tap.test('REQUIRED_UNBOUNDED_TYPED_OBJECT: typed {foo:"bar"}', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(5)
  const value: JSONObject = {
    foo: 'bar'
  }

  const options: RequiredUnboundedTypedOptions = {
    requiredProperties: [ 'foo' ],
    propertyEncodings: {
      foo: getStringEncoding({
        type: 'string'
      })
    },
    keyEncoding: getStringEncoding({
      type: 'string'
    }),
    encoding: {
      type: EncodingType.Any,
      encoding: 'ANY__TYPE_PREFIX',
      options: {}
    }
  }

  const bytesWritten: number = ENCODE_REQUIRED_UNBOUNDED_TYPED_OBJECT(buffer, 0, value, options)
  const result: ObjectResult = DECODE_REQUIRED_UNBOUNDED_TYPED_OBJECT(buffer, 0, options)

  test.is(bytesWritten, result.bytes)
  test.strictSame(result.value, value)
  test.end()
})

tap.test('OPTIONAL_UNBOUNDED_TYPED_OBJECT: semityped {foo:"bar",baz:1}', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(13)
  const value: JSONObject = {
    foo: 'bar',
    baz: 1
  }

  const options: OptionalUnboundedTypedOptions = {
    optionalProperties: [ 'foo' ],
    propertyEncodings: {
      foo: getStringEncoding({
        type: 'string'
      })
    },
    keyEncoding: getStringEncoding({
      type: 'string'
    }),
    encoding: {
      type: EncodingType.Any,
      encoding: 'ANY__TYPE_PREFIX',
      options: {}
    }
  }

  const bytesWritten: number = ENCODE_OPTIONAL_UNBOUNDED_TYPED_OBJECT(
    buffer, 0, value, options)
  const result: ObjectResult = DECODE_OPTIONAL_UNBOUNDED_TYPED_OBJECT(
    buffer, 0, options)

  test.is(bytesWritten, result.bytes)
  test.strictSame(result.value, value)
  test.end()
})

tap.test('MIXED_UNBOUNDED_TYPED_OBJECT: mixed {foo:"bar",baz:1,qux:null}', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(13)
  const value: JSONObject = {
    foo: 'bar',
    baz: 1,
    qux: null
  }

  const options: UnboundedTypedOptions = {
    requiredProperties: [ 'foo' ],
    optionalProperties: [ 'baz' ],
    keyEncoding: getStringEncoding({
      type: 'string'
    }),
    encoding: {
      type: EncodingType.Any,
      encoding: 'ANY__TYPE_PREFIX',
      options: {}
    },
    propertyEncodings: {
      foo: getStringEncoding({
        type: 'string'
      }),
      baz: getIntegerEncoding({
        type: 'integer',
        minimum: 0
      })
    }
  }

  const bytesWritten: number = ENCODE_MIXED_UNBOUNDED_TYPED_OBJECT(
    buffer, 0, value, options)
  const result: ObjectResult = DECODE_MIXED_UNBOUNDED_TYPED_OBJECT(
    buffer, 0, options)

  test.is(bytesWritten, result.bytes)
  test.strictSame(result.value, value)
  test.end()
})
