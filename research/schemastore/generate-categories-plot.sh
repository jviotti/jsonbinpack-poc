#!/bin/sh

set -eu

echo "
set terminal png size 1200,550
set terminal png enhanced

set grid
set key off
set border 3

set boxwidth 0.7 absolute
set style fill solid 1.0 noborder

set logscale y
set yrange[0:]
set ylabel 'Count'

set ytics add (\"0\" 0.1)

set xlabel 'JSON Taxonomy Categories' offset 0,-3
set xrange [ 0: 37 ]

set xtics ( \\"

IFS='
'

for taxonomy in $(./scripts/numeric-taxonomy.sh)
do
  NAME="$(echo "$taxonomy" | cut -d ' ' -f 1)"
  NUMBER="$(echo "$taxonomy" | cut -d ' ' -f 2)"
  echo "  \"$NAME\" $NUMBER, \\"
done

echo ') rotate by 90 right'

echo "plot 'research/schemastore/categories.dat' using 1 smooth frequency with boxes"
