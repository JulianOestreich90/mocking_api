import axios from "axios";
import { SubmissionError } from 'redux-form';
import {USER_SIGNUP_SUCCESS} from "./types";


export const signup = (props) => dispatch => {
    return axios
        .post("http://localhost:8090/api/signup", {
            first_name: props.firstName,
            last_name: props.lastName,
            email: props.email,
            password: props.password
        })
        .then((res) => {
            console.log(res, res);
            if (res.data.status === "failed") {
                throw new SubmissionError({
                    email: "email already exists",
                    _error: "email already exists"
                })
            } else {
                dispatch({
                    type: USER_SIGNUP_SUCCESS,
                    payload: res.data
                })
            }
        })
};