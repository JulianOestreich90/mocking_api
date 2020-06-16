import React from 'react';
import jwt from 'jwt-decode'
import {Button, Form, FormGroup, Input} from "reactstrap";
import {Field, reduxForm} from "redux-form";
import {bindActionCreators} from "redux";
import * as Actions from "../actions/userProfileActions";
import {connect} from "react-redux";

class UserProfile extends React.Component {

    renderField = ({input, placeholder, type, meta: {touched, error, warning}}) => (
        <div>
            <Input {...input} placeholder={placeholder} type={type}/>
            {touched && ((error && <p className="text-danger"><small>{error}</small></p>) || (warning &&
                <p className="text-danger">{error}</p>))}
        </div>
    );

    onSubmit(props) {
        this.props.addApiSource(props);
    }

    render() {
        const {handleSubmit, invalid, submitting, user} = this.props;
        return (
            <div className="container">
                <div className="jumbotron mt-5 bg-light">
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">USER</h1>
                    </div>
                    <table className="table col-md-6 mx-auto">
                        <tbody>
                        <tr>
                            <td>UserID</td>
                            <td>{this.props.user.user_id}</td>
                        </tr>
                        <tr>
                            <td>Fist Name</td>
                            <td>{this.props.user.first_name}</td>
                        </tr>
                        <tr>
                            <td>Last Name</td>
                            <td>{this.props.user.last_name}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{this.props.user.email}</td>
                        </tr>
                        <tr>
                            <td>API</td>
                            <td style={{padding: 'none'}}>
                                <Form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                                    <FormGroup>
                                        <Field name="addApi" type="text" placeholder="API"
                                               component={this.renderField}/>
                                        <Button type='submit' color="primary" className="mt-2 mr-2"
                                                disabled={invalid || submitting}>Submit</Button>
                                    </FormGroup>
                                </Form>
                            </td>
                        </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.loginReducer.user
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch)
}


UserProfile = reduxForm({
    form: 'UserProfileForm'
})(UserProfile);

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
