include vendor/vendorpull/targets.mk

-include node_modules/@sourcemeta/typescript-config/targets.mk
TYPESCRIPT_CONFIG_DIRECTORIES = lib test

.PHONY: deps web build lint test
.DEFAULT_GOAL = build

deps: package.json
	node vendor/jsontoolkit/vendor/npm/bin/npm-cli.js install

build: tsc

lint: eslint

test:
	./node_modules/.bin/tap \
		--reporter=list \
		--no-coverage \
		--jobs=1 \
		--no-timeout \
		'dist/test/**/*.spec.js'

web:
	make -C docs all serve
