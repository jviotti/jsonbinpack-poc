include vendor/vendorpull/targets.mk

.PHONY: deps tsc web build test
.DEFAULT_GOAL = build

deps: package.json
	node vendor/jsontoolkit/vendor/npm/bin/npm-cli.js install

tsc:
	./node_modules/.bin/tsc

build: tsc

test:
	./node_modules/.bin/tap \
		--reporter=list \
		--no-coverage \
		--jobs=1 \
		--no-timeout \
		'dist/test/**/*.spec.js'

web:
	make -C docs all serve
