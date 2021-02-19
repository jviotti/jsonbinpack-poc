.PHONY: build lint
.DEFAULT_GOAL = build

build:
	./node_modules/.bin/tsc

lint:
	./node_modules/.bin/eslint --ext .ts lib test utils
