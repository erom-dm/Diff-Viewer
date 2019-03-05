export const ADD_NODE = 'ADD_NODE';
export const TOGGLE_NODE = 'TOGGLE_NODE';

export function addNode(node){
    return {
        type: ADD_NODE,
        payload: node,
    }
}

export function toggleNode(node){
    return{
        type: TOGGLE_NODE,
        payload: node,
    }
}