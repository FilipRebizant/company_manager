import React, {Component} from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { Label } from "../../atoms/Label";
import { Input } from "../../atoms/Input";
import {getCurrentDate, getCommissionId, handleResponse} from "../../../_helpers/";
import {storageService, taskService} from '../../../_services/';

class AddTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commissionId: '',
            taskId: "",
            modalOpened: false,
            description: '',
            employeeAssigned: '',
            createdAt: '',
            status: "ToDo",
            pushed: false,
            valid: true,
            isShowingError: false,
            error: ''
        }
    }

    toggleModal = () => {
        this.setState({
            modalOpened: !this.state.modalOpened
        });
    };

    validate = (task) => {
        return true;
    };

    addNewTask = (newTask) => {
        let commissions =  storageService.getItems('localOpenedCommissions');
        taskService.pushTask(newTask)
            .then(handleResponse)
            .then((response) => {
                console.log(response);
                if (!response.ok) {
                    this.saveLocally(newTask);
                } else {
                    console.log(newTask);
                    newTask.id = response.id;
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

        // if (commissions) {
        //     for (let elem in commissions) {
        //         if (commissions[elem].id === newTask.commissionId) {
        //             if (!commissions[elem].tasks[newTask.createdAt]) {
        //                 commissions[elem].tasks[newTask.createdAt] = [];
        //             }
        //
        //         }
        //     }
        // } else {
            // storageService.addItem(newTask, )
            // if (!commissions[elem].tasks[newTask.createdAt]) {
            //     commissions[elem].tasks[newTask.createdAt] = [];
            // }
        // }

        // this.props.updateTaskList(newTask);
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
    };

    prepareNewTask = () => {
        const {taskId, description, employeeAssigned, status} = this.state;
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
            pushed: false,
            objType: 'task'
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
        let errorContainer;

        if (this.state.isShowingError) {
            errorContainer = <div className="alert alert-danger" id="loginErrorContainer">{this.state.error}</div>;
        }

        return (
            <MDBContainer>
                <MDBBtn className="btn btn-outline-blue" onClick={this.toggleModal}>Add Task</MDBBtn>
                <MDBModal isOpen={this.state.modalOpened} toggle={this.toggleModal}>
                    <MDBModalHeader className="justify-content-center" toggle={this.modalOpened}>Add Task</MDBModalHeader>
                    <MDBModalBody>
                        {errorContainer}

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
