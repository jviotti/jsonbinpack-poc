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
