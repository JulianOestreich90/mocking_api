import update from 'immutability-helper';

import {
    ACTIVATE_JSON,
    ADD_JSON,
    ADD_URL,
    DELETE_JSON,
    DELETE_URL,
    FETCH_ENDPOINTS,
    TOGGLE_ACCORDION,
} from "../actions/types";

const initalState = {
    collapse: 0,
    collapseJson: 0,
    items: []
};

export default function (state = initalState, action) {
    switch (action.type) {
        case FETCH_ENDPOINTS:
            return {
                ...state,
                items: action.payload,

            };
        case TOGGLE_ACCORDION:
            return {
                ...state,
                collapse: Number(state.collapse) === Number(action.payload) ? 0 : Number(action.payload)
            };
        case ACTIVATE_JSON:
            const jsons = state.items.find(url => url.url_id === action.payload.url_id).jsons;
            const new_jsons = jsons.map((json, i) => jsons[i].json_id === action.payload.json_id ? {
                ...json,
                active: !json.active
            } : {...json, active: false});
            const items = state.items.map((url, i) => state.items[i].url_id === action.payload.url_id ? {
                ...url,
                jsons: new_jsons
            } : url);
            return {
                ...state,
                items: items,
            };
        case ADD_URL:
            return {
                ...state,
                items: [...state.items, action.payload]
            };
        case DELETE_URL:
            return {
                ...state,
                items: action.payload
            };
        case ADD_JSON:
            const index = state.items.findIndex(url => url.url_id === action.payload.url_id);
            return update(state, {
                items: {
                    [index]: {
                        jsons: {
                            $push: [action.payload]
                        }
                    }
                }
            });
        case DELETE_JSON:
            const item_index = state.items.findIndex((url) => url.url_id === action.payload.url_id);
            const json_index = state.items[item_index].jsons.findIndex((json) => json.json_id === action.payload.json_id);
            return update(state, {
                items: {
                    [item_index]: {
                        jsons: {
                            $splice: [[json_index]]
                        }
                    }
                }
            });
        default: {
            return state;
        }


    }
}