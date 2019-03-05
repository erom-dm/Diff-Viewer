export const ADD_NODE = 'ADD_NODE';

export function addNode(node){
    return {
        type: ADD_NODE,
        payload: node,
    }
}