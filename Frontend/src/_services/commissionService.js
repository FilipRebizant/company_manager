import { config } from "../config/config";
import {handleError} from "../_helpers";

export const commissionService = {
    getAll,
    createCommission,
    syncLocalChanges
};

function getAll() {
    const requestOptions = {
        'method': 'GET'
    };

    return fetch(`${config.apiUrl}/commissions`, requestOptions)
        .catch((error => handleError(error)));

}

function syncLocalChanges()
{
    console.log('trying to sync');
    const localCommissions = JSON.parse(localStorage.getItem('localOpenedCommissions'));

    Object.keys(localCommissions).map((key) => {
        let obj = localCommissions[key];
        Object.keys(obj).map((key) => {
            // console.log(typeof obj[key]);
            if (typeof(obj[key]) === 'object') {
                // console.log(obj[key]);
                if (isPushed(obj[key])) {
                    createCommission(obj[key])
                }
            }
        });
    });


    const requestOptions = {
      'method': 'POST'
    };

    // return fetch(`${config.apiUrl}/commissions`, requestOptions);
}

function isPushed(obj)
{
    console.log(obj);
    Object.keys(obj).map((key) => {
        if (obj[key].pushed === false) {
            return true;
        }
    });

    return false;
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
