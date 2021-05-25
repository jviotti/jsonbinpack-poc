.PHONY: deps serve tsc all

NODE_MODULES ?= ../node_modules
NODE_MODULES_BIN = $(NODE_MODULES)/.bin
VENDOR_DIRECTORY ?= ../vendor

deps: Gemfile
	bundle install

assets/js/%.min.js: dist/%.js
	$(NODE_MODULES_BIN)/browserify $< | $(NODE_MODULES_BIN)/uglifyjs --compress --mangle > $@

_sass/tailwindcss.scss: $(NODE_MODULES)/tailwindcss/dist/tailwind.css
	cp $< $@

_sass/codemirror.scss: $(NODE_MODULES)/codemirror/lib/codemirror.css
	cp $< $@

tsc:
	$(NODE_MODULES_BIN)/tsc

all: tsc assets/js/stats.min.js _sass/tailwindcss.scss _sass/codemirror.scss

serve:
	bundle exec jekyll serve --open-url --watch --incremental
