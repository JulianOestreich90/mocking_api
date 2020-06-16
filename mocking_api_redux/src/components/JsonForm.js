import React from 'react';
import {Button, Card, Form, FormGroup, Input} from 'reactstrap';
import {reduxForm, Field, reset} from "redux-form";
import {bindActionCreators} from "redux";
import {connect} from 'react-redux'
import PropTypes from 'prop-types';

import * as Actions from "../actions/jsonFormActions";


class JsonForm extends React.Component {

    required = value => value ? undefined : 'This field is required';

    IsJsonString = value => {
        try {
            JSON.parse(value);
        } catch (e) {
            return "This is not a valid JSON";
        }
        return undefined;
    };


    renderField = ({input, label, type, meta: {touched, error, warning}}) => (
        <div className="mt-3">
            <label>{label}</label>
            <Input {...input} placeholder={label} type={type}/>
            {touched && ((error && <p className="text-danger"><small>{error}</small></p>) || (warning &&
                <p className="text-danger">{error}</p>))}
        </div>
    );

    onSubmit(props) {
        this.props.addJson(props, this.props.url)
    }

    render() {
        const {handleSubmit, invalid, pristine, reset, submitting} = this.props;
        return (
            <Card className="card-header">
                <Form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <h5>Create a new Response</h5>
                    <FormGroup>
                        <Field name="description" validate={[this.required]} label="Describe the JSON:"
                               component={this.renderField} placeholder="description"/>
                        <Field name="json" label={"JSON:"} component={this.renderField} placeholder="json"
                               validate={[this.required, this.IsJsonString]}/>
                        <div>
                            <Button className="mt-2 mr-2" color="primary" type="submit"
                                    disabled={invalid || submitting}>Submit</Button>
                            <Button className="mt-2" color="secondary" type="button"
                                    disabled={invalid || pristine || submitting}
                                    onClick={reset}>Clear Values</Button>
                        </div>
                    </FormGroup>
                </Form>
            </Card>
        )
    }
}

JsonForm.propTypes = {
    addJson: PropTypes.func.isRequired
};

const afterSubmit = (result, dispatch) =>
    dispatch(reset('add-json-form'));

const mapStateToProps = (state) => ({});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch)
}

JsonForm = reduxForm({
    form: 'add-json-form',
    onSubmitSuccess: afterSubmit
})(JsonForm);

export default connect(mapStateToProps, mapDispatchToProps)(JsonForm)

