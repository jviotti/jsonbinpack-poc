jsonbinpack
===========

A space-efficient schema-driven binary JSON serialization format based on JSON
Schema.

Roadmap
-------

- [ ] Re-write the encoders in C++ and compile to WebAssembly
- [ ] Support recursive JSON Schema documents
- [ ] Implement support for the `if`, `then`, and `else` JSON Schema keywords
- [ ] Implement support for the `anyOf` JSON keyword
- [ ] Implement support for inline binary blobs defined with the
  `contentEncoding` JSON Schema keyword

License
-------

This project is released under the terms specified in the
[license](https://github.com/jviotti/jsonbinpack/blob/main/LICENSE).
