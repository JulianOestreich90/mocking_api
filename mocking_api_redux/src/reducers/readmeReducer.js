import {READ_README} from "../actions/types";


const initialState = {
    markdown: ""
};

export default function (state = initialState, action) {
    switch (action.type) {
        case READ_README:
            return {
                ...state,
                markdown: action.payload
            };
        default:
            return state

    }
}