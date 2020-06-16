import React from 'react';
import {Button, Card, Form, FormGroup, Input} from 'reactstrap';
import {reduxForm, reset, Field} from "redux-form";
import {bindActionCreators} from "redux";
import {connect} from 'react-redux'
import PropTypes from 'prop-types';

import * as Actions from '../actions/urlFormActions';


class UrlForm extends React.Component {
    required = value => value ? undefined : 'This field is required';
    isValidEndpoint = value => (!/^\/\w*/i.test(value)) ? undefined : "The endpoint can not start with '/' ";

    renderField = ({input, label, placeholder, type, meta: {touched, error, warning}}) => (
        <div className="mt-3">
            <label>{label}</label>
            <Input {...input} placeholder={placeholder} type={type}/>
            {touched && ((error && <p className="text-danger"><small>{error}</small></p>) || (warning &&
                <p className="text-danger">{error}</p>))}
        </div>
    );

    onSubmit(props) {
        this.props.addEndpoint(props);
    }

    render() {
        const {handleSubmit, invalid, submitting} = this.props;
        return (
            <Card className="card-header">
                <Form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <FormGroup>
                        <Field name="addUrl" type="text" placeholder="url"
                               validate={[this.required, this.isValidEndpoint]} label="Create a new Endpoint:"
                               component={this.renderField}/>
                        <Button type='submit' color="primary" className="mt-2 mr-2"
                                disabled={invalid || submitting}>Submit</Button>
                    </FormGroup>
                </Form>
            </Card>
        )
    }
}

UrlForm.propTypes = {
    addEndpoint: PropTypes.func.isRequired
};

const afterSubmit = (result, dispatch) =>
    dispatch(reset('add-url-form'));

const mapStateToProps = (state) => ({});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch)
}


UrlForm = reduxForm({
    form: 'add-url-form',
    onSubmitSuccess: afterSubmit
})(UrlForm);

export default connect(mapStateToProps, mapDispatchToProps)(UrlForm)
