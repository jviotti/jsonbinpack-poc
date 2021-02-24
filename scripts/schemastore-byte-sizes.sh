#!/bin/sh

set -eu

OUTPUT="$PWD/.tmp/schemastore-stats"
STATS="$(find "$OUTPUT/analysis" -type f)"

for file in $STATS
do
  jq --raw-output '.byteSize' < "$file"
done
