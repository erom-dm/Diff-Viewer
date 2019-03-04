import React, {Component} from 'react';
import {List} from 'semantic-ui-react';


function JSONtoArray(obj){
    const arr = [];

    // Iterate through all keys in JSON
    for (const key in obj){
        if(obj.hasOwnProperty(key)){

            const status = obj[key]['status'] ? 'status##'+obj[key]['status'] : 'default';

            if(typeof obj[key] === 'object' && obj[key] !== null && key !== 'elements'){
                // If node has children
                arr.push({'nodeName': key, 'status': status, 'children': JSONtoArray(obj[key])})
            } else if (key === 'elements'){
                for (const el in obj[key]){
                    if(obj[key].hasOwnProperty(el)){
                        // Inside 'elements' array, push items as strings with status concatenated in front
                        arr.push('status##' + obj[key][el]['status'] + '||' + obj[key][el]['name']);
                    }
                }
            } else {
                // do not include status nodes for parents
                if (key !== 'status'){
                    arr.push(obj[key]);
                }
            }
        }
    }

    return arr
}

function ParseDataArray(arr, side, parentName = ''){

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
        //Status variable, if exists
        const status = node['status'] && side === 'right' ? node['status'].slice(node['status'].indexOf('##')+2) : null;

        if(typeof node === 'object' && !Array.isArray(node) && node !== null){
            //Check if node has child elements
            const hasChildren = node['children'] !== null && node['children'].length > 0;
            //Modified current node name to remove prefixes in childless elements
            const newParentName = modifyParentName(node[nodeName]);

            listComponent.push(
                <List.Item active={true}>
                    <List.Icon name={'folder'} />
                    <List.Content>
                        <List.Header className={status}> {node[nodeName]} </List.Header>
                        {
                            hasChildren
                            ? <List> {ParseDataArray(node['children'], side, parentName + newParentName)} </List>
                            : null
                        }
                    </List.Content>
                </List.Item>
            )
        } else {
            const header = typeof node === 'string' ? node.replace(parentName, '') : node;
            const headerHasStatus = header.includes('status##');
            const stat = headerHasStatus && side === 'right'
                ? header.slice(header.indexOf('##')+2, header.indexOf('||'))
                : null;
            const cleanHeader = headerHasStatus ? header.slice(header.indexOf('||')+2) : header;

            listComponent.push(
                <List.Item>
                    <List.Icon name={'file'} />
                    <List.Content>
                        <List.Header className={stat}> {cleanHeader} </List.Header>
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
                {ParseDataArray(JSONtoArray(this.props.data.nodes), this.props.side)}
            </List>
        )
    }

}

export default SemanticTree;