import {config} from "../config/config";
import {authHeaders, handleError} from "../_helpers";

function pushTask(obj) {
    const requestOptions = {
        'method': 'POST',
        'body': JSON.stringify(obj),
        'headers': authHeaders()
    };

    return fetch(`${config.apiUrl}/tasks`, requestOptions)
        .catch((error => handleError(error)));
}

function arrayRemove(arr, val) {
    return arr.filter(function (elem) {
        return elem !== val;
    })
}

async function syncLocalTasks() {
    let notSentTasks = JSON.parse(localStorage.getItem('notSentTasks'));
    if (notSentTasks) {
        Object.keys(notSentTasks).filter((task) => {
            const tasks = notSentTasks[task];
            const length = notSentTasks[task].length;

            for (let i = 0; i < length; i++) { // For each task in commission
                pushTask(tasks[i]).then((response) => {
                    if (response.status === 201) {
                        notSentTasks[task] = arrayRemove(tasks, tasks[i]);
                        localStorage.removeItem('notSentTasks');
                        localStorage.setItem('notSentTasks', JSON.stringify(notSentTasks));

                        syncLocalTasks();
                    }
                });

                break;
            }
        });
    }
}

function changeStatus (taskId, status) {
    const requestOptions = {
        'method': 'PATCH',
        'body': JSON.stringify({
            id: taskId,
            status: status
        }),
        'headers': authHeaders()
    };

    return fetch(`${config.apiUrl}/tasks/${taskId}`, requestOptions)
        .catch((error => handleError(error)));
}

function getTasksWithStatus(commissionId, status) {
    const requestOptions = {
        'method': 'GET',
        'headers': authHeaders()
    };

    return fetch(`${config.apiUrl}/commissions/${commissionId}/tasks/${status}`, requestOptions)
        .catch((error => handleError(error)));
}

function getTasks(commissionId) {
    const requestOptions = {
        'method': 'GET',
        'headers': authHeaders()
    };

    return fetch(`${config.apiUrl}/commissions/${commissionId}/tasks`, requestOptions)
        .catch((error => handleError(error)));
}

function editTask(task) {
    console.log(task);
    const requestOptions = {
        'method': 'PUT',
        'headers': authHeaders(),
        'body': JSON.stringify({
            task
        }),
    };

    return fetch(`${config.apiUrl}/tasks/${task.id}`, requestOptions)
        .catch((error => handleError(error)));
}

function deleteTask(id) {
    const requestOptions = {
        'method': 'DELETE',
        'headers': authHeaders(),
    };

    return fetch(`${config.apiUrl}/tasks/${id}`, requestOptions)
        .catch((error => handleError(error)));
}

export const taskService = {
    getTasksWithStatus,
    pushTask,
    syncLocalTasks,
    changeStatus,
    getTasks,
    editTask,
    deleteTask
};
