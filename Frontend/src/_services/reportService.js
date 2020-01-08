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

    if (notSentReports) {
        Object.keys(notSentReports).forEach((index) => {
            let reports = notSentReports[index];
            reports.forEach((report) => {
                this.pushReport(report).then(() => {
                    reports.shift();
                    storageService.setItem(reports, 'notSentReports');

                    if (reports.length === 0) {
                        storageService.deleteKey('notSentReports');

                        const event = new CustomEvent('newReportEvent');
                        window.dispatchEvent(event);
                    }
                });
            });
        });
    }
}

export const reportService = {
    getReports,
    syncLocalReports,
    pushReport
};