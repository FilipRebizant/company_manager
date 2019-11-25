import { config } from "../config/config";
import { handleError } from "../_helpers";
import {storageService} from "./storageService";

function getMaterials(commissionId)
{
    const requestOptions = {
        'method': 'GET',
        'headers': {
            'Content-type': 'application-json'
        }
    };

    return fetch(`${config.apiUrl}/commissions/${commissionId}/materials`, requestOptions)
        .catch((error => handleError(error)));
}

function pushMaterial(material)
{
    const requestOptions = {
        'method': 'POST',
        'body': JSON.stringify(material),
        'headers': {
            'Content-type': 'application-json'
        }
    };

    return fetch(`${config.apiUrl}/materials`, requestOptions)
        .catch((error => handleError(error)));
}


async function syncLocalMaterials() {
    let notSentMaterials = JSON.parse(localStorage.getItem('notSentMaterials'));
    console.log(notSentMaterials);
    if (notSentMaterials) {
        Object.keys(notSentMaterials).filter((material) => {
            // const materials = notSentMaterials;
            const length = notSentMaterials.length;
            console.log(length);
            for (let i = 0; i < length; i++) { // For each material in commission
                console.log(i);
                // console.log(materials);
                pushMaterial(notSentMaterials[i]).then((response) => {
                    if (response.status === 201) {
                //         console.log('successs');
                        notSentMaterials = storageService.arrayRemove(notSentMaterials, notSentMaterials[i]);
                        localStorage.removeItem('notSentMaterials');
                        localStorage.setItem('notSentMaterials', JSON.stringify(notSentMaterials));

                        syncLocalMaterials();
                    }
                });

                break;
            }
        });
    }
}

export const materialService = {
    getMaterials,
    syncLocalMaterials,
    pushMaterial
};