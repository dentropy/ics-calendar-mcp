from ics import Calendar
import requests
from pprint import pprint
from pathlib import Path

# url = "https://urlab.be/events/urlab.ics"
# url = "https://calendar.google.com/calendar/ical/3oo6s709gu7d31cg1419cfrbuc%40group.calendar.google.com/public/basic.ics"
# c = Calendar(requests.get(url).text)

filename = Path("./basic.ics")
with filename.open() as ics_file:
    calendar = Calendar(ics_file.read())



for event in calendar.events:
    print("\n\n")
    pprint({
        "name" : event.name,
        "extra" : event.extra,
        "location" : event.location,
        "duration": event.duration,
        "starts_within": event.starts_within
    })
    print(dir(event))

# for c_event in c:
#     print("\n\n")
#     dir(c_event)
#     # print(c_event.name)
#     # print(c_event.begin)
