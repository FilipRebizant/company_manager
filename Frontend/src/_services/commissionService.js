import { config } from "../config/config";
import {authHeaders, handleError} from "../_helpers";
import {storageService} from "./storageService";

export const commissionService = {
    getAll,
    createCommission,
    syncLocalChanges
};

function getAll() {
    const requestOptions = {
        'method': 'GET',
        'headers': authHeaders()
    };

    return fetch(`${config.apiUrl}/commissions`, requestOptions)
        .catch((error => handleError(error)));

}

function syncLocalChanges()
{
    let notSentCommissions = storageService.getItems('notSentCommissions');

    Object.keys(notSentCommissions).filter((commission) => {
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

    // console.log('trying to sync');
    // const localCommissions = JSON.parse(localStorage.getItem('localOpenedCommissions'));

    // Object.keys(localCommissions).map((key) => {
    //     let obj = localCommissions[key];
    //     Object.keys(obj).map((key) => {
    //         // console.log(typeof obj[key]);
    //         if (typeof(obj[key]) === 'object') {
    //             // console.log(obj[key]);
    //             if (isPushed(obj[key])) {
    //                 // createCommission(obj[key]
    //                 // console.log(obj);
    //                 // console.log('pushed');
    //             }
    //         }
    //     });
    // });


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
                // pushToServer(obj[key][k]);

                // Usun z listy
                // Stworzyć nowy obiekt w localstorage, obiektow nie wysłanych

                // Odśwież liste
                return true;
            }
        })
    });

    return false;
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
