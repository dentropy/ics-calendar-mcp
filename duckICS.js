import fs from "node:fs";
import duckdb from "@duckdb/node-api";
import ical from "node-ical";
import therrule from 'rrule';


let rawdata = await fs.readFileSync("./basic.ics", "utf-8");
const events = await ical.sync.parseICS(rawdata);

console.log(duckdb.version());
console.log(duckdb.configurationOptionDescriptions());

const instance = await duckdb.DuckDBInstance.create("ical.db");
const connection = await instance.connect();
const result = await await connection.run(`
    CREATE TABLE if not exists calendar_events (
        uid VARCHAR PRIMARY KEY,
        event_data VARCHAR,
        start_date_time TIMESTAMPTZ,
        end_date_time TIMESTAMPTZ,
    )
`);

console.log(events);
console.log(Object.keys(events));

let allEvents = [];

for (const event_id in events) {
    console.log("\n\n");
    // console.log(events[event_id]);
    // console.log(JSON.stringify(events[event_id]));
    // console.log(event_id);
    let event = events[event_id]
    console.log("event_id:", event_id);
    if (events[event_id].type == "VEVENT") {
        // console.log("PAUL_WAS_HERE");
        // Check if the event has a recurrence rule (RRULE)
        if (event.rrule) {
            // Parse the RRULE string into an RRule object
            const rrule = event.rrule.origOptions;

            // Set the start date explicitly if not in the RRULE options
            rrule.dtstart = new Date(event.start);

            // Optionally set an end date for the recurrence (e.g., 1 year from now)
            if (!rrule.until) {
                rrule.until = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // 1 year limit
            }

            // Create an RRule instance
            const rule = new therrule.RRule(rrule);

            // Generate all occurrences of the recurring event
            const occurrences = rule.all(); // Get all instances (caution: can be infinite without 'until')

            // Add each occurrence to the list
            occurrences.forEach((occurrence) => {
                console.log("OCCOURANCE_WORKS")
                const duration = event.end - event.start; // Calculate duration
                let tmp_event = JSON.parse(JSON.stringify(event))
                tmp_event.start = occurrence
                tmp_event.end = new Date(occurrence.getTime() + duration)
                allEvents.push(tmp_event);
            });
        } else {
            // Single event, add directly to the list
            allEvents.push(JSON.stringify(event));
        }
    //     try {
    //         const prepared = await connection.prepare(
    //             `INSERT INTO calendar_events (
    //                 uid, 
    //                 event_data, 
    //                 start_date_time, 
    //                 end_date_time
    //             ) VALUES (
    //                 $uid, 
    //                 $event_data, 
    //                 $start, 
    //                 $end
    //             ) ON CONFLICT DO NOTHING`,
    //         );
    //         prepared.bind({
    //             "uid": event_id,
    //             "event_data": JSON.stringify(events[event_id], null, 2),
    //             "start": events[event_id].start.toISOString(),
    //             "end": events[event_id].end.toISOString(),
    //         });
    //         const result = await prepared.run();
    //     } catch (error) {
    //         console.log("WE_GOT_ERROR");
    //         console.log(error);
    //         const prepared = await connection.prepare(
    //             `INSERT INTO calendar_events (uid, event_data) VALUES ($uid, $event_data) ON CONFLICT DO NOTHING`,
    //         );
    //         prepared.bind({
    //             "uid": event_id,
    //             "event_data": JSON.stringify(events[event_id], null, 2),
    //         });
    //         const result = await prepared.run();
    //     }
    //     console.log("events[event_id]:", events[event_id]);
    }
}

fs.writeFileSync('ical.json', JSON.stringify(allEvents, null, 2));