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
} from '../../../lib/types/object/encode'

import {
  EncodingType
} from '../../../lib/types/base'

import {
  getAnyEncoding
} from '../../../lib/types/any/mapper'

import {
  getIntegerEncoding
} from '../../../lib/types/integer/mapper'

import {
  getStringEncoding
} from '../../../lib/types/string/mapper'

tap.test('ARBITRARY_TYPED_KEYS_OBJECT: should encode untyped {foo:"bar",baz:1}', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(16)
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
  })

  test.strictSame(buffer, Buffer.from([
    0x02, // length
    0x03, 0x66, 0x6f, 0x6f, // key length + 'foo'
    0x00, 0x03, 0x62, 0x61, 0x72, // string tag + length + 'bar'
    0x03, 0x62, 0x61, 0x7a, // key length + 'baz'
    0x09, 0x01 // positive integer type tag + 1
  ]))

  test.is(bytesWritten, 16)
  test.end()
})

tap.test('ARBITRARY_TYPED_KEYS_OBJECT: should encode typed {foo:"bar",baz:1}', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(16)
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
  })

  test.strictSame(buffer, Buffer.from([
    0x02, // length
    0x00, 0x66, 0x6f, 0x6f, // key length + 'foo'
    0x00, 0x03, 0x62, 0x61, 0x72, // string tag + length + 'bar'
    0x00, 0x62, 0x61, 0x7a, // key length + 'baz'
    0x09, 0x01 // positive integer type tag + 1
  ]))

  test.is(bytesWritten, 16)
  test.end()
})

tap.test('NON_REQUIRED_BOUNDED_TYPED_OBJECT: should encode typed {foo:"bar",baz:1}', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(7)
  const bytesWritten: number = NON_REQUIRED_BOUNDED_TYPED_OBJECT(buffer, 0, {
    foo: 'bar',
    baz: 1
  }, {
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
  })

  test.strictSame(buffer, Buffer.from([
    0x04, // length
    0b00000101, // bit set
    0x01, // 1
    0x03, 0x62, 0x61, 0x72 // "bar"
  ]))

  test.is(bytesWritten, 7)
  test.end()
})

tap.test('NON_REQUIRED_BOUNDED_TYPED_OBJECT: should encode typed {}', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(2)
  const bytesWritten: number = NON_REQUIRED_BOUNDED_TYPED_OBJECT(buffer, 0, {}, {
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
  })

  test.strictSame(buffer, Buffer.from([
    0x04, // length
    0b00000000 // bit set
  ]))

  test.is(bytesWritten, 2)
  test.end()
})

tap.test('REQUIRED_ONLY_BOUNDED_TYPED_OBJECT: should encode typed {foo:"bar",baz:1}', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(5)
  const bytesWritten: number = REQUIRED_ONLY_BOUNDED_TYPED_OBJECT(buffer, 0, {
    foo: 'bar',
    baz: 1
  }, {
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
  })

  test.strictSame(buffer, Buffer.from([
    0x01, // 1
    0x03, 0x62, 0x61, 0x72 // "bar"
  ]))

  test.is(bytesWritten, 5)
  test.end()
})

tap.test('MIXED_BOUNDED_TYPED_OBJECT: should encode typed {foo:"bar",baz:1} with one required', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(7)
  const bytesWritten: number = MIXED_BOUNDED_TYPED_OBJECT(buffer, 0, {
    foo: 'bar',
    baz: 1
  }, {
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
  })

  test.strictSame(buffer, Buffer.from([
    0x03, 0x62, 0x61, 0x72, // "bar",
    0x01, 0x01, // bit map
    0x01 // 1
  ]))

  test.is(bytesWritten, 7)
  test.end()
})

tap.test('MIXED_BOUNDED_TYPED_OBJECT: should encode typed {foo:"bar",baz:1} with one missing optional', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(6)
  const bytesWritten: number = MIXED_BOUNDED_TYPED_OBJECT(buffer, 0, {
    foo: 'bar'
  }, {
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
  })

  test.strictSame(buffer, Buffer.from([
    0x03, 0x62, 0x61, 0x72, // "bar",
    0x01, 0x00 // bit map
  ]))

  test.is(bytesWritten, 6)
  test.end()
})

tap.test('REQUIRED_UNBOUNDED_TYPED_OBJECT: should encode semityped {foo:"bar",baz:1}', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(11)
  const bytesWritten: number = REQUIRED_UNBOUNDED_TYPED_OBJECT(buffer, 0, {
    foo: 'bar',
    baz: 1
  }, {
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
  })

  test.strictSame(buffer, Buffer.from([
    0x03, 0x62, 0x61, 0x72, // "bar",
    0x01, // length
    0x03, 0x62, 0x61, 0x7a, // key length + 'baz'
    0x09, 0x01 // positive integer type tag + 1
  ]))

  test.is(bytesWritten, 11)
  test.end()
})

tap.test('REQUIRED_UNBOUNDED_TYPED_OBJECT: should encode typed {foo:"bar"}', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(5)
  const bytesWritten: number = REQUIRED_UNBOUNDED_TYPED_OBJECT(buffer, 0, {
    foo: 'bar'
  }, {
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
  })

  test.strictSame(buffer, Buffer.from([
    0x03, 0x62, 0x61, 0x72, // "bar",
    0x00 // length
  ]))

  test.is(bytesWritten, 5)
  test.end()
})

tap.test('OPTIONAL_UNBOUNDED_TYPED_OBJECT: should encode semityped {foo:"bar",baz:1}', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(13)
  const bytesWritten: number = OPTIONAL_UNBOUNDED_TYPED_OBJECT(buffer, 0, {
    foo: 'bar',
    baz: 1
  }, {
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
  })

  test.strictSame(buffer, Buffer.from([
    0x01, 0x01, // bit map
    0x03, 0x62, 0x61, 0x72, // "bar",
    0x01, // length
    0x03, 0x62, 0x61, 0x7a, // key length + 'baz'
    0x09, 0x01 // positive integer type tag + 1
  ]))

  test.is(bytesWritten, 13)
  test.end()
})

tap.test('MIXED_UNBOUNDED_TYPED_OBJECT: should encode mixed {foo:"bar",baz:1,qux:null}', (test) => {
  const buffer: Buffer = Buffer.allocUnsafe(13)
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
      foo: getStringEncoding({
        type: 'string'
      }),
      baz: getIntegerEncoding({
        type: 'integer',
        minimum: 0
      })
    }
  })

  test.strictSame(buffer, Buffer.from([
    0x03, 0x62, 0x61, 0x72, // "bar",
    0x01, 0x01, // bit map
    0x01, // 1
    0x01, // free form count
    0x03, 0x71, 0x75, 0x78,
    0x06 // null type tag
  ]))

  test.is(bytesWritten, 13)
  test.end()
})
