var fs = require('fs');
var answer = 0;
var input = fs.readFileSync('input.txt', 'utf8').toString().trim().split("\n")

guards = []

function range(start, end) {
    start = parseInt(start)
    end = parseInt(end)
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
}

input.sort().forEach(e => {
    if (e.match(/#(\d+)\s/)) {
        guards[e.match(/#(\d+)\s/)[1]] = new Guard(e.match(/#(\d+)\s/)[1])
    } 
})

input.sort().forEach(e => {
    timestamp = e.match(/\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}/)[0]
    if (e.match(/#(\d+)\s/)) {
        last_seen_guard = e.match(/#(\d+)\s/)[1]
        guards[last_seen_guard].begin_shift(timestamp)
    }
    if (e.match(/falls asleep/)) {
        guards[last_seen_guard].fall_asleep(timestamp)
    }
    if (e.match(/wakes up/)) {
        guards[last_seen_guard].wake_up(timestamp)
    }
})

function Guard(id) {
    this.id = id
    this.minutes_awake = 0
    this.minutes_asleep = 0
    this.last_timestamp_awake = 0
    this.last_timestamp_asleep = 0
    this.sleep_schedule = []
    this.begin_shift = function(timestamp) {
        this.last_timestamp_awake = 0
        this.last_timestamp_asleep = 0
    }
    this.wake_up = function(timestamp) {
        this.minutes_asleep += timestamp.match(/:(\d{2})/)[1] - this.last_timestamp_asleep
        this.last_timestamp_awake = timestamp.match(/:(\d{2})/)[1]
        this.sleep_schedule.push(range(this.last_timestamp_asleep, this.last_timestamp_awake - 1))

    }
    this.fall_asleep = function(timestamp) {
        this.minutes_awake += timestamp.match(/:(\d{2})/)[1] - this.last_timestamp_awake
        this.last_timestamp_asleep = timestamp.match(/:(\d{2})/)[1]
    }
}

b = []
guards.forEach(e => {
    sleep_schedule = e.sleep_schedule
    id = e.id
    a = []
    sleep_schedule.forEach(s => {
        for (i in [...s]) {
            a[s[i]] ? a[s[i]] = [s[i], a[s[i]][1] + 1] : a[s[i]] = [s[i], 1]
        }
    })

    a_sorted = a.sort((p, n) => {
        return n[1] - p[1]
    })

    b.push([id, a[0]])
})

b_filtered = b.filter((z) => {
    return z[1] != undefined
})

b_filtered_sorted = b_filtered.sort((j, h) => {
    return h[1][1] - j[1][1]
})

console.log(b_filtered_sorted[0][0] * b_filtered_sorted[0][1][0])