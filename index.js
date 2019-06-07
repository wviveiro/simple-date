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
        strdate = `${currdt.getUTCFullYear()}-${f(currdt.getUTCMonth() + 1)}-${f(currdt.getUTCDate())} ${f(currdt.getUTCHours())}:${f(currdt.getUTCMinutes())}:${f(currdt.getUTCSeconds())}`;
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
        str += `T${f(hour)}:${f(minute)}:${f(second)}Z`;


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

        const newStrDate = `${dtObj.getUTCFullYear()}-${f(dtObj.getUTCMonth() + 1)}-${f(dtObj.getUTCDate())}`;
        
        return newStrDate;
    }

    const modify = (num, type) => {
        if (type.substr(0, 3) === 'day') {
            
            dtObj.setUTCDate(dtObj.getUTCDate() + num);
            
        } else if (type.substr(0, 5) === 'month') {
            dtObj.setUTCMonth(dtObj.getUTCMonth() + num);
        } else if (type.substr(0, 5) === 'year') {
            dtObj.setUTCFullYear(dtObj.getUTCFullYear() + num);
        }
    }

    const Months = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const format = (strformat) => {
        if (!isValid()) return false;

        let auxformat = strformat;

        // Year Format
        let year = `${dtObj.getUTCFullYear()}`;
        auxformat = auxformat.replace(/YYYY/g, year);
        auxformat = auxformat.replace(/YY/g, year.substr(year.length - 2));



        // Day Format
        let day = `${dtObj.getUTCDate()}`;
        auxformat = auxformat.replace(/DDD/g, f(day, 3));
        auxformat = auxformat.replace(/DD/g, f(day));
        auxformat = auxformat.replace(/D/g, day);

        // Hour format
        let hours = +dtObj.getUTCHours();
        auxformat = auxformat.replace(/HH/g, f(hours));
        auxformat = auxformat.replace(/H/g, hours);
        let not24 = (hours > 12) ? hours - 12 : (hours === 0) ? 12 : hours;
        auxformat = auxformat.replace(/hh/g, f(not24));
        auxformat = auxformat.replace(/h/g, not24);
        auxformat = auxformat.replace(/a/g, (hours > 12) ? 'pm' : 'am');

        let minutes = +dtObj.getUTCMinutes();
        auxformat = auxformat.replace(/mm/g, f(minutes));
        auxformat = auxformat.replace(/m/g, minutes);

        let seconds = +dtObj.getUTCSeconds();
        auxformat = auxformat.replace(/ss/g, f(seconds));
        auxformat = auxformat.replace(/s/g, seconds);

        // Week day format
        let week = dtObj.getUTCDay();
        if (+week === 0) week = 7;
        auxformat = auxformat.replace(/N/gi, week);
        
        // Month format
        let month = `${dtObj.getUTCMonth() + 1}`;
        auxformat = auxformat.replace(/MMMM/g, Months[month]);
        auxformat = auxformat.replace(/MMM/g, Months[month].substr(0, 3));
        auxformat = auxformat.replace(/MM/g, f(month));
        auxformat = auxformat.replace(/M/g, month);

        

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