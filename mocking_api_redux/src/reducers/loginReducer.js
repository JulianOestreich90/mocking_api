import {USER_LOGIN, USER_LOGOUT} from "../actions/types";

const initalState = {
    loggedIn: false
};

export default function (state = initalState, action) {
    switch (action.type) {
        case USER_LOGIN:
            return {
                ...state,
                loggedIn: action.payload.isLoggedIn,
                user: action.payload.user
            };
        case USER_LOGOUT:
            console.log("logout")
            return {
                ...state,
                loggedIn: false,
                user: null
            };
        default:
            return state;
    }
}