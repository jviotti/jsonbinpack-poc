include vendor/vendorpull/targets.mk

.DEFAULT_GOAL = all
.PHONY: all tsc test lint

lib/encoder/string/dictionaries/english.json: scripts/txt2dictionary.js vendor/google-10000-english/google-10000-english.txt
	node $< $(word 2,$^) > $@

tsc:
	npm run tsc

test:
	npm test

lint:
	npm run lint

all: lib/encoder/string/dictionaries/english.json tsc
