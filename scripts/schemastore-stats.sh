#!/bin/sh

set -eu

SCHEMASTORE_DATASET_LOCATION="vendor/schemastore/src/test"
JSON_FILES="$(find "$SCHEMASTORE_DATASET_LOCATION" -type f -name '*.json')"

# Set a different IFS to cope with SchemaStore test files
# that contain spaces.
# See https://unix.stackexchange.com/a/612529/43448
OLD_IFS="$IFS"
IFS="
"

OUTPUT="$PWD/.tmp/schemastore-stats"
echo "Storing results in $OUTPUT"
rm -rf "$OUTPUT"
mkdir -p "$OUTPUT/analysis" "$OUTPUT/summary" "$OUTPUT/qualifiers"

JSONSTATS_CLI="$PWD/dist/utils/jsonstats.js"

for file in $JSON_FILES
do
  RELATIVE_PATH="$(realpath --relative-to="$SCHEMASTORE_DATASET_LOCATION" "$file")"
  FINAL_NAME="$(echo "$RELATIVE_PATH" | tr '/' '-' | tr ' ' '-')"
  echo "Processing $FINAL_NAME"
  node "$JSONSTATS_CLI" analyze "$file" > "$OUTPUT/analysis/$FINAL_NAME"
  node "$JSONSTATS_CLI" summarize "$file" > "$OUTPUT/summary/$FINAL_NAME"
  node "$JSONSTATS_CLI" qualify "$file" > "$OUTPUT/qualifiers/$FINAL_NAME"
done

# Revert old IFS
IFS="$OLD_IFS"
