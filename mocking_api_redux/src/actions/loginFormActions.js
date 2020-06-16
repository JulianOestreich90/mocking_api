import axios from "axios";
import {SubmissionError} from 'redux-form';
import {USER_LOGIN, USER_LOGOUT} from "./types";
import {useCookies} from 'react-cookie';


export const login = (props) => dispatch => {
    return axios
        .post("http://localhost:8090/api/login", {
            email: props.email,
            password: props.password
        },{
            headers: {
                "Content-Type": "application/json",
                //"Accept":"*/*",
            },
            withCredentials: true
        })
        .then((res) => {
            console.log(res)
            if (res.data.error) {
                throw new SubmissionError({
                    email: res.data.error,
                    _error: res.data.error
                })
            } else {
                dispatch({
                    type: USER_LOGIN,
                    payload: res.data
                })
            }
        })
};

export const logout = (props) => dispatch => {
    return axios
        .get("http://localhost:8090/api/logout", {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        })
        .then((res) => {
            console.log(res);
            dispatch({
                type: USER_LOGOUT
            })
        })
}
