import React, { Component, Fragment } from 'react';
//import {Container} from 'semantic-ui-react';
//import ComparatorHalf from './components/jsonParser';
import { connect } from "react-redux";
import {addNode} from "./actions/nodes";
import dataSource from './test-data';
import TreeBeard from './components/treebeard';
import JSONParser from './components/jsonToTreebeard';

class App extends Component {
  render() {
    const addNodeDispatch = this.props.addNode;

    return (
        <Fragment>
            <div className='navBar'>Navbar</div>
            <div className='mainContainer'>

                <div className='comparatorArea'>
                    <TreeBeard data={JSONParser(dataSource.left.nodes, addNodeDispatch)}/>
                    <TreeBeard data={JSONParser(dataSource.right.nodes, addNodeDispatch)}/>
                </div>

                {/*<Container>*/}
                    {/*<div className='comparatorArea'>*/}
                        {/*<ComparatorHalf side='left' data={dataSource.left}/>*/}
                        {/*<ComparatorHalf side='right' data={dataSource.right}/>*/}
                    {/*</div>*/}
                {/*</Container>*/}
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
