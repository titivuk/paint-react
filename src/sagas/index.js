import { all, call } from 'redux-saga/effects'
import clearCanvas from './clear.canvas';


export default function* rootSaga() {
	yield all([
		call(clearCanvas)
	]);
};