import { config } from "../config/config";
import {handleError} from "../_helpers";

export const commissionService = {
    getAll
};

function getAll() {
    const requestOptions = {
        'method': 'GET'
    };

    return fetch(`${config.apiUrl}/commissions`, requestOptions)
        .catch((error => handleError(error)));

}