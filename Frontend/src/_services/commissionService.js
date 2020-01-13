import { config } from "../_config/config";
import { authHeaders, handleError, handleResponse } from "../_helpers";
import { storageService } from "./storageService";

function getAll() {
    const requestOptions = {
        'method': 'GET',
        'headers': authHeaders()
    };

    return fetch(`${config.apiUrl}/commissions`, requestOptions)
        .then(handleResponse)
        .catch((error => handleError(error)));
}

function syncLocalChanges() {
    let notSentCommissions = storageService.getItems('notSentCommissions');

    Object.keys(notSentCommissions).forEach((commission) => {
        const commissions = notSentCommissions;
        const length = notSentCommissions.length;

        for (let i = 0; i < length; i++) { // For each commission in commission
            console.log(commissions);
            console.log(commissions[i]);
            createCommission(commissions[i]).then((response) => {
                console.log(response);
                if (response.status === 201) {
                    notSentCommissions[commission] = storageService.arrayRemove(commissions, commissions[i]);
                    storageService.setItem(notSentCommissions[commission], 'notSentCommissions');

                    syncLocalChanges();
                }
            });

            break;
        }
    });
}


function createCommission(data)
{
    const requestOptions = {
        'method': 'POST',
        'body': JSON.stringify(data),
        'headers': authHeaders()
    };

    console.log(data);

    return fetch(`${config.apiUrl}/commissions`, requestOptions)
        .catch((error => handleError(error)));
}

function getWorkingHoursSummary(id)
{
    const requestOptions = {
        'method': 'GET',
        'headers': authHeaders()
    };

    return fetch(`${config.apiUrl}/commissions/${id}/summary`, requestOptions)
        .then(handleResponse)
        .catch((error => handleError(error)));
}

export const commissionService = {
    getAll,
    createCommission,
    syncLocalChanges,
    getWorkingHoursSummary
};