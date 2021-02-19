.PHONY: build lint test serve
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

serve:
	cd docs && bundle exec jekyll serve --watch --incremental
