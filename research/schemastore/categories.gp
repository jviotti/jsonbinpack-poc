
set terminal png size 1200,850
set terminal png enhanced

set grid
set key off
set border 3

set boxwidth 0.7 absolute
set style fill solid 1.0 noborder

set logscale y
set yrange[0:]
set ylabel 'Count'

set ytics add ("0" 0.1)

set xlabel 'JSON Taxonomy Categories' offset 0,-3
set xrange [ 0: 37 ]

set xtics ( \
  "Tiny Numeric Redundant Flat" 1, \
  "Tiny Numeric Redundant Nested" 2, \
  "Tiny Numeric Non-Redundant Nested" 3, \
  "Tiny Numeric Non-Redundant Flat" 4, \
  "Tiny Textual Redundant Flat" 5, \
  "Tiny Textual Redundant Nested" 6, \
  "Tiny Textual Non-Redundant Nested" 7, \
  "Tiny Textual Non-Redundant Flat" 8, \
  "Tiny Boolean Redundant Flat" 9, \
  "Tiny Boolean Redundant Nested" 10, \
  "Tiny Boolean Non-Redundant Nested" 11, \
  "Tiny Boolean Non-Redundant Flat" 12, \
  "Small Numeric Redundant Flat" 13, \
  "Small Numeric Redundant Nested" 14, \
  "Small Numeric Non-Redundant Nested" 15, \
  "Small Numeric Non-Redundant Flat" 16, \
  "Small Textual Redundant Flat" 17, \
  "Small Textual Redundant Nested" 18, \
  "Small Textual Non-Redundant Nested" 19, \
  "Small Textual Non-Redundant Flat" 20, \
  "Small Boolean Redundant Flat" 21, \
  "Small Boolean Redundant Nested" 22, \
  "Small Boolean Non-Redundant Nested" 23, \
  "Small Boolean Non-Redundant Flat" 24, \
  "Large Numeric Redundant Flat" 25, \
  "Large Numeric Redundant Nested" 26, \
  "Large Numeric Non-Redundant Nested" 27, \
  "Large Numeric Non-Redundant Flat" 28, \
  "Large Textual Redundant Flat" 29, \
  "Large Textual Redundant Nested" 30, \
  "Large Textual Non-Redundant Nested" 31, \
  "Large Textual Non-Redundant Flat" 32, \
  "Large Boolean Redundant Flat" 33, \
  "Large Boolean Redundant Nested" 34, \
  "Large Boolean Non-Redundant Nested" 35, \
  "Large Boolean Non-Redundant Flat" 36, \
) rotate by 90 right
plot 'research/schemastore/categories.dat' using 1 smooth frequency with boxes
