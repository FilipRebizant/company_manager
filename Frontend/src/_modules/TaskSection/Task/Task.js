import React, { Component } from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader
} from 'mdbreact';
import {storageService, taskService} from "../../../_services/index";

class Task extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            priority: props.priority,
            status: props.status,
            employeeAssigned: props.employeeAssigned,
            date: props.date,
            description: props.description,
            currentUser: null,
            buttonText: 'Set Pending'
        };
    }

    componentDidMount() {
        let currentUser = storageService.getItems('currentUser');
        this.setState({
            employeeAssigned: currentUser.name
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        // taskService.changeStatus(taskId, newStatus)
        //     .then((response => {
        //         if (response.status === 204) {
        //             statusToChange.childNodes[1].innerText = newStatus;
        //         }
        //     }));
    };

    handleAssign = (e) => {
        e.preventDefault();
        let currentUser = storageService.getItems('currentUser');
        this.setState({
            employeeAssigned: currentUser.name
        });
    };

    render() {
        const { id, description, status, priority, date, buttonText } = this.state;
        let { employeeAssigned } = this.state;
        let text = 'Set Todo';

        // if (props.items[props.date][key].status === 'Todo') {
        //     text = 'Set Pending';
        // } else if (props.items[props.date][key].status === 'Pending') {
        //     text = 'Set Done';
        // }

        if (!employeeAssigned) {
            employeeAssigned = <button onClick={this.handleAssign}>Assign to me</button>;
        }
        return(
            <div className="d-flex justify-content-around flex-wrap-reverse">
                <form action="" className="mb-5" onSubmit={this.handleSubmit}>
                    <MDBCard id={id}>
                        <MDBCardHeader className="d-flex justify-content-between">
                            <p className="small">Created at: { date }</p>
                            <p className="small">Status: <b>{ status }</b></p>
                            <p className="small">Priority: { priority }</p>
                        </MDBCardHeader>
                        <MDBCardBody>
                            <MDBCardTitle>{ employeeAssigned }</MDBCardTitle>
                            <MDBCardText>{ description }</MDBCardText>
                        </MDBCardBody>
                        <div className="custom-control custom-checkbox">
                            <button className="btn btn-black">{ buttonText }</button>
                        </div>
                    </MDBCard>
                </form>
            </div>
        )
    }
}

export { Task };
