#!/bin/bash

if [ "$#" -eq 0 ]; then
  echo "Usage:  $0 <files...>"
  echo "Will output file dimensions"
fi

identify -format "%f %w %h\n" "$@"
