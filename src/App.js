import React, { Component, Fragment } from 'react';
import {Container} from 'semantic-ui-react';
import ListExampleTree from './components/List';
import TreeView from './components/treeview';

class App extends Component {
  render() {
    return (
        <Fragment>
            <Container>
                <div className="App">
                    <ListExampleTree/>
                </div>
            </Container>
            <div>
                <TreeView/>
            </div>
        </Fragment>
    );
  }
}

export default App;
