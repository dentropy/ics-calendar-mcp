
import fs from 'node:fs';
import ICAL from "ical.js";

let rawdata = await fs.readFileSync('./basic.ics', "utf-8");
var icalData = ICAL.parse(rawdata);

console.log(icalData)
console.log("\n\n")
console.log(Object.keys(icalData))
console.log("\n\n")
console.log(icalData[0])
console.log("\n\n")
console.log(icalData[1])
console.log("\n\n")
for(const event of icalData[2]) {
    console.log(event)
}