import { authService } from '../_services';

export function authHeaders() {
    const currentUser = authService.currentUserValue;

    if (currentUser && currentUser.token) {
        return {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.token}`
        };
    } else {
        return {};
    }
}