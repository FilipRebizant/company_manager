import { config } from "../config/config";
import {handleError} from "../_helpers";

export const commissionService = {
    getAll,
    createCommission
};

function getAll() {
    const requestOptions = {
        'method': 'GET'
    };

    return fetch(`${config.apiUrl}/commissions`, requestOptions)
        .catch((error => handleError(error)));

}

function createCommission(data)
{
    const requestOptions = {
        'method': 'POST',
        'body': data
    };

    return fetch(`${config.apiUrl}/commissions`, requestOptions)
        .catch((error => handleError(error)));
}
