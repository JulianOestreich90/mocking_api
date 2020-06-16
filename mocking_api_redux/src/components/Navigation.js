import React from 'react';
import {Link, withRouter} from "react-router-dom";
import {connect} from 'react-redux'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText
} from 'reactstrap';
import {bindActionCreators} from "redux";

import * as Actions from "../actions/loginFormActions";


class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle = () => this.setState(!this.state.isOpen);


    render() {

        const loggedIn = (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand tag={Link} to="/Login">Mocking API</NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink tag={Link} to="/">Mocking</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/readme">Readme</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/profile">Profile</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/login" onClick={this.props.logout.bind(this)}>Logout</NavLink>
                            </NavItem>
                        </Nav>
                        <NavbarText>Version 0.0.1</NavbarText>
                    </Collapse>
                </Navbar>
            </div>
        );

        const loggedOut = (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand tag={Link} to="/Login">Mocking API</NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink tag={Link} to="/login">Login</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/signup">Sign up</NavLink>
                            </NavItem>
                        </Nav>
                        <NavbarText>Version 0.0.1</NavbarText>
                    </Collapse>
                </Navbar>
            </div>
        );

        return (this.props.loggedIn ? loggedIn : loggedOut);
    }
}

const mapStateToProps = (state) => ({
    loggedIn: state.loginReducer.loggedIn
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch)
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation));