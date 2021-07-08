Number Encodings
----------------

### `DOUBLE_VARINT_TUPLE`

This encoding consists of a sequence of two integers:

- The ZigZag-encoded Base-128 64-bit Little Endian variable-length unsigned
  integer that represents the integer that results from concatenating integral
  part of the number followed by the decimal part of the number.

- The ZigZag-encoded Base-128 64-bit Little Endian variable-length unsigned
  integer that represents the position of the decimal point from the first
  digit of the integer. A negative position puts the decimal point to the left
  of the first digit, adding 0s as needed.

#### Options

None

#### Conditions

None

#### Examples

Given the input value 3.14, the encoding results in the variable-length integer
628 (the ZigZag encoding of 314) followed by the variable-length integer 2 (the
ZigZag encoding of 1).

```
+------+------+------+
| 0xf4 | 0x04 | 0x02 |
+------+------+------+
```
