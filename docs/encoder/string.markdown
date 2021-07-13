String Encodings
----------------

### `UTF8_STRING_NO_LENGTH`

The encoding consist in the UTF-8 encoding of the input string.

#### Options

| Option            | Type         | Description            |
|-------------------|--------------|------------------------|
| `size`            | `uint`       | The string byte-length |

#### Conditions

| Condition            | Description                                         |
|----------------------|-----------------------------------------------------|
| `len(value) == size` | The input string must have the declared byte-length |

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

| Option | Type   | Description                                               |
|--------|--------|-----------------------------------------------------------|
| `size` | `uint` | The string byte-length. Necessary during de-serialization |

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

The encoding consists of the byte-length of the string minus `minimum` plus 1
as a Base-128 64-bit Little Endian variable-length unsigned integer followed by
the UTF-8 encoding of the input value.

Optionally, if input string has already been encoded to the buffer using UTF-8,
the encoding may consist of the byte constant `0x00` followed by the
byte-length of the string minus `minimum` plus 1 as a Base-128 64-bit Little
Endian variable-length unsigned integer, followed by the current offset minus
the offset to the start of the UTF-8 string value in the buffer encoded as a
Base-128 64-bit Little Endian variable-length unsigned integer.

#### Options

| Option    | Type   | Description                              |
|-----------|--------|------------------------------------------|
| `minimum` | `uint` | The inclusive minimum string byte-length |

#### Conditions

| Condition               | Description                                                          |
|-------------------------|----------------------------------------------------------------------|
| `len(value) >= minimum` | The input string byte-length is equal to or greater than the minimum |

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

### `ROOF_PREFIX_LENGTH_ENUM_VARINT`

The encoding consists of `maximum` minus the byte-length of the string plus 1
as a Base-128 64-bit Little Endian variable-length unsigned integer followed by
the UTF-8 encoding of the input value.

Optionally, if input string has already been encoded to the buffer using UTF-8,
the encoding may consist of the byte constant `0x00` followed by `maximum`
minus the byte-length of the string plus 1 as a Base-128 64-bit Little Endian
variable-length unsigned integer, followed by the current offset minus the
offset to the start of the UTF-8 string value in the buffer encoded as a
Base-128 64-bit Little Endian variable-length unsigned integer.

#### Options

| Option    | Type   | Description                              |
|-----------|--------|------------------------------------------|
| `maximum` | `uint` | The inclusive maximum string byte-length |

#### Conditions

| Condition               | Description                                                       |
|-------------------------|-------------------------------------------------------------------|
| `len(value) <= maximum` | The input string byte-length is equal to or less than the maximum |

#### Examples

Given the input string `foo` with a maximum 4 where the string has not been
previously encoded, the encoding results in:

```
+------+------+------+------+
| 0x02 | 0x66 | 0x6f | 0x6f |
+------+------+------+------+
         f      o      o
```

Given the encoding of `foo` with a maximum of 3 followed by the encoding of
`foo` with a maximum of 5, the encoding may result in:

```
0      1      2      3      4      5      6
^      ^      ^      ^      ^      ^      ^
+------+------+------+------+------+------+------+
| 0x01 | 0x66 | 0x6f | 0x6f | 0x00 | 0x03 | 0x05 |
+------+------+------+------+------+------+------+
         f      o      o                    6 - 1
```

### `BOUNDED_PREFIX_LENGTH_8BIT_FIXED`

The encoding consists of the byte-length of the string minus `minimum` plus 1
as an 8-bit fixed-length unsigned integer followed by the UTF-8 encoding of the
input value.

Optionally, if input string has already been encoded to the buffer using UTF-8,
the encoding may consist of the byte constant `0x00` followed by the
byte-length of the string minus `minimum` plus 1 as an 8-bit fixed-length
unsigned integer, followed by the current offset minus the offset to the start
of the UTF-8 string value in the buffer encoded as a Base-128 64-bit Little
Endian variable-length unsigned integer.

<!-- TODO: Do not encode the string length if `minimum` and `maximum` are equal -->

#### Options

