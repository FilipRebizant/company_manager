import { config } from "../config/config";
import { handleError } from "../_helpers";

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


export const materialService = {
    getMaterials,
    pushMaterial
};