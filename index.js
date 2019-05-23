/**
 * strdate format 'YYYY-MM-DD HH:mm:ss'
 * If empty strdate, get current date
 *
 * @author Wellington Viveiro <wviveiro@gmail.com>
 **/
const date = (strdate) => {
    // Format number function to add lead 0
    const f = (num) => `0${num}`.substr(`0${num}`.length - 2);
    

    if (!strdate) {
        const currdt = new Date();
        strdate = `${currdt.getFullYear()}-${f(currdt.getMonth() + 1)}-${f(currdt.getDate())} ${f(currdt.getHours())}:${f(currdt.getMinutes())}:${f(currdt.getSeconds())}`;
    }

    let hourSplit = strdate.split(' ');
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    if (hourSplit.length > 1) {
        let hrs = hourSplit[1].split(':');
        if (hrs.length === 3) {
            hours = hrs[0];
            minutes = hrs[1];
            seconds = hrs[2];
        }
        strdate = hourSplit[0];
    }
    
    const aux = strdate.split('-');
    const dtObj = new Date(aux[0], +aux[1] - 1, aux[2], hours, minutes, seconds);

    const isValid = () => {
        return dtObj instanceof Date && !isNaN(dtObj);
    }

    const getDateObj = () => {
        return dtObj;
    }
    

    const getFullDate = () => {
        const newStrDate = `${dtObj.getFullYear()}-${f(dtObj.getMonth() + 1)}-${f(dtObj.getDate())}`;
        return newStrDate;
    }

    const modify = (num, type) => {
        if (type.substr(0, 3) === 'day') {
            dtObj.setDate(dtObj.getDate() + num);
        }else if (type.substr(0, 5) === 'month') {
            dtObj.setMonth(dtObj.getMonth() + num);
        }
    }

    const format = (strformat) => {
        let auxformat = strformat;
        auxformat = auxformat.replace(/YYYY/gi, dtObj.getFullYear());
        auxformat = auxformat.replace(/MM/gi, f(dtObj.getMonth() + 1));
        auxformat = auxformat.replace(/M/gi, dtObj.getMonth() + 1);
        auxformat = auxformat.replace(/DD/gi, f(dtObj.getDate()));
        auxformat = auxformat.replace(/D/gi, dtObj.getDate());

        let week = dtObj.getDay();
        
        if (+week === 0) week = 7;


        auxformat = auxformat.replace(/N/gi, week);

        return auxformat;
    }

    const diff = (date_compare) => {
        const dt = date(date_compare);
        if (!dt.isValid()) return false;

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