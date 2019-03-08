import { put, throttle } from 'redux-saga/effects'

// export function* helloSaga() {
// 	console.log('Hello Saga!')
// }

function* clearCanvas() {
	yield put({ type: 'CLEAR_CANVAS' })
}

export default function* throttleClearCanvas() {
	yield throttle(500, 'CLEAR_CANVAS', clearCanvas)
}