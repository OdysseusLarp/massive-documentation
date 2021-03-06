
Massive documentation generation
================================

This repository contains scripts and tools for generating massive amounts
of documentation with custom header and footer and custom pages of content
based on a ready document.

As an example, for the Odysseus larp, a 900-page engineering manual was
produced based on the [Apollo Operations Handbook](https://www.hq.nasa.gov/alsj/alsj-CSMdocs.html).
A few pages are in the file [example.pdf](example.pdf).


## Prerequisites

* Install ImageMagick (Linux: `apt-get install imagemagick`, Mac: `brew install imagemagick`)
* Install pdfimages (Linux: `apt-get install poppler-utils`, Mac: `brew install poppler`)
* Install img2pdf (Linux: `apt-get install img2pdf`, Mac: `pip3 install img2pdf`, requires Python 3)


## Steps

1. Download the source file (below input.pdf)

2. Let the following run during the next image extraction step
   (it converts *.ppm images to *.png on-the-fly):  
   `./watch-ppm-to-png.sh`

3. Extract images from PDF file (from input.pdf to apollo-###.png):  
   `pdfimages input.pdf apollo`

4. Check the image sizes:  
   `./image-size-stats.sh *.png`

5. Choose a suitable final page height in pixels. Add necessary margin to
   the top and bottom (in this case 1600px).

6. Convert all images to the proper image size:  
   `mkdir faulty`  
   `./resize-to-a4.sh 1600 faulty *.png`
   Images not of correct size are moved to faulty/ (check them out, they may be cool).
   If you want letter size, edit the script and change
   `WIDTH=$(($HEIGHT*210/297))` to `WIDTH=$(($HEIGHT*2159/2794))`.

7. Create an overlay image that blocks the necessary parts of the pages and
   replaces them with your own (e.g. [ess-odysseus-overlay.png](ess-odysseus-overlay.png).
   (For the Apollo Operations Handbook "Rockwell" font was suitably close.)

8. Overlay the image on top of all pages:  
   `./overlay.sh odysseus-overlay.png *.png`

9. Delete images of pages which are not suitable and insert your own ones as
   desired.

10. Convert png's to pdf:  
    `img2pdf *.png -o output.pdf --pagesize A4`

Enjoy!


## Templates

The `templates/` directory contains HTML and ODT templates with the header and footer in place for creating custom documentation pages.

Download the [Rockwell font](https://www.wfonts.com/font/rockwell) and install it (for ODT to work) *and* place is in `templates/rockwell.ttf` (for HTML to work).
