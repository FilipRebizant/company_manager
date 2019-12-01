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
            currentUser: null
        };
    }

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
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
        let navItems;
        if (this.state.currentUser) {
            navItems =
                <MDBNavbarNav className="justify-content-md-between">
                    <ul className="d-flex pl-0">
                        <NavItem>
                            <MDBNavLink to="/" className="nav-item nav-link">Home</MDBNavLink>
                        </NavItem>

                        <NavItem>
                            <MDBNavLink to="/addUser" className="nav-item nav-link">Add User</MDBNavLink>
                        </NavItem>
                    </ul>

                    <ul>
                        <NavItem>
                            <MDBNavLink onClick={this.logout} to="/login" className="nav-item nav-link">Logout</MDBNavLink>
                        </NavItem>
                    </ul>

                </MDBNavbarNav>;
        } else {
            navItems =
                <MDBNavbarNav className="justify-content-md-end">

                    <NavItem>
                        <MDBNavLink to="/login" className="nav-item nav-link">Login</MDBNavLink>
                    </NavItem>


            </MDBNavbarNav>;
        }

        return (
            <Navbar color="bg-dark navbar-dark" expand="md" scrolling>
                {!this.state.isWideEnough && <NavbarToggler onClick={this.onClick}/>}
                <Collapse isOpen={this.state.collapse} navbar>
                    {navItems}
                </Collapse>
            </Navbar>
        );
    }
}

export { Navigation };
