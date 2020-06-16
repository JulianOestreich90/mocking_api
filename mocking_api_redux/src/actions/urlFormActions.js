import axios from "axios";
import {ADD_URL} from "./types";


export const addEndpoint = (values, userId) => dispatch => {
    axios
        .post("http://localhost:8090/api/urls", {
            url: values.addUrl,
        }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        .then((res) => dispatch({
                type: ADD_URL,
                payload: res.data
            })
        )
};

