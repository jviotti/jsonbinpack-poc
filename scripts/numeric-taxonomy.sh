#!/bin/sh

set -eu

TAXONOMY="
TNHL Tiny Numeric Redundant Flat
TNHH Tiny Numeric Redundant Nested
TNLH Tiny Numeric Non-Redundant Nested
TNLL Tiny Numeric Non-Redundant Flat
TTHL Tiny Textual Redundant Flat
TTHH Tiny Textual Redundant Nested
TTLH Tiny Textual Non-Redundant Nested
TTLL Tiny Textual Non-Redundant Flat
TBHL Tiny Boolean Redundant Flat
TBHH Tiny Boolean Redundant Nested
TBLH Tiny Boolean Non-Redundant Nested
TBLL Tiny Boolean Non-Redundant Flat
SNHL Small Numeric Redundant Flat
SNHH Small Numeric Redundant Nested
SNLH Small Numeric Non-Redundant Nested
SNLL Small Numeric Non-Redundant Flat
STHL Small Textual Redundant Flat
STHH Small Textual Redundant Nested
STLH Small Textual Non-Redundant Nested
STLL Small Textual Non-Redundant Flat
SBHL Small Boolean Redundant Flat
SBHH Small Boolean Redundant Nested
SBLH Small Boolean Non-Redundant Nested
SBLL Small Boolean Non-Redundant Flat
LNHL Large Numeric Redundant Flat
LNHH Large Numeric Redundant Nested
LNLH Large Numeric Non-Redundant Nested
LNLL Large Numeric Non-Redundant Flat
LTHL Large Textual Redundant Flat
LTHH Large Textual Redundant Nested
LTLH Large Textual Non-Redundant Nested
LTLL Large Textual Non-Redundant Flat
LBHL Large Boolean Redundant Flat
LBHH Large Boolean Redundant Nested
LBLH Large Boolean Non-Redundant Nested
LBLL Large Boolean Non-Redundant Flat
"

INDEX=1
IFS='
'

for category in $TAXONOMY
do
  ACRONYM="$(echo "$category" | cut -d ' ' -f 1)"
  DESCRIPTION="$(echo "$category" | cut -d ' ' -f 2-)"
  echo "$ACRONYM $INDEX $DESCRIPTION"
  INDEX=$(( INDEX + 1 ))
done
