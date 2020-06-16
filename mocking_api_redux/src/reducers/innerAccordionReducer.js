import {TOGGLE_INNERACCORDION} from "../actions/types";

const initalState = {
    collapseJson: 0,
};

export default function (state = initalState, action) {
    switch (action.type) {
        case TOGGLE_INNERACCORDION:
            return {
                ...state,
                collapseJson: Number(state.collapseJson) === Number(action.payload) ? 0 : Number(action.payload)
            };
        default:
            return state;
    }
}