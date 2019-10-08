const getCommissionId = () => {
    const url = window.location.href;
    console.log(url.substring(url.lastIndexOf('/') + 1));
    return url.substring(url.lastIndexOf('/') + 1);
};

export { getCommissionId };