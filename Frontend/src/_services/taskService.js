import {config} from "../config/config";
import {handleError} from "../_helpers";

function pushTask(obj)
{
    // console.log(obj);
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
        return elem != val;
    })
}

function syncLocalTasks() {
    let notSentTasks = JSON.parse(localStorage.getItem('notSentTasks'));
    Object.keys(notSentTasks).filter((task) => {
        let tasks = notSentTasks[task];
        const length = notSentTasks[task].length;
        for (let i = 0; i < length; i++) { // For each task in commission
            pushTask(tasks[i]).then((response) => {
                if (response.status === 201) {
                    var result = arrayRemove(tasks, tasks[i]);

                    notSentTasks[task] = result;
                    console.log('po usunieciu', result);
                    console.log(notSentTasks);
                    localStorage.removeItem('notSentTasks');
                    localStorage.setItem('notSentTasks', JSON.stringify(notSentTasks));

                    syncLocalTasks();
                }
            });
            break;
        }
    });
}

export const taskService = {
    pushTask,
    syncLocalTasks
};