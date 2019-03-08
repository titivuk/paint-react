import clearCanvasWatcher from './clear.canvas';


export default function* rootSaga() {
	yield [
		clearCanvasWatcher()
	];
};