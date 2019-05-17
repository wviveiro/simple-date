/**
 * strdate format 'YYYY-MM-DD'
 * If empty strdate, get current date
 *
 * @author Wellington Viveiro <wviveiro@gmail.com>
 **/
const date = (strdate) => {
    // Format number function to add lead 0
    const f = (num) => `0${num}`.substr(`0${num}`.length - 2);

    if (!strdate) {
        const currdt = new Date();
        strdate = `${currdt.getFullYear()}-${f(currdt.getMonth() + 1)}-${f(currdt.getDate())}`;
    }

    const aux = strdate.split('-');
    const dtObj = new Date(aux[0], +aux[1] - 1, aux[2]);

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

    return {
        getDateObj,
        getFullDate,
        modify,
        format
    }
}

module.exports = date;