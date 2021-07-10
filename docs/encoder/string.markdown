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
