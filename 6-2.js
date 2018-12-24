var fs = require('fs');
var answer = 0;
var input = fs.readFileSync('input.txt', 'utf8').toString().trim().split("\n")

defined_points = []

input.forEach(e => {
    defined_points.push(new Box(e.split(",")[0].trim(), e.split(",")[1].trim(), "start"))
});

x_max = (defined_points.sort((a, b) => {return b.x - a.x}))
x_max = parseInt(x_max[0].x)
y_max = (defined_points.sort((a, b) => {return b.y - a.y}))
y_max = parseInt(y_max[0].y)

coordinate_system = new Coordinate_system(x_max , y_max)

function Box(x, y, isDefined, x_max, y_max) {
    this.x = x
    this.y = y
    this.x_max = x_max
    this.y_max = y_max
    this.isDefined = isDefined

    if (isDefined != "start") {
        this.sodtadp = sum_of_distance_to_all_defined_point(this.x, this.y)
    }
}

function  manhattan_distance(a, b, c ,d) {
    return Math.abs(a - c) + Math.abs(b - d)
}

function sum_of_distance_to_all_defined_point(x, y) {
    t = 0
    defined_points.forEach(e => {
        t += parseInt(([manhattan_distance(x, y, e.x, e.y)]))
    })
    if (t < 10000) {answer++}
    return t
}

function Coordinate_system(x, y) {
    c_s = []
    this.max_x = parseInt(x)
    this.max_y = parseInt(y)
    for (i = 0; i < this.max_x; i++) {
        c_s[i] = []
        for (j = 0; j < this.max_y; j++) {
            if (defined_points.find(o => o.x == i && o.y == j)) {
                c_s[i][j] = new Box(i, j, true, x_max, y_max)
            }
            else {
                c_s[i][j] = new Box(i, j, false, x_max, y_max) 
            }
        }
    }
    this.cs = c_s
}

console.log(answer)