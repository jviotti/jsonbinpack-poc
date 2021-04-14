const zigzag = require('./dist/lib/utils/zigzag')
const varint = require('./dist/lib/utils/varint')

console.log('Encoding', 4294967294)
const buffer = Buffer.alloc(10)
varint.varintEncode(buffer, 0, 4294967294)
console.log(buffer)
const result = varint.varintDecode(buffer, 0)
console.log(result)
