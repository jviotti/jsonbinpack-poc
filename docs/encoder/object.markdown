Object Encodings
----------------

### `ARBITRARY_TYPED_KEYS_OBJECT_WITHOUT_LENGTH`

The encoding consists each pair encoded as the key followed by the value
according to `keyEncoding` and `encoding`. The order in which pairs are encoded
is undefined.

#### Options

| Option            | Type       | Description    |
|-------------------|------------|----------------|
| `encoding`        | `encoding` | Value encoding |
| `keyEncoding`     | `encoding` | Key encoding   |

#### Conditions

| Condition                      | Description                                 |
|--------------------------------|---------------------------------------------|
| `keyEncoding.type == string`   | The key encoding must be a string encoding  |

#### Examples

Given the input value `{ "foo": "bar", "baz": 1 }` where the encoding is
[`ANY_TYPE_PREFIX`](./any.markdown#any_type_prefix) and the key encoding is
[`FLOOR_PREFIX_LENGTH_ENUM_VARINT`](./string.markdown#floor_prefix_length_enum_varint)
with a minimum of 0, the encoding results in:

```
+------+------+------+------+------+------+------+------+------+------+------+------+------+
| 0x04 | 0x66 | 0x6f | 0x6f | 0x21 | 0x62 | 0x61 | 0x72 | 0x04 | 0x62 | 0x61 | 0x7a | 0x15 |
+------+------+------+------+------+------+------+------+------+------+------+------+------+
         f      o      o             b      a      r             b      a      z      1
```

### `ARBITRARY_TYPED_KEYS_OBJECT`

The encoding consists of the number of key-value pairs in the input object as a
Base-128 64-bit Little Endian variable-length unsigned integer followed by each
pair encoded as the key followed by the value according to `keyEncoding` and
`encoding`. The order in which pairs are encoded is undefined.

#### Options

| Option            | Type       | Description    |
|-------------------|------------|----------------|
| `encoding`        | `encoding` | Value encoding |
| `keyEncoding`     | `encoding` | Key encoding   |

#### Conditions

| Condition                      | Description                                 |
|--------------------------------|---------------------------------------------|
| `keyEncoding.type == string`   | The key encoding must be a string encoding  |

#### Examples

Given the input value `{ "foo": "bar", "baz": 1 }` where the encoding is
[`ANY_TYPE_PREFIX`](./any.markdown#any_type_prefix) and the key encoding is
[`FLOOR_PREFIX_LENGTH_ENUM_VARINT`](./string.markdown#floor_prefix_length_enum_varint)
with a minimum of 0, the encoding results in:

```
+------+------+------+------+------+------+------+------+------+------+------+------+------+------+
| 0x02 | 0x04 | 0x66 | 0x6f | 0x6f | 0x21 | 0x62 | 0x61 | 0x72 | 0x04 | 0x62 | 0x61 | 0x7a | 0x15 |
+------+------+------+------+------+------+------+------+------+------+------+------+------+------+
                f      o      o             b      a      r             b      a      z      1
```

### `REQUIRED_ONLY_BOUNDED_TYPED_OBJECT`

The encoding consists of the boolean required properties encoded in order as a
byte-aligned bitset where the least-significant bit corresponds to the first
boolean required property, followed by the non-boolean required properties
values encoded in order according to the corresponding encoding entries
declared in `propertyEncodings`.

#### Options

| Option                      | Type                    | Description                                 |
|-----------------------------|-------------------------|---------------------------------------------|
| `propertyEncodings`         | `map<string, encoding>` | The encoding of each object property        |
| `requiredProperties`        | `string[]`              | The list of non-boolean required properties |
| `booleanRequiredProperties` | `string[]`              | The list of boolean required properties     |

#### Conditions

| Condition                                                                        | Description                                                         |
|----------------------------------------------------------------------------------|---------------------------------------------------------------------|
| `len(requiredProperties ++ booleanRequiredProperties) == len(propertyEncodings)` | Every defined property is required                                  |
| `len(requiredProperties union booleanRequiredProperties) == 0`                   | The required and boolean required properties sequences are disjoint |
| `len(value) == len(propertyEncodings)`                                           | The input value must not contain undeclared pairs                   |

#### Examples

Given the input object `{ "foo": "bar", "bar": 1, "baz": true, "qux": false }`,
where the options are defined as follows:

- `requiredProperties`: `[ "bar", "foo" ]`
- `booleanRequiredProperties`: `[ "baz", "qux" ]`
- `propertyEncodings`:
  - `foo`:
    [`FLOOR_PREFIX_LENGTH_ENUM_VARINT`](./string.markdown#floor_prefix_length_enum_varint)
    with minimum 0
  - `bar`: [`FLOOR_ENUM_VARINT`](./integer.markdown#floor_enum_varint) with
    minimum 0
  - `baz`:
    [`BOOLEAN_8BITS_ENUM_FIXED`](./boolean.markdown#boolean_8bits_enum_fixed)
  - `qux`:
    [`BOOLEAN_8BITS_ENUM_FIXED`](./boolean.markdown#boolean_8bits_enum_fixed)

The encoding results in:

```
+------------+------+------+------+------+------+
| 0b00000001 | 0x01 | 0x04 | 0x62 | 0x61 | 0x72 |
+------------+------+------+------+------+------+
  baz qux      1             b      a      r
```

### `NON_REQUIRED_BOUNDED_TYPED_OBJECT`

The encoding consists of the length of `optionalProperties` as a Base-128
64-bit Little Endian variable-length unsigned integer followed by a
byte-aligned bitset where the least-significant bit corresponds to the first
element of `optionalProperties`, followed by the object values encoded in order
according to the corresponding encoding entries declared in
`propertyEncodings`.

#### Options

| Option                      | Type                    | Description                          |
|-----------------------------|-------------------------|--------------------------------------|
| `propertyEncodings`         | `map<string, encoding>` | The encoding of each object property |
| `optionalProperties`        | `string[]`              | The list of optional properties      |

#### Conditions

| Condition                                           | Description                                       |
|-----------------------------------------------------|---------------------------------------------------|
| `len(optionalProperties) == len(propertyEncodings)` | Every defined property is optional                |
| `len(value) <= len(propertyEncodings)`              | The input value must not contain undeclared pairs |

#### Examples

Given the input object `{ "foo": "bar", "baz": 1 }` where the options are
defined as follows:

- `optionalProperties`: `[ "baz", "bar", "foo", "qux" ]`
- `propertyEncodings`:
  - `foo`:
    [`FLOOR_PREFIX_LENGTH_ENUM_VARINT`](./string.markdown#floor_prefix_length_enum_varint)
    with minimum 0
  - `bar`: [`ANY_TYPE_PREFIX`](./any.markdown#any_type_prefix)
  - `baz`: [`FLOOR_ENUM_VARINT`](./integer.markdown#floor_enum_varint) with
    minimum 0
  - `qux`: [`ANY_TYPE_PREFIX`](./any.markdown#any_type_prefix)

The encoding results in:

```
+------+------------+------+------+------+------+------+
| 0x04 | 0b00000101 | 0x01 | 0x04 | 0x62 | 0x61 | 0x72 |
+------+------------+------+------+------+------+------+
         bitset       1             b      a      r
```

### `MIXED_BOUNDED_TYPED_OBJECT`

The encoding consists in the required subset of the input object encoded as
defined in
[`REQUIRED_ONLY_BOUNDED_TYPED_OBJECT`](#required_only_bounded_typed_object)
followed by the optional subset of the input object encoded as defined in
[`NON_REQUIRED_BOUNDED_TYPED_OBJECT`](#non_required_bounded_typed_object).

#### Options

| Option                      | Type                    | Description                                 |
|-----------------------------|-------------------------|---------------------------------------------|
| `propertyEncodings`         | `map<string, encoding>` | The encoding of each object property        |
| `requiredProperties`        | `string[]`              | The list of non-boolean required properties |
| `booleanRequiredProperties` | `string[]`              | The list of boolean required properties     |
| `optionalProperties`        | `string[]`              | The list of optional properties             |

#### Conditions

| Condition                                                                                              | Description                                       |
|--------------------------------------------------------------------------------------------------------|---------------------------------------------------|
| `len(optionalProperties ++ requiredProperties ++ booleanRequiredProperties) == len(propertyEncodings)` | Every property is defined                         |
| `len(value) <= len(propertyEncodings)`                                                                 | The input value must not contain undeclared pairs |

#### Examples

Given the input object `{ "foo": "bar", "baz": 1 }` where the options are
defined as follows:

- `requiredProperties`: `[ "foo" ]`
- `booleanRequiredProperties`: `[]`
- `optionalProperties`: `[ "baz" ]`
- `propertyEncodings`:
  - `foo`:
    [`FLOOR_PREFIX_LENGTH_ENUM_VARINT`](./string.markdown#floor_prefix_length_enum_varint)
    with minimum 0
  - `baz`: [`FLOOR_ENUM_VARINT`](./integer.markdown#floor_enum_varint) with
    minimum 0

The encoding results in:

```
+------+------+------+------+------+------+
| 0x04 | 0x62 | 0x61 | 0x72 | 0x01 | 0x00 |
+------+------+------+------+------+------+
         b      a      r
```

### `REQUIRED_UNBOUNDED_TYPED_OBJECT`

The encoding consists in the required subset of the input object encoded as
defined in
[`REQUIRED_ONLY_BOUNDED_TYPED_OBJECT`](#required_only_bounded_typed_object)
followed by the rest of the input object encoded as defined in
[`ARBITRARY_TYPED_KEYS_OBJECT`](#arbitrary_typed_keys_object).

#### Options

| Option                      | Type                    | Description                                 |
|-----------------------------|-------------------------|---------------------------------------------|
| `propertyEncodings`         | `map<string, encoding>` | The encoding of each object property        |
| `requiredProperties`        | `string[]`              | The list of non-boolean required properties |
| `booleanRequiredProperties` | `string[]`              | The list of boolean required properties     |
| `encoding`                  | `encoding`              | Remaining values encoding                   |
| `keyEncoding`               | `encoding`              | Key encoding                                |

#### Conditions

| Condition                                                      | Description                                  |
|----------------------------------------------------------------|----------------------------------------------|
| `len(requiredProperties) + len(booleanRequiredProperties) > 0` | There must be at least one required property |
| `keyEncoding.type == string`                                   | The key encoding must be a string encoding   |

#### Examples

Given the input object `{ "foo": "bar", "baz": 1 }` where the options are
defined as follows:

- `requiredProperties`: `[ "foo" ]`
- `booleanRequiredProperties`: `[]`
- `propertyEncodings`:
  - `foo`:
    [`FLOOR_PREFIX_LENGTH_ENUM_VARINT`](./string.markdown#floor_prefix_length_enum_varint)
    with minimum 0
- `keyEncoding`:
  [`FLOOR_PREFIX_LENGTH_ENUM_VARINT`](./string.markdown#floor_prefix_length_enum_varint)
  with minimum 0
- `encoding`: [`ANY_TYPE_PREFIX`](./any.markdown#any_type_prefix)

The encoding results in:

```
+------+------+------+------+------+------+------+------+------+------+
| 0x04 | 0x62 | 0x61 | 0x72 | 0x01 | 0x04 | 0x62 | 0x61 | 0x7a | 0x15 |
+------+------+------+------+------+------+------+------+------+------+
         b      a      r                    b      a      z      1
```
