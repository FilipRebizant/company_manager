import React, { Component } from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader
} from 'mdbreact';
import {storageService, taskService} from "../../../_services/index";

class Task extends Component {

    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            priority: props.priority,
            status: props.status,
            employeeAssigned: props.employeeAssigned,
            createdAt: props.createdAt,
            description: props.description,
            currentUser: null,
            buttonText: null
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

    getButtonText = () => {
      let { buttonText, status } = this.state;

      switch (status) {
          case 'Todo':
              buttonText = 'Set Pending';
              break;
          case 'Pending':
              buttonText = 'Set Done';
              break;
          default:
              buttonText = 'Set Todo';
              break;
      }

    };

    render() {
        const { id, description, status, priority, createdAt, buttonText } = this.state;
        let { employeeAssigned } = this.state;
        let text = 'Set Todo';


        if (!employeeAssigned) {
            employeeAssigned = <button onClick={this.handleAssign}>Assign to me</button>;
        }
        return(
            <div className="d-flex justify-content-around flex-wrap-reverse">
                <form action="" className="mb-5" onSubmit={this.handleSubmit}>
                    <MDBCard id={id}>
                        <MDBCardHeader className="d-flex justify-content-between">
                            <p className="small">Created at: { createdAt }</p>
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
