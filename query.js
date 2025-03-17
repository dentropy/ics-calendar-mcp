
import fs from "node:fs";
import duckdb from "@duckdb/node-api";
const instance = await duckdb.DuckDBInstance.create("ical.db");
const connection = await instance.connect();


// const reader = await connection.runAndReadAll('from test_all_types()');
// const rows = reader.getRows();


// let raw_result = await connection.runAndReadAll(`
// SELECT DISTINCT key
// FROM calendar_events, UNNEST(json_keys(event_data)) AS t(key);
// `)


let raw_result = await connection.runAndReadAll(`

SELECT 
  json_extract(event_data, '$.summary') AS summary,
  json_extract(event_data, '$.description') AS description,
  json_extract(event_data, '$.sequence') AS sequence,
  strftime(start_date_time AT TIME ZONE 'EST', '%B %d, %Y at %I:%M %p') as start,
  strftime(end_date_time AT TIME ZONE 'EST', '%B %d, %Y at %I:%M %p') as end,
  --- event_data
FROM calendar_events
ORDER BY start_date_time desc

`)

console.log(raw_result)

let result = await raw_result.getRowObjects()


// console.log(result)


// console.log(JSON.stringify(result, null, 2))

console.log(result.slice(0, 25))

// for (const a of result){
//   console.log(a)
// }