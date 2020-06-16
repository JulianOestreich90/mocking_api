import {ACTIVATE_JSON, DELETE_JSON, TOGGLE_INNERACCORDION} from "./types";
import axios from 'axios'

export function toggleInnerAccordion(e) {
    e.preventDefault();
    return {
        type: TOGGLE_INNERACCORDION,
        payload: e.target.dataset.event
    }
}

export const activateJson = (json) => dispatch => {
    axios
        .put("http://localhost:8090/api/jsons/" + json.json_id, {
            url_id: json.url_id
        }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        .then((res) => dispatch({
                type: ACTIVATE_JSON,
                payload: json
            })
        )
};

export const deleteJson = (json) => dispatch => {
    axios
        .delete("http://localhost:8090/api/jsons/" + json.json_id, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }
        )
        .then(() => dispatch({
            type: DELETE_JSON,
            payload: json
        }))
}