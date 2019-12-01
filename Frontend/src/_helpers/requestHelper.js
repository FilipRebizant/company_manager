const getCommissionId = () => {
    const url = window.location.href;

    return parseInt(url.substring(url.lastIndexOf('/') + 1));
};

const handleError = (error, status) => {
    if (status === 500) {
        error = 'An error occurred, please try again in few minutes'
    }

    if (error.name === 'AbortError') return;
    throw(error);
};

const handleResponse = (response) => {
    return response.json().then(response => {

            if ([401, 403].indexOf(response.code) !== -1) {


                const error = (response && response.message || response.error.message);

                return Promise.reject(error);
            }
    return response;
    });
};

export { getCommissionId, handleError, handleResponse };
