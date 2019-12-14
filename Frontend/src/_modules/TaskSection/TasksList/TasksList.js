import React, { Component } from 'react';
import {taskService} from "../../../_services/index";
import {Task} from "../Task";
import {handleResponse} from "../../../_helpers";

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
            commissionId: null
        };
    }

    loadTasks = (id, status) => {
    // console.log(this.props);
        let loaders = document.querySelectorAll('.loader');


            taskService.getTasksWithStatus(id, status)
                .then(handleResponse)
                .then(response => response.json())
                .then((response) => {
                    for (var loader of loaders) {
                        loader.classList.add('d-none');
                    }
                    console.log(response);
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
        // console.log(this.props);
        const url = window.location.href;
        const id = parseInt(url.substring(url.lastIndexOf('/') + 1));
        // console.log(id);
        if (this._isMounted) {
            this.setState({
                commissionId: id
            });
        }
        // console.log(this.state.commissionId);

        this.loadTasks(id, 'todo');
        this.loadTasks(id, 'pending');
        // this.loadTasks(id, 'done');
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const { tasks } = this.state;
        return(
            <div className="d-flex justify-content-around flex-wrap-reverse">
                { Object.keys(tasks).map((set, index) => {
                    return <ul key={index}>
                        {tasks[set].map((task, i) => {
                            return  <Task
                                    key={i}
                                    id={task.id}
                                    createdAt={'date'}
                                    status={task.status}
                                    priority={task.priority}
                                    employeeAssigned={this.employeeAssigned}
                                    description={"Description"}
                                  />
                        })}
                    </ul>
                })}
            </div>
        );
    }
}

export { TasksList };
