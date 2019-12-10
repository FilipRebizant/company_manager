import { BehaviorSubject } from 'rxjs';
import { config } from "../config/config";
import {authHeaders, handleResponse} from "../_helpers";
import { storageService } from "./storageService";

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authService = {
    login,
    logout,
    register,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () {
        return currentUserSubject.value
    }
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${config.apiUrl}/auth/login`, requestOptions)
        .then(handleResponse)
        .then((response) => response.json())
        .then(response => {

            const token = response.token;

            fetch(`${config.apiUrl}/auth/user`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => response.json())
                .then(response => {
                    let user = JSON.stringify({
                        "token": token,
                        "user": response.user,
                        "role": response.role
                    });
                    localStorage.setItem('currentUser', user);
                    currentUserSubject.next(user);

                    return user;
                });
        });
}

function logout() {
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}


function register(newUser)
{
    const requestOptions = {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(newUser)
    };

    return fetch(`${config.apiUrl}/auth/register`, requestOptions)
        .then(handleResponse);
}
