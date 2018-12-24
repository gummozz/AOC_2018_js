var fs = require('fs');
var input = fs.readFileSync('input.txt', 'utf8').toString().trim().split("\n")
var a = []
a[0] = 0
a[1] = 0

input.forEach(e => {
  c = {}
  for (i in [...e]) {c[e[i]] = c[e[i]] ? c[e[i]] + 1 : 1}
  Object.keys(c).some(x => {return c[x] === 2 ? true : false}) ? a[0]++ : 0
  Object.keys(c).some(x => {return c[x] === 3 ? true : false}) ? a[1]++ : 0
})

console.log(a[0] * a[1])