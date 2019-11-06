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
                    // createCommission(obj[key]
                    // console.log(obj);
                    // console.log('pushed');
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
    // console.log(obj);
    Object.keys(obj).map((key) => {
        // console.log(obj[key]);
        Object.keys(obj[key]).map((k) => {
                // console.log((obj[key][k]).pushed);
            if (obj[key][k].pushed === false) {
                // console.log('found');
                // console.log(obj);
                // console.log(obj[key][k]);

                // Wyślij do serwera
                pushToServer(obj[key][k]);

                // Usun z listy
                // Stworzyć nowy obiekt w localstorage, obiektow nie wysłanych

                // Odśwież liste
                return true;
            }
        })
    });

    return false;
}


function pushToServer(obj)
{
    console.log(obj);
    const requestOptions = {
        'method': 'POST',
        'body': JSON.stringify(obj),
        'headers': {
            'Content-type': 'application-json'
        }
    };

    return fetch(`${config.apiUrl}/${obj.objType}s`, requestOptions)
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
