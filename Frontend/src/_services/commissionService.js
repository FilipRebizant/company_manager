import { config } from "../config/config";
import {handleError} from "../_helpers";

export const commissionService = {
    getAll,
    createCommission,
    pushLocalChanges
};

function getAll() {
    const requestOptions = {
        'method': 'GET'
    };

    return fetch(`${config.apiUrl}/commissions`, requestOptions)
        .catch((error => handleError(error)));

}

function pushLocalChanges()
{
    console.log('trying to sync');
    const localCommissions = JSON.parse(localStorage.getItem('localOpenedCommissions'));
    let notPushedData = [];

    Object.keys(localCommissions).map((key) => {
        console.log(localCommissions[key]);
        let obj = localCommissions[key];
        Object.keys(obj).map((key) => {
            // console.log(typeof obj[key]);
            if (typeof(obj[key]) === 'object') {
                // console.log(obj[key]);
            }
        });
    });


    const requestOptions = {
      'method': 'POST'
    };

    // return fetch(`${config.apiUrl}/commissions`, requestOptions);
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
