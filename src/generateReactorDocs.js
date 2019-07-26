import * as reactor from './reactorHelper'
import * as template from './template'


const GRIDS = [
    "0_2",
    "0_3",
    "0_4",
    "1_1",
    "1_3",
    "1_4",
    "1_5",
    "2_0",
    "2_1",
    "2_2",
    "2_3",
    "2_4",
    "2_6",
    "3_0",
    "3_1",
    "3_2",
    "3_3",
    "3_4",
    "3_5",
    "3_6",
    "4_0",
    "4_2",
    "4_3",
    "4_4",
    "4_5",
    "4_6",
    "5_1",
    "5_2",
    "5_3",
    "5_5",
    "6_2",
    "6_3",
    "6_4",
]
const MISSING_GRIDS = [
    "1_2",
    "2_5",
    "4_1",
    "5_4",
]


console.log(template.START_TO_CSS)
writeCss();
console.log(template.CSS_TO_PAGES)

for (let start = 0; start < 1024; start += 6*6) {
    console.log(template.PAGE_START)
    console.log(`<p>TABLE: JUMP REACTOR REALIGNMENT CODES ${reactor.getCode(start)} TO ${reactor.getCode(start + 6*7 - 1)} ${start > 0 ? "(CONT'D)" : ""}</p>`)
    for (let n = start; n < Math.min(start + 6*6, 1024); n++) {
        writeBox(n)
    }
    console.log(template.PAGE_END)
}


console.log(template.PAGES_TO_END)

function writeCss() {
    console.log(`
    .page {
        text-align: center;
    }
    .grid {
        position: relative;
        display: inline-block;
        width: 2.5cm;
        height: 2.5cm;
        margin-bottom: 1cm;
    }
    .grid .off {
        background-color: #444;
    }
    .grid .missing {
        background-color: #000;
    }
    .grid .g {
        position: absolute;
        width: 12.5%;
        height: 12.5%;
        border: 1px solid black;
    }
    .grid .title {
        position: absolute;
        top: ${7/8*100}%;
        left: 0;
        width: ${7/8*100}%;
        height ${1/8*100}%;
        text-align: center;
        font-size: 80%;
    }
    `)
    for (let x = 0; x < 7; x++) {
        for (let y = 0; y < 7; y++) {
            console.log(`
            .grid .g${y}_${x} {
                top: ${y/8*100}%;
                left: ${x/8*100}%;
            }
            `)
        }
    }
}

function writeBox(n) {
    const code = reactor.getCode(n)
    const lights = reactor.getLights(n)
    console.log(`<div class="grid">`)
    for (const coord of GRIDS) {
        console.log(`<div class="g g${coord} ${lights[coord] ? 'on' : 'off'}"></div>`)
    }
    for (const coord of MISSING_GRIDS) {
        console.log(`<div class="g g${coord} missing"></div>`)
    }
    console.log(`<div class="title">${code}</div>`)
    console.log(`</div>`)
}

