Integer Encodings
-----------------

### `BOUNDED_8BITS_ENUM_FIXED`

This encoding consists of an 8-bit unsigned integer that represents the bounded
input signed integer minus the minimum value. The difference between the
maximum and the minimum options should be less than 256.

### Options

| Option    | Description                                               |
|-----------|-----------------------------------------------------------|
| `minimum` | A signed integer representing the inclusive minimum value |
| `maximum` | A signed integer representing the inclusive maximum value |

### Conditions

| Condition                    | Description                                                  |
|------------------------------|--------------------------------------------------------------|
| `value >= minimum`           | The input value must be greater than or equal to the minimum |
| `value <= maximum`           | The input value must be less than or equal to the maximum    |
| `maximum - minimum < 2 ** 8` | The range must be representable in 8 bits                    |

### Example

Given the input value 2, where the minimum is -5 and the maximum is 5:

```
|------|
| 0x07 |
|------|
```
