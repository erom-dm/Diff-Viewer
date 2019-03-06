import React, { Component, Fragment } from 'react';
import dataSource from './test-data';
import TreeBeard from './components/TreeBeard/treebeard';
import JSONParser from './jsonToTreebeard';

class App extends Component {

  render() {
    const leftData = JSONParser(dataSource.left.nodes);
    const rightData = JSONParser(dataSource.right.nodes);

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

export default App;
