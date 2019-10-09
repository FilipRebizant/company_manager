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
            status: null,
            progress: 0,
            pushed: false,
            valid: true
        }
    }

    componentDidMount() {
        this.getTasks();
    }

    getTasks = () => {
        // const localTasks = localStorage.getItem('localTasks');
        // const parsedTasks = JSON.parse(localTasks);
        // let lastId = 0;

        // if (parsedTasks) {
        //     lastId = parsedTasks[parsedTasks.length-1].id + 1;
        // }

        // this.setState({
        //     commissionId: lastId
        // });
    };

    toggleModal = () => {
        this.setState({
            modalOpened: !this.state.modalOpened
        });
    };

    handleFormSubmit = () => {
        const {taskId, description, progress, employeeAssigned, status} = this.state;
        const newItem = {
            commissionId: getCommissionId(),
            taskId: taskId,
            description: description,
            employeeAssigned: employeeAssigned,
            status: status,
            progress: progress,
            createdAt: getCurrentDate(),
            pushed: false
        };
        let localTasks = localStorage.getItem('localTasks');

        if (localTasks === null) {
            localTasks = {};
        } else {
            localTasks = JSON.parse(localTasks);
        }

        if (!localTasks[newItem.createdAt]) {
            localTasks[newItem.createdAt] = [];
        }

        if (this.state.valid === true) {
            localTasks[newItem.createdAt].push(newItem);
            localStorage.setItem("localTasks", JSON.stringify(localTasks));

            this.resetInputFields();
        }

        this.getTasks();
        this.props.updateTaskList();
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
