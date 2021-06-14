include vendor/vendorpull/targets.mk

.PHONY: all

assets/js:
	mkdir $@

assets/js/%.min.js: dist/web/%.js | assets/js
	./node_modules/.bin/browserify $< | ./node_modules/.bin/uglifyjs --compress --mangle > $@

_sass/tailwind.scss: node_modules/tailwindcss/tailwind.css postcss.config.js
	./node_modules/.bin/postcss $< --output $@

_sass/codemirror.scss: node_modules/codemirror/lib/codemirror.css
	cp $< $@

all: assets/js/stats.min.js _sass/tailwind.scss _sass/codemirror.scss
