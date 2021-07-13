String Encodings
----------------

### `UTF8_STRING_NO_LENGTH`

The encoding consist in the UTF-8 encoding of the input string.

#### Options

| Option            | Type         | Description          |
|-------------------|--------------|----------------------|
| `size`            | `uint`       | The string length    |

#### Conditions

| Condition            | Description                                    |
|----------------------|------------------------------------------------|
| `len(value) == size` | The input string must have the declared length |

#### Examples

Given the input value "foo bar" with a corresponding size of 6, the encoding
results in:

```
+------+------+------+------+------+------+------+
| 0x66 | 0x6f | 0x6f | 0x20 | 0x62 | 0x61 | 0x72 |
+------+------+------+------+------+------+------+
  f      o      o             b      a      r
```

### `SHARED_STRING_POINTER_RELATIVE_OFFSET`

Assuming that the UTF-8 encoding of the input string is already encoded in a
*previous* position of the buffer, the encoding consists of the current offset
minus the offset to the start of the UTF-8 string value in the buffer, encoded
as a Base-128 64-bit Little Endian variable-length unsigned integer.

#### Options

| Option | Type   | Description                                          |
|--------|--------|------------------------------------------------------|
| `size` | `uint` | The string length. Necessary during de-serialization |

#### Conditions

| Condition               | Description                                              |
|-------------------------|----------------------------------------------------------|
| `buffer includes value` | The input string UTF-8 encoding is present in the buffer |

#### Examples

Given the input string "foo bar" that is already encoded using UTF-8 at offset
52 and a current offset 75, the encoding results in 75 - 52 = 23:

```
+------+
| 0x17 |
+------+
```

### `FLOOR_PREFIX_LENGTH_ENUM_VARINT`

The encoding consists of the length of the string minus `minimum` plus 1 as a
Base-128 64-bit Little Endian variable-length unsigned integer followed by the
UTF-8 encoding of the input value.

Optionally, if input string has already been encoded to the buffer using UTF-8,
the encoding may consist of the byte constant `0x00` followed by the length of
the string minus `minimum` plus 1 as a Base-128 64-bit Little Endian
variable-length unsigned integer, followed by the current offset minus the
offset to the start of the UTF-8 string value in the buffer encoded as a
Base-128 64-bit Little Endian variable-length unsigned integer.

#### Options

| Option    | Type   | Description                       |
|-----------|--------|-----------------------------------|
| `minimum` | `uint` | The include minimum string length |

#### Conditions

| Condition               | Description                                                     |
|-------------------------|-----------------------------------------------------------------|
| `len(value) >= minimum` | The input string length is equal to or greater than the minimum |

#### Examples

Given the input string `foo` with a minimum 3 where the string has not been
previously encoded, the encoding results in:

```
+------+------+------+------+
| 0x01 | 0x66 | 0x6f | 0x6f |
+------+------+------+------+
         f      o      o
```

Given the encoding of `foo` with a minimum of 0 followed by the encoding of
`foo` with a minimum of 3, the encoding may result in:

```
0      1      2      3      4      5      6
^      ^      ^      ^      ^      ^      ^
+------+------+------+------+------+------+------+
| 0x04 | 0x66 | 0x6f | 0x6f | 0x00 | 0x01 | 0x05 |
+------+------+------+------+------+------+------+
         f      o      o                    6 - 1
```
