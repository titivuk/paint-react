import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducers from './reducers/index';
import sagas from './sagas/index';
import './index.css';
import App from './App';


const sagaMiddleware = createSagaMiddleware();
const store = createStore(
	reducers,
	applyMiddleware(sagaMiddleware)
);


sagaMiddleware.run(sagas);


ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);