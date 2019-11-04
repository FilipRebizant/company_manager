import React, {Component} from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { Label } from "../../atoms/Label";
import { Input } from "../../atoms/Input";
import { getCurrentDate, getCommissionId } from "../../../_helpers/";

class AddTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commissionId: null,
            taskId: null,
            modalOpened: false,
            description: '',
            employeeAssigned: null,
            createdAt: '',
            status: "New",
            progress: 0,
            pushed: false,
            valid: true
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
        let commissions =  JSON.parse(localStorage.getItem('localOpenedCommissions'));

        for (let elem in commissions) {
            if (commissions[elem].id === newTask.commissionId) {
                if (!commissions[elem].tasks[newTask.createdAt]) {
                    commissions[elem].tasks[newTask.createdAt] = [];
                }

                commissions[elem].tasks[newTask.createdAt].push(newTask);
                localStorage.removeItem('localOpenedCommissions');
                localStorage.setItem('localOpenedCommissions', JSON.stringify(commissions));
            }
        }
    };

    getNewTask = () => {
        const {taskId, description, progress, employeeAssigned, status} = this.state;
        let { createdAt } = this.state;
        if (createdAt === '') {
            createdAt = getCurrentDate();
        }

        return {
            commissionId: getCommissionId(),
            taskId: taskId,
            description: description,
            employeeAssigned: employeeAssigned,
            status: status,
            progress: progress,
            createdAt: createdAt,
            pushed: false
        };
    };

    handleFormSubmit = () => {
        const newTask = this.getNewTask();

        if (this.validate(newTask)) {
            this.addNewTask(newTask);
            this.resetInputFields();
            this.props.updateTaskList();
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
        return (
            <MDBContainer>
                <MDBBtn color="primary" onClick={this.toggleModal}>Add Task</MDBBtn>
                <MDBModal isOpen={this.state.modalOpened} toggle={this.toggleModal}>
                    <MDBModalHeader className="justify-content-center" toggle={this.modalOpened}>Add Task</MDBModalHeader>
                    <MDBModalBody>
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

                            <Input type="hidden" name="taskId" value={this.state.taskId} />
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
