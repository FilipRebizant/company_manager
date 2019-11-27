import { config } from "../config/config";
import { handleError } from "../_helpers";
import { storageService } from "./storageService";

function getReports(commissionId)
{
    const requestOptions = {
        'method': 'GET',
        'headers': {
            'Content-type': 'application-json'
        }
    };

    return fetch(`${config.apiUrl}/commissions/${commissionId}/reports`, requestOptions)
        .catch((error => handleError(error)));
}

function pushReport(report)
{
    const requestOptions = {
        'method': 'POST',
        'body': JSON.stringify(report),
        'headers': {
            'Content-type': 'application-json'
        }
    };

    return fetch(`${config.apiUrl}/reports`, requestOptions)
        .catch((error => handleError(error)));
}


async function syncLocalReports() {
    let notSentReports = JSON.parse(localStorage.getItem('notSentReports'));
    console.log(notSentReports);
    if (notSentReports) {
        Object.keys(notSentReports).filter((report) => {
            // const reports = notSentReports;
            const length = notSentReports.length;
            console.log(length);
            for (let i = 0; i < length; i++) { // For each report in commission
                console.log(i);
                // console.log(reports);
                pushReport(notSentReports[i]).then((response) => {
                    if (response.status === 201) {
                        //         console.log('successs');
                        notSentReports = storageService.arrayRemove(notSentReports, notSentReports[i]);
                        localStorage.removeItem('notSentReports');
                        localStorage.setItem('notSentReports', JSON.stringify(notSentReports));

                        syncLocalReports();
                    }
                });

                break;
            }
        });
    }
}

export const reportService = {
    getReports,
    syncLocalReports,
    pushReport
};