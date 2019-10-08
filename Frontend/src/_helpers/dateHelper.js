const getCurrentDate = () => {
    let today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const hour = today.getHours() < 10 ? "0" + today.getHours() : today.getHours();
    const minutes = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
    const seconds = today.getSeconds() < 10 ? "0" + today.getSeconds() : today.getSeconds();

    return `${year}/${month}/${day} ${hour}:${minutes}:${seconds}`;
};

export { getCurrentDate };