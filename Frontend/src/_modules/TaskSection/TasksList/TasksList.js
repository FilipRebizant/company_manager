import React, { Component } from 'react';
import {taskService} from "../../../_services/index";
import {Task} from "../Task";
import { handleResponse } from "../../../_helpers";
import Spinner from "../../../_components/Spinner/Spinner";

class TasksList extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            tasks: {
              Todo: [],
              Pending: [],
              Done: []
            },
            commissionId: null,
            newTask: this.props.newTask,
        };
    }

    loadTasks = (id, status) => {
        let loaders = document.querySelectorAll('.loader');

        taskService.getTasksWithStatus(id, status)
            .then(handleResponse)
            .then(response => response.json())
            .then((response) => {
                for (var loader of loaders) {
                    loader.classList.add('d-none');
                }
                if (response && response.tasks.length > 0) {
                    if (this._isMounted) {
                        let currState = Object.assign({}, this.state);
                        const status = response.tasks[0].status;
                        currState.tasks[status.toString()] = response.tasks;

                        this.setState(currState);
                    }
                }
            })
    };

    componentDidMount() {
        this._isMounted = true;
        const url = window.location.href;
        const id = parseInt(url.substring(url.lastIndexOf('/') + 1));

        this.setState({
            commissionId: id
        });

        this.loadTasks(id, 'todo');
        this.loadTasks(id, 'pending');
        this.loadTasks(id, 'done');
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    shouldComponentUpdate(instance, nextProps, nextState) {
        if (instance.newTask !== null) {
            this.loadTasks(this.state.commissionId, 'todo');
            this.props.resetNewTask();
        }

        return true;
    }

    handleTaskUpdate = (index, status, newStatus) => {
        const currentTaskList = this.state.tasks[status];
        const currentState = Object.assign({}, this.state);
        let elem = currentTaskList[index];

        // Remove from old list
        delete currentTaskList[index];
        currentState.tasks[status] = currentTaskList;

        // Add to new list
        elem.status = newStatus;
        currentState.tasks[newStatus].push(elem);

        if (this._isMounted) {
            this.setState({
                currentState
            });
        }
    };

    handleRemove = (index, status) => {
        const currentTaskList = this.state.tasks[status];
        const currentState = Object.assign({}, this.state);

        // Remove from old list
        delete currentTaskList[index];
        currentState.tasks[status] = currentTaskList;

        if (this._isMounted) {
            this.setState({
                currentState
            });
        }
    };

    render() {
        const { tasks } = this.state;

        return(
            <div className="d-flex justify-content-around flex-wrap-reverse">
                { Object.keys(tasks).map((set, index) => {
                    return <ul key={index} className="col-md-4">
                        {tasks[set].map((task, i) => {
                            return  <Task
                                    key={i}
                                    id={task.id}
                                    createdAt={task.createdAt}
                                    status={task.status}
                                    priority={task.priority}
                                    employeeAssigned={task.employeeAssigned}
                                    description={task.description}
                                    handleTaskUpdate={(i, status, newStatus) => this.handleTaskUpdate(i, status, newStatus)}
                                    handleRemove={(index, status) => this.handleRemove(index, status)}
                                    index={i}
                                  />
                        })}
                        <Spinner />
                    </ul>
                })}
            </div>
        );
    }
}

export { TasksList };
