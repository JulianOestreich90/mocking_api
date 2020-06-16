import React from 'react';
import PropTypes from 'prop-types';
import {Button, Badge, Collapse, CardBody, Card, CardHeader} from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ReactJson from 'react-json-view'

import JsonForm from "./JsonForm";
import * as Actions from "../actions/innerAction";


class InnerAccordion extends React.Component {

    // Disable card collapse transition animation
    style = {
        transition: 'none'
    };

    render() {
        const jsons = this.props.url.jsons.map(json => (
            <Card key={json.json_id}>
                <CardHeader>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-1">
                                 <span className="insight-label">
                                    <Badge color="primary badge" data-event={json.json_id}>Response</Badge>
                                 </span>
                            </div>
                            <div className="col-sm-8">
                                <span className="Url-title" data-event={json.json_id}
                                      onClick={(e) => this.props.toggleInnerAccordion(e)}>
                                    {json.description}
                                </span>
                            </div>
                            <div className='col-sm'>
                                <span className="buttons">
                                    {json.active === true ?
                                        <Button
                                            color="secondary"
                                            className="float-right btn-group justify-content-center"
                                            onClick={() => this.props.activateJson(json)}
                                        >Deactivate
                                        </Button> :
                                        <Button
                                            color="primary"
                                            className="float-right btn-group justify-content-center"
                                            onClick={() => this.props.activateJson(json)}
                                        >Activate
                                        </Button>}
                                    <Button color="primary"
                                            className='float-right'
                                            onClick={() => this.props.deleteJson(json)}
                                    >Delete
                                    </Button>
                                </span>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <Collapse style={this.style} isOpen={this.props.collapseJson === Number(json.json_id)}>
                    <CardBody>
                        <div className="container">
                            <ReactJson src={JSON.parse(json.json)}/>
                        </div>
                    </CardBody>
                </Collapse>
            </Card>
        ));
        return (
            <div className="container">
                <div className="accordion shadow">
                    {jsons}
                    <JsonForm url={this.props.url}/>
                </div>
            </div>
        );
    }
}

InnerAccordion.propTypes = {
    toggleInnerAccordion: PropTypes.func.isRequired,
    activateJson: PropTypes.func.isRequired,
    deleteJson: PropTypes.func.isRequired,
    url: PropTypes.object.isRequired,
    collapseJson: PropTypes.number.isRequired,
};


const mapStateToProps = (state, ownProps) => ({
    collapseJson: state.innerAccordionReducer.collapseJson,
    activeJson: state.innerAccordionReducer.activeJson,
    url: state.accordionReducer.items.find(url => Number(url.url_id) === Number(ownProps.urlId))
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch)
};


export default connect(mapStateToProps, mapDispatchToProps)(InnerAccordion);