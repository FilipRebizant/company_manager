import {config} from "../config/config";
import {authHeaders, handleError} from "../_helpers";
import {storageService} from "./storageService";

function pushTask(obj) {
    const requestOptions = {
        'method': 'POST',
        'body': JSON.stringify(obj),
        'headers': authHeaders()
    };

    return fetch(`${config.apiUrl}/tasks`, requestOptions)
        .catch((error => handleError(error)));
}

async function syncLocalTasks() {
    let commissions = storageService.getItems('notSentTasks');

    if (commissions) {
       Object.keys(commissions).filter((index) => {
            let tasks = commissions[index];
            tasks.filter((task) => {
                this.pushTask(task).then(() => {
                    console.log('sending task');
                    tasks.shift();
                    storageService.setItem(tasks, 'notSentTasks');

                    if (tasks.length === 0 ) {
                        console.log('clear, all done');
                        storageService.deleteKey('notSentTasks');
                        storageService.setItem(true, 'shouldRenderTasks');
                        // window.location.reload();
                        var event = new CustomEvent('customSync', {detail: 'value'});
                        window.dispatchEvent(event);
                    }
                });
            });
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
