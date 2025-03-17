from pathlib import Path
from ical.calendar_stream import IcsCalendarStream
# from ical.exceptions import CalendarParseError

filename = Path("./basic.ics")
with filename.open() as ics_file:
    calendar = IcsCalendarStream.calendar_from_ics(ics_file.read())

from pprint import pprint
pprint(calendar)