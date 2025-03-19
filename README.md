# ICS-MCP

## Description

Download and interpreet ICS calendars.

All this project does it take the ICS file than generates a duckdb table with each event being a separate row.

#### Requirements

* node & npm
* [duckdb CLI](https://duckdb.org/docs/installation/?version=stable&environment=cli)

#### Example

``` bash

npm i

wget https://raw.githubusercontent.com/EvanHerman/ics-sample/refs/heads/main/sample.ics

node duckICS.js -i sample.ics -o sample.db

duckdb sample.db

```

**Run this in the duckdb console**
``` sql

.schema

select count(*) from calendar_events;

SELECT
    start_date_time,
    json_extract_string(event_data, '$.summary') as event_name,
    json_extract_string(event_data, '$.description') as description
FROM calendar_events;

COPY calendar_events TO 'sample.json';
COPY calendar_events TO 'sample.csv';

select json_keys(event_data) from calendar_events;


SELECT
    json_extract_string(event_data, '$.summary')
FROM calendar_events;

SELECT
    json_extract_string(event_data, '$.summary.val')
FROM calendar_events;

```

#### Other Example Calendars

``` bash

rm test.db
wget -O test.ics https://raw.githubusercontent.com/allenporter/ical/ed2889e332c37eb03f477517970a22f9ebb7211e/tests/testdata/rrule-exdate.ics
node duckICS.js -i test.ics -o test.db
duckdb test.db

```

- [llenporter/ical Example ics data](https://github.com/allenporter/ical/tree/ed2889e332c37eb03f477517970a22f9ebb7211e/tests/testdata)
- [iCal-library ics examples](https://github.com/Jorricks/iCal-library/tree/81e01035d1fb0a8e72bb09d22ec859c38cc14a0b/tests/resources)