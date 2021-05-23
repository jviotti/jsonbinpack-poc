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
  EncodingSchema
} from './encoding-schema'

import {
  Encoding,
  DecodeResult,
  encode as binpackEncode,
  decode as binpackDecode
} from './encoder'

import {
  getEncoding
} from './mapper'

import {
  JSONValue
} from './json'

import {
  EncodingContext,
  getDefaultEncodingContext
} from './context'

export {
  JSONValue
} from './json'

export {
  Encoding
} from './encoder'

export {
  EncodingSchema
} from './encoding-schema'

import ResizableBuffer from './utils/resizable-buffer'

export const compileEncodingSchema = (schema: EncodingSchema): Encoding => {
  return getEncoding(schema)
}

export const encode = (encoding: Encoding, value: JSONValue): Buffer => {
  const buffer: ResizableBuffer = new ResizableBuffer(Buffer.allocUnsafe(0))
  const context: EncodingContext = getDefaultEncodingContext()
  binpackEncode(buffer, 0, encoding, value, context)
  return buffer.getBuffer()
}

export const decode = (encoding: Encoding, buffer: Buffer): JSONValue => {
  const result: DecodeResult = binpackDecode(new ResizableBuffer(buffer), 0, encoding)
  return result.value
}
