WITH event_descriptions AS (
  SELECT
    start_date_time,
    json_extract_string(event_data, '$.summary') as event_name,
    json_extract_string(event_data, '$.description') as description
  FROM calendar_events
  WHERE json_extract_string(event_data, '$.description') IS NOT NULL
),
split_lines AS (
  SELECT
    start_date_time,
    event_name,
    regexp_extract(unnest(string_split(description, '\n')), 'https?://[^\s\n\r"]+') as url
  FROM event_descriptions
)
SELECT DISTINCT
  start_date_time,
  event_name,
  url
FROM split_lines
WHERE url IS NOT NULL
ORDER BY  start_date_time desc;
