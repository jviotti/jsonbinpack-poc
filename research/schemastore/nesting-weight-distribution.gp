set terminal png size 1200,550
set terminal png enhanced

set grid
set key off
set border 3

set boxwidth 3 absolute
set style fill solid 1.0 noborder

set xlabel 'Nesting Weight 5s Groups'

set ylabel 'Count'

bin_width = 5;

bin_number(x) = floor(x/bin_width)

rounded(x) = bin_width * ( bin_number(x) + 0.5 )

plot 'research/schemastore/nesting-weight-distribution.dat' \
using (rounded($1)):(1) smooth frequency with boxes
