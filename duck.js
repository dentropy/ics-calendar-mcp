import duckdb from '@duckdb/node-api';


console.log(duckdb.version());
console.log(duckdb.configurationOptionDescriptions());

const instance = await duckdb.DuckDBInstance.create('my_duckdb.db');
const connection = await instance.connect();
const result = await await connection.run(`
    CREATE TABLE if not exists calendar_events (
        uid VARCHAR PRIMARY KEY,
        event_data VARCHAR
    )
`);
await connection.run(`
    INSERT INTO calendar_events VALUES
        ('Alice', '{"age": 25, "city": "New York"}'),
        ('Bob', '{"age": 30, "city": "San Francisco"}'),
        ('Charlie', '{"age": 35, "city": "London"}')
`);