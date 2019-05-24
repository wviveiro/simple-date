# Simple Date

## Simple date package with just basic functions.


**format** Format dates:

| Mask | Description | Example |
|---|---|---|
| YYYY | Year | 2019...2030|
| YY | Year | 19...30|
| MM | Month of the year | 01 to 12|
| M | Month of the year | 1 to 12|
| DDD | Day of the month | 001 to 031|
| DD | Day of the month | 01 to 31|
| D | Day of the month | 1 to 31|
| HH | Hour | 00...23|
| H | Hour | 0...23|
| hh | Hour | 1...12|
| a | Post or ante meridiem | am...pm |
| mm | Minutes | 00...59 |
| m | Minutes | 0...59 |
| ss | seconds | 00...59 |
| s | seconds | 0...59 |
| N | Day of the week | 1 for Monday, 7 for Sunday|

```javascript
const sDate = require('simple-date');

let date = sDate();


return date.format('DD/MM/YYYY');
```

Load from a date string
```javascript
const sDate = require('simple-date');

// Date format has to be YYYY-MM-DD
let date = sDate('2019-05-17');


return date.getFullDate(); // Returns YYYY-MM-DD
```

Modify date
```javascript
const sDate = require('simple-date');

// Date format has to be YYYY-MM-DD
let date = sDate('2019-01-01');
date.modify(1, 'day');
date.modify(-1, 'month');

return date.getFullDate(); // Returns 2018-12-02
```

Get javascript Date object

```javascript
const sDate = require('simple-date');

let date = sDate();

return date.getDateObj();
```

Verify if date is valid
```javascript
const sDate = require('simple-date');

let date = sDate('notavaliddate');

return date.isValid();
```

Get difference between two dates
```javascript
const sDate = require('simple-date');
let date = sDate();

/*
* Returns {years, months, days, hours, minutes, seconds}
* False if one of the days is invalid
*/
return date.diff('2019-05-23');
```