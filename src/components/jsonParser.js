import React, {Component} from 'react';
import {List} from 'semantic-ui-react';


function JSONtoArray(obj){
    const arr = [];

    // Iterate through all keys in JSON
    for (const key in obj){
        if(obj.hasOwnProperty(key)){
            if(typeof obj[key] === 'object' && obj[key] !== null && key !== 'elements'){
                // If node has children
                arr.push({'nodeName': key, 'children': JSONtoArray(obj[key])})
            } else if (key === 'elements'){
                for (const el in obj[key]){
                    arr.push(obj[key][el]['name']);
                    arr.push('status' + '##' + obj[key][el]['status']);
                }
            } else {
                // Check if node without children is status node or not
                if (key === 'status'){
                    arr.push(key + '##' + obj[key])
                } else {
                    arr.push(obj[key]);
                }
            }
        }
    }

    return arr
}

function ParseDataArray(arr, parentName = ''){

    function modifyParentName(parentName){
        switch (parentName) {
            case 'storage':
                return '-storages-';
            case 'interfaces':
                return '-snmp-interfaces-';
            default:
                return parentName;
        }
    }

    //Default node name key used in JSONtoArray func
    const nodeName = 'nodeName';
    //Array with list components to return;
    let listComponent = [];

    //Iterate through all nodes in the array
    for (let node of arr){
        if(typeof node === 'object' && !Array.isArray(node) && node !== null){
            //Check if node has child elements
            const hasChildren = node['children'] !== null && node['children'].length > 0;
            //Pass modified current node name for use in childless elements
            const newParentName = modifyParentName(node[nodeName]);


            listComponent.push(
                <List.Item>
                    <List.Icon name={'folder'} />
                    <List.Content>
                        <List.Header> {node[nodeName]} </List.Header>
                        {
                            hasChildren
                            ? <List> {ParseDataArray(node['children'], parentName + newParentName)} </List>
                            : null
                        }
                    </List.Content>
                </List.Item>
            )
        // Do not include status nodes in the tree
        } else if (!node.includes('status##')) {
            listComponent.push(
                <List.Item>
                    <List.Icon name={'file'} />
                    <List.Content>
                        <List.Header> {typeof node === 'string' ? node.replace(parentName, '') : node} </List.Header>
                    </List.Content>
                </List.Item>
            )
        }
    }

    return listComponent;
}

class SemanticTree extends Component{

    render(){
        return(
            <List>
                {ParseDataArray(JSONtoArray(this.props.data.nodes))}
            </List>
        )
    }

}

export default SemanticTree;