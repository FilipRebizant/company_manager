import React from 'react';

import { userService } from '../_services';
import { MDBCol, MDBRow } from "mdbreact";
import { MDBContainer, MDBCard } from 'mdbreact';

import { UserRow } from "../_components/User/UserRow";
import Spinner from "../_components/Spinner/Spinner";

class UsersPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowingAlert: false,
            users: [],
            alert: '',
            status: ''
        };
    }

    componentDidMount() {
        userService.getUsers()
            .then(response => response.json())
            .then(response => this.setState({users: response.users}))
    }

    showAlert = (status, message) =>
    {
        this.setState({
            alert: message,
            status: status,
            isShowingAlert: true
        });
    };

    render() {
        let alertContainer;
        const {isShowingAlert, users}  = this.state;

        if (isShowingAlert) {
            alertContainer = <div className={`alert alert-${this.state.status}`}>{this.state.alert}</div>;
        }

        if (!users.length) {
            return <Spinner />
        }

        return (
            <React.Fragment>
                {alertContainer}
                <MDBContainer className="my-5">
                    <MDBRow>
                    <MDBCol md="12">
                        <MDBCard>
                            <form method="post" onSubmit={this.handleFormSubmit}>
                                <h1 className="h3 my-3 font-weight-normal">Users</h1>
                                <table className="table table-responsive">
                                    <tbody>
                                    {users.map((user, key) => {
                                        return <UserRow
                                            key={key}
                                            id={user.id}
                                            firstName={user.firstName}
                                            lastName={user.lastName}
                                            username={user.username}
                                            email={user.email}
                                            salary={user.salary}
                                            role={user.role}
                                            showAlert={(status, message) => this.showAlert(status, message)}
                                        />
                                    })}
                                    </tbody>
                                </table>
                            </form>
                        </MDBCard>
                    </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </React.Fragment>
        );
    }
}

export { UsersPage };
