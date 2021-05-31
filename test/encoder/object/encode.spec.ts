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
  ARBITRARY_TYPED_KEYS_OBJECT,
  NON_REQUIRED_BOUNDED_TYPED_OBJECT,
  REQUIRED_ONLY_BOUNDED_TYPED_OBJECT,
  MIXED_BOUNDED_TYPED_OBJECT,
  REQUIRED_UNBOUNDED_TYPED_OBJECT,
  OPTIONAL_UNBOUNDED_TYPED_OBJECT,
  MIXED_UNBOUNDED_TYPED_OBJECT
} from '../../../lib/encoder/object/encode'

import {
  getEncoding
} from '../../../lib/mapper'

import {
  getStringEncoding
} from '../../../lib/mapper/string'

import {
  ResizableBuffer,
  EncodingContext,
  EncodingType,
  getDefaultEncodingContext
} from '../../../lib/encoder'

tap.test('ARBITRARY_TYPED_KEYS_OBJECT: should encode untyped {foo:"bar",baz:1}', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(16))
  const bytesWritten: number = ARBITRARY_TYPED_KEYS_OBJECT(buffer, 0, {
    foo: 'bar',
    baz: 1
  }, {
    keyEncoding: getStringEncoding({
      type: 'string'
    }),
    encoding: {
      type: EncodingType.Any,
      encoding: 'ANY__TYPE_PREFIX',
      options: {}
    }
  }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    // Length
    0x02,

    // Key length + 'foo'
    0x04, 0x66, 0x6f, 0x6f,

    // String tag + length + 'bar'
    0x01, 0x04, 0x62, 0x61, 0x72,

    // Key length + 'baz'
    0x04, 0x62, 0x61, 0x7a,

    // Positive integer type tag + 1
    0x0a, 0x01
  ]))

  test.is(bytesWritten, 16)
  test.end()
})

tap.test('ARBITRARY_TYPED_KEYS_OBJECT: should encode typed {foo:"bar",baz:1}', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(16))
  const bytesWritten: number = ARBITRARY_TYPED_KEYS_OBJECT(buffer, 0, {
    foo: 'bar',
    baz: 1
  }, {
    keyEncoding: getStringEncoding({
      type: 'string',
      minLength: 3
    }),
    encoding: {
      type: EncodingType.Any,
      encoding: 'ANY__TYPE_PREFIX',
      options: {}
    }
  }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    // Length
    0x02,

    // Key length + 'foo'
    0x01, 0x66, 0x6f, 0x6f,

    // String tag + length + 'bar'
    0x01, 0x04, 0x62, 0x61, 0x72,

    // Key length + 'baz'
    0x01, 0x62, 0x61, 0x7a,

    // Positive integer type tag + 1
    0x0a, 0x01
  ]))

  test.is(bytesWritten, 16)
  test.end()
})

tap.test('NON_REQUIRED_BOUNDED_TYPED_OBJECT: should encode typed {foo:"bar",baz:1}', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(7))
  const bytesWritten: number = NON_REQUIRED_BOUNDED_TYPED_OBJECT(buffer, 0, {
    foo: 'bar',
    baz: 1
  }, {
    optionalProperties: [ 'baz', 'bar', 'foo', 'qux' ],
    propertyEncodings: {
      foo: getEncoding({
        type: 'string'
      }),
      baz: getEncoding({
        type: 'integer',
        minimum: 0
      }),
      bar: getEncoding({}),
      qux: getEncoding({})
    }
  }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    // Length
    0x04,

    // Bit set
    0b00000101,

    // 1
    0x01,

    // "bar"
    0x04, 0x62, 0x61, 0x72
  ]))

  test.is(bytesWritten, 7)
  test.end()
})

tap.test('NON_REQUIRED_BOUNDED_TYPED_OBJECT: should encode typed {}', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(2))
  const bytesWritten: number = NON_REQUIRED_BOUNDED_TYPED_OBJECT(buffer, 0, {}, {
    optionalProperties: [ 'baz', 'bar', 'foo', 'qux' ],
    propertyEncodings: {
      foo: getEncoding({
        type: 'string'
      }),
      baz: getEncoding({
        type: 'integer',
        minimum: 0
      }),
      bar: getEncoding({}),
      qux: getEncoding({})
    }
  }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    // Length
    0x04,

    // Bit set
    0b00000000
  ]))

  test.is(bytesWritten, 2)
  test.end()
})

tap.test('REQUIRED_ONLY_BOUNDED_TYPED_OBJECT: should encode typed {foo:"bar",baz:1}', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(5))
  const bytesWritten: number = REQUIRED_ONLY_BOUNDED_TYPED_OBJECT(buffer, 0, {
    foo: 'bar',
    baz: 1
  }, {
    requiredProperties: [ 'baz', 'foo' ],
    propertyEncodings: {
      foo: getEncoding({
        type: 'string'
      }),
      baz: getEncoding({
        type: 'integer',
        minimum: 0
      })
    }
  }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    // 1
    0x01,

    // "bar"
    0x04, 0x62, 0x61, 0x72
  ]))

  test.is(bytesWritten, 5)
  test.end()
})

