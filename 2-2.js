var fs = require('fs');
var input = fs.readFileSync('input.txt', 'utf8').toString().trim().split("\n")

seen = []

input.forEach(e => {
    seen.push(e)
    findthing(seen, e)
})

function findthing(a, l) {
    a.some(t => {
        nm = 0;
        char_t = [...t]
        char_l = [...l]
        for (i = 0; i < char_t.length && nm <= 1; i++) {
            nm += char_t[i] === char_l[i] ? 0 : 1
            if (i == char_t.length - 1 && nm == 1) {
                answer = []
                for (i = 0; i < char_t.length && nm <= 1; i++) {
                    char_t[i] === char_l[i] ? answer.push(char_t[i]) : 0
                }
                console.log(answer.join(""))
            }
        }
    })
}