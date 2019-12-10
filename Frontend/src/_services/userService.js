import { config } from "../config/config";
import {authHeaders, handleResponse} from "../_helpers";

function getUsers() {
    const requestOptions = {
        method: 'GET',
        headers: authHeaders()
    };

    return fetch(`${config.apiUrl}/users/`, requestOptions)
        .then(handleResponse)
}

function editUser(user) {
    const requestOptions = {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions)
        .then(handleResponse)
}

export const userService = {
    getUsers,
    editUser
};
