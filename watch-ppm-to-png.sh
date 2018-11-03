#!/bin/bash

# Run this script in a directory where you use pdfimages
# It will watch and on-the-fly convert new ppm files to png

while true; do

  FIRST=true
  for i in *.ppm ; do
    if [ -e "$i" ]; then
      if $FIRST; then
        echo "Pausing 2 seconds for images to become ready"
        sleep 2
        FIRST=false
      fi
      echo Converting $i
      convert $i `basename $i .ppm`.png
      rm $i
    fi
  done

  echo "`ls *.png 2>/dev/null | wc -l` PNG `ls *.ppm 2>/dev/null | wc -l` PPM"
  sleep 1

done
