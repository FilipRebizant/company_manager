// import { authenticationService } from '../_services';

export function handleResponse(response) {

    return response.json().then(response => {

        if ([401, 403].indexOf(response.code) !== -1) {
            const error = (response && response.message || response.error.message);

            return Promise.reject(error);
        }

        return response.json();
    });
}