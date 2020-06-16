import axios from 'axios';
import {DELETE_URL, USER_LOGIN, FETCH_ENDPOINTS, TOGGLE_ACCORDION, USER_LOGOUT} from "./types";



export const fetchEndpoints = () => dispatch => {
    axios
        .get("http://localhost:8090/api/urls", {
            headers: {
                "Content-Type": "application/json",
                "Accept":"*/*"
            },
            withCredentials: true
        })
        .then((res) => {
                dispatch({
                    type: FETCH_ENDPOINTS,
                    payload: res.data[0]
                })
                dispatch({
                    type: USER_LOGIN,
                    payload: res.data[1]
                })
            })
        .catch((error) => {
            console.log(error);
            dispatch({
                type: USER_LOGOUT
            })
        })

};

export const deleteUrl = (url,) => dispatch => {
    axios
        .delete("http://localhost:8090/api/urls/" + url.url_id, {
            headers: {
                'Content-Type': 'application/json',
                "Accept":"*/*"
            },
            withCredentials: true
        })
        .then((res) => dispatch({
                type: DELETE_URL,
                payload: res.data.urls
            })
        )
};

export function toggleAccordion(e) {
    e.preventDefault();
    return {
        type: TOGGLE_ACCORDION,
        payload: e.target.dataset.event
    };
}

