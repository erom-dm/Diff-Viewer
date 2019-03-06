import {TOGGLE_NODE} from "../actions/nodes";

function nodeReducer(state = {}, action) {
    switch (action.type) {
        case TOGGLE_NODE:
            return{
                ...action.payload,
            };
        default:
            return state;
    }
}

export default nodeReducer;
