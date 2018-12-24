var fs = require('fs');
cf = 0;
a = [];
input = fs.readFileSync('input_1-1.txt', 'utf8').toString().split("\n")
for (i = 0; i < input.length; i++) {
    cf += parseInt(input[i], 10);
    if (a.indexOf(cf) > -1) {
        console.log("Answer: " + cf);
        console.log("Frequencies before finding the answer: " + a.length)
        break;
    }
    a.push(cf);
    if (i === (input.length -1)) {i = -1;}
}