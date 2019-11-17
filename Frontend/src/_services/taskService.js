import {config} from "../config/config";
import {handleError} from "../_helpers";

function pushTask(obj) {
    const requestOptions = {
        'method': 'POST',
        'body': JSON.stringify(obj),
        'headers': {
            'Content-type': 'application-json'
        }
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
        'headers': {
            'Content-type': 'application-json'
        }
    };

    return fetch(`${config.apiUrl}/tasks/${taskId}`, requestOptions)
        .catch((error => handleError(error)));
}

function getAll(taskId, status)
{
    const requestOptions = {
        'method': 'GET',
        'headers': {
            'Content-type': 'application-json'
        }
    };

    return fetch(`${config.apiUrl}/commissions/${taskId}/tasks/${status}`, requestOptions)
        .catch((error => handleError(error)));
}

export const taskService = {
    getAll,
    pushTask,
    syncLocalTasks,
    changeStatus
};
