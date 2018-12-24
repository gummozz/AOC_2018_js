var fs = require('fs');
var input = fs.readFileSync('input_5-1.txt', 'utf8').toString()

aA1 = {}
Aa1 = {}

let a = Array.from({ length: 26 }, (_, i) => String.fromCharCode('a'.charCodeAt(0) + i));
let A = Array.from({ length: 26 }, (_, i) => String.fromCharCode('A'.charCodeAt(0) + i));

for (i = 0; i < 26; i++) {
  x = a[i] + A[i]
  y = A[i] + a[i]
  aA1[x] = x
  Aa1[y] = y
}

for (j = 0; j < 26; j++) {
  replaceme = a[j]
  var regex = new RegExp(replaceme, "ig");
  inputchar = input
  inputchar = inputchar.replace(regex, '');
  inputchar = inputchar.split('')

  for (i = 0; i < inputchar.length; i++) {
    c = inputchar[i] + inputchar[i+1]
    if (aA1[c] || Aa1[c]) {
      inputchar.splice(i, 2)
      i = i - 3
    }    
  }

  reacted = inputchar.join('').trim()
  answer = reacted.length

  console.log(a[j] + ": " + answer)

}