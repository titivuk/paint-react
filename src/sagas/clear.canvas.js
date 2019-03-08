import { put, throttle, takeEvery } from 'redux-saga/effects'


function* clearCanvas() {
	yield put({ type: 'CLEAR_CANVAS' });
}

export default function* clearCanvasWatcher() {
	yield throttle(5000, 'CLEAR_CANVAS', clearCanvas);
}