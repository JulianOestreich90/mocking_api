import {ADD_NEW_API} from "../actions/types";

const initalState = {
    success: undefined
};

export default function (state = initalState, action) {
    switch (action.type) {
        case ADD_NEW_API:
            console.log("heeelloooo")
            return {
                ...state,
                api: action.payload
            };
        default:
            return state;
    }
}