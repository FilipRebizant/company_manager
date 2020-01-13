import React, { Component } from 'react';
import { MDBCard, MDBCardBody, MDBCardText, MDBCardHeader, MDBIcon, MDBModal, MDBContainer, MDBModalFooter, MDBModalBody, MDBModalHeader, MDBBtn } from 'mdbreact';
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
            buttonDisabled: false,
            deleteModalIsOpen: false
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
        let currentUser = storageService.getItems('currentUser');
        this.setState({currentUser: currentUser});
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

    handleRemove = () => {
        const { index, status, id } = this.state;
        taskService.deleteTask(id).then(response => {
           if (response.ok) {
                this.props.handleRemove(index, status);
           }
        });
    };

    showRemovePopUp = () => {
        this.setState({
            deleteModalIsOpen: !this.state.deleteModalIsOpen
        });
    };

    render() {
        const { id, description, status, priority, currentUser } = this.state;
        let { employeeAssigned } = this.state;

        let deleteTaskButton;
        if (currentUser && currentUser.role === 'ROLE_ADMIN') {
            let classes = employeeAssigned ? "deleteIcon": "deleteIcon--noUser";
            deleteTaskButton = <span onClick={this.showRemovePopUp} className={classes}><MDBIcon icon="trash" size="1x" className="red-text" /></span>
        }

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
                        <MDBCardHeader >
                            <div className="card-header--upper">
                            { employeeAssigned }
                            </div>
                            { deleteTaskButton }
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
                <MDBContainer>
                    <MDBModal isOpen={this.state.deleteModalIsOpen} toggle={this.showRemovePopUp} centered>
                        <MDBModalHeader toggle={this.showRemovePopUp}>Task will be deleted permanently</MDBModalHeader>
                        <MDBModalBody>Are you sure you want to remove this task?</MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="outline-danger" onClick={this.showRemovePopUp}>No</MDBBtn>
                            <MDBBtn color="outline-primary" onClick={this.handleRemove}>Yes</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                </MDBContainer>
            </div>
        )
    }
}

export { Task };
