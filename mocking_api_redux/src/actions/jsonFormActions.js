import axios from "axios";
import {ADD_JSON} from "./types";

export const addJson = (values, url) => {
    return dispatch => {
        axios.post("http://localhost:8090/api/jsons", {
            json: values.json,
            url_id: url.url_id,
            description: values.description
        }, {
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
            .then(res => dispatch({
                type: ADD_JSON, payload: res.data
            }))
            .catch(err => console.log(err))
    }
};