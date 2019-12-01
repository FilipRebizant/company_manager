import React, { Component } from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader
} from 'mdbreact';
import {taskService} from "../../../_services";

class TasksList extends Component {


    loadTasks = (status) => {
    // console.log(this.props);
        let loaders = document.querySelectorAll('.loader');

        taskService.getTasksWithStatus(this.props.id, status)
            .then((response) => {
                for (var loader of loaders) {
                    loader.classList.add('d-none');
                }
                // console.log(response);
                // if (response && response.tasks.length > 0) {
                //     let currState = Object.assign({},  this.state);
                //     const status = response.tasks[0].status;
                //
                //     currState.tasks[status.toString()] = response.tasks;
                //     this.setState(currState);
                // }

            })
    };

    componentDidMount() {
        // console.log(this.props);
        this.loadTasks('todo');
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
                    let text = 'Set Todo';

                    if (props.items[props.date][key].status === 'Todo') {
                        text = 'Set Pending';
                    } else if (props.items[props.date][key].status === 'Pending') {
                        text = 'Set Done';
                    }

                    return (
                        <React.Fragment key={key}>
                            <form action="" className="mb-5" onSubmit={this.handleSubmit}>
                                <MDBCard  id={props.id}>
                                    <MDBCardHeader className="d-flex justify-content-between">
                                        <p className="small">Created at: { props.date }</p>
                                        <p id={`task${props.items[props.date][key].id}`} className="small">Status: <b>{props.items[props.date][key].status}</b></p>
                                    </MDBCardHeader>
                                    <MDBCardBody>
                                        <MDBCardTitle>{props.items[props.date][key].employeeAssigned}</MDBCardTitle>
                                        <MDBCardText>{props.items[props.date][key].description}</MDBCardText>
                                    </MDBCardBody>
                                    <div className="custom-control custom-checkbox">
                                        <button className="btn btn-black">{ text }</button>
                                    </div>
                                </MDBCard>
                                <input type="hidden" name="taskId" value={props.items[props.date][key].id} />
                                <input type="hidden" name="status" value={props.items[props.date][key].status} />
                            </form>
                        </React.Fragment>
                    )
                })}
            </div>
        )
    }
}

export { TasksList };
