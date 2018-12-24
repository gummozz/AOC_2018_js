var fs = require('fs');
var answer = 0;
var input = fs.readFileSync('input_1-1.txt', 'utf8').toString().split("\n")
input.forEach(element => {
    if (element.match(/[\+|\-]\d+/)) {
        answer += parseInt(element);
    }
});
console.log("Answer: " + answer);