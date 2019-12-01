import React from 'react';

import { authenticationService } from '../_services';
import {MDBCol, MDBRow} from "mdbreact";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowingError: false,
            username: '',
            password: '',
            error: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleFormSubmit(e) {
        e.preventDefault();
        // authenticationService
        //     .login(this.state.username, this.state.password)
        //     .then((result) => {
        //         this.props.history.push('/');
        //     })
        //     .catch((error) => {
        //         this.setState({
        //             isShowingError: true,
        //             error: error
        //         });
        //     });
    }

    // Update state values
    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // Handle form after pressing enter
    handleKeyPress(e) {
        if (e.keyCode === 13) return this.handleFormSubmit;
    }

    render() {
        let errorContainer;

        if (this.state.isShowingError) {
            errorContainer = <div className="alert alert-danger" id="loginErrorContainer">{this.state.error}</div>;
        }

        return (
            <MDBRow center>
                <MDBCol md="6">
                    <form method="post" className="login__form"
                          onSubmit={this.handleFormSubmit}>
                        {errorContainer}
                        <h1 className="h3 my-3 font-weight-normal">Please sign in</h1>

                        <div className="form-group">
                            <label htmlFor="inputUsername" className="sr-only">Username</label>
                            <input type="text" name="username" id="inputUsername"
                                   className="form-control"
                                   placeholder="Username" autoFocus
                                   onChange={this.handleInputChange}
                                   onKeyDown={this.handleKeyPress}
                                   required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="inputPassword" className="sr-only">Password</label>
                            <input type="password" name="password" id="inputPassword" className="form-control"
                                   placeholder="Password"
                                   onChange={this.handleInputChange}
                                   onKeyDown={this.handleKeyPress}
                                   required/>
                        </div>

                        <div className="form-group">
                            <button className="btn btn-lg btn-primary" type="submit">
                                Sign in
                            </button>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        );
    }
}

export { LoginPage };