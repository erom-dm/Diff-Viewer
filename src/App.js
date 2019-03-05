import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import {addNode} from "./actions/nodes";
import dataSource from './test-data';
import TreeBeard from './components/treebeard';
import JSONParser from './components/jsonToTreebeard';

class App extends Component {
  render() {
    const addNodeDispatch = this.props.addNode;
    const leftData = JSONParser(dataSource.left.nodes, addNodeDispatch);
    const rightData = JSONParser(dataSource.right.nodes, addNodeDispatch);

    return (
        <Fragment>
            <div className='navBar'>Navbar</div>
            <div className='mainContainer'>
                <div className='comparatorArea'>
                    <TreeBeard data={leftData}/>
                    <TreeBeard data={rightData}/>
                </div>
            </div>
        </Fragment>
    );
  }
}

function mapStateToProps(state) {
    return{

    }
}

const mapDispatchToProps = {
    addNode,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
