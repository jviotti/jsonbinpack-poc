// export const BOUNDED_MULTIPLE = (value: number, minimum: number, maximum: number, multiplier: number): Buffer => {

// }

export const BOUNDED = (value: number, minimum: number, maximum: number): Buffer => {
  const range: number = maximum - minimum
  const bits: number = Math.ceil(Math.log(range + 1) / Math.log(2))
  // TODO: Because Node.js does not allow us to work with bit buffers
  const bytes: number = Math.floor((bits + 7) / 8)
  const buffer = Buffer.allocUnsafe(bytes)
  buffer.writeUIntLE(value - minimum, 0, bytes)
  return buffer
}

// export const ROOF_MULTIPLE = (value: number, maximum: number, multiplier: number): Buffer => {

// }

// export const ROOF = (value: number, maximum: number): Buffer => {

// }

// export const FLOOR_MULTIPLE = (value: number, minimum: number, multiplier: number): Buffer => {

// }

// export const FLOOR = (value: number, minimum: number): Buffer => {

// }

// export const ARBITRARY_MULTIPLE = (value: number, multiplier: number): Buffer => {

// }

// export const ARBITRARY = (value: number): Buffer => {

// }
