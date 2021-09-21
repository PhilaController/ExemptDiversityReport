import { FISCAL_YEAR } from "@/config"
import { csv } from 'd3-fetch';



function getFiscalYearTag(fiscalYear) {
    return `FY${fiscalYear.toString().slice(2)}`
}

function getReportTag() {
    return `${getFiscalYearTag(FISCAL_YEAR)}`
}

function getDownloadURL(key) {

    let folder = getReportTag();
    return `https://diversity-report-public.s3.amazonaws.com/${folder}/${key}.csv`;
}

function fetch(key) {
    try {
        let data = csv(getDownloadURL(key));
        return data;
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