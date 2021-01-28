import React from 'react';
import ReactDOM from 'react-dom';

import { connect, Provider } from 'react-redux';
import init_store from "./redux/store";

import '@shopify/polaris/dist/styles.css';
import App from './App';

const AppRedux = connect()(App);

function init_app() {
    ReactDOM.render(
        <Provider store={ init_store() }>
            <AppRedux/>
        </Provider>,
        document.getElementById('root')
    )
}

init_app();