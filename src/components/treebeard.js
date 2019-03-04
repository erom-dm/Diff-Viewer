import React from 'react';
import {Treebeard, decorators} from 'react-treebeard';
import {List} from 'semantic-ui-react';
import styles from './treebeardStyle';

const data = {
    name: 'root',
    toggled: true,
    children: [
        {
            name: 'parent',
            children: [
                { name: 'child1' },
                { name: 'child2' }
            ]
        },
        {
            name: 'loading parent',
            loading: true,
            children: []
        },
        {
            name: 'parent',
            children: [
                {
                    name: 'nested parent',
                    children: [
                        { name: 'nested child 1' },
                        { name: 'nested child 2' }
                    ]
                }
            ]
        }
    ]
};

decorators.Header = (props) => {
    let icon;

    if (props.node.loading === true){
        icon = 'folder';
    } else if (props.node.children === undefined || props.node.children.length === 0){
        icon = 'file';
    } else {
        icon = 'folder';
    }

    return (
        <List.Item style={props.style}>
            <List.Icon name={icon}/>
            <List.Content>
                <List.Header>{props.node.name}</List.Header>
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