tap.test('MIXED_BOUNDED_TYPED_OBJECT: should encode typed {foo:"bar",baz:1} with one required', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(7))
  const bytesWritten: number = MIXED_BOUNDED_TYPED_OBJECT(buffer, 0, {
    foo: 'bar',
    baz: 1
  }, {
    requiredProperties: [ 'foo' ],
    optionalProperties: [ 'baz' ],
    propertyEncodings: {
      foo: getEncoding({
        type: 'string'
      }),
      baz: getEncoding({
        type: 'integer',
        minimum: 0
      })
    }
  }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    // "bar"
    0x04, 0x62, 0x61, 0x72,

    // Bit map
    0x01, 0x01,

    // 1
    0x01
  ]))

  test.is(bytesWritten, 7)
  test.end()
})

tap.test('MIXED_BOUNDED_TYPED_OBJECT: should encode typed {foo:"bar",baz:1} with one missing optional', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(6))
  const bytesWritten: number = MIXED_BOUNDED_TYPED_OBJECT(buffer, 0, {
    foo: 'bar'
  }, {
    requiredProperties: [ 'foo' ],
    optionalProperties: [ 'baz' ],
    propertyEncodings: {
      foo: getEncoding({
        type: 'string'
      }),
      baz: getEncoding({
        type: 'integer',
        minimum: 0
      })
    }
  }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    // "bar"
    0x04, 0x62, 0x61, 0x72,

    // Bit map
    0x01, 0x00
  ]))

  test.is(bytesWritten, 6)
  test.end()
})

tap.test('REQUIRED_UNBOUNDED_TYPED_OBJECT: should encode semityped {foo:"bar",baz:1}', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(11))
  const bytesWritten: number = REQUIRED_UNBOUNDED_TYPED_OBJECT(buffer, 0, {
    foo: 'bar',
    baz: 1
  }, {
    requiredProperties: [ 'foo' ],
    propertyEncodings: {
      foo: getEncoding({
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
  }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    // "bar"
    0x04, 0x62, 0x61, 0x72,

    // Length
    0x01,

    // Key length + 'baz'
    0x04, 0x62, 0x61, 0x7a,

    // Positive integer type tag + 1
    0x0a, 0x01
  ]))

  test.is(bytesWritten, 11)
  test.end()
})

tap.test('REQUIRED_UNBOUNDED_TYPED_OBJECT: should encode typed {foo:"bar"}', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(5))
  const bytesWritten: number = REQUIRED_UNBOUNDED_TYPED_OBJECT(buffer, 0, {
    foo: 'bar'
  }, {
    requiredProperties: [ 'foo' ],
    propertyEncodings: {
      foo: getEncoding({
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
  }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    // "bar"
    0x04, 0x62, 0x61, 0x72,

    // Length
    0x00
  ]))

  test.is(bytesWritten, 5)
  test.end()
})

tap.test('OPTIONAL_UNBOUNDED_TYPED_OBJECT: should encode semityped {foo:"bar",baz:1}', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(13))
  const bytesWritten: number = OPTIONAL_UNBOUNDED_TYPED_OBJECT(buffer, 0, {
    foo: 'bar',
    baz: 1
  }, {
    optionalProperties: [ 'foo' ],
    propertyEncodings: {
      foo: getEncoding({
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
  }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    // Bit map
    0x01, 0x01,

    // "bar"
    0x04, 0x62, 0x61, 0x72,

    // Length
    0x01,

    // Key length + 'baz'
    0x04, 0x62, 0x61, 0x7a,

    // Positive integer type tag + 1
    0x0a, 0x01
  ]))

  test.is(bytesWritten, 13)
  test.end()
})

tap.test('MIXED_UNBOUNDED_TYPED_OBJECT: should encode mixed {foo:"bar",baz:1,qux:null}', (test) => {
  const context: EncodingContext = getDefaultEncodingContext()
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(13))
  const bytesWritten: number = MIXED_UNBOUNDED_TYPED_OBJECT(buffer, 0, {
    foo: 'bar',
    baz: 1,
    qux: null
  }, {
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
      foo: getEncoding({
        type: 'string'
      }),
      baz: getEncoding({
        type: 'integer',
        minimum: 0
      })
    }
  }, context)

  test.strictSame(buffer.getBuffer(), Buffer.from([
    // "bar"
    0x04, 0x62, 0x61, 0x72,

    // Bit map
    0x01, 0x01,

    // 1
    0x01,

    // Free form count
    0x01,

    // "qux"
    0x04, 0x71, 0x75, 0x78,

    // Null type tag
    0x07
  ]))

  test.is(bytesWritten, 13)
  test.end()
})
