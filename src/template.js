export const START_TO_CSS = `<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <style>
      * {
        box-sizing: border-box;
      }

      @font-face {
        font-family: "Rockwell";
        src: url("rockwell.ttf") format("ttf");
      }

      @page { 
        /*
          A4 = 210 x 297 mm
        */
        size: A4 portrait;
        margin: 0;
        padding: 15mm;
      }

      @media print {
        .page {
          /* Without any border Chrome prints pages on top of one another */
          border: 1px solid white;
        }
      }
      @media screen {
        .page {
          border: 1px solid black;
        }
      }


      html, body {
        margin: 0;
        padding: 0;
        font-family: Rockwell, Arial, sans-serif;
        font-size: 13pt;
        line-height: 140%;
      }
      .page {
        position: relative;
        width: 210mm;
        height: 296mm;
      }
      .page + .page {
        page-break-before: always;
      }
      
      .header {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
      }
      .header img {
        width: 100%;
      }
      .footer {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
      }
      .footer img {
        width: 100%;
      }

      .content {
        margin: 40mm 20mm;
      }`

export const CSS_TO_PAGES = `    </style>
  </head>
  <body>`

export const PAGES_TO_END = `  </body>
</html>`

export const PAGE_START = `    <div class="page">
      <div class="header"><img src="templates/header.png"></div>
      <div class="footer"><img src="templates/footer.png"></div>
      <div class="content">`

export const PAGE_END = `      </div>
</div>`
