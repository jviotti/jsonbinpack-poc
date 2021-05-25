include vendor/vendorpull/targets.mk

-include node_modules/@sourcemeta/typescript-config/targets.mk
TYPESCRIPT_CONFIG_DIRECTORIES = lib test

.PHONY: web build lint test
.DEFAULT_GOAL = build

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
