const getCommissionId = () => {
    const url = window.location.href;

    return parseInt(url.substring(url.lastIndexOf('/') + 1));
};

export { getCommissionId };