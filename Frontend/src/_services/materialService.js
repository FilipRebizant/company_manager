import { config } from "../config/config";
import {authHeaders, handleError} from "../_helpers";
import { storageService } from "./storageService";

function getMaterials(commissionId)
{
    const requestOptions = {
        'method': 'GET',
        'headers': authHeaders()
    };

    return fetch(`${config.apiUrl}/commissions/${commissionId}/materials`, requestOptions)
        .catch((error => handleError(error)));
}

function pushMaterial(material)
{
    const requestOptions = {
        'method': 'POST',
        'body': JSON.stringify(material),
        'headers': authHeaders()
    };

    return fetch(`${config.apiUrl}/materials`, requestOptions)
        .catch((error => handleError(error)));
}

async function syncLocalMaterials() {
    let commissions = storageService.getItems('notSentMaterials');

    if (commissions) {
        Object.keys(commissions).forEach((index) => {
            let materials = commissions[index];
            materials.forEach((material) => {
                console.log(materials);
                this.pushMaterial(material).then(() => {
                    materials.shift();
                    storageService.setItem(materials, 'notSentMaterials');

                    if (materials.length === 0) {
                        storageService.deleteKey('notSentMaterials');

                        const event = new CustomEvent('newMaterialEvent');
                        window.dispatchEvent(event);
                    }
                });
            });
        });
    }
}

export const materialService = {
    getMaterials,
    syncLocalMaterials,
    pushMaterial
};