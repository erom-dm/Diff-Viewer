import React, { Component, Fragment } from 'react';
import {Container} from 'semantic-ui-react';
import ComparatorHalf from './components/jsonParser';
import dataSource from './test-data';



class App extends Component {
  render() {
    return (
        <Fragment>
            <div className='navBar'>Navbar</div>
            <div className='mainContainer'>
                <Container>
                    <div className='comparatorArea'>
                        <ComparatorHalf side='left' data={dataSource.left}/>
                        <ComparatorHalf side='right' data={dataSource.right}/>
                    </div>
                </Container>
            </div>
        </Fragment>
    );
  }
}

export default App;
