import React, { Component, Fragment } from 'react';
//import {Container} from 'semantic-ui-react';
//import ComparatorHalf from './components/jsonParser';
import dataSource from './test-data';
import TreeBeard from './components/treebeard';
import JSONParser from './components/jsonToTreebeard';

console.log('<<<<<<< Left >>>>>>>');
console.log(JSONParser(dataSource.left.nodes));
console.log('<<<<<<< Right >>>>>>>');
console.log(JSONParser(dataSource.right.nodes));

class App extends Component {
  render() {
    return (
        <Fragment>
            <div className='navBar'>Navbar</div>
            <div className='mainContainer'>

                <div className='comparatorArea'>
                    <TreeBeard data={JSONParser(dataSource.left.nodes)}/>
                    <TreeBeard data={JSONParser(dataSource.right.nodes)}/>
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

export default App;
