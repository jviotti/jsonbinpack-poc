#!/bin/sh

# We want this project to continue working even if the dependencies we
# used to pull through git submodules cannot be resolved anymore for
# any reason. This happens in practice when repositories are i.e. moved
# between git hosting providers, their history is re-written, or are simply
# taken down.

set -eu

while read -r dependency
do
  NAME="$(echo "$dependency" | cut -d ' ' -f 1)"
  URL="$(echo "$dependency" | cut -d ' ' -f 2)"
  HASH="$(echo "$dependency" | cut -d ' ' -f 3)"

  if [ -z "$NAME" ]
  then
    echo "ERROR: Missing dependency name" 1>&2
    exit 1
  fi

  if [ -z "$URL" ]
  then
    echo "$NAME: ERROR: Missing git URL" 1>&2
    exit 1
  fi

  if [ -z "$HASH" ]
  then
    echo "$NAME: ERROR: Missing git HASH" 1>&2
    exit 1
  fi

  DESTINATION="vendor/$NAME"
  mkdir -p "$(dirname "$DESTINATION")"

  if [ -d "$DESTINATION" ]
  then
    echo "$NAME: Clearing existing clone at $DESTINATION"
    rm -rf "$DESTINATION"
  fi

  echo "$NAME: Cloning $URL into $DESTINATION"
  git clone "$URL" "$DESTINATION"
  echo "$NAME: Checking out $HASH"
  git -C "$DESTINATION" reset --hard "$HASH"
  echo "$NAME: Deleting $DESTINATION/.git"
  rm -rf "$DESTINATION/.git"
done < DEPENDENCIES
