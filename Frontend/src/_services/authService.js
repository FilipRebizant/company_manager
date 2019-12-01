export const authService = {
    login,
    logout,
    refreshToken,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${config.apiUrl}/api/login_check`, requestOptions)
        .then(handleResponse)
        .then(response => {
            let user = JSON.stringify({
                "token": response.token,
                "id": response.data.id,
                "username": response.data.username,
                "roles": response.data.roles
            });
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', user);
            currentUserSubject.next(user);

            return user;
        })
}
