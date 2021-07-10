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
