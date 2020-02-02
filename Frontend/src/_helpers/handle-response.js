
export function handleResponse(response) {
    if (401 === response.status) {
        const error = {
            status: 401,
            statusText: "Token has expired"
        };

        return Promise.reject(error);
    }

    if (response.status === 403) {
        const error = {
          status: 403,
          statusText: "You don't have permission to do this action"
        };
        return Promise.reject(error);
    }

    return response;
}