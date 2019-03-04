import React from 'react';
import {Treebeard, decorators} from 'react-treebeard';
import {List} from 'semantic-ui-react';
import styles from './treebeardStyle';


function setIcon({loading, children}){
    if (loading === true){
        return 'folder';
    } else if (children === undefined || children.length === 0){
        return 'file';
    } else {
        return 'folder';
    }
}

decorators.Header = (props) => {

    const icon = setIcon(props.node);
    const nodeName = props.node.name.replace(props.node.parents, '');

    return (
        <List.Item style={props.style}>
            <List.Icon name={icon}/>
            <List.Content>
                <List.Header>{nodeName}</List.Header>
            </List.Content>
        </List.Item>
    );
};

decorators.Toggle = (props) => {
    return (
        <div>
        </div>
    );
};



class TreeExample extends React.Component {

    constructor(props){
        super(props);
        this.state = {};
        this.onToggle = this.onToggle.bind(this);
    }
    onToggle(node, toggled){
        if(this.state.cursor){this.state.cursor.active = false;}
        node.active = true;
        if(node.children){ node.toggled = toggled; }
        this.setState({ cursor: node });
    }
    render(){
        return (
            <Treebeard
                data={this.props.data}
                onToggle={this.onToggle}
                style = {styles}
                decorators={decorators}
            />
        );
    }
}

export default TreeExample;


