import React, { Component } from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";
import {Link} from "react-router-dom";

import {
    Collapse,
    Navbar,
    NavbarNav,
    NavbarToggler,
    NavItem,
} from 'mdbreact';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };

    render() {
        let navItems;
        navItems =
            <MDBNavbarNav className="justify-content-md-start">

                <NavItem>
                    <MDBNavLink to="/" className="nav-item nav-link">Home</MDBNavLink>
                </NavItem>

                <NavItem>
                    <MDBNavLink to="/login" className="nav-item nav-link">Login</MDBNavLink>
                </NavItem>

                <NavItem>
                    <MDBNavLink to="/commission" className="nav-item nav-link">Commission</MDBNavLink>
                </NavItem>

            </MDBNavbarNav>;

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