const getCurrentDate = () => {
    let today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();

    return `${year}-${month}-${day}`;
};

const getCurrentDateTime = () => {
    let today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const hour = today.getHours() < 10 ? "0" + today.getHours() : today.getHours();
    const minutes = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
    const seconds = today.getSeconds() < 10 ? "0" + today.getSeconds() : today.getSeconds();

    return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
};

const countTimeDifference = (startedAt, finishedAt) => {
    const startedDate = new Date();
    const finishedDate = new Date();
    const startedHours = startedAt.split(":")[0];
    const startedMinutes = startedAt.split(":")[1];
    const finishedHours = finishedAt.split(":")[0];
    const finishedMinutes = finishedAt.split(":")[1];

    startedDate.setHours(startedHours);
    startedDate.setMinutes(startedMinutes);
    finishedDate.setHours(finishedHours);
    finishedDate.setMinutes(finishedMinutes);

    return Math.abs(finishedDate.getTime() - startedDate.getTime()) / 3600000;
};

export { getCurrentDate, countTimeDifference, getCurrentDateTime };