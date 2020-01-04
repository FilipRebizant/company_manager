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
    console.log('syncing tasks');
    let commissions = storageService.getItems('notSentTasks');

    console.log(commissions);
    if (commissions) {
        Object.keys(commissions).filter((index) => {
            // console.log(task);
            let tasks = commissions[index];
            const length = tasks.length;
            console.log(tasks);
            console.log(length);
            tasks.filter((task, i) => {
               console.log(task);

            this.pushTask(task).then(() => {
                console.log(tasks);
                console.log(task);
                tasks.shift();
                storageService.setItem(tasks, 'notSentTasks');

                // delete tasks[i];

                console.log(tasks);
                // tasks[i];
                if (tasks.length === 0 ) {
                    console.log('none');
                    storageService.deleteKey('notSentTasks');
                }
            });
               // delete tasks[i];
               // Send task
            //     const currentTaskList = this.state.tasks[status];
            //     const currentState = Object.assign({}, this.state);
            //
            //     // Remove from old list
            //     delete currentTaskList[index];
            //     currentState.tasks[status] = currentTaskList;
            //
            //
            //         this.setState({
            //             currentState
            //         });


                // Remove from List
                // Check if all empty
                // Delete localstoragekey
            });
        //     for (let i = 0; i < length; i++) { // For each task in commission
        //         pushTask(tasks[i]).then((response) => {
        //             if (response.status === 201) {
        //                 console.log(notSentTasks[task]);
        //                 // notSentTasks[task] = arrayRemove(tasks, tasks[i]);
        //                 // localStorage.removeItem('notSentTasks');
        //                 // localStorage.setItem('notSentTasks', JSON.stringify(notSentTasks));
        //
        //                 // syncLocalTasks();
        //             }
        //         });
        //
        //         break;
        //     }
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
