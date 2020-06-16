import {USER_SIGNUP_SUCCESS} from "../actions/types";

const initalState = {
    success: undefined
};

export default function (state = initalState, action) {
    switch (action.type) {
        case USER_SIGNUP_SUCCESS:
            return {
                ...state,
                success: action.payload
            };
        default:
            return state;
    }
}