Array Encodings
---------------

### `FIXED_TYPED_ARRAY`

This encoding consists of the elements of the fixed array encoded one after the
other. The `prefixEncodings` option provides a sequence of positional encodings
that correspond to the indexes of the array. If the array index is greater than
the `prefixEncodings` size, then the `encoding` encoding is used instead.

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

#### Examples

Given the array `[ 1, 2, true ]` where the `prefixEncodings` corresponds to
[`BOUNDED_8BITS_ENUM_FIXED`](./integer.markdown#bounded_8bits_enum_fixed) and
[`BOUNDED_8BITS_ENUM_FIXED`](./integer.markdown#bounded_8bits_enum_fixed) and
`encoding` corresponds to
[`BOOLEAN_8BITS_ENUM_FIXED`](./boolean.markdown#boolean_8bits_enum_fixed), the
encoding results in:

```
+------+------+------+
| 0x01 | 0x02 | 0x01 |
+------+------+------+
```
