import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {connect} from 'react-redux'

import Accordion from "./components/Accordion";
import Navigation from "./components/Navigation";
import SignUp from "./components/SignUp";
import Login from "./components/Login"
import Readme from "./components/Readme";
import UserProfile from "./components/UserProfile";


import './App.css';


class App extends React.Component {
    render() {
        return (
            <Router>
                <Navigation/>
                <Switch>
                    <Route exact path="/" render={() => (<Accordion/>)}/>
                    <Route path="/signup">
                        <SignUp/>
                    </Route>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/readme">
                        <Readme/>
                    </Route>
                    <Route path="/profile">
                        <UserProfile/>
                    </Route>
                </Switch>
            </ Router>
        )
    }
}

const mapStateToProps = state => ({
    signUpMessage: state.signupReducer.success,
});

export default connect(mapStateToProps)(App);