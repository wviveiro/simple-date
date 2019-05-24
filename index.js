/**
 * strdate
 * If empty strdate, get current date
 *
 * @author Wellington Viveiro <wviveiro@gmail.com>
 **/
const date = (strdate, _format) => {
    // Format number function to add lead 0
    const f = (num, lead = 2) => {
        let str = '';
        for (let i = 1; i <= lead; i++) str += '0';

        return `${str}${num}`.substr(`${str}${num}`.length - lead);
    }
    

    if (!strdate) {
        const currdt = new Date();
        strdate = `${currdt.getFullYear()}-${f(currdt.getMonth() + 1)}-${f(currdt.getDate())} ${f(currdt.getHours())}:${f(currdt.getMinutes())}:${f(currdt.getSeconds())}`;
        _format = 'YYYY-MM-DD HH:mm:ss';
    }

    if (!_format) {
        _format = 'YYYY-MM-DD';
    }

    const buildDate = () => {
        let value = _format.replace(/[YMDHms]/gi, '');

        //remove repeat chars
        value = value.replace(/(.)(?=.*\1)/gi, '');
        
        value = new RegExp(`[${value}]`, 'gi');
        let fm = _format.replace(value, '-').split('-');
        let dt = strdate.replace(value, '-').split('-');
        if (fm.length !== dt.length) return false;

        let year, month, day, hour, minute, second;

        fm.forEach((fmt, index) => {
            if (fmt.indexOf('Y') > -1) {
                year = dt[index];
            } else if (fmt.indexOf('M') > -1) {
                month = f(dt[index]);
            } else if (fmt.indexOf('D') > -1) {
                day = f(dt[index]);
            } else if (fmt.indexOf('H') > -1) {
                hour = f(dt[index]);
            } else if (fmt.indexOf('m') > -1) {
                minute = f(dt[index]);
            } else if (fmt.indexOf('s') > -1) {
                second = f(dt[index]);
            }
        });

        if (!year || !month || !day) return false;

        let str = `${year}-${month}-${day}`;
        if (!hour) hour = 0;
        if (!minute) minute = 0;
        if (!second) second = 0;
        str += `T${f(hour)}:${f(minute)}:${f(second)}`;


        return new Date(str);

        
    }

    const dtObj = buildDate();

    const isValid = () => {
        return dtObj instanceof Date && !isNaN(dtObj);
    }

    const getDateObj = () => {
        return dtObj;
    }
    

    const getFullDate = () => {
        if (!isValid()) return false;

        const newStrDate = `${dtObj.getFullYear()}-${f(dtObj.getMonth() + 1)}-${f(dtObj.getDate())}`;
        return newStrDate;
    }

    const modify = (num, type) => {
        if (type.substr(0, 3) === 'day') {
            dtObj.setDate(dtObj.getDate() + num);
        } else if (type.substr(0, 5) === 'month') {
            dtObj.setMonth(dtObj.getMonth() + num);
        } else if (type.substr(0, 5) === 'year') {
            dtObj.setFullYear(dtObj.getFullYear() + num);
        }
    }

    const format = (strformat) => {
        if (!isValid()) return false;

        let auxformat = strformat;

        // Year Format
        let year = `${dtObj.getFullYear()}`;
        auxformat = auxformat.replace(/YYYY/gi, year);
        auxformat = auxformat.replace(/YY/gi, year.substr(year.length - 2));

        // Month format
        let month = `${dtObj.getMonth() + 1}`;
        auxformat = auxformat.replace(/MM/gi, f(month));
        auxformat = auxformat.replace(/M/gi, month);


        // Day Format
        let day = `${dtObj.getDate()}`;
        auxformat = auxformat.replace(/DDD/gi, f(day, 3));
        auxformat = auxformat.replace(/DD/gi, f(day));
        auxformat = auxformat.replace(/D/gi, day);

        // Hour format
        let hours = +dtObj.getHours();
        auxformat = auxformat.replace(/HH/gi, f(hours));
        auxformat = auxformat.replace(/H/gi, hours);
        let not24 = (hours > 12) ? hours - 12 : (hours === 0) ? 12 : hours;
        auxformat = auxformat.replace(/hh/gi, f(not24));
        auxformat = auxformat.replace(/h/gi, not24);
        auxformat = auxformat.replace(/a/gi, (hours > 12) ? 'pm' : 'am');

        let minutes = +dtObj.getMinutes();
        auxformat = auxformat.replace(/mm/gi, f(minutes));
        auxformat = auxformat.replace(/m/gi, minutes);

        let seconds = +dtObj.getSeconds();
        auxformat = auxformat.replace(/ss/gi, f(seconds));
        auxformat = auxformat.replace(/s/gi, seconds);

        // Week day format
        let week = dtObj.getDay();
        if (+week === 0) week = 7;
        auxformat = auxformat.replace(/N/gi, week);

        return auxformat;
    }

    const diff = (date_compare) => {
        const dt = date(date_compare);
        if (!dt.isValid() || !isValid()) return false;

        let milliseconds = dt.getDateObj() - dtObj;
        if (milliseconds < 0) milliseconds *= -1;

        let calcYear = (1000 * 60 * 60 * 24 * 365);
        let years = Math.floor(milliseconds / calcYear);
        milliseconds -= years * calcYear;

        let calcMonth = (1000 * 60 * 60 * 24 * 30.417);
        let months = Math.floor(milliseconds / calcMonth);
        milliseconds -= months * calcMonth;

        let calcDays = (1000 * 60 * 60 * 24);
        let days = Math.floor(milliseconds / calcDays);
        milliseconds -= days * calcDays;

        let calcHours = (1000 * 60 * 60);
        let hours = Math.floor(milliseconds / calcHours);
        milliseconds -= hours * calcHours;

        let calcMinutes = (1000 * 60);
        let minutes = Math.floor(milliseconds / calcMinutes);
        milliseconds -= minutes * calcMinutes;

        let calcSeconds = (1000);
        let seconds = Math.floor(milliseconds / calcSeconds);
        milliseconds -= seconds * calcSeconds;

        
        return {years, months, days, hours, minutes, seconds};

    }

    return {
        getDateObj,
        getFullDate,
        modify,
        isValid,
        diff,
        format
    }
}

module.exports = date;