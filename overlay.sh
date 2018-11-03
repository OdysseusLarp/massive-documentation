#!/bin/bash

if [ "$#" -lt 2 ]; then
  echo "Usage: $0 <overlay.png> <files.png...>"
  echo
  echo "Will overlay the first image on top of other images."
  echo "Performs edits in-place."
  exit 1
fi

OVERLAY="$1"
shift

for file in "$@"; do
  echo "Overlaying on $file"
  composite -gravity center "$OVERLAY" "$file" foo.png
  mv foo.png "$file"
done
