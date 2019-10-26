const getCommissionId = () => {
    const url = window.location.href;

    return parseInt(url.substring(url.lastIndexOf('/') + 1));
};

export { getCommissionId, handleError };

const handleError = (error, status) => {
    if (status === 500) {
        error = 'An error occurred, please try again in few minutes'
    }

    if (error.name === 'AbortError') return;
    throw(error);
};