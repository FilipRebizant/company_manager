import { config } from "../config/config";
import {authHeaders, handleError, handleResponse} from "../_helpers";
import { storageService } from "./storageService";

function getReports(commissionId)
{
    const requestOptions = {
        'method': 'GET',
        'headers': authHeaders()
    };

    return fetch(`${config.apiUrl}/commissions/${commissionId}/reports`, requestOptions)
        .catch((error => handleError(error)));
}

function pushReport(report)
{
    const requestOptions = {
        'method': 'POST',
        'body': JSON.stringify(report),
        'headers': authHeaders()
    };

    return fetch(`${config.apiUrl}/reports`, requestOptions)
        .then(handleResponse)
        .catch((error => handleError(error)));
}


async function syncLocalReports() {
    const notSentReports = storageService.getItems('notSentReports');
    //
    if (notSentReports) {
    //     Object.keys(notSentReports).forEach((report) => {
    //         // const reports = notSentReports;
    //         const length = notSentReports.length;
    //         console.log(length);
    //         for (let i = 0; i < length; i++) { // For each report in commission
    //             console.log(i);
    //             // console.log(reports);
    //             pushReport(notSentReports[i]).then((response) => {
    //                 if (response.status === 201) {
    //                     //         console.log('successs');
    //                     notSentReports = storageService.arrayRemove(notSentReports, notSentReports[i]);
    //                     localStorage.removeItem('notSentReports');
    //                     localStorage.setItem('notSentReports', JSON.stringify(notSentReports));
    //
    //                     syncLocalReports();
    //                 }
    //             });
    //
    //             break;
    //         }
    //     });
    }
}

export const reportService = {
    getReports,
    syncLocalReports,
    pushReport
};