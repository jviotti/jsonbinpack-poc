.PHONY: deps tsc web-build web-serve build lint test schemastore-stats research-artifacts
.DEFAULT_GOAL = build

deps: requirements.txt package.json Gemfile
	npm install
	pip3 install --requirement $<
	bundle install

tsc:
	./node_modules/.bin/tsc

build: tsc

lint:
	./node_modules/.bin/eslint --ext .ts lib test utils web
	shellcheck scripts/*.sh

test:
	./node_modules/.bin/tap \
		--reporter=list \
		--no-coverage \
		--jobs=1 \
		--no-timeout \
		'dist/test/**/*.spec.js'

#################################################
# RESEARCH
#################################################

schemastore-stats:
	./scripts/schemastore-stats.sh

research/schemastore/byte-size-distribution.dat:
	./scripts/schemastore-byte-sizes.sh > $@

research/schemastore/nesting-weight-distribution.dat:
	./scripts/schemastore-nesting-weights.sh > $@

research/schemastore/%.png: research/schemastore/%.gp research/schemastore/%.dat
	gnuplot $< > $@

research-artifacts: schemastore-stats \
	research/schemastore/byte-size-distribution.png \
	research/schemastore/nesting-weight-distribution.png

#################################################
# WEB
#################################################

_sass/tailwindcss.scss: node_modules/tailwindcss/dist/tailwind.css
	cp $< $@

_sass/codemirror.scss: node_modules/codemirror/lib/codemirror.css
	cp $< $@

assets/js/%.js: dist/web/%.js
	./node_modules/.bin/browserify $< | uglifyjs --compress --mangle > $@

web-build: tsc assets/js/stats.js _sass/tailwindcss.scss _sass/codemirror.scss
web-serve:
	bundle exec jekyll serve --verbose --open-url --watch --incremental
