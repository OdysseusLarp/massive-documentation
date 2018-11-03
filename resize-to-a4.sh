#!/bin/bash -e

if [ "$#" -lt 3 ]; then
  echo "Usage: $0 <height_px> <faulty_dir> <files.png...>"
  echo
  echo "All *.png images will be resized to A4 size with defined height px."
  echo "If image size exceeds final page size by over 10%, image is moved to faulty_dir"
  exit 1
fi

HEIGHT="$1"
FAULTY_DIR="$2"
shift
shift

WIDTH=$(($HEIGHT*210/297))

MAX_HEIGHT=$(($HEIGHT*110/100))
MAX_WIDTH=$(($WIDTH*110/100))
echo "Resizing *.png to $WIDTH x $HEIGHT"

for file in "$@"; do
  SIZE="`identify -format "%w %h" $file`"
  W="$(echo $SIZE | cut -d" " -f1)"
  H="$(echo $SIZE | cut -d" " -f1)"
  if [ $W -gt $MAX_WIDTH -o $H -gt $MAX_HEIGHT ]; then
    echo "Moving too large image $file to $FAULTY_DIR"
    mv $file $FAULTY_DIR
    continue
  fi

  echo "Converting $file"
  convert $file -colorspace LinearGray -gravity center -extent "${WIDTH}x${HEIGHT}" foo.png
  mv foo.png $file
done
