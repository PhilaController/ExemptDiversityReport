import { FISCAL_YEAR, QUARTER } from "@/config"
import { csv } from 'd3-fetch';
import { format } from 'd3-format';



function getFiscalYearTag(fiscalYear) {
    return `FY${fiscalYear.toString().slice(2)}`
}

function getReportTag() {
    return `${getFiscalYearTag(FISCAL_YEAR)}`
}

function getDownloadURL(key) {

    let folder = getReportTag();
    return `https://cash-report-public.s3.amazonaws.com/${folder}/${key}.csv`;
}

function fetch(key) {
    try {
        let data = csv(getDownloadURL(key));
        return data
    } catch (e) {
        console.error(e);
    }
}


export {
    getReportTag,
    getDownloadURL,
    fetch,
    getFiscalYearTag,

}