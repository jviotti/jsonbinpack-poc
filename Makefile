include vendor/vendorpull/targets.mk

.PHONY: web build lint test
.DEFAULT_GOAL = build

build:
	./node_modules/.bin/tsc

lint: eslint
	./node_modules/.bin/eslint lib test

test:
	./node_modules/.bin/tap \
		--reporter=list \
		--no-coverage \
		--jobs=1 \
		--no-timeout \
		'dist/test/**/*.spec.js'

web:
	make -C docs all serve
