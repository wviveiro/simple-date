# Simple Date

## Simple date package with just basic functions.


**format** Format dates:

| Mask | Description | Example |
|---|---|---|
| DD | Day of the month | 01 to 31|
| D | Day of the month | 1 to 31|
| MM | Month of the year | 01 to 12|
| M | Month of the year | 1 to 12|
| YYYY | Year | 2019...2030, etc|
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