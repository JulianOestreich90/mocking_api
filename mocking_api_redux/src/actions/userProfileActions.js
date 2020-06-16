import {ADD_NEW_API} from "./types";
import axios from "axios";

export const addApiSource = (props) => dispatch => {
    axios
        .put("http://localhost:8090/api/login", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => dispatch({
            type: ADD_NEW_API,
            payload: res
            })
        )
};