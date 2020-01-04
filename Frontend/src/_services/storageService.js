function getItems(name) {
    let items = JSON.parse(localStorage.getItem(name));
    if (!items) {
        items = [];
    }

    return items;
}

function setItem(item, name) {
    localStorage.removeItem(name);
    localStorage.setItem(name, JSON.stringify(item));
}

function addItem(item, name) {
    let currentItems = this.getItems(name);

    if (!currentItems) {
        currentItems = [];
    }

    currentItems.push(item);
    localStorage.setItem(name, JSON.stringify(currentItems));
}

function removeItem(item, name) {
    // TODO Implement this method
    // let currItems = localStorage.
    // arrayRemove()
        // notSentTasks[task] = arrayRemove(tasks, tasks[i]);
    // localStorage.removeItem('notSentTasks');
    // localStorage.setItem('notSentTasks', JSON.stringify(notSentTasks));
}

function arrayRemove(arr, val) {
    return arr.filter(function (elem) {
        return elem !== val;
    })
}

function deleteKey(name) {
    localStorage.removeItem(name);
}

function checkLocalStorageSpace(){
    var allStrings = '';
    for(var key in window.localStorage){
        if(window.localStorage.hasOwnProperty(key)){
            allStrings += window.localStorage[key];
        }
    }
    return allStrings ? 3 + ((allStrings.length*16)/(8*1024)) + ' KB' : 'Empty (0 KB)';
}

export const storageService = {
    getItems,
    addItem,
    removeItem,
    arrayRemove,
    setItem,
    checkLocalStorageSpace,
    deleteKey
};
