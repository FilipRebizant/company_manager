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

function syncLocalTasks() {
    let notSentTasks = JSON.parse(localStorage.getItem('notSentTasks'));
    // console.log(notSentTasks);
    notSentTasks.filter((commission, key) => { // Todo Tu użyć zwykłej pętli, nie foreacha
        console.log(commission);
        for (let i = 0; i < notSentTasks; i++) {

        }
        // console.log(key);
        // console.log(task);
        // pushTask(task).then((response) => {
        //     console.log(response);
        //     if (response.status === 201) {
        // console.log(notSentTasks);
        //         notSentTasks.splice(key);
        //         console.log(notSentTasks);
        //     }
        // })
    });
        // console.log(notSentTasks);
    localStorage.setItem('notSentTasks', JSON.stringify(notSentTasks));
    // localStorage.removeItem('')
}

export const taskService = {
    pushTask,
    syncLocalTasks
};