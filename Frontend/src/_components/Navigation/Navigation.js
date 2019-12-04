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
            currentUser: null
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
        authService.currentUser.subscribe(x => this.setState({
            currentUser: x,
        }));
    }

    logout() {
        authService.logout();
    }

    render() {
        let navItems, addUserItem;
        let { currentUser } = this.state;

        if (currentUser ) {
        console.log(Object.keys(currentUser));
            navItems =
                <ul className="d-flex list-inline">
                    <NavItem>
                        <div className="nav-item nav-link">{console.log(currentUser)}</div>
                    </NavItem>

                    <NavItem>
                        <MDBNavLink onClick={this.logout} to="/login" className="nav-item nav-link">Logout</MDBNavLink>
                    </NavItem>
                </ul>

            if (currentUser.role === "ROLE_ADMIN") {
                addUserItem =
                    <NavItem>
                        <MDBNavLink to="/addUser" className="nav-item nav-link">Add User</MDBNavLink>
                    </NavItem>;
            }
        } else {
            navItems =
                <NavItem>
                    <MDBNavLink to="/login" className="nav-item nav-link">Login</MDBNavLink>
                </NavItem>
        }

        return (
            <Navbar color="bg-dark navbar-dark" expand="md" scrolling>
                {!this.state.isWideEnough && <NavbarToggler onClick={this.toggleCollapse}/>}
                <Collapse isOpen={this.state.collapse} navbar>
                    <MDBNavbarNav className="justify-content-md-between">
                        <ul className="d-flex pl-0">
                            <NavItem>
                                <MDBNavLink to="/" className="nav-item nav-link">Home</MDBNavLink>
                            </NavItem>
                            {addUserItem}
                        </ul>

                        {navItems}

                    </MDBNavbarNav>
                </Collapse>
            </Navbar>
        );
    }
}

export { Navigation };
