[![GitHub Actions](https://github.com/jviotti/jsonbinpack/actions/workflows/nodejs.yml/badge.svg?branch=main)](https://github.com/jviotti/jsonbinpack/actions/workflows/nodejs.yml)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

JSON BinPack
============

JSON BinPack is an open-source binary [JSON](https://www.json.org)
serialization format with a strong focus on space efficiency. It can run in
schema-driven and schema-less mode to encode any JSON document given a matching
[JSON Schema 2020-12](http://json-schema.org) definition.

Documentation
-------------

### Installation

```sh
npm install --save jsonbinpack
```

### Example

```javascript
const jsonbinpack = require('jsonbinpack')

// Declare a JSON Schema definition
const schema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  properties: {
    foo: { type: 'string' }
  }
}

// (1) Compile the JSON Schema definition into an Encoding schema
const encodingSchema = await jsonbinpack.compileSchema(schema)

// (2) Serialize a matching JSON document using the Encoding schema
const buffer = jsonbinpack.serialize(encodingSchema, {
  foo: 'bar'
})

// (3) Deserialize the buffer into the original JSON document
const result = jsonbinpack.deserialize(encodingSchema, buffer)

console.log(result)
> { foo: 'bar' }
```

### Reference

#### `jsonbinpack.compileSchema(JSON Schema): Promise<Encoding>`

Convert a JSON Schema definition into an Encoding schema for use with the
`.serialize()` and `.deserialize()` functions.

#### `jsonbinpack.serialize(Encoding, JSON): Buffer`

Serialize a JSON value according to an Encoding schema.

#### `jsonbinpack.deserialize(Encoding, Buffer): JSON`

Deserialize a buffer according to an Encoding schema.

Building from source
--------------------

Requirements:

- Node.js
- `npm`
- GNU Make

Installing dependencies:

```sh
npm install
```

Compiling the project:

```sh
make
# Run tests
make test
# Run linter
make lint
```

Contributing
------------

Thanks for your interest in contributing to the project. We welcome
contributions in any of the following areas:

- Add more JSON + JSON Schema test cases in the
  [`test/e2e`](https://github.com/jviotti/jsonbinpack/tree/main/test/e2e)
  directory
- Improve the documentation at
  [`docs`](https://github.com/jviotti/jsonbinpack/tree/main/docs)
- Suggesting new encodings to make JSON BinPack more space-efficient
- Performance improvements, primarily in the encoder
- General bug fixes

Additionally, we are tracking the following major changes:

- [ ] Re-write the encoders in C++ and compile to WebAssembly
- [ ] Generate serialization and deserialization C++ code that does not
  dynamically traverses the encoding schema for runtime performance reasons
- [ ] Support recursive JSON Schema documents
- [ ] Implement support for the `if`, `then`, and `else` JSON Schema keywords
- [ ] Implement support for the `anyOf` JSON keyword
- [ ] Implement support for inline binary blobs defined with the
  `contentEncoding` JSON Schema keyword

Don't hesitate in getting in touch [by creating a
ticket](https://github.com/jviotti/jsonbinpack/issues/new/choose) if you
require any guidance on contributing to the project.

License
-------

This project is released under the terms specified in the
[license](https://github.com/jviotti/jsonbinpack/blob/main/LICENSE).
