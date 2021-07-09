Enum Encodings
--------------

### `BOUNDED_CHOICE_INDEX`

This encoding stores the indexes of an enumeration consisting of up to 256
elements. The index is stored as an unsigned 8-bit integer.

#### Options

| Option    | Type    | Description                 |
|-----------|---------|-----------------------------|
| `choices` | `any[]` | The set of choice values    |

#### Conditions

| Condition                | Description                                            |
|--------------------------|--------------------------------------------------------|
| `len(choices) > 0`       | The choices array is not empty                         |
| `len(choices) <  2 ** 8` | The number of choices must be representable in 8 bits  |
| `value in choices`       | The input value is included in the set of choices      |

#### Examples

Given an enumeration `[ 'foo', 'bar', 'baz' ]` and an input value 'bar', the
encoding results in the unsigned 8 bit integer 1:

```
+------+
| 0x01 |
+------+
```

Given an enumeration `[ 'foo', 'bar', 'baz' ]` and an input value 'foo', the
encoding results in the unsigned 8 bit integer 0:

```
+------+
| 0x00 |
+------+
```

### `LARGE_BOUNDED_CHOICE_INDEX`

This encoding stores the indexes of an enumeration. The index is stored as a
Base-128 64-bit Little Endian variable-length unsigned integer.

#### Options

| Option    | Type    | Description                 |
|-----------|---------|-----------------------------|
| `choices` | `any[]` | The set of choice values    |

#### Conditions

| Condition                | Description                                            |
|--------------------------|--------------------------------------------------------|
| `len(choices) > 0`       | The choices array is not empty                         |
| `value in choices`       | The input value is included in the set of choices      |

#### Examples

Given an enumeration with 1000 members and an input value that equals the 300th
enumeration value, the encoding results in the Base-128 64-bit Little Endian
variable-length unsigned integer 300:

```
+------+------+
| 0xac | 0x02 |
+------+------+
```

### `TOP_LEVEL_8BIT_CHOICE_INDEX`

This encoding stores the indexes of an enumeration consisting of up to 255
elements. The index is stored as an unsigned 8-bit integer minus 1. The first
element of the enumeration set is not encoded and is instead represented by the
absence of the data in the buffer.

#### Options

| Option    | Type    | Description                 |
|-----------|---------|-----------------------------|
| `choices` | `any[]` | The set of choice values    |

#### Conditions

| Condition                | Description                                            |
|--------------------------|--------------------------------------------------------|
| `len(choices) > 0`       | The choices array is not empty                         |
| `len(choices) <  2 ** 8` | The number of choices must be representable in 8 bits  |
| `value in choices`       | The input value is included in the set of choices      |

#### Examples

Given an enumeration `[ 'foo', 'bar', 'baz' ]` and an input value 'bar', the
encoding results in the unsigned 8 bit integer 0:

```
+------+
| 0x00 |
+------+
```

Given an enumeration `[ 'foo', 'bar', 'baz' ]` and an input value 'foo', the
encoding results in an empty buffer.
