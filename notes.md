# NaNo Tracker

A simple one-page app for tracking the progress of your work during NaNoWriMo.

## UI Consists of

- Word Total
- a box for each day in November, up to the current day
  - box is labeled with the date
- a bar representation of the writer's progress so far
  - includes the word-per-day count the writer need in order to make their goal

### Sample UI

[progress bar]

title
project info fields
- wordlength (50000)
- total days (30)
- start date (November 1)

data entry fields

(
	generates a number of fields 
	depending on the start date(defined above)
	and current date
)

November 1
[0               ]

November 2
[0               ]

(
	on change of form fields,
	the form sends a JSON object to the progress bar
	and the progress bar updates with the new data
)
