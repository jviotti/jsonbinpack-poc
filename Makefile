.PHONY: deps serve tsc all

assets/js/%.min.js: dist/web/%.js
	./node_modules/.bin/browserify $< | ./node_modules/.bin/uglifyjs --compress --mangle > $@

_sass/tailwindcss.scss: node_modules/tailwindcss/dist/tailwind.css
	cp $< $@

_sass/codemirror.scss: node_modules/codemirror/lib/codemirror.css
	cp $< $@

all: assets/js/stats.min.js _sass/tailwindcss.scss _sass/codemirror.scss
