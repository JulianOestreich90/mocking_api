import React from "react";
import {bindActionCreators} from "redux";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router";
import {Button, Form, FormGroup, Input} from "reactstrap";

import * as Actions from "../actions/loginFormActions";


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToNewPage: false
        }
    }

    required = value => value ? undefined : 'This field is required';
    isValidEmail = value => (/^([\wäöüÜÖÄß])+(([\.]{0,1}[\wäöüÜÖÄß])?)*(([\+]{0,1}[\wäöüÜÖÄß])?)*([\wäöüÜÖÄß-])*\@([\wäöüÜÖÄß-]+\.)+([\w]{2,})+$/i.test(value)) ? undefined : "Please type in a valid email adress";

    renderField = ({name, input, label, placeholder, type, meta: {touched, error, warning}}) => (
        <div className="mt-3">
            <label for={name}>{label}</label>
            <Input {...input} placeholder={placeholder} type={type}/>
            {touched && ((error && <p className="text-danger"><small>{error}</small></p>) || (warning &&
                <p className="text-danger">{error}</p>))}
        </div>
    );

    onSubmit(props) {
        return this.props.login(props).then(this.setState({redirectToNewPage: true}))
    }

    render() {

        if(this.props.loggedIn){
            return (
                <Redirect to="/"/>
            )
        }

        const {handleSubmit, invalid, pristine, reset, submitting} = this.props;
        return (
            <div className="container w-100">
                <div className="signup-form rounded container shadow bg-light w-50 mt-5 pt-3">
                    <div className="container pr-5 pl-5 pt-4 pb-3">
                        <Form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <h4>Login</h4>
                            <FormGroup>
                                <Field name="email" type="text" label="Email:"
                                       component={this.renderField} validate={[this.required, this.isValidEmail]}/>
                                <Field name="password" type="password" label="Password:"
                                       component={this.renderField} validate={[this.required]}/>
                                <div className="mt-4">
                                    <Button className="mr-2" color="primary" type="submit"
                                            disabled={invalid || submitting}>Submit</Button>
                                    <Button color="secondary" type="button"
                                            disabled={invalid || pristine || submitting} onClick={reset}
                                    >Clear Values</Button>
                                </div>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    loggedIn: state.loginReducer.loggedIn
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch)
}

Login = reduxForm({
    form: 'signup-form',
})(Login);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))