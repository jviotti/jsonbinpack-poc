import tap from 'tap'

import {
  BOUNDED
} from '../../../lib/types/integer/encode'

tap.test('XXXXXX', (test) => {
  test.strictSame(BOUNDED(5, 0, 10), Buffer.from([ 0b00000101 ]))
  test.end()
})
