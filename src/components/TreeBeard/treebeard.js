import React, {Component} from 'react';
import {toggleNode} from "../../actions/nodes";
import {connect} from "react-redux";
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
    // Decorate TreeBeard header in order to display Semantic UI List items.

    const icon = setIcon(node);
    const nodeName = node.name.replace(node.parents, '');

    return (
        <List.Item style={style}>
            <List.Icon name={icon}/>
            <List.Content>
                <List.Header className={node.status}>{nodeName}</List.Header>
            </List.Content>
        </List.Item>
    );
};

function findPath(data, cursor) {

    // Check top level for node to update
    let nodeToUpdate = data.find(node => node.path === cursor.path);

    // If node is not found on top level, recursively search through children
    if (!nodeToUpdate && data) {
        for(let i = 0; i < data.length; i++){
            const node = data[i];
            if(node.children && node.hasOwnProperty('children')){
                nodeToUpdate = findPath(node.children, cursor);
                if(nodeToUpdate){
                    return nodeToUpdate;
                }
            }
        }
    }

    return nodeToUpdate;
}

class TB extends Component {

    componentDidUpdate (prevProps, prevState, snapshot) {

        const {data, cursor} = this.props;

        const nodeToUpdate = findPath(data, cursor);

        if (nodeToUpdate && nodeToUpdate.toggled !== cursor.toggled) {
            nodeToUpdate.toggled = cursor.toggled;
            nodeToUpdate.active = cursor.active;

            this.setState({cursor: nodeToUpdate})
        }
    }

    constructor(props){
        super(props);
        this.state = {};
        this.onToggle = this.onToggle.bind(this);
    }

    onToggle(node, toggled){
        node.active = true;

        if (node.children) {
            node.toggled = toggled
        }

        this.setState({cursor: node});

        // Add toggled node to Redux store as a cursor
        this.props.toggleNode(node)
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
        cursor: state.nodes,
    }
}

const mapDispatchToProps = {
    toggleNode,
};


export default connect(mapStateToProps, mapDispatchToProps)(TB);


