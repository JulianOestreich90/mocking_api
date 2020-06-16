import React from "react";
import {bindActionCreators} from "redux";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Alert, Button, Form, FormGroup, Input} from "reactstrap";

import * as Actions from "../actions/signupFormActions";

class SignUp extends React.Component {

    required = value => value ? undefined : 'This field is required';
    isValidEmail = value => (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(value)) ? undefined : "Please type in a valid email adress";
    isValidPassword = (value, allValues) => value === allValues.password ? undefined : "The passwords don't match";

    renderField = ({name, input, label, placeholder, type, meta: {touched, error, warning}}) => (
        <div className="mt-3">
            <label htmlFor={name}>{label}</label>
            <Input {...input} placeholder={placeholder} type={type}/>
            {touched && ((error && <p className="text-danger"><small>{error}</small></p>) || (warning &&
                <p className="text-danger">{error}</p>))}
        </div>
    );

    onSubmit(props) {
        return this.props.signup(props)
    }

    render() {
        console.log(this.props.success);
        const {handleSubmit, invalid, pristine, reset, submitting} = this.props;

        return (
            <div className="container w-100">
                {this.props.success !== undefined ? <Alert className="mt-3">{this.props.success.status}</Alert> : null}
                <div className="signup-form rounded container shadow bg-light w-50 mt-5 pt-3">
                    <div className="container pr-5 pl-5 pt-4 pb-3">
                        <Form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <h5>Sign up here</h5>
                            <FormGroup>
                                <Field name="firstName" label="First Name:"
                                       component={this.renderField} validate={[this.required]}/>
                                <Field name="lastName" label="Last Name:"
                                       component={this.renderField} validate={[this.required]}/>
                                <Field name="email" type="email" label="Email:"
                                       component={this.renderField} validate={[this.required, this.isValidEmail]}/>
                                <Field name="password" type="password" label="Password:"
                                       component={this.renderField} validate={[this.required]}/>
                                <Field name="confirmPassword" type="password" label="Confirm Password:"
                                       component={this.renderField} validate={[this.required, this.isValidPassword]}/>
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
    success: state.signupReducer.success
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch)
}

SignUp = reduxForm({
    form: 'signup-form',
})(SignUp);

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
