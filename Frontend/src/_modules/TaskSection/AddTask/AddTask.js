import React, {Component} from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { Label } from "../../../_components/atoms/Label/index";
import { Input } from "../../../_components/atoms/Input/index";
import {getCurrentDate, getCommissionId, handleResponse} from "../../../_helpers/index";
import {storageService, taskService} from '../../../_services/index';
import Spinner from "../../../_components/Spinner/Spinner";


class AddTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commissionId: '',
            taskId: '',
            modalOpened: false,
            description: '',
            employeeAssigned: '',
            createdAt: '',
            status: 'ToDo',
            valid: true,
            isShowingAlert: false,
            alert: '',
            alertStatus: '',
            priority: '1',
            isShowingLoader: false
        }
    }

    toggleModal = () => {
        this.setState({
            modalOpened: !this.state.modalOpened
        });
    };

    validate = (task) => {
        if (task.description === '') {
            this.setState({
                alert: 'Description of task can not be empty',
                alertStatus: 'danger',
                isShowingAlert: true
            });

            return false;
        }

        return true;
    };

    addNewTask = (newTask) => {
        this.setState({
            isShowingAlert: false,
            isShowingLoader: true
        });
        taskService.pushTask(newTask)
            .then(handleResponse)
            .then((response) => {
                console.log(response);
                if (!response.ok) {
                    this.saveLocally(newTask);
                } else { // Response ok
                    this.setState({
                        alert: 'Task has been added',
                        alertStatus: 'success',
                        isShowingAlert: true,
                        isShowingLoader: false
                    });
                    newTask.id = response.id;
                    this.props.updateTaskList(newTask);
                }

            })
            .catch((error) => {
                if (error.status === 401) {
                    this.saveLocally(newTask);
                }
                this.setState({
                    isShowingError: true,
                    error: error.statusText
                });
            });
    };

    saveLocally = (newTask) => {
        let currentNotSentTasks = JSON.parse(localStorage.getItem('notSentTasks'));

        if (!currentNotSentTasks) {
            currentNotSentTasks = {};
        }
        if (!currentNotSentTasks[newTask.commissionId]) {
            currentNotSentTasks[newTask.commissionId] = [];
        }
        currentNotSentTasks[newTask.commissionId].push(newTask);
        localStorage.setItem('notSentTasks', JSON.stringify(currentNotSentTasks));
        this.props.updateTaskList(newTask);
    };

    prepareNewTask = () => {
        const {taskId, description, employeeAssigned, status, priority} = this.state;
        let { createdAt } = this.state;
        if (createdAt === '') {
            createdAt = getCurrentDate();
        }

        return {
            commissionId: getCommissionId(),
            id: taskId,
            description: description,
            employeeAssigned: employeeAssigned,
            status: status,
            createdAt: createdAt,
            priority: priority
        };
    };

    handleFormSubmit = () => {
        const newTask = this.prepareNewTask();

        if (this.validate(newTask)) {
            this.addNewTask(newTask);
            this.resetInputFields();
        }
    };

    resetInputFields = () => {
        this.setState({
            taskId: '',
            description: '',
            employeeAssigned: ''
        })
    };

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    render() {
        let alertContainer;
        let spinnerContainer;

        const { isShowingAlert, isShowingLoader, alert, alertStatus } = this.state;
        if (isShowingAlert) {
            alertContainer = <div className={`alert alert-${alertStatus}`} id="loginErrorContainer">{alert}</div>;
        }

        if (isShowingLoader) {
           spinnerContainer = <Spinner notFullHeight/>
        }

        return (
            <MDBContainer>
                <MDBBtn className="btn btn-outline-blue" onClick={this.toggleModal}>Add Task</MDBBtn>
                <MDBModal isOpen={this.state.modalOpened} toggle={this.toggleModal}>
                    <MDBModalHeader className="justify-content-center" toggle={this.modalOpened}>Add Task</MDBModalHeader>
                    <MDBModalBody>
                        {alertContainer}
                        {spinnerContainer}

                        <form onSubmit={this.handleFormSubmit}>

                            <div className="form-group">
                                <Label for="description"/>
                                <textarea className="form-control" rows="3" name="description" value={this.state.description} onChange={this.handleChange}/>
                            </div>

                            <div className="form-group">
                                <Label for="employeeAssigned"/>
                                <select value={this.state.employeeAssigned} className="form-control" name="employeeAssigned" id="employeeAssigned" onChange={this.handleChange}>
                                    <option value=""></option>
                                    <option value="John Doe">John Doe</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <Label for="priority"/>
                                <select defaultValue={"1"} className="form-control" name="priority" id="priority" onChange={this.handleChange}>
                                    <option value="1">Low</option>
                                    <option value="2">Medium</option>
                                    <option value="3">High</option>
                                </select>
                            </div>

                            <Input type="hidden" name="status" value={this.state.status} />
                        </form>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn className="btn btn-outline-red" onClick={this.toggleModal}>Close</MDBBtn>
                        <MDBBtn className="btn btn-outline-blue" onClick={this.handleFormSubmit}>Add Task</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        );
    }
}

export { AddTask }
