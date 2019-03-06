export const TOGGLE_NODE = 'TOGGLE_NODE';

export function toggleNode(node){
    return{
        type: TOGGLE_NODE,
        payload: node,
    }
}