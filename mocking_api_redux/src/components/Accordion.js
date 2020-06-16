import React from 'react';
import PropTypes from 'prop-types';
import {Button, Badge, Collapse, CardBody, Card, CardHeader} from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import InnerAccordion from "./InnerAccordion";
import UrlForm from "./UrlForm";
import * as Actions from "../actions/accordionAction";
import {Redirect} from "react-router";


class Accordion extends React.Component {
    constructor(props) {
        super(props);
        this.props.fetchEndpoints()
    }

    // Disable card collapse transition animation
    style = {
        transition: 'none'
    };

    render() {

        if (!this.props.loggedIn) {
            return (
                <Redirect to="/login"/>
            )
        }
        const urls = this.props.endpoints.map(url => (
            <Card key={url.url_id}>
                <CardHeader onClick={(e) => {
                    this.props.toggleAccordion(e)
                }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-1">
                                <span className="insight-label">
                                    <Badge color="primary badge" data-event={url.url_id}>Endpoint</Badge>
                                </span>
                            </div>
                            <div className="col-sm-4">
                                <span className="Url-title" data-event={url.url_id}>
                                    {url.url}
                                </span>
                            </div>
                            <div className="col-sm">
                                {url.jsons.find(json => json.active === true)
                                    ? (<span className="active-json">
                                            <Badge color='success' className="mr-1" pill>active:</Badge>
                                        {url.jsons.find(json => json.active === true).description}
                                        </span>)
                                    : null}
                            </div>
                            <div className="col-sm">
                                <span className="delete-url">
                                    <Button color="primary" onClick={() => this.props.deleteUrl(url)}>Delete</Button>
                                </span>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <Collapse style={this.style} isOpen={this.props.collapse === Number(url.url_id)}>
                    <CardBody>
                        <InnerAccordion urlId={url.url_id}/>
                    </CardBody>
                </Collapse>
            </Card>
        ));
        return (
            <div className="container mt-5">
                <div className="accordion shadow">
                    {urls}
                    <UrlForm/>
                </div>
            </div>
        );
    }
}

Accordion.propTypes = {
    fetchEndpoints: PropTypes.func.isRequired,
    deleteUrl: PropTypes.func.isRequired,
    endpoints: PropTypes.array.isRequired,
    collapse: PropTypes.number.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
    endpoints: state.accordionReducer.items,
    collapse: state.accordionReducer.collapse,
    loggedIn: state.loginReducer.loggedIn
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Accordion);
