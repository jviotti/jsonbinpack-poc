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

export default class ResizableBuffer {
  private buffer: Buffer;

  constructor (buffer: Buffer) {
    this.buffer = buffer
  }

  public writeUInt8 (value: number, offset: number): number {
    return this.buffer.writeUInt8(value, offset)
  }

  public readUInt8 (offset: number): number {
    return this.buffer.readUInt8(offset)
  }

  public writeUIntLE (value: number, offset: number, byteLength: number): number {
    return this.buffer.writeUIntLE(value, offset, byteLength)
  }

  public readUIntLE (offset: number, byteLength: number): number {
    return this.buffer.readUIntLE(offset, byteLength)
  }

  public write (value: string, offset: number, length: number, encoding: BufferEncoding): number {
    return this.buffer.write(value, offset, length, encoding)
  }

  public toString (encoding: BufferEncoding, start: number, end: number): string {
    return this.buffer.toString(encoding, start, end)
  }

  public writeDoubleLE (value: number, offset: number): number {
    return this.buffer.writeDoubleLE(value, offset)
  }

  public readDoubleLE (offset: number): number {
    return this.buffer.readDoubleLE(offset)
  }

  public getBuffer (): Buffer {
    return this.buffer
  }
}
