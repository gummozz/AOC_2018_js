var fs = require('fs');
var answer = 0;
var input = fs.readFileSync('input.txt', 'utf8').toString().trim().split("\n")

defined_points = []

input.forEach(e => {
    defined_points.push(new Box(e.split(",")[0].trim(), e.split(",")[1].trim(), true))
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
    this.m_a_i = makes_area_infinite(this.x, this.y, this.x_max, this.y_max)

    if (isDefined) {
        this.area = 1
        this.closest_points = []
    }
    else {
        this.closest_defined_point = find_closest_defined_point(this.x, this.y, this.m_a_i)
        this.not_closest_to_any_single_point = this.closest_defined_point == "." ? true : false
    }

}

function  manhattan_distance(a, b, c ,d) {
    return Math.abs(a - c) + Math.abs(b - d)
}

function find_closest_defined_point(x, y, mai) {
    t = []
    defined_points.forEach(e => {
        t.push([e, manhattan_distance(x, y, e.x, e.y)])
    })
    t.sort((a, b) => {return a[1] - b[1]})
    if (t[0][1] < t[1][1] && mai) {
        t[0][0].area = NaN
        t[0][0].closest_points.push([x, y])
    }
    if (t[0][1] < t[1][1] && !mai) {
        t[0][0].area += 1
        t[0][0].closest_points.push([x, y])
    }
    return t[0][1] < t[1][1] ? t[0][0] : "."
}

function makes_area_infinite(x, y, x_max, y_max) {
    if (x === x_max - 1 || y === y_max - 1 || x === 0 || y === 0) {
        return true
    }
    else {
        return false
    }
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

answer = []
for (i in [...defined_points]) {
    if (defined_points[i].area > 0) {
        answer.push(defined_points[i])
    }
}

answer.sort((a, b) => {return b.area - a.area})

console.log(answer[0].area)
