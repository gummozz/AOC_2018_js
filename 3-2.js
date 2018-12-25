var fs = require('fs');
var answer = 0;
var input = fs.readFileSync('input.txt', 'utf8').toString().trim().split("\n")

rects = {}

for (i in [...input]) {
    m = input[i].match(/#(\d+)\s@\s(\d+),(\d+):\s(\d+)x(\d+)/)
    xmin = parseInt(m[2])
    ymin = parseInt(m[3])
    xmax = parseInt(m[2]) + parseInt(m[4])
    ymax = parseInt(m[3]) + parseInt(m[5])
    for (i = xmin; i < xmax; i++) {
        for (j = ymin; j < ymax; j++) {
            rects[i + "," + j] = (rects[i + "," + j] || 0) + 1
        }
    }
}


for (i in [...input]) {
    m = input[i].match(/#(\d+)\s@\s(\d+),(\d+):\s(\d+)x(\d+)/)
    xmin = parseInt(m[2])
    ymin = parseInt(m[3])
    xmax = parseInt(m[2]) + parseInt(m[4])
    ymax = parseInt(m[3]) + parseInt(m[5])
    t = 0
    for (i = xmin; i < xmax; i++) {
        for (j = ymin; j < ymax; j++) {
            t += rects[i + "," + j] > 1 ? 1 : 0
        }
    }
    if (t === 0) {console.log(m[1])}
}