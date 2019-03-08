import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import reducers from './reducers/index';
import sagas from './sagas/index';
import './index.css';
import App from './App';


const sagaMiddleware = createSagaMiddleware();
const store = createStore(
	reducers,
	composeWithDevTools(applyMiddleware(sagaMiddleware))
);


sagaMiddleware.run(sagas);


ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);