import throttleClearCanvas from './clear.canvas';


export default function* rootSaga() {
	yield [
		throttleClearCanvas()
	];
};