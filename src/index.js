import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore } from "redux";
import { Provider } from 'react-redux';
import reducers from "./reducers/combinedReducers";
import { composeWithDevTools } from 'redux-devtools-extension';
import 'semantic-ui-css/semantic.css';

const store = createStore(reducers, composeWithDevTools());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

