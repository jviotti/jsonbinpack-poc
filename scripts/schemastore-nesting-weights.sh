#!/bin/sh

set -eu

OUTPUT="$PWD/.tmp/schemastore-stats"
STATS="$(find "$OUTPUT/summary" -type f)"

for file in $STATS
do
  jq --raw-output '.nestingWeight' < "$file"
done
