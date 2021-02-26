"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tap = require("tap");
var jsonstats_1 = require("../../../utils/jsonstats");
tap.test('should qualify the survey test object', function (test) {
    var document = {
        tags: [],
        tz: -25200,
        days: [1, 1, 2, 1],
        coord: [-90.0715, 29.9510],
        data: [
            {
                name: 'ox03',
                staff: true
            },
            {
                name: null,
                staff: false,
                extra: {
                    info: ''
                }
            },
            {
                name: 'ox03',
                staff: true
            },
            {}
        ]
    };
    var qualifiers = [
        'small',
        'numeric',
        'non-redundant',
        'nested'
    ];
    test.strictSame(jsonstats_1.qualify(jsonstats_1.summarize(jsonstats_1.analyze(document))), qualifiers);
    test.end();
});
