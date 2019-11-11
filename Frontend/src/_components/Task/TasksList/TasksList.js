import React, { Component } from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader
} from 'mdbreact';
import {taskService} from "../../../_services";

class TasksList extends Component {

    handleSubmit = (e) => {
        e.preventDefault();

        const taskId = e.target.elements.taskId.value;
        const status = e.target.elements.status.value;
        let newStatus = null;

        if (status === 'Todo') {
            newStatus = 'Pending'
        }

        if (status === 'Pending') {
            newStatus = 'Done'
        }

        taskService.changeStatus(taskId, newStatus)
            .then((response => {
                console.log(response);
                if (response.status === 204) {
                    // TODO: remove from list
                }
            }));

    };

    render() {
        return(
            <div className="d-flex justify-content-around flex-wrap-reverse">
                { Object.keys(this.props.items[this.props.date]).map((key) => {
                    return (
                        <React.Fragment key={key}>
                            <form action="" className="mb-5" onSubmit={this.handleSubmit}>
                                <MDBCard  id={this.props.id}>
                                    <MDBCardHeader className="d-flex justify-content-between">
                                        <p className="small">Created at: { this.props.date }</p>
                                        <p className="small">Status: <b>{this.props.items[this.props.date][key].status}</b></p>
                                    </MDBCardHeader>
                                    <MDBCardBody>
                                        <MDBCardTitle>{this.props.items[this.props.date][key].employeeAssigned}</MDBCardTitle>
                                        <MDBCardText>{this.props.items[this.props.date][key].description}</MDBCardText>
                                    </MDBCardBody>
                                    <div className="custom-control custom-checkbox">
                                        <button className="btn btn-black">Close task</button>
                                    </div>
                                </MDBCard>
                                <input type="hidden" name="taskId" value={this.props.items[this.props.date][key].id} />
                                <input type="hidden" name="status" value={this.props.items[this.props.date][key].status} />
                            </form>
                        </React.Fragment>
                    )
                })}
            </div>
        )
    }
}

export { TasksList };
