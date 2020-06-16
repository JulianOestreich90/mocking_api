import React, {Component} from 'react';
import ReactMarkdown from 'react-markdown';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import * as Actions from "../actions/readmeAction";

class Readme extends Component {
    constructor(props) {
        super(props);
        this.props.readReadme();
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron mt-5 bg-light">
                    <div className="col-sm-8 mx-auto">
                        <h1 style={{display: 'inline'}}>Mocking API</h1>
                        <ReactMarkdown source={this.props.markdown}/>
                    </div>
                </div>
            </div>
        )
    }
}

Readme.propTypes = {
    markdown: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
    markdown: state.readmeReducer.markdown
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Readme)