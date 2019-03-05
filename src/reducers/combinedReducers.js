import { combineReducers } from "redux";
import nodes from './nodeReducer';

let reducers = combineReducers({
    nodes,
});

export default reducers;