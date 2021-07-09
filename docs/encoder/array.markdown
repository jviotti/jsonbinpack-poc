Array Encodings
---------------

### `FIXED_TYPED_ARRAY`

This encoding consists of the elements of the fixed array encoded in order.

The `prefixEncodings` option provides a sequence of positional encodings that
correspond to the indexes of the array. If the array index is greater than the
`prefixEncodings` size, then the `encoding` encoding is used instead.

#### Options

| Option            | Type         | Description                   |
|-------------------|--------------|-------------------------------|
| `size`            | `uint`       | The length of the input array |
| `prefixEncodings` | `encoding[]` | A set of positional encodings |
| `encoding`        | `encoding`   | A fallback general encoding   |

#### Conditions

| Condition                      | Description                                                           |
|--------------------------------|-----------------------------------------------------------------------|
| `len(prefixEncodings) <= size` | The number of prefix encodings must be less than or equal to the size |
| `len(value) == size`           | The input array must have the declared size                           |

#### Examples

Given the array `[ 1, 2, true ]` where the `prefixEncodings` corresponds to
[`BOUNDED_8BITS_ENUM_FIXED`](./integer.markdown#bounded_8bits_enum_fixed) and
[`BOUNDED_8BITS_ENUM_FIXED`](./integer.markdown#bounded_8bits_enum_fixed) and
`encoding` corresponds to
[`BOOLEAN_8BITS_ENUM_FIXED`](./boolean.markdown#boolean_8bits_enum_fixed) with
minimum 0 and maximum 255, the encoding results in:

```
+------+------+------+
| 0x01 | 0x02 | 0x01 |
+------+------+------+
  1      2      true
```

### `FLOOR_TYPED_LENGTH_PREFIX`

This encoding consists of the length of array minus the minumum encoded as a
Base-128 64-bit Little Endian variable-length unsigned integer followed by the
elements encoded in order.

The `prefixEncodings` option provides a sequence of positional encodings that
correspond to the indexes of the array. If the array index is greater than the
`prefixEncodings` size, then the `encoding` encoding is used instead.

#### Options

| Option            | Type         | Description                     |
|-------------------|--------------|---------------------------------|
| `minimum`         | `uint`       | The minimum length of the array |
| `prefixEncodings` | `encoding[]` | A set of positional encodings   |
| `encoding`        | `encoding`   | A fallback general encoding     |

#### Conditions

None

#### Examples

Given the array `[ true, false, 5 ]` where the minimum is 2, the
`prefixEncodings` corresponds to
[`BOOLEAN_8BITS_ENUM_FIXED`](./boolean.markdown#boolean_8bits_enum_fixed) and
[`BOOLEAN_8BITS_ENUM_FIXED`](./boolean.markdown#boolean_8bits_enum_fixed) and
`encoding` corresponds to
[`BOUNDED_8BITS_ENUM_FIXED`](./integer.markdown#bounded_8bits_enum_fixed) with
minimum 0 and maximum 255, the encoding results in:

```
+------+------+------+------+
| 0x01 | 0x01 | 0x00 | 0x05 |
+------+------+------+------+
  size   true   false  5
```

### `ROOF_TYPED_LENGTH_PREFIX`

This encoding consists of the maximum minus the length of array encoded as a
Base-128 64-bit Little Endian variable-length unsigned integer followed by the
elements encoded in order.

The `prefixEncodings` option provides a sequence of positional encodings that
correspond to the indexes of the array. If the array index is greater than the
`prefixEncodings` size, then the `encoding` encoding is used instead.

#### Options

| Option            | Type         | Description                     |
|-------------------|--------------|---------------------------------|
| `maximum`         | `uint`       | The maximum length of the array |
| `prefixEncodings` | `encoding[]` | A set of positional encodings   |
| `encoding`        | `encoding`   | A fallback general encoding     |

#### Conditions

| Condition                         | Description                                                                           |
|-----------------------------------|---------------------------------------------------------------------------------------|
| `len(prefixEncodings) <= maximum` | The number of prefix encodings must be less than or equal to the maximum array length |

#### Examples

Given the array `[ true, false, 5 ]` where the maximum is 3, the
`prefixEncodings` corresponds to
[`BOOLEAN_8BITS_ENUM_FIXED`](./boolean.markdown#boolean_8bits_enum_fixed) and
[`BOOLEAN_8BITS_ENUM_FIXED`](./boolean.markdown#boolean_8bits_enum_fixed) and
`encoding` corresponds to
[`BOUNDED_8BITS_ENUM_FIXED`](./integer.markdown#bounded_8bits_enum_fixed) with
minimum 0 and maximum 255, the encoding results in:

```
+------+------+------+------+
| 0x00 | 0x01 | 0x00 | 0x05 |
+------+------+------+------+
  size   true   false  5
```
