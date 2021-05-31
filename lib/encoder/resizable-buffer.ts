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
  private written: number;

  constructor (buffer: Buffer) {
    this.buffer = buffer
    this.written = 0
  }

  private grow (bytes: number): void {
    if (this.written + bytes > this.buffer.length) {
      this.buffer = Buffer.concat([
        this.buffer,

        // Allocate the required amount of bytes but also
        // add some extra room (twice the buffer size)
        // to minimize future allocations.
        Buffer.allocUnsafe((this.buffer.length * 2) + bytes)
      ])
    }
  }

  public getBuffer (): Buffer {
    return this.buffer.slice(0, this.written)
  }

  public writeUInt8 (value: number, offset: number): number {
    this.grow(1)
    const cursor: number = this.buffer.writeUInt8(value, offset)
    this.written = Math.max(this.written, cursor)
    return cursor
  }

  public writeUIntLE (value: number, offset: number, byteLength: number): number {
    this.grow(byteLength)
    const cursor: number = this.buffer.writeUIntLE(value, offset, byteLength)
    this.written = Math.max(this.written, cursor)
    return cursor
  }

  public write (value: string, offset: number, length: number, encoding: BufferEncoding): number {
    this.grow(length)
    const bytesWritten: number = this.buffer.write(value, offset, length, encoding)
    this.written = Math.max(this.written, offset + bytesWritten)
    return bytesWritten
  }

  public writeDoubleLE (value: number, offset: number): number {
    this.grow(8)
    const cursor: number = this.buffer.writeDoubleLE(value, offset)
    this.written = Math.max(this.written, cursor)
    return cursor
  }

  public readUInt8 (offset: number): number {
    return this.buffer.readUInt8(offset)
  }

  public readUIntLE (offset: number, byteLength: number): number {
    return this.buffer.readUIntLE(offset, byteLength)
  }

  public toString (encoding: BufferEncoding, start: number, end: number): string {
    return this.buffer.toString(encoding, start, end)
  }

  public readDoubleLE (offset: number): number {
    return this.buffer.readDoubleLE(offset)
  }
}
