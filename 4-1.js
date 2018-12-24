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

poms_master = guards.sort((a, b) => {
    return b.minutes_asleep - a.minutes_asleep
})

poms_master_sleep_schedule = poms_master[0].sleep_schedule

a = []
poms_master_sleep_schedule.forEach(e => {
    for (i in [...e]) {
        a[e[i]] ? a[e[i]] = [e[i], a[e[i]][1] + 1] : a[e[i]] = [e[i], 1]
    }
})

minute_most_slept = a.sort((x, y) => {
    return y[1] - x[1]
})

console.log(poms_master[0].id * minute_most_slept[0][0])