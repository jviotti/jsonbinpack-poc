#!/bin/sh

set -eu

OUTPUT="$PWD/.tmp/schemastore-stats"
STATS="$(find "$OUTPUT/qualifiers" -type f)"

for file in $STATS
do
  QUALIFIERS="$(jq --raw-output '.[]' < "$file")"
  RESULT=""
  for qualifier in $QUALIFIERS
  do
    RESULT="$RESULT$(echo "$qualifier" | cut -c 1 | tr '[:lower:]' '[:upper:]')"
  done

  ./scripts/numeric-taxonomy.sh | grep "^$RESULT" | cut -d ' ' -f 2
done
