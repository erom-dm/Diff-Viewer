import React, {Component} from 'react';
import {toggleNode} from "../actions/nodes";
import { connect } from "react-redux";
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

decorators.Header = ({node, style}) => {

    const icon = setIcon(node);
    const nodeName = node.name.replace(node.parents, '');
    const hasNoChildren = node.children === undefined;

    return (
        <List.Item className={hasNoChildren && 'toggle-off'} style={style}>
            <List.Icon name={icon}/>
            <List.Content>
                <List.Header className={node.status}>{nodeName}</List.Header>
            </List.Content>
        </List.Item>
    );
};

class TB extends Component {

    constructor(props){
        super(props);
        this.state = {};
        this.onToggle = this.onToggle.bind(this);
    }

    onToggle(node, toggled){
        // console.log('<<<<>>>>');
        // console.log(node);
        this.props.toggleNode({[node.path]: !node.toggled});
        // This was an original content of if body: (this.state.cursor.active = false;)
        if(this.state.cursor){this.setState({cursor:{active:false}})}
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

function mapStateToProps(state) {
    return{
        nodes: state.nodes,
    }
}

const mapDispatchToProps = {
    toggleNode,
};


export default connect(mapStateToProps, mapDispatchToProps)(TB);


