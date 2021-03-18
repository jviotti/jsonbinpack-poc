include vendor/vendorpull/targets.mk

.PHONY: deps tsc web-build web-serve build lint test
.DEFAULT_GOAL = build

deps: package.json Gemfile
	node vendor/jsontoolkit/vendor/npm/bin/npm-cli.js install
	bundle install

tsc:
	./node_modules/.bin/tsc

build: tsc

lint:
	./node_modules/.bin/eslint --ext .ts utils web

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

assets/images/benchmark/%.png: vendor/binary-json-size-benchmark/charts/%.png
	cp $< $@

BENCHMARK_IMAGES = $(addprefix assets/images/benchmark/,\
									 $(notdir \
									 $(wildcard vendor/binary-json-size-benchmark/charts/*.png)))

benchmark.markdown: vendor/binary-json-size-benchmark/README.md $(BENCHMARK_IMAGES)
	echo "---" > $@
	echo "layout: base" >> $@
	echo "title: Benchmark" >> $@
	echo "permalink: /benchmark/" >> $@
	echo "---\n" >> $@
	cat $< | sed 's/\.\/charts/\/assets\/images\/benchmark/g' >> $@

_sass/tailwindcss.scss: node_modules/tailwindcss/dist/tailwind.css
	cp $< $@

_sass/codemirror.scss: node_modules/codemirror/lib/codemirror.css
	cp $< $@

assets/js/%.js: dist/web/%.js
	./node_modules/.bin/browserify $< | ./node_modules/.bin/uglifyjs --compress --mangle > $@

web-build: tsc assets/js/stats.js _sass/tailwindcss.scss _sass/codemirror.scss benchmark.markdown
web-serve:
	bundle exec jekyll serve --verbose --open-url --watch --incremental
