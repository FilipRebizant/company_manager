import React, {Component} from 'react';
import { MDBIcon } from 'mdbreact';
import { Input } from "../atoms/Input";
import { Label } from "../atoms/Label";
import {userService} from "../../_services";
import {firstLetterToUpperCase} from "../../_helpers";

class UserRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            firstName: props.firstName,
            lastName: props.lastName,
            username: props.username,
            role: props.role,
            email: props.email,
            salary: props.salary
        };
    }

    handleChange  = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    handleSubmit = (e) => {
        e.preventDefault();
        userService.editUser(this.state).then((response => {
          if (response.status !== 200) {
              this.props.showAlert('danger', 'Error, data couldn\'t been changed');
          } else {
              this.props.showAlert('success', 'User has been edited');
          }
        })).catch((e) => {
            this.props.showAlert('success', 'User has been edited');
        });
    };

    printRoles = (role) => {
        let roles = ['admin', 'user'];
        return roles.map(r => {
            if (r === role) {
                return <option key={r} selected value={r}>{firstLetterToUpperCase(r)}</option>
            } else {
                return <option key={r} value={r}>{firstLetterToUpperCase(r)}</option>
            }
        });
    };

    render () {
        const {firstName, lastName, username, role, email, salary} = this.state;

        return (
            <tr>
                <td className="form-group">
                    <Label for="firstName"/>
                    <Input name="firstName" value={firstName} onChange={this.handleChange}/>
                </td>
                <td className="form-group">
                <Label for="lastName"/>
                    <Input name="lastName" value={lastName} onChange={this.handleChange}/>
                </td>
                <td className="form-group">
                    <Label for="username"/>
                    <Input name="username" value={username} onChange={this.handleChange}/>
                </td>
                <td className="form-group">
                    <Label for="role"/>
                    <select className="form-control form-control-sm" name="role" id="role" onChange={this.handleChange}>
                        {this.printRoles(role)}
                    </select>
                </td>
                <td className="form-group">
                    <Label for="email"/>
                    <Input type="email" name="email" value={email} onChange={this.handleChange}/>
                </td>
                <td className="form-group salary-input">
                    <Label for="salary"/>
                    <Input type="number" name="salary" value={salary} onChange={this.handleChange}/>
                </td>
                <td className="form-group">
                    <label></label>
                    <div onClick={this.handleSubmit} className="edit-button-wrapper">
                        <MDBIcon icon="edit" className="blue-text"/>Edit
                    </div>
                </td>

            </tr>
        )
    }
};

export { UserRow };
