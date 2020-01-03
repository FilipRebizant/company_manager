import React, {Component} from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { Label } from "../../../_components/atoms/Label/index";
import { Input } from "../../../_components/atoms/Input/index";
import {getCurrentDate, getCommissionId, handleResponse} from "../../../_helpers/index";
import {storageService, taskService, userService} from '../../../_services/index';
import Spinner from "../../../_components/Spinner/Spinner";


class AddTask extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            commissionId: '',
            modalOpened: false,
            description: '',
            employeeAssigned: "false",
            createdAt: '',
            status: 'ToDo',
            priority: '0',
            estimatedTime: 0,
            valid: true,
            isShowingAlert: false,
            alert: '',
            alertStatus: '',
            isShowingLoader: false,
            showEstimation: false,
            users: []
        }
    }

    componentDidMount() {
        this._isMounted = true;
            userService.getUsers()
                .then(response => response.json())
                .then((response) => {
                    console.log(response);
                    this.setState({
                        users: response.users
                    });
                });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    toggleModal = () => {
        this.setState({
            modalOpened: !this.state.modalOpened
        });
    };

    validate = (task) => {
        console.log(task);
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
            .then(response => response.json())
            .then((response) => {
                if (!response.id) {
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
        const { description, employeeAssigned, status, priority, estimatedTime} = this.state;
        let { createdAt } = this.state;
        if (createdAt === '') {
            createdAt = getCurrentDate();
        }

        return {
            commissionId: getCommissionId(),
            description: description,
            employeeAssigned: employeeAssigned,
            status: status,
            createdAt: createdAt,
            priority: priority,
            estimatedTime: estimatedTime
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
            employeeAssigned: '',
            estimatedTime: '',
        })
    };

    handleChange = (e) => {
        let employeeSelected = ("false" != this.state.employeeAssigned);

        if (employeeSelected) {
            this.setState({
                    [e.target.name]: e.target.value,
                    showEstimation: true
                });
        } else {
            this.setState({
                [e.target.name]: e.target.value,
                showEstimation: false
            });
        }
    };

    estimateCost = () => {
        const { estimatedTime, users, employeeAssigned } = this.state;
        let salary = 0;
        if (users[employeeAssigned]) {
            salary = users[employeeAssigned].salary
        }

        return estimatedTime * salary;
    };

    render() {
        let alertContainer, spinnerContainer, estimationContainer;

        const {
            isShowingAlert,
            isShowingLoader,
            alert,
            alertStatus,
            estimatedTime,
            description,
            employeeAssigned,
            showEstimation,
            users
        } = this.state;

        if (isShowingAlert) {
            alertContainer = <div className={`alert alert-${alertStatus}`} id="loginErrorContainer">{alert}</div>;
        }

        if (isShowingLoader) {
           spinnerContainer = <Spinner notFullHeight/>
        }

        if (showEstimation) {
            estimationContainer = <div className="alert alert-info">Estimated Cost: { this.estimateCost() } USD</div>
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
                                <textarea className="form-control" rows="3" name="description" value={description} onChange={this.handleChange}/>
                            </div>

                            <div className="form-group">
                                <Label for="employeeAssigned"/>
                                <select value={employeeAssigned} className="form-control" name="employeeAssigned" id="employeeAssigned" onChange={this.handleChange}>
                                    <option value={false}></option>
                                    {users.map((user, index) => {
                                        return <option key={index} value={user.id}>{user.firstName} {user.lastName}</option>
                                    })}
                                </select>
                            </div>

                            <div className="form-group">
                                <Label for="priority"/>
                                <select defaultValue={"0"} className="form-control" name="priority" id="priority" onChange={this.handleChange}>
                                    <option value="0">Low</option>
                                    <option value="1">Medium</option>
                                    <option value="2">High</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <Label for="estimatedTime"/>
                                <Input type="number" name="estimatedTime" value={estimatedTime} onChange={this.handleChange}/>
                            </div>

                            { estimationContainer }

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
