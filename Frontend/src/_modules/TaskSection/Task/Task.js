import React, { Component } from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBIcon } from 'mdbreact';
import { storageService, taskService } from "../../../_services/index";

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
            index: props.index,
            buttonDisabled: false
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if (this._isMounted) {
            this.setState({buttonDisabled: true});
        }
        const { id, status, index } = this.state;
        let nextStatus;

        switch (status) {
            case 'Todo':
                nextStatus = 'Pending';
                break;
            case 'Pending':
                nextStatus = 'Done';
                break;
            default:
                nextStatus = 'Todo';
                break;
        }
        taskService.changeStatus(id, nextStatus)
            .then((response => {
                if (response.status === 204) {
                    this.props.handleTaskUpdate(index, status, nextStatus);
                }
            }));
    };

    handleAssign = (e) => {
        e.preventDefault();
        let currentUser = storageService.getItems('currentUser');

        const task = {
            id: this.state.id,
            priority: this.state.priority,
            status: this.state.status,
            employeeAssigned: currentUser.name,
            createdAt: this.state.createdAt,
            description: this.state.description,
        };
        taskService.editTask(task).then(response => {
            if (response.ok) {
                this.setState({
                    employeeAssigned: currentUser.name
                });
            }
        });
    };

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    getButton = () => {
         let { buttonText, status, employeeAssigned, buttonDisabled } = this.state;

         if (!employeeAssigned) {
             return <div></div>;
         }

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

         return <button disabled={buttonDisabled} className="btn btn-sm btn-blue">{ buttonText }</button>
    };

    render() {
        const { id, description, status, priority } = this.state;
        let { employeeAssigned } = this.state;

        if (employeeAssigned === null) {
            employeeAssigned = <button className="btn btn-sm btn-outline-blue" onClick={this.handleAssign}>Assign to me <MDBIcon icon="check" /></button>;
        } else {
            employeeAssigned = <div className="employee-wrapper">
                <MDBIcon icon="user-alt" />
                <span className="employee-name">{employeeAssigned}</span>
            </div>;
        }

        return(
            <div className="d-flex justify-content-around flex-wrap-reverse" id={this.state.index}>
                <form action="" className="mb-5" onSubmit={this.handleSubmit} style={{width: '100%'}}>
                    <MDBCard id={id}>
                        <MDBCardHeader className="card-header--upper">
                            { employeeAssigned }
                            </MDBCardHeader>
                        <MDBCardHeader className="card-header--lower">
                            <p className="small">Status: <b>{ status }</b></p>
                            <p className="small">Priority: <b>{ priority }</b></p>
                        </MDBCardHeader>
                        <MDBCardBody>
                            <MDBCardText>{ description }</MDBCardText>
                        </MDBCardBody>
                        <div className="custom-control custom-checkbox">
                            { this.getButton() }
                        </div>
                    </MDBCard>
                </form>
            </div>
        )
    }
}

export { Task };
