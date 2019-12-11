import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavItem,
    MDBNavbarNav, MDBNavLink
} from 'mdbreact';

import {authService} from "../../_services";

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            isWideEnough: false,
            currentUser: null,
            name: null
        };
    }

    toggleCollapse = () => {
        this.setState({ collapse: !this.state.collapse });
    };

    componentDidMount() {
        // Handle active links
        let links = document.getElementsByClassName('nav-link');

        for (let link of links) {
            link.onclick = function () {
                for (let elem of links) {
                    elem.parentElement.classList.remove('active');
                }

                link.parentElement.classList.add('active');
            };
        }

        // Handle auth
        authService.currentUser.subscribe(x => {
            if (typeof x === 'string') {
                this.setState({
                    currentUser: JSON.parse(x),
                })
            } else {
                this.setState({
                    currentUser: x,
                })
            }
        });
    }

    logout() {
        authService.logout();
    }

    render() {
        let navItems, adminItems;
        let { currentUser } = this.state;

        if (currentUser ) {
            navItems =
                <ul className="d-flex list-inline">
                    <NavItem>
                        <div className="nav-item nav-link">{currentUser.user}</div>
                    </NavItem>

                    <NavItem>
                        <MDBNavLink onClick={this.logout} to="/login" className="nav-item nav-link">Logout</MDBNavLink>
                    </NavItem>
                </ul>

            if (currentUser.role === "ROLE_ADMIN") {
                adminItems =
                    <React.Fragment>
                        <NavItem>
                            <MDBNavLink to="/addUser" className="nav-item nav-link">Add User</MDBNavLink>
                        </NavItem>

                        <NavItem>
                            <MDBNavLink to="/users" className="nav-item nav-link">Users</MDBNavLink>
                        </NavItem>
                    </React.Fragment>
            }
        } else {
            navItems =
                <NavItem>
                    <MDBNavLink to="/login" className="nav-item nav-link">Login</MDBNavLink>
                </NavItem>
        }

        return (
            <Navbar color=" navbar-dark" className="main-backgound-color" expand="md" scrolling>
                {!this.state.isWideEnough && <NavbarToggler onClick={this.toggleCollapse}/>}
                <Collapse isOpen={this.state.collapse} navbar>
                    <MDBNavbarNav className="justify-content-md-between">
                        <ul className="nav-wrapper">
                            <NavItem>
                                <MDBNavLink to="/" className="nav-item nav-link">Home</MDBNavLink>
                            </NavItem>
                            {adminItems}
                        </ul>

                        {navItems}

                    </MDBNavbarNav>
                </Collapse>
            </Navbar>
        );
    }
}

export { Navigation };
