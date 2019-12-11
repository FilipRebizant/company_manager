import React, {Component} from 'react';
import { MDBContainer, MDBBtn, MDBModalBody } from 'mdbreact';
import { Label } from "../../../_components/atoms/Label/index";
import { Input } from "../../../_components/atoms/Input/index";
import {authService} from "../../../_services/index";

class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpened: true,
            id: '',
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            role: '',
            salary: 0,
            error: null,
            success: null,
            isShowingSuccess: false,
            isShowingError: false
        }
    }

    handleFormSubmit = () => {
        const {firstName, lastName, email, username, password, role, salary} = this.state;
        const newUser = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            username: username,
            password: password,
            role: role,
            salary: salary
        };

        authService.register(newUser)
            .then((response => {
                console.log(response);
                if (response.status === 201) {
                    this.setState({
                        isShowingSuccess: true,
                        success: "User has been added"
                    });
                    this.resetInputFields();

                    setTimeout(() => {
                        this.setState({
                            isShowingSuccess: false
                        })
                    }, 5000);
                }
            })).catch(() => {
                this.setState({
                    isShowingError: true,
                    error: "Something went wrong, please correct input data"
                });

                window.setTimeout(() => {
                    this.setState({
                        isShowingError: false
                    });
                }, 5000);
            });

    };

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    resetInputFields = () => {
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
            role: '',
            salary: '',
        })
    };

    render() {

        let notificationContainer;

        if (this.state.isShowingError) {
            notificationContainer = <div className="alert alert-danger">{this.state.error}</div>;
        }

        if (this.state.isShowingSuccess) {
            notificationContainer = <div className="alert alert-success">{this.state.success}</div>;
        }

        return (
            <MDBContainer>
                    <h2 className="justify-content-center mt-5">Add User</h2>

                    {notificationContainer}

                    <MDBModalBody>
                        <form onSubmit={this.handleFormSubmit}>
                            <div className="form-group">
                                <Label for="firstName"/>
                                <Input name="firstName" value={this.state.firstName} onChange={this.handleChange} />
                            </div>

                            <div className="form-group">
                                <Label for="lastName"/>
                                <Input name="lastName" value={this.state.lastName} onChange={this.handleChange}/>
                            </div>

                            <div className="form-group">
                                <Label for="username"/>
                                <Input name="username" value={this.state.username} onChange={this.handleChange}/>
                            </div>

                            <div className="form-group">
                                <Label for="email"/>
                                <Input type="email" name="email" value={this.state.email} onChange={this.handleChange}/>
                            </div>

                            <div className="form-group">
                                <Label for="password"/>
                                <Input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                            </div>

                            <div className="form-group">
                                <Label for="role"/>
                                <select className="form-control" onChange={this.handleChange} name="role" id="">
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <Label for="salary"/>
                                <Input type="number" name="salary" value={this.state.salary} onChange={this.handleChange}/>
                            </div>

                            <Input type="hidden" value={this.state.createdAt} />
                            <Input type="hidden" value={this.state.id} />
                        </form>
                    </MDBModalBody>
                    <MDBBtn className="btn btn-outline-blue" onClick={this.handleFormSubmit}>Add User</MDBBtn>
            </MDBContainer>
        );
    }
}

export { AddUser };
