import React, { Component } from 'react';
import {taskService} from "../../../_services/index";
import {Task} from "../Task";
import {handleResponse} from "../../../_helpers";

class TasksList extends Component {


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

                        // let currState = Object.assign({}, this.state);
                        // const status = response.tasks[0].status;
                        //
                        // currState.tasks[status.toString()] = response.tasks;
                        // this.setState(currState);
                    }

                })

    };

    componentDidMount() {
        // console.log(this.props);
        const url = window.location.href;
        const id = parseInt(url.substring(url.lastIndexOf('/') + 1));
        // console.log(id);
        this.setState({
            commissionId: id
        });
        // console.log(this.state.commissionId);

        this.loadTasks(id, 'todo');
        // this.loadTasks('pending');
        // this.loadTasks('done');
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const taskId = e.target.elements.taskId.value;
        const status = e.target.elements.status.value;
        let newStatus = 'Todo';
        let statusToChange = document.getElementById(`task${taskId}`);

        if (status === 'Todo') {
            newStatus = 'Pending'
        }

        if (status === 'Pending') {
            newStatus = 'Done'
        }

        taskService.changeStatus(taskId, newStatus)
            .then((response => {
                if (response.status === 204) {
                    statusToChange.childNodes[1].innerText = newStatus;
                }
            }));
    };

    render() {
        const props = this.props;
        return(
            <div className="d-flex justify-content-around flex-wrap-reverse">
                { Object.keys(props.items[props.date]).map((key) => {
                    return (
                      <Task
                        key={key}
                        id={'id'}
                        date={'date'}
                        status={'status'}
                        priority={'priority'}
                        employeeAssigned={null}
                        description={"Description"}
                      />
                    )
                })}
            </div>
        )
    }
}

export { TasksList };
