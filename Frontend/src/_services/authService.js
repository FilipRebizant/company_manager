import { BehaviorSubject } from 'rxjs';
import { config } from "../config/config";
import { handleResponse } from "../_helpers";
import { storageService } from "./storageService";

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authService = {
    login,
    logout,
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
            let user = JSON.stringify({
                "token": response.token
            });
            localStorage.setItem('currentUser', user);
            currentUserSubject.next(user);

            return user;
        });
}

function logout() {
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}
