
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

set ytics add ("0" 0.1)

set xlabel 'JSON Taxonomy Categories' offset 0,-3
set xrange [ 0: 37 ]

set xtics ( \
  "TNHL" 1, \
  "TNHH" 2, \
  "TNLH" 3, \
  "TNLL" 4, \
  "TTHL" 5, \
  "TTHH" 6, \
  "TTLH" 7, \
  "TTLL" 8, \
  "TBHL" 9, \
  "TBHH" 10, \
  "TBLH" 11, \
  "TBLL" 12, \
  "SNHL" 13, \
  "SNHH" 14, \
  "SNLH" 15, \
  "SNLL" 16, \
  "STHL" 17, \
  "STHH" 18, \
  "STLH" 19, \
  "STLL" 20, \
  "SBHL" 21, \
  "SBHH" 22, \
  "SBLH" 23, \
  "SBLL" 24, \
  "LNHL" 25, \
  "LNHH" 26, \
  "LNLH" 27, \
  "LNLL" 28, \
  "LTHL" 29, \
  "LTHH" 30, \
  "LTLH" 31, \
  "LTLL" 32, \
  "LBHL" 33, \
  "LBHH" 34, \
  "LBLH" 35, \
  "LBLL" 36, \
) rotate by 90 right
plot 'research/schemastore/categories.dat' using 1 smooth frequency with boxes
