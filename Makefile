.PHONY: tsc build lint test serve
.DEFAULT_GOAL = build

docs/_sass/tailwindcss.scss: node_modules/tailwindcss/dist/tailwind.css
	cp $< $@

docs/_sass/codemirror.scss: node_modules/codemirror/lib/codemirror.css
	cp $< $@

docs/_sass/codemirror-theme.scss: node_modules/codemirror/theme/idea.css
	cp $< $@

# TODO: Integrate Uglify
docs/assets/js/stats.js: dist/docs/src/stats.js
	./node_modules/.bin/browserify $< | uglifyjs --compress --mangle > $@

tsc:
	./node_modules/.bin/tsc

build: tsc docs/assets/js/stats.js docs/_sass/tailwindcss.scss docs/_sass/codemirror.scss docs/_sass/codemirror-theme.scss

lint:
	./node_modules/.bin/eslint --ext .ts lib test utils docs/src

test:
	./node_modules/.bin/tap \
		--reporter=list \
		--no-coverage \
		--jobs=1 \
		--no-timeout \
		'dist/test/**/*.spec.js'

serve:
	cd docs && bundle exec jekyll serve --watch --incremental
