import {ADD_NODE} from '../actions/nodes';
import {TOGGLE_NODE} from "../actions/nodes";

function nodeReducer(state = {}, action) {
    switch (action.type) {
        case ADD_NODE:
            return {
                ...state,
                ...action.payload,
            };
        case TOGGLE_NODE:
            return{
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}

export default nodeReducer;
