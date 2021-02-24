.PHONY: tsc web-build web-serve build lint test
.DEFAULT_GOAL = build

tsc:
	./node_modules/.bin/tsc

build: tsc

lint:
	./node_modules/.bin/eslint --ext .ts lib test utils docs/src

test:
	./node_modules/.bin/tap \
		--reporter=list \
		--no-coverage \
		--jobs=1 \
		--no-timeout \
		'dist/test/**/*.spec.js'

#################################################
# WEB
#################################################

docs/_sass/tailwindcss.scss: node_modules/tailwindcss/dist/tailwind.css
	cp $< $@

docs/_sass/codemirror.scss: node_modules/codemirror/lib/codemirror.css
	cp $< $@

docs/assets/js/stats.js: dist/docs/src/stats.js
	./node_modules/.bin/browserify $< | uglifyjs --compress --mangle > $@

web-build: tsc docs/assets/js/stats.js docs/_sass/tailwindcss.scss docs/_sass/codemirror.scss
web-serve:
	bundle exec jekyll serve --watch --incremental
