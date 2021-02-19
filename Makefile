.PHONY: build lint test
.DEFAULT_GOAL = build

build:
	./node_modules/.bin/tsc

lint:
	./node_modules/.bin/eslint --ext .ts lib test utils

test:
	./node_modules/.bin/tap \
		--reporter=list \
		--no-coverage \
		--jobs=1 \
		--no-timeout \
		'dist/test/**/*.spec.js'
