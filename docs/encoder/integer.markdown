Integer Encodings
-----------------

The integer data type is a core part of the encoding of the other data types.
Multiple types of encodings are supported to accomodate to a wide set of
scenarios in a space-efficient manner.

### `BOUNDED_8BITS_ENUM_FIXED`

This encoding consists of a fixed 8-bit unsigned integer that represents the
bounded input signed integer minus the minimum value. The difference between
the maximum and the minimum options should be less than 256.

### Options

| Option    | Type  | Description                 |
|-----------|-------|-----------------------------|
| `minimum` | `int` | The inclusive minimum value |
| `maximum` | `int` | The inclusive maximum value |

### Conditions

| Condition                    | Description                                                  |
|------------------------------|--------------------------------------------------------------|
| `value >= minimum`           | The input value must be greater than or equal to the minimum |
| `value <= maximum`           | The input value must be less than or equal to the maximum    |
| `maximum - minimum < 2 ** 8` | The range must be representable in 8 bits                    |

### Examples

Given the input value 2, where the minimum is -5 and the maximum is 5, the
encoding results in the 8-bit unsigned integer 7 = 2 - (-5):

```
+------+
| 0x07 |
+------+
```

### `BOUNDED_MULTIPLE_8BITS_ENUM_FIXED`

This encoding is a variant of
[`BOUNDED_8BITS_ENUM_FIXED`](#bounded_8bits_enum_fixed). It takes an input
signed integer, a minimum and a maximum option, and a multiplier option. The
multiplier is used to reduce the input value and its bounds as much as possible
to result in a shorter enumeration of possible values. The resulting value is
stored as a fixed 8-bit unsigned integer.

- **Minimum**: The minimum value of the resulting enumeration is calculated by
  finding the minimal multiple that results in a value that is equal to or
  greater than the `minimum` option. For example, if the `minimum` option is 5
  and the `multiplier` is 2, then the minimal value that is within the bounds
  is 2 * 3. Therefore the new minimum value is 3.

- **Maximum**: The maximum value of the resulting enumeration is calculated by
  finding the maximal multiple that results in a value that is equal to or less
  than the `maximum` option. For example, if the `maximum` option is 21 and the
  `multiplier` is 5, then the maximal value that is within the bounds is 5 * 4.
  Therefore the new maximal value is 4.

To visualize the space-efficient gains of using this encoding in the presence
of a multiplier, consider the following example set of possible values:

```
+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+
|  1 |  2 |  3 |  4 |  5 |  6 |  7 |  8 |  9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 |
+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+
```

If the minimum value is 4, the maximum value is 14, and the multiplier is 3,
then the possible values is restricted to the following set:

```
+----+----+----+
|  6 |  9 | 12 |
+----+----+----+
```

### Options

| Option       | Type  | Description                 |
|--------------|-------|-----------------------------|
| `minimum`    | `int` | The inclusive minimum value |
| `maximum`    | `int` | The inclusive maximum value |
| `multiplier` | `int` | The multiplier value        |

### Conditions

| Condition                    | Description                                                         |
|------------------------------|---------------------------------------------------------------------|
| `value >= minimum`           | The input value must be greater than or equal to the minimum        |
| `value <= maximum`           | The input value must be less than or equal to the maximum           |
| `multiplier >= minimum`      | The multiplier integer must be greater than or equal to the minimum |
| `multiplier <= maximum`      | The multiplier integer must be less than or equal to the maximum    |
| `value % multiplier == 0`    | The input value must be divisible by the multiplier                 |
| `floor(maximum / abs(multiplier)) - ceil(minimum / abs(multiplier)) < 2 ** 8` | The divided range must be representable in 8 bits |

### Examples

Given the input value 15, where the minimum is 1, the maximum is 19, and the
multiplier is 5, the encoding results in the 8-bit unsigned integer 2:

```
+------+
| 0x02 |
+------+
```

### `FLOOR_ENUM_VARINT`

This encoding consists of a Base-128 64-bit Little Endian variable-length
unsigned integer that represents the bounded input signed integer minus the
minimum value.

### Options

| Option    | Type  | Description                 |
|-----------|-------|-----------------------------|
| `minimum` | `int` | The inclusive minimum value |

### Conditions

| Condition                    | Description                                                  |
|------------------------------|--------------------------------------------------------------|
| `value >= minimum`           | The input value must be greater than or equal to the minimum |

### Examples

Given the input value 305, where the minimum is 5, the encoding results in the
variable-length encoded integer 300:

```
+------+------+
| 0xac | 0x02 |
+------+------+
```

### `FLOOR_MULTIPLE_ENUM_VARINT`

This encoding is a variant of
[`BOUNDED_MULTIPLE_8BITS_ENUM_FIXED`](#bounded_multiple_8bits_enum_fixed)
without the upper bound constraint. However, it encodes the value as a Base-128
64-bit Little Endian variable-length unsigned integer.

### Options

| Option       | Type  | Description                 |
|--------------|-------|-----------------------------|
| `minimum`    | `int` | The inclusive minimum value |
| `multiplier` | `int` | The multiplier value        |

### Conditions

| Condition                    | Description                                                         |
|------------------------------|---------------------------------------------------------------------|
| `value >= minimum`           | The input value must be greater than or equal to the minimum        |
| `multiplier >= minimum`      | The multiplier integer must be greater than or equal to the minimum |
| `value % multiplier == 0`    | The input value must be divisible by the multiplier                 |

### Examples

Given the input value 1000, where the minimum is -2 and the multiplier is 4,
the encoding results in the Base-128 64-bit Little Endian variable-length unsigned
integer 250:

```
+------+------+
| 0xfa | 0x01 |
+------+------+
```

### `ROOF_MIRROR_ENUM_VARINT`

This encoding consists of a Base-128 64-bit Little Endian variable-length
unsigned integer that represents the maximum minus the input value.

### Options

| Option    | Type  | Description                 |
|-----------|-------|-----------------------------|
| `maximum` | `int` | The inclusive maximum value |

### Conditions

| Condition                    | Description                                                  |
|------------------------------|--------------------------------------------------------------|
| `value <= maximum`           | The input value must be less than or equal to the maximum    |

### Examples

Given the input value 8, where the maximum is 10, the encoding results in the
variable-length encoded integer 2 = 10 - 8:

```
+------+
| 0x02 |
+------+
```

### `ROOF_MULTIPLE_MIRROR_ENUM_VARINT`

This encoding consists of a Base-128 64-bit Little Endian variable-length
unsigned integer that represents the maximal multiple that results in a value
that is equal to or less than the `maximum` option (as discussed in
[`BOUNDED_MULTIPLE_8BITS_ENUM_FIXED`](#bounded_multiple_8bits_enum_fixed))
minus the input value divided by the absolute multiple.

### Options

| Option       | Type  | Description                 |
|--------------|-------|-----------------------------|
| `maximum`    | `int` | The inclusive maximum value |
| `multiplier` | `int` | The multiplier value        |

### Conditions

| Condition                    | Description                                                         |
|------------------------------|---------------------------------------------------------------------|
| `value <= maximum`           | The input value must be less than or equal to the maximum           |
| `multiplier <= maximum`      | The multiplier integer must be less than or equal to the maximum    |
| `value % multiplier == 0`    | The input value must be divisible by the multiplier                 |

### Examples

Given the input value 5, where the maximum is 16 and the multiplier is 5, the
encoding results in the Base-128 64-bit Little Endian variable-length unsigned
integer 2:

```
+------+
| 0x02 |
+------+
```

### `ARBITRARY_ZIGZAG_VARINT`

The input value is encoded as a ZigZag-encoded Base-128 64-bit Little Endian
variable-length unsigned integer.

### Options

None

### Conditions

None

### Examples

The input value -25200 is encoded as the Base-128 64-bit Little Endian
variable-length unsigned integer 50399:

```
+------+------+------+
| 0xdf | 0x89 | 0x03 |
+------+------+------+
```

### `ARBITRARY_MULTIPLE_ZIGZAG_VARINT`

The input value is divided by the absolute multiplier and encoded as a
ZigZag-encoded Base-128 64-bit Little Endian variable-length unsigned integer.

### Options

| Option       | Type  | Description                 |
|--------------|-------|-----------------------------|
| `multiplier` | `int` | The multiplier value        |

### Conditions

| Condition                    | Description                                                         |
|------------------------------|---------------------------------------------------------------------|
| `value % multiplier == 0`    | The input value must be divisible by the multiplier                 |

### Examples

Given the input value 10, where the multiplier is 5, the encoding results in
the Base-128 64-bit Little Endian variable-length unsigned integer 4:

```
+------+
| 0x04 |
+------+
```