| Option    | Type   | Description                              |
|-----------|--------|------------------------------------------|
| `minimum` | `uint` | The inclusive minimum string byte-length |
| `maximum` | `uint` | The inclusive maximum string byte-length |

#### Conditions

| Condition                        | Description                                                          |
|----------------------------------|----------------------------------------------------------------------|
| `len(value) >= minimum`          | The input string byte-length is equal to or greater than the minimum |
| `len(value) <= maximum`          | The input string byte-length is equal to or less than the maximum    |
| `maximum - minimum < 2 ** 8 - 1` | The range minus 1 must be representable in 8 bits                    |

#### Examples

Given the input string `foo` with a minimum 3 and a maximum 5 where the string
has not been previously encoded, the encoding results in:

```
+------+------+------+------+
| 0x01 | 0x66 | 0x6f | 0x6f |
+------+------+------+------+
         f      o      o
```

Given the encoding of `foo` with a minimum of 0 and a maximum of 6 followed by
the encoding of `foo` with a minimum of 3 and a maximum of 100, the encoding
may result in:

```
0      1      2      3      4      5      6
^      ^      ^      ^      ^      ^      ^
+------+------+------+------+------+------+------+
| 0x04 | 0x66 | 0x6f | 0x6f | 0x00 | 0x01 | 0x05 |
+------+------+------+------+------+------+------+
         f      o      o                    6 - 1
```

### `RFC3339_DATE_INTEGER_TRIPLET`

The encoding consists of an implementation of
[RFC3339](https://datatracker.ietf.org/doc/html/rfc3339) date expressions as
the sequence of 3 integers: the year as a 16-bit fixed-length Little Endian
unsigned integer, the month as an 8-bit fixed-length unsigned integer, and the
day as an 8-bit fixed-length unsigned integer.

#### Options

None

#### Conditions

| Condition             | Description                                                                            |
|-----------------------|----------------------------------------------------------------------------------------|
| `year(value) >= 0`    | The year is greater than or equal to 0                                                 |
| `year(value) <= 9999` | The year is less than or equal to 9999. The spec states that years consist of 4 digits |
| `month(value) >= 1`   | The month is greater than or equal to 1                                                |
| `month(value) <= 12`  | The month is less than or equal to 12                                                  |
| `day(value) >= 1`     | The day is greater than or equal to 1                                                  |
| `day(value) <= 31`    | The day is less than or equal to 31                                                    |

#### Examples

Given the input string `2014-10-01`, the encoding results in:

```
+------+------+------+------+
| 0xde | 0x07 | 0x0a | 0x01 |
+------+------+------+------+
  year   ...    month  day
```

### `URL_PROTOCOL_HOST_REST`

The encoding represents a URL as a sequence of three
[`FLOOR_PREFIX_LENGTH_ENUM_VARINT`](#floor_prefix_length_enum_varint) strings
each with a `minimum` equal to 0: the protocol including the colon, the host
excluding the trailing slash, and the rest of the URL including the leading
slash.

<!-- TODO: Why do we even encode the trailing colon in the protocol? -->
<!-- TODO: Why do we even encode the leading slash in the remaining? -->

#### Options

None

#### Conditions

None

#### Examples

Given the input string `https://google.com/foo?bar=1`, the encoding results in:

```
+------+------+------+------+------+------+------+
| 0x07 | 0x68 | 0x74 | 0x74 | 0x70 | 0x73 | 0x3a |
+------+------+------+------+------+------+------+
         h      t      t      p      s      :

+------+------+------+------+------+------+------+------+------+------+------+
| 0x0b | 0x67 | 0x6f | 0x6f | 0x67 | 0x6c | 0x65 | 0x2e | 0x63 | 0x6f | 0x6d |
+------+------+------+------+------+------+------+------+------+------+------+
         g      o      o      g      l      e      .      c      o      m

+------+------+------+------+------+------+------+------+------+------+------+
| 0x0b | 0x2f | 0x66 | 0x6f | 0x6f | 0x3f | 0x62 | 0x61 | 0x72 | 0x3d | 0x31 |
+------+------+------+------+------+------+------+------+------+------+------+
         /      f      o      o      ?      b      a      r      =      1
```
