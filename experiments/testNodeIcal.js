// import ical
import fs from "node:fs"
import ical from 'node-ical'

let rawdata = await fs.readFileSync('./basic.ics', "utf-8");
const events = await ical.sync.parseICS(rawdata);

let events_to_happen = []
let events_that_happened = []
for (const event in events) {
    console.log(events[event])
    if(new Date() > events[event]["start"]) {
        events_that_happened.push(events[event])
    }
    if(new Date() < events[event]["start"]) {
        events_to_happen.push(events[event])
    }
}
console.log({
    "events_to_happen" : events_to_happen.length,
    "events_that_happened": events_that_happened.length
})