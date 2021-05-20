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
  JSONValue
} from '../../lib/json'

import ResizableBuffer from '../../lib/utils/resizable-buffer'

import {
  BOUNDED_CHOICE_INDEX as ENCODE_BOUNDED_CHOICE_INDEX,
  LARGE_BOUNDED_CHOICE_INDEX as ENCODE_LARGE_BOUNDED_CHOICE_INDEX
} from '../../lib/types/enum/encode'

import {
  EnumResult,
  BOUNDED_CHOICE_INDEX as DECODE_BOUNDED_CHOICE_INDEX,
  LARGE_BOUNDED_CHOICE_INDEX as DECODE_LARGE_BOUNDED_CHOICE_INDEX
} from '../../lib/types/enum/decode'

tap.test('BOUNDED_CHOICE_INDEX', (test) => {
  const arbitrary = fc.integer(1, 20).chain((length: number) => {
    return fc.tuple(
      fc.integer(0, length - 1),
      fc.array(fc.json(), {
        minLength: 1,
        maxLength: length
      }))
  })

  fc.assert(fc.property(arbitrary, ([ index, array ]): boolean => {
    fc.pre(index < array.length)

    const choices: JSONValue[] = array.map((json: string) => {
      return JSON.parse(json)
    })

    const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(1))
    const bytesWritten: number =
      ENCODE_BOUNDED_CHOICE_INDEX(buffer, 0, choices[index], {
        choices
      })
    const result: EnumResult =
      DECODE_BOUNDED_CHOICE_INDEX(buffer, 0, {
        choices
      })

    return bytesWritten === 1 && result.bytes === bytesWritten &&
      util.isDeepStrictEqual(result.value, choices[index])
  }), {
    verbose: false
  })

  test.end()
})

tap.test('LARGE_BOUNDED_CHOICE_INDEX', (test) => {
  const arbitrary = fc.integer(1, 20).chain((length: number) => {
    return fc.tuple(
      fc.integer(0, length - 1),
      fc.array(fc.json(), {
        minLength: 1,
        maxLength: length
      }))
  })

  fc.assert(fc.property(arbitrary, ([ index, array ]): boolean => {
    fc.pre(index < array.length)

    const choices: JSONValue[] = array.map((json: string) => {
      return JSON.parse(json)
    })

    const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(1))
    const bytesWritten: number =
      ENCODE_LARGE_BOUNDED_CHOICE_INDEX(buffer, 0, choices[index], {
        choices
      })
    const result: EnumResult =
      DECODE_LARGE_BOUNDED_CHOICE_INDEX(buffer, 0, {
        choices
      })

    return bytesWritten === 1 && result.bytes === bytesWritten &&
      util.isDeepStrictEqual(result.value, choices[index])
  }), {
    verbose: false
  })

  test.end()
})
